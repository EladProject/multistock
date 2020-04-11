# multistock 

MultiStocks is a simple, static, single page, **serverless** in-browser app to plot multiple normalized stock tickers.
It very easily shows the trends of you stock portfolio.

The software was designed to fulfill the following:
1) Free
2) Plot multiple stock tickers on a single chart
3) No server required
4) Allow to save the ticker list
5) A portable html page (with the containing dir) that can be run from any computer

Since this is a serverless web page two problems arose:
1) How to persist the ticker list across machines?
   For this I use a nifty storage solution called JSONBIN.io
   This requires to open a storage bin at JSONBIN and store its credentials in credentials.js

2) How to get stock data by overcoming CORS?
   I use iEx as a stock data provider. It supports JSONP which solves the CORS issue.
   This requires to get an API key from iEx and store it in credentials.js

As far as I know, and at least in the last two years as of writing this, both services where free.

