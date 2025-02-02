import {
  addNotification,
  BaseNotification,
  NotificationType,
} from 'redux/notification/notification';
import { Token } from 'services/observables/tokens';

const showNotification = (notification: BaseNotification, dispatch: any) =>
  dispatch(addNotification(notification));

export const rejectNotification = (dispatch: any) =>
  showNotification(
    {
      type: NotificationType.error,
      title: 'Transaction Rejected',
      msg: 'You rejected the trade. If this was by mistake, please try again.',
    },
    dispatch
  );

export const stakeNotification = (
  dispatch: any,
  amount: string,
  txHash: string
) =>
  showNotification(
    {
      type: NotificationType.pending,
      title: 'Pending Confirmation',
      msg: 'Staking vBNT is pending confirmation',
      txHash,
      updatedInfo: {
        successTitle: 'Success!',
        successMsg: `Your stake of ${amount} vBNT has been confirmed`,
        errorTitle: 'Transaction Failed',
        errorMsg: `Staking ${amount} vBNT had failed. Please try again or contact support.`,
      },
    },
    dispatch
  );

export const unstakeNotification = (
  dispatch: any,
  amount: string,
  txHash: string
) =>
  showNotification(
    {
      type: NotificationType.pending,
      title: 'Pending Confirmation',
      msg: 'Unstaking vBNT is pending confirmation',
      txHash,
      updatedInfo: {
        successTitle: 'Success!',
        successMsg: `Unstaking ${amount} vBNT has been confirmed`,
        errorTitle: 'Transaction Failed',
        errorMsg: `Unstaking ${amount} vBNT had failed. Please try again or contact support.`,
      },
    },
    dispatch
  );

export const stakeFailedNotification = (dispatch: any, amount: string) =>
  showNotification(
    {
      type: NotificationType.error,
      title: 'Transaction Failed',
      msg: `Staking ${amount} vBNT had failed. Please try again or contact support.`,
    },
    dispatch
  );

export const unstakeFailedNotification = (dispatch: any, amount: string) =>
  showNotification(
    {
      type: NotificationType.error,
      title: 'Transaction Failed',
      msg: `Staking ${amount} vBNT had failed. Please try again or contact support.`,
    },
    dispatch
  );

export const swapNotification = (
  dispatch: any,
  fromToken: Token,
  toToken: Token,
  fromAmount: string,
  toAmount: string,
  txHash: string
) =>
  showNotification(
    {
      type: NotificationType.pending,
      title: 'Pending Confirmation',
      msg: `Trading ${fromAmount} ${fromToken.symbol} is Pending Confirmation`,
      updatedInfo: {
        successTitle: 'Success!',
        successMsg: `Your trade ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} has been confirmed`,
        errorTitle: 'Transaction Failed',
        errorMsg: `Trading ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} had failed. Please try again or contact support`,
      },
      txHash,
    },
    dispatch
  );

export const swapFailedNotification = (
  dispatch: any,
  fromToken: Token,
  toToken: Token,
  fromAmount: string,
  toAmount: string
) =>
  showNotification(
    {
      type: NotificationType.error,
      title: 'Transaction Failed',
      msg: `Trading ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} had failed. Please try again or contact support`,
    },
    dispatch
  );

export const poolExistNotification = (dispatch: any) =>
  showNotification(
    {
      type: NotificationType.error,
      title: 'Pool Already exist',
      msg: `The pool already exists on Bancor`,
    },
    dispatch
  );

export const poolCreateNotification = (dispatch: any, txHash: string) =>
  showNotification(
    {
      type: NotificationType.pending,
      title: 'Pending Confirmation',
      msg: 'Creating pool is pending confirmation',
      txHash,
      updatedInfo: {
        successTitle: 'Success!',
        successMsg: 'Your pool was successfully created',
        errorTitle: 'Creating Pool Failed',
        errorMsg: 'Fail creating pool. Please try again or contact support.',
      },
    },
    dispatch
  );

export const ownershipNotification = (dispatch: any, txHash: string) =>
  showNotification(
    {
      type: NotificationType.pending,
      title: 'Pending Confirmation',
      msg: 'Accepting ownership is pending confirmation',
      txHash,
      updatedInfo: {
        successTitle: 'Success!',
        successMsg: 'Ownership Accepted',
        errorTitle: 'Ownership Failed',
        errorMsg:
          'Failed accepting ownership. Please try again or contact support.',
      },
    },
    dispatch
  );

export const setFeeNotification = (dispatch: any, txHash: string) =>
  showNotification(
    {
      type: NotificationType.pending,
      title: 'Pending Confirmation',
      msg: 'Setting convertion fee is pending confirmation',
      txHash,
      updatedInfo: {
        successTitle: 'Success!',
        successMsg: 'Conversion fee has been set',
        errorTitle: 'Conversion fee failed',
        errorMsg:
          'conversion fee setting failed. Please try again or contact support.',
      },
    },
    dispatch
  );

export const poolFailedNotification = (dispatch: any) =>
  showNotification(
    {
      type: NotificationType.error,
      title: 'Creating Pool Failed',
      msg: `Fail creating pool. Please try again or contact support.`,
    },
    dispatch
  );
