import BigNumber from 'bignumber.js';
import { sortBy } from 'lodash';
import { first, take } from 'rxjs/operators';
import {
  bancorConverterRegistry$,
  liquidityProtection$,
  settingsContractAddress$,
  systemStoreAddress$,
} from 'services/observables/contracts';
import { Pool, Token } from 'services/observables/tokens';
import { expandToken, shrinkToken } from 'utils/formulas';
import {
  calculateBntNeededToOpenSpace,
  calculatePriceDeviationTooHigh,
  decToPpm,
} from 'utils/helperFunctions';
import { web3, writeWeb3 } from '..';
import {
  ConverterRegistry__factory,
  Converter__factory,
  LiquidityProtectionSettings__factory,
  LiquidityProtectionSystemStore__factory,
  LiquidityProtection__factory,
} from '../abis/types';
import { bntToken, ethToken, zeroAddress } from '../config';
import { ErrorCode, EthNetworks, PoolType } from '../types';

export const createPool = async (
  token: Token,
  fee: string,
  network: EthNetworks,
  noPool: Function,
  onHash: (txHash: string) => void,
  onAccept: (txHash: string) => void,
  onFee: (txHash: string) => void,
  rejected: Function,
  failed: Function
) => {
  try {
    const converterRegistryAddress = await bancorConverterRegistry$
      .pipe(take(1))
      .toPromise();

    const regContract = ConverterRegistry__factory.connect(
      converterRegistryAddress,
      writeWeb3.signer
    );

    const reserves = [bntToken(network), token.address];
    const weights = ['500000', '500000'];

    const poolAddress = await regContract.getLiquidityPoolByConfig(
      PoolType.Traditional,
      reserves,
      weights
    );

    if (poolAddress !== zeroAddress) noPool();

    const tx = await regContract.newConverter(
      PoolType.Traditional,
      token.name,
      token.symbol,
      token.decimals,
      50000,
      reserves,
      weights
    );

    onHash(tx.hash);
    await tx.wait();

    const converterAddress = await web3.provider.getTransactionReceipt(tx.hash);
    const converter = Converter__factory.connect(
      converterAddress.logs[0].address,
      writeWeb3.signer
    );
    const ownerShip = await converter.acceptOwnership();
    onAccept(ownerShip.hash);
    await ownerShip.wait();

    const conversionFee = await converter.setConversionFee(decToPpm(fee));
    onFee(conversionFee.hash);
  } catch (e: any) {
    if (e.code === ErrorCode.DeniedTx) rejected();
    else failed();
  }
};

export const addLiquidity = async (
  data: { token: Token; amount: string }[],
  converterAddress: string
) => {
  const contract = Converter__factory.connect(
    converterAddress,
    writeWeb3.signer
  );
  const amountsWei = data.map((item) => ({
    address: item.token.address,
    weiAmount: expandToken(item.amount, item.token.decimals),
  }));

  const ethAmount = amountsWei.find((amount) => amount.address === ethToken);
  const value = ethAmount?.weiAmount;

  const tx = await contract.addLiquidity(
    amountsWei.map(({ address }) => address),
    amountsWei.map(({ weiAmount }) => weiAmount),
    '1',
    { value }
  );

  return tx.hash;
};

interface AddLiquidityProps {
  pool: Pool;
  token: Token;
  amount: string;
}

export const addLiquiditySingle = async ({
  pool,
  token,
  amount,
}: AddLiquidityProps) => {
  const liquidityProtectionContract = await liquidityProtection$
    .pipe(first())
    .toPromise();

  const contract = LiquidityProtection__factory.connect(
    liquidityProtectionContract,
    writeWeb3.signer
  );
  const fromIsEth = ethToken === token.address;
  const tx = await contract.addLiquidity(
    pool.pool_dlt_id,
    token.address,
    expandToken(amount, token.decimals),
    { value: fromIsEth ? expandToken(amount, 18) : undefined }
  );

  return tx.hash;
};

export const checkPriceDeviationTooHigh = async (
  pool: Pool,
  selectedTkn: Token
): Promise<boolean> => {
  const converterContract = Converter__factory.connect(
    pool.converter_dlt_id,
    web3.provider
  );

  const settingsAddress = await settingsContractAddress$
    .pipe(take(1))
    .toPromise();

  const settingsContract = LiquidityProtectionSettings__factory.connect(
    settingsAddress,
    web3.provider
  );

  const [primaryReserveAddress, secondaryReserveAddress] = sortBy(
    pool.reserves,
    [(o) => o.address !== selectedTkn.address]
  ).map((x) => x.address);

  const [
    recentAverageRate,
    averageRateMaxDeviation,
    primaryReserveBalance,
    secondaryReserveBalance,
  ] = await Promise.all([
    converterContract.recentAverageRate(selectedTkn.address),
    settingsContract.averageRateMaxDeviation(),
    converterContract.reserveBalance(primaryReserveAddress),
    converterContract.reserveBalance(secondaryReserveAddress),
  ]);

  const averageRate = new BigNumber(
    recentAverageRate['1'].toString()
  ).dividedBy(new BigNumber(recentAverageRate['0'].toString()));

  if (averageRate.isNaN()) {
    throw new Error(
      'Price deviation calculation failed. Please contact support.'
    );
  }

  return calculatePriceDeviationTooHigh(
    averageRate,
    new BigNumber(primaryReserveBalance.toString()),
    new BigNumber(secondaryReserveBalance.toString()),
    new BigNumber(averageRateMaxDeviation)
  );
};

export const getSpaceAvailable = async (id: string, tknDecimals: number) => {
  const liquidityProtectionContract = await liquidityProtection$
    .pipe(first())
    .toPromise();
  const contract = LiquidityProtection__factory.connect(
    liquidityProtectionContract,
    web3.provider
  );

  const result = await contract.poolAvailableSpace(id);

  return {
    bnt: shrinkToken(result['1'].toString(), 18),
    tkn: shrinkToken(result['0'].toString(), tknDecimals),
  };
};

export const fetchBntNeededToOpenSpace = async (
  pool: Pool
): Promise<string> => {
  const settingsAddress = await settingsContractAddress$
    .pipe(take(1))
    .toPromise();
  const settingsContract = LiquidityProtectionSettings__factory.connect(
    settingsAddress,
    web3.provider
  );

  const systemStoreAddress = await systemStoreAddress$
    .pipe(take(1))
    .toPromise();
  const systemStoreContract = LiquidityProtectionSystemStore__factory.connect(
    systemStoreAddress,
    web3.provider
  );

  const networkTokenMintingLimits =
    await settingsContract.networkTokenMintingLimits(pool.pool_dlt_id);

  const networkTokensMinted = await systemStoreContract.networkTokensMinted(
    pool.pool_dlt_id
  );

  const { tknBalance, bntBalance } = await fetchReserveBalances(pool);

  const bntNeeded = calculateBntNeededToOpenSpace(
    bntBalance,
    tknBalance,
    networkTokensMinted.toString(),
    networkTokenMintingLimits.toString()
  );

  return shrinkToken(bntNeeded, 18);
};

export const fetchReserveBalances = async (pool: Pool) => {
  const converterContract = Converter__factory.connect(
    pool.converter_dlt_id,
    web3.provider
  );
  const tknBalance = (
    await converterContract.getConnectorBalance(pool.reserves[0].address)
  ).toString();

  const bntBalance = (
    await converterContract.getConnectorBalance(pool.reserves[1].address)
  ).toString();

  return { tknBalance, bntBalance };
};
