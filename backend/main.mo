import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Float "mo:base/Float";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor StockHolding {
  // Define the Stock type
  public type Stock = {
    symbol: Text;
    quantity: Nat;
    purchasePrice: Float;
  };

  // Use a stable variable to store the portfolio
  stable var portfolio: [Stock] = [];

  // Add a new stock to the portfolio
  public func addStock(symbol: Text, quantity: Nat, purchasePrice: Float) : async () {
    let newStock: Stock = {
      symbol = symbol;
      quantity = quantity;
      purchasePrice = purchasePrice;
    };
    portfolio := Array.append(portfolio, [newStock]);
  };

  // Update an existing stock in the portfolio
  public func updateStock(symbol: Text, newQuantity: Nat, newPurchasePrice: Float) : async () {
    portfolio := Array.map(portfolio, func (stock: Stock) : Stock {
      if (stock.symbol == symbol) {
        return {
          symbol = stock.symbol;
          quantity = newQuantity;
          purchasePrice = newPurchasePrice;
        };
      };
      stock
    });
  };

  // Get all stocks in the portfolio
  public query func getStocks() : async [Stock] {
    portfolio
  };

  // Calculate and return the total portfolio value
  public query func getPortfolioValue() : async Float {
    var totalValue: Float = 0;
    for (stock in portfolio.vals()) {
      totalValue += Float.fromInt(stock.quantity) * stock.purchasePrice;
    };
    totalValue
  };

  // Calculate and return the total profit/loss (assuming current price is purchase price)
  public query func getProfitLoss() : async Float {
    var profitLoss: Float = 0;
    for (stock in portfolio.vals()) {
      let currentValue = Float.fromInt(stock.quantity) * stock.purchasePrice;
      profitLoss += currentValue - (Float.fromInt(stock.quantity) * stock.purchasePrice);
    };
    profitLoss
  };
}