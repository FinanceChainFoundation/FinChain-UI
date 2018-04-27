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
    DEFAULT_WS_NODE: "wss://fake.automatic-selection.com",
    WS_NODE_LIST: [
        {url: "ws://47.95.22.107:9090", location: "test"}

    ],
    DEFAULT_FAUCET: "http://47.95.22.107",
    TESTNET_FAUCET: "https://faucet.testnet.bitshares.eu",
    RPC_URL: "https://openledger.info/api/"
};
