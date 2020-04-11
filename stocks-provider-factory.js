class StocksProviderFactory {
    static getStocksProvider() {
        return new StocksProviderIEx();
    }
}