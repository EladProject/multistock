# multistock 

MultiStocks is a simple, static, single page, **serverless** in-browser app to plot multiple normalized stock tickers.
It very easily shows the trends of you stock portfolio.

The software was designed to fulfill the following:
1) Plot multiple stock tickers on a single chart (this requires them to be normalized)
2) A portable html page that can be run from anywhere without a server
3) Selected stock list persistence

Since this is a serverless web page two problems arose:
1) How to persist the ticker list across machines?
   Using online simple (and free) storage solution like jsonbin or restdb.io

2) How to get stock data?
   I use iEx as a stock data provider. It supports JSONP which solves the CORS issue.
   This requires to get an API key from iEx and store it in credentials.js

These online providers require you to register to get API keys and set up.
Check the credentials.js.sample for a list (and example) of the required data.

