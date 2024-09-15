import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const stockForm = document.getElementById('stockForm');
    const portfolioTable = document.getElementById('portfolioTable').getElementsByTagName('tbody')[0];
    const totalValueSpan = document.getElementById('totalValue');
    const profitLossSpan = document.getElementById('profitLoss');

    stockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const symbol = document.getElementById('symbol').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);

        try {
            await backend.addStock(symbol, quantity, purchasePrice);
            await updatePortfolio();
            stockForm.reset();
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    });

    async function updatePortfolio() {
        try {
            const stocks = await backend.getStocks();
            const totalValue = await backend.getPortfolioValue();
            const profitLoss = await backend.getProfitLoss();

            // Clear existing rows
            portfolioTable.innerHTML = '';

            // Add new rows
            stocks.forEach(stock => {
                const row = portfolioTable.insertRow();
                row.insertCell(0).textContent = stock.symbol;
                row.insertCell(1).textContent = stock.quantity;
                row.insertCell(2).textContent = `$${stock.purchasePrice.toFixed(2)}`;
                const totalStockValue = stock.quantity * stock.purchasePrice;
                row.insertCell(3).textContent = `$${totalStockValue.toFixed(2)}`;
            });

            // Update summary
            totalValueSpan.textContent = totalValue.toFixed(2);
            profitLossSpan.textContent = profitLoss.toFixed(2);
            profitLossSpan.style.color = profitLoss >= 0 ? 'green' : 'red';
        } catch (error) {
            console.error('Error updating portfolio:', error);
        }
    }

    // Initial portfolio update
    await updatePortfolio();
});