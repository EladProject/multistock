
var g_selectedStocksSymbols = null;
var g_db = DBFactory.getDB();
var g_stocksProvider = StocksProviderFactory.getStocksProvider();

async function init() {

	await g_db.init();

	g_stocksProvider.getAllStocks(function(allStocks) {
		setStocksList(allStocks);
	    g_db.loadSelectedStocks(setSelectedStocks);
	});

	$('#all-stocks-list').on('change', function(e) {
		selectedStocks = $('#all-stocks-list').select2('data');
		g_selectedStocksSymbols = selectedStocks.map(function(currStock) {
	        return currStock.id;
	    })
		g_db.saveSelectedStocks(g_selectedStocksSymbols);
		loadAndChartSelectedStocks();
	});
}

function setStocksList(allStocks) {
	var data = $.map(allStocks, function (stockData) {
			
		obj = {
			id: stockData["symbol"],
			text: stockData["name"]
		};

		return obj;
	});
	
	$('#all-stocks-list').select2({
		"data": data
	});
	
}

function timeRangeChanged(evt) {
	loadAndChartSelectedStocks();
}

function setSelectedStocks(selectedStockSymbols) {
	g_selectedStocksSymbols = selectedStockSymbols;
    $('#all-stocks-list').val(selectedStockSymbols);
    $('#all-stocks-list').trigger('change');
}

function loadAndChartSelectedStocks() {
	g_stocksProvider.loadSelectedStocksData(g_selectedStocksSymbols, function(stocksData) {
		chartStocks(stocksData);
	});
}