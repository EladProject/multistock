class StocksProvider {

    getAllStocks(allStocksCallback) {
        throw "Call 'getAllStocks' on abstract DB class";
    }
    
    loadSelectedStocksData(stocksSymbols, stocksDataCallback) {
        throw "Call 'loadSelectedStocksData' on abstract DB class";
    }
}