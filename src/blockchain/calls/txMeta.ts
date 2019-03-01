import { BigNumber } from 'bignumber.js';
import { OfferType } from '../../exchange/orderbook/orderbook';

export enum TxMetaKind {
  cancel = 'cancel',
  offerMake = 'offerMake',
  approveWallet = 'approveWallet',
  disapproveWallet = 'disapproveWallet',
  wrap = 'wrap',
  unwrap = 'unwrap',
  instantOrder = 'instantOrder',
}

export type TxMeta = {
  description: string
} & (
{
  kind: TxMetaKind.cancel,
  offerId: BigNumber,
} | {
  kind: TxMetaKind.offerMake,
  act: OfferType,
  baseAmount: BigNumber,
  baseToken: string,
  quoteAmount: BigNumber,
  quoteToken: string,
  price: BigNumber,
} | {
  kind: TxMetaKind.approveWallet,
  token: string
} | {
  kind: TxMetaKind.disapproveWallet,
  token: string
} | {
  kind: TxMetaKind.wrap,
  amount: BigNumber,
} | {
  kind: TxMetaKind.unwrap,
  amount: BigNumber,
} | {
  kind: TxMetaKind.instantOrder,
  buyAmount: BigNumber,
  sellAmount: BigNumber,
  buyToken: string,
  sellToken: string,
});