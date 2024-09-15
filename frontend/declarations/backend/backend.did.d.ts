import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Stock {
  'purchasePrice' : number,
  'quantity' : bigint,
  'symbol' : string,
}
export interface _SERVICE {
  'addStock' : ActorMethod<[string, bigint, number], undefined>,
  'getPortfolioValue' : ActorMethod<[], number>,
  'getProfitLoss' : ActorMethod<[], number>,
  'getStocks' : ActorMethod<[], Array<Stock>>,
  'updateStock' : ActorMethod<[string, bigint, number], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
