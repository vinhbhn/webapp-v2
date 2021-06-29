import { AbiItem } from 'web3-utils';

export const ABILiquidityProtectionSettings: AbiItem[] = [
  {
    inputs: [
      { internalType: 'contract IERC20Token', name: 'token', type: 'address' },
      {
        internalType: 'contract IContractRegistry',
        name: 'registry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20Token',
        name: 'reserveToken',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'disabled', type: 'bool' },
    ],
    name: 'AddLiquidityDisabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'prevAverageRateMaxDeviation',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newAverageRateMaxDeviation',
        type: 'uint32',
      },
    ],
    name: 'AverageRateMaxDeviationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prevDefault',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDefault',
        type: 'uint256',
      },
    ],
    name: 'DefaultNetworkTokenMintingLimitUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prevLockDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLockDuration',
        type: 'uint256',
      },
    ],
    name: 'LockDurationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prevMinNetworkCompensation',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMinNetworkCompensation',
        type: 'uint256',
      },
    ],
    name: 'MinNetworkCompensationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prevMin',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMin',
        type: 'uint256',
      },
    ],
    name: 'MinNetworkTokenLiquidityForMintingUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prevLimit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLimit',
        type: 'uint256',
      },
    ],
    name: 'NetworkTokenMintingLimitUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_prevOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'added', type: 'bool' },
    ],
    name: 'PoolWhitelistUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prevMinProtectionDelay',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMinProtectionDelay',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prevMaxProtectionDelay',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMaxProtectionDelay',
        type: 'uint256',
      },
    ],
    name: 'ProtectionDelaysUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract ILiquidityProtectionEventsSubscriber',
        name: 'subscriber',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'added', type: 'bool' },
    ],
    name: 'SubscriberUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROLE_OWNER',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
      {
        internalType: 'contract IERC20Token',
        name: 'reserveToken',
        type: 'address',
      },
    ],
    name: 'addLiquidityDisabled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
    ],
    name: 'addPoolToWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILiquidityProtectionEventsSubscriber',
        name: 'subscriber',
        type: 'address',
      },
    ],
    name: 'addSubscriber',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'averageRateMaxDeviation',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'defaultNetworkTokenMintingLimit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
      {
        internalType: 'contract IERC20Token',
        name: 'reserveToken',
        type: 'address',
      },
      { internalType: 'bool', name: 'disable', type: 'bool' },
    ],
    name: 'disableAddLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
    ],
    name: 'isPoolSupported',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
    ],
    name: 'isPoolWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lockDuration',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxProtectionDelay',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minNetworkCompensation',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minNetworkTokenLiquidityForMinting',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minProtectionDelay',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'networkToken',
    outputs: [
      { internalType: 'contract IERC20Token', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
    ],
    name: 'networkTokenMintingLimits',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'newOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'onlyOwnerCanUpdateRegistry',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolWhitelist',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'prevRegistry',
    outputs: [
      { internalType: 'contract IContractRegistry', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'registry',
    outputs: [
      { internalType: 'contract IContractRegistry', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
    ],
    name: 'removePoolFromWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILiquidityProtectionEventsSubscriber',
        name: 'subscriber',
        type: 'address',
      },
    ],
    name: 'removeSubscriber',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'restoreRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_onlyOwnerCanUpdateRegistry',
        type: 'bool',
      },
    ],
    name: 'restrictRegistryUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'deviation', type: 'uint32' }],
    name: 'setAverageRateMaxDeviation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'setDefaultNetworkTokenMintingLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'duration', type: 'uint256' }],
    name: 'setLockDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'setMinNetworkCompensation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'setMinNetworkTokenLiquidityForMinting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IConverterAnchor',
        name: 'poolAnchor',
        type: 'address',
      },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'setNetworkTokenMintingLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minDelay', type: 'uint256' },
      { internalType: 'uint256', name: 'maxDelay', type: 'uint256' },
    ],
    name: 'setProtectionDelays',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'subscribers',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'updateRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
