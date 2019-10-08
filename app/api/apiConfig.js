export const blockTradesAPIs = {
    BASE: "https://api.blocktrades.us/v2",
    // BASE_OL: "https://api.blocktrades.us/ol/v2",
    BASE_OL: "https://ol-api1.openledger.info/api/v0/ol/support",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount"
};

export const rudexAPIs = {
    BASE: "https://gateway.rudex.org/api/v0_1",
    COINS_LIST: "/coins",
    NEW_DEPOSIT_ADDRESS: "/new-deposit-address"
};

export const settingsAPIs = {
    DEFAULT_WS_NODE: "ws://47.105.69.124:9090",
    WS_NODE_LIST: [
        {url: "ws://47.97.8.71:9090", location: "上海／ShangHai"},
        {url: "ws://47.105.69.124:9090", location: "青岛／Qindao"},
        {url: "ws://139.162.51.89:9090", location: "新加坡／Singapore"}

    ],
    DEFAULT_FAUCET: "http://47.105.69.124",
    // DEFAULT_FAUCET: "https://finchain-faucet.com",
    TESTNET_FAUCET: "https://finchain-faucet.com",
    RPC_URL: "https://openledger.info/api/"
};
