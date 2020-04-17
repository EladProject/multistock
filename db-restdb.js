
class DBRestDB extends DB {
    constructor() {
        super();
        this.restdb_url = 'https://' + restdb_url + '.restdb.io/rest/stocks';
    }

    async init() {
        this.record_id = await this.getRecordID();
        if (!this.record_id) {
            this.record_id = await this.createRecord();
        }
    }

    async getRecordID() {
        console.log("Getting record ID for saved tickers");
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.restdb_url + '?q={"name": "saved_tickers_list"}',
                type: 'GET',
                headers: {
                    'x-apikey': restdb_api_key
                },
                success: (data) => {
                    console.log(data);
                    if (Array.isArray(data)) {
                        if (data.length > 1) {
                            alert("There are multiple objects for saved_tickers_list. Aborting");
                            throw Error("There are multiple objects for saved_tickers_list. Aborting");
                        }
                        else if (data.length == 1) {
                            resolve(data[0]._id);
                        }
                        else {
                            resolve(undefined);
                        }
                    } else {
                        alert("Invalid type returned. Aborting");
                        throw Error("Invalid type returned. Aborting");
                    }
                    
                },
                error: (err) => {
                    alert("An error occured loading selected stocks: " + err);
                    reject(err);
                }
            });
        });        
    }

    async createRecord() {
        console.log("Creating record for saved tickers");
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.restdb_url,
                type: "POST",
                headers: {
                    'x-apikey': restdb_api_key
                },
                dataType: "json",
                data: {
                    name: "saved_tickers_list",
                    tickers: []
                },
                success: (data) => {
                    console.log(data);
                    resolve(data._id);
                },
                error: (err) => {
                    alert("An error occured creating record for saved tickers: " + err);
                    reject(err);
                }
            });
        });
    }

    saveSelectedStocks(data) {
        console.log("Saving");
        $.ajax({
            url: this.restdb_url + '/' + this.record_id,
            type: 'PUT',
            contentType: 'application/json',
            headers: {
                'x-apikey': restdb_api_key
            },
            data: JSON.stringify({'selectedStocks': data}),
            success: (data) => {
                console.log(data);
            },
            error: (err) => {
                console.log(err.responseJSON);
            }
        });
    }


    loadSelectedStocks(callback) {
        $.ajax({
            url: this.restdb_url + '/' + this.record_id,
            type: 'GET',
            headers: {
                'x-apikey': restdb_api_key
            },
            success: (data) => {
            console.log(data);
            callback(data.selectedStocks);
            },
            error: (err) => {
            if (err.status == 422) {
                alert("There is no bin for selected stocks. Will not be able to persist them");
                callback({});
            }
            else
            alert("An error occured loading selected stocks");
                console.log(err.responseJSON);
            }
        });
    }    
}