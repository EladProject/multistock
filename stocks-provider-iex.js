class StocksProviderIEx extends StocksProvider {
    static iexDataCallback = null;

    getAllStocks(allStocksCallback) {
        StocksProvider.iexDataCallback = allStocksCallback;
        $.getScript("https://api.iextrading.com/1.0/ref-data/symbols?callback=StocksProviderIEx.jsonpCallback");
    }
    
    static jsonpCallback(stocksData) {
        console.log(stocksData);
        StocksProvider.iexDataCallback(stocksData);
    }
    
    loadSelectedStocksData(stocksSymbols, stocksDataCallback) {
        StocksProvider.iexDataCallback = stocksDataCallback;
        var timeRange = $('#time-range-select').val();
        var url = "https://cloud.iexapis.com/stable/stock/market/batch?symbols=" + stocksSymbols.join(",");
        url += "&types=quote,chart&range="+timeRange;
        url += "&callback=StocksProviderIEx.jsonpCallback&token=" + iex_api_token;
        $.getScript(url);
    }
}