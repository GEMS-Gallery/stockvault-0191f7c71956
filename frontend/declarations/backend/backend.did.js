export const idlFactory = ({ IDL }) => {
  const Stock = IDL.Record({
    'purchasePrice' : IDL.Float64,
    'quantity' : IDL.Nat,
    'symbol' : IDL.Text,
  });
  return IDL.Service({
    'addStock' : IDL.Func([IDL.Text, IDL.Nat, IDL.Float64], [], []),
    'getPortfolioValue' : IDL.Func([], [IDL.Float64], ['query']),
    'getProfitLoss' : IDL.Func([], [IDL.Float64], ['query']),
    'getStocks' : IDL.Func([], [IDL.Vec(Stock)], ['query']),
    'updateStock' : IDL.Func([IDL.Text, IDL.Nat, IDL.Float64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
