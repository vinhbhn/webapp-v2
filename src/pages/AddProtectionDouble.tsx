import { TokenInputField } from 'components/tokenInputField/TokenInputField';
import { ModalApprove } from 'elements/modalApprove/modalApprove';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useAppSelector } from 'redux/index';
import {
  addNotification,
  NotificationType,
} from 'redux/notification/notification';
import { Pool } from 'services/api/bancor';
import { Token } from 'services/observables/tokens';
import { loadSwapData } from 'services/observables/triggers';
import { isAddress } from 'web3-utils';
import { openWalletModal } from 'redux/user/user';
import {
  bntTokenAddress$,
  govTokenAddress$,
  liquidityProtection$,
} from 'services/observables/contracts';
import { expandToken, shrinkToken } from 'utils/pureFunctions';
import { bntToken, ethToken } from 'services/web3/config';
import { createListPool } from 'utils/pureFunctions';
import {
  addLiquidity,
  getMaxStakes,
} from 'services/web3/contracts/liquidityProtection/wrapper';
import { onLogin$ } from 'services/observables/user';
import { SearchablePoolList } from 'components/searchablePoolList/SearchablePoolList';
import { useAsyncEffect } from 'use-async-effect';
import { SwapSwitch } from 'elements/swapSwitch/SwapSwitch';
import { ReactComponent as IconChevronDown } from 'assets/icons/chevronDown.svg';
import { ReactComponent as IconTimes } from 'assets/icons/times.svg';
import { currentNetwork$ } from 'services/observables/network';
import { prettifyNumber } from 'utils/helperFunctions';
import { BigNumber } from '@0x/utils';

export const AddProtectionDouble = (
  props: RouteComponentProps<{ anchor: string }>
) => {
  const { anchor } = props.match.params;

  const isValidAnchor = isAddress(anchor);

  const [amountBnt, setAmountBnt] = useState('');
  const [amountTkn, setAmountTkn] = useState('');

  const [amountBntUsd, setAmountBntUsd] = useState('');
  const [amountTknUsd, setAmountTknUsd] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    loadSwapData(dispatch);
  }, [dispatch]);

  const isLoading = useAppSelector((state) => state.bancor.pools.length === 0);
  const pools = useAppSelector((state) => state.bancor.pools as Pool[]);
  const tokens = useAppSelector((state) => state.bancor.tokens as Token[]);

  const [tknUsdPrice, setTknUsdPrice] = useState<string | undefined>();

  const account = useAppSelector(
    (state) => state.bancor.user as string | undefined
  );

  const [selectedPool, setPool] = useState(
    pools.find(
      (pool) => pool.pool_dlt_id.toLowerCase() === anchor.toLowerCase()
    )
  );

  useEffect(() => {
    setPool(pools.find((pool) => pool.pool_dlt_id === anchor));
  }, [pools, anchor]);

  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const bntToken =
    tokens &&
    tokens.length > 0 &&
    tokens.find((token) => token.symbol === 'BNT');
  const tknTokenAddress =
    bntToken &&
    selectedPool?.reserves.find(
      (reserve) => reserve.address !== bntToken.address
    )?.address;
  const tknToken =
    (bntToken &&
      tknTokenAddress &&
      tokens.find((token) => token.address === tknTokenAddress)) ||
    false;

  const bntToTknRate =
    tknUsdPrice &&
    bntToken &&
    bntToken.usdPrice &&
    new BigNumber(bntToken.usdPrice).div(tknUsdPrice).toFixed(6);

  const bntToTknRateToUsd =
    (bntToTknRate &&
      prettifyNumber(
        new BigNumber(bntToTknRate).times((bntToken as Token).usdPrice!),
        true
      )) ||
    false;

  if (!isValidAnchor) return <div>Invalid Anchor!</div>;

  const addLiquidity = async (skipApproval: boolean) => {};

  if (
    isLoading ||
    typeof selectedPool === 'undefined' ||
    !tokens ||
    tokens.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    (
      <div className="widget">
        <ModalApprove
          isOpen={showModal}
          setIsOpen={setShowModal}
          amount={'amount'}
          fromToken={tknToken as Token}
          handleApproved={() => addLiquidity(true)}
          waitForApproval={true}
        />
        <div className="flex justify-between p-14">
          <SwapSwitch />
          <div className="text-center">
            <h1 className="font-bold">Add Liquidity </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-10 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <IconTimes className="w-14" />
          </button>
        </div>

        <div>
          <div className="p-10 text-blue-4 flex ">
            <div className="rounded-full mx-12 border border-primary-light text-blue-primary h-24 w-24 flex items-center justify-center">
              1
            </div>

            <div>Please enter the token prices</div>
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl ml-10">1 BNT = </h1>
              <input
                disabled={true}
                value={
                  (bntToken &&
                    bntToken.usdPrice &&
                    prettifyNumber(bntToken.usdPrice, true)) ||
                  ''
                }
                className="border-blue-0 border-2 text-right rounded mr-10 py-10"
                type="text"
              />
            </div>
            <div>
              <h1 className="text-2xl ml-10">
                1 {tknToken && tknToken.symbol} ={' '}
              </h1>
              <input
                className="border-blue-0 border-2 text-right rounded px-4 py-10"
                type="text"
                value={tknUsdPrice}
                onChange={(e) => setTknUsdPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="p-10 text-grey-4">
            1 BNT (
            {bntToken &&
              bntToken.usdPrice &&
              prettifyNumber(bntToken.usdPrice, true)}
            ) = {bntToTknRate} ETH ({bntToTknRateToUsd})
          </div>

          <div className="rounded-lg bg-blue-0 rounded p-20">
            <div className="flex justify-start">
              <div className="rounded-full mx-12 bg-white h-24 w-24 flex items-center justify-center">
                2
              </div>
              <div className="text-grey-3">Enter stake amount</div>
            </div>{' '}
            <div className="p-10">
              <TokenInputField
                setInput={setAmountBnt}
                selectable={false}
                input={amountBnt}
                token={bntToken! as Token}
                amountUsd={amountBntUsd}
                setAmountUsd={setAmountBntUsd}
              />
            </div>
            <div className="p-10">
              <TokenInputField
                setInput={setAmountTkn}
                selectable={false}
                input={amountTkn}
                token={tknToken! as Token}
                amountUsd={amountTknUsd}
                setAmountUsd={setAmountTknUsd}
              />
            </div>
            <div className="mb-10">
              I understand that I am adding dual sided liquidity to the pool
              <input
                type="checkbox"
                className=" checked:bg-blue-600 checked:border-transparent"
              />
            </div>
            <button
              onClick={() => {
                addLiquidity(true);
              }}
              className={`btn-primary rounded w-full`}
              disabled={false}
            >
              Add Protection
            </button>
          </div>
        </div>
      </div>
    ) || <div>Invalid anchor!</div>
  );
};
