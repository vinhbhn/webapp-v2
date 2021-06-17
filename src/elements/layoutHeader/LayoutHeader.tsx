import 'elements/layoutHeader/LayoutHeader.css';
import bancorLogo from 'assets/logos/bancor.svg';
import { ReactComponent as IconWallet } from 'assets/icons/wallet.svg';
import { ReactComponent as IconBell } from 'assets/icons/bell.svg';
import { ReactComponent as IconCog } from 'assets/icons/cog.svg';

import { useState } from 'react';
import { WalletModal } from 'elements/walletModal/WalletModal';
import { useWeb3React } from '@web3-react/core';
import {
  getNetworkName,
  setAutoLogin,
  shortenString,
} from 'utils/pureFunctions';
import { EthNetworks } from 'web3/types';
import { FormattedMessage } from 'react-intl';

export const LayoutHeader = () => {
  const [isWalletOpen, setWalletOpen] = useState(false);
  const { account, deactivate, chainId } = useWeb3React();

  const connectButton = () => {
    if (account) {
      deactivate();
      setAutoLogin(false);
    } else setWalletOpen(true);
  };

  return (
    <div className="layout-header">
      <div className="layout-header-content">
        <div className="flex items-center">
          <a
            href="https://app.bancor.network"
            className="hover:underline text-12 text-primary mr-40"
          >
            <img src={bancorLogo} alt="Bancor Logo" className="h-24" />
            Go back to Bancor V2
          </a>
          <button className="btn-secondary btn-sm">
            <div
              className={`${
                !chainId || chainId === EthNetworks.Mainnet
                  ? 'bg-success'
                  : chainId === EthNetworks.Ropsten
                  ? 'bg-error'
                  : 'bg-warning'
              } w-6 h-6 rounded-full mr-10`}
            />
            {getNetworkName(chainId ? chainId : EthNetworks.Mainnet)}
          </button>
        </div>

        <div className="flex items-center">
          <button
            onClick={connectButton}
            className="btn-outline-secondary btn-sm"
          >
            <IconWallet className="-ml-14 mr-16 text-primary dark:text-primary-light w-[22px]" />

            {account ? (
              shortenString(account)
            ) : (
              <FormattedMessage id="connect_wallet" />
            )}
          </button>

          <WalletModal isOpen={isWalletOpen} setIsOpen={setWalletOpen} />

          <button className="ml-40">
            <IconBell className="w-[20px]" />
          </button>
          <span className="text-grey-3 text-20 mx-16">|</span>
          <button>
            <IconCog className="w-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
};
