
class DBJsonBin extends DB {
    saveSelectedStocks(data) {
        console.log("Saving");
        $.ajax({
        url: 'https://api.jsonbin.io/b/' + jsonbin_selected_stocks_bin_id,
        type: 'PUT',
        contentType: 'application/json',
        headers: {
            'secret-key': jsonbin_key
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
            url: 'https://api.jsonbin.io/b/' + jsonbin_selected_stocks_bin_id + '/latest',
            type: 'GET',
            headers: {
            'secret-key': jsonbin_key
            },
            success: (data) => {
            console.log(data);
            callback(data.selectedStocks);
            },
            error: (err) => {
            if (err.status = 422) {
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

