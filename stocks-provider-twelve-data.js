class StocksProviderTwelveData extends StocksProvider {

    getAllStocks(allStocksCallback) {
        $.ajax({
            url: "https://api.twelvedata.com/stocks",
            type: "GET",
            dataType: "json",
            success: (data) => {
                console.log(data);
                allStocksCallback(data.data);
            },
            error: (err) => {
                alert("An error occured creating record for saved tickers: " + err);
            }
        });
    }


    loadSelectedStocksData(stocksSymbols, stocksDataCallback) {
        var timeRange = $('#time-range-select').val();
        var outputSize = this.getOutputSizeFromTimeRange(timeRange);
        var url = "https://api.twelvedata.com/time_series?symbol=" + stocksSymbols.join(",");
        url = url + "&interval=1day&outputsize=" + outputSize + "&format=JSON&apikey=" + twelve_data_api_key;

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: (data) => {
                console.log(data);
                stocksDataCallback(this.convert(data));
            },
            error: (err) => {
                alert("An error occured creating record for saved tickers: " + err);
            }
        });
    }


    getOutputSizeFromTimeRange(timeRange) {
        switch (timeRange) {
            case "1m":
                return 30;
                break;
            case "2m":
                return 60;
                break;
            case "6m":
                return 180;
                break;
            case "1y":
                return 365;
                break;
            case "2y":
                return 730;
                break;
            case "5y": 
                return 1825;
                break;
            case "10y":
                return 3650;
                break;
            default:
                return 30;
        }
    }

    convert(data) {
        var converted = {};

        for (const symbol in data) {
            if (typeof data[symbol].values !== 'undefined') {
                converted[symbol] = {
                    quote: data[symbol].meta,
                    chart: this.convertValues(data[symbol].values)
                }
            }
        };

        return converted;
    }

    convertValues(values) {

        var values =  values.map((val) => {
            return {
                close: val.close,
                date: val.datetime
            }
        });

        var sortedValues = values.sort((a,b) => {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);

            return dateA - dateB;
        });

        return sortedValues;
    }
}