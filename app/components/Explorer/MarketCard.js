import React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import market_utils from "common/market_utils";
import {Apis} from "bitsharesjs-ws";
import {browserHistory} from "react-router";
import Translate from "react-translate-component";
import utils from "common/utils";

class MarketCard extends React.Component {
    static propTypes = {
        quoteAsset: ChainTypes.ChainAsset.isRequired,
        baseAsset: ChainTypes.ChainAsset.isRequired
    };


    constructor() {
        super();
        this.state = {
            sub: null,
            latestPrice: 0,
            change: 0,
            // volumeBase: 0,
            high: 0,
            low: 0,
            volumeQuote: 0
        };
        this._subToMarket = this._subToMarket.bind(this);
    }

    componentWillMount() {
        if (this.props.quoteAsset.toJS && this.props.baseAsset.toJS) {
            this._subToMarket(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quoteAsset && nextProps.baseAsset) {
            if (!this.state.sub) {
                Apis.instance().db_api().exec("subscribe_to_market", [
                    this.subscription, nextProps.baseAsset.get("id"), nextProps.quoteAsset.get("id")
                ]).catch((error) => {
                    console.error(`Error in SubscribeMarket: ${nextProps.quoteAsset.get('symbol')}_${nextProps.baseAsset.get('symbol')}`);
                });
                return this._subToMarket(nextProps);
            }
        }

        if (nextProps.quoteAsset.get("symbol") !== this.props.quoteAsset.get("symbol") || nextProps.baseAsset.get("symbol") !== this.props.baseAsset.get("symbol")) {
            let currentSub = this.state.sub.split("_");
            this.unSubscribeMarket(currentSub[0], currentSub[1]);
            return this._subToMarket(nextProps);
        }
    }

    componentWillUnmount() {
        let { quoteAsset, baseAsset } = this.props;
        this.unSubscribeMarket(quoteAsset, baseAsset);
    }

    unSubscribeMarket(quoteAsset, baseAsset) {
        Apis.instance().db_api().exec("unsubscribe_from_market", [
            this.subscription, quoteAsset.get('id'), baseAsset.get('id')
        ]).catch((error) => {
            console.error(`Error in unSubscribeMarket: ${quoteAsset.get('symbol')}_${baseAsset.get('symbol')}`);
        });
    }

    subscription(result) {
        this._subToMarket(this.props);
    }

    _subToMarket(props) {
        let { quoteAsset, baseAsset } = props;

        if (quoteAsset.get("id") && baseAsset.get("id")) {
            let endDate = new Date();
            let startDateShort = new Date();
            startDateShort = new Date(startDateShort.getTime() - 3600 * 50 * 1000);
            endDate.setDate(endDate.getDate() + 1);
            Promise.all([
                Apis.instance().history_api().exec("get_fill_order_history", [baseAsset.get("id"), quoteAsset.get("id"), 1]),
                Apis.instance().history_api().exec("get_market_history", [
                    baseAsset.get("id"), quoteAsset.get("id"), 3600, startDateShort.toISOString().slice(0, -5), endDate.toISOString().slice(0, -5)
                ])
            ])
            .then((results) => {
                const latest = results[0][0].op;
                latest.time = results[0][0].time
                let paysAsset, receivesAsset, isAsk = false;
                if (latest.pays.asset_id === baseAsset.get("id")) {
                    paysAsset = baseAsset;
                    receivesAsset = quoteAsset;
                    isAsk = true;
                } else {
                    paysAsset = quoteAsset;
                    receivesAsset = baseAsset;
                }
                let flipped = baseAsset.get("id").split(".")[2] > quoteAsset.get("id").split(".")[2];
                const latestPrice = market_utils.parse_order_history(latest, paysAsset, receivesAsset, isAsk, flipped).full;

                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                yesterday = yesterday.getTime();
                let volumeQuote = 0,
                    // volumeBase = 0,
                    change = 0,
                    last = {close_quote: null, close_base: null},
                    invert,
                    high = 0,
                    low = 0,
                    _high = 0,
                    _low = 0,
                    open = 0,
                    close = 0,
                    noTrades = true;

                function findMax(a, b) {
                    if (a !== Infinity && b !== Infinity) {
                        return Math.max(a, b);
                    } else if (a === Infinity) {
                        return b;
                    } else {
                        return a;
                    }
                }

                if (results[1].length) {
                    let first;
                    results[1].forEach((bucket, i) => {
                        let date = new Date(bucket.key.open + "+00:00").getTime();
                        if (date > yesterday) {
                            noTrades = false;
                            if (quoteAsset.get("id") === bucket.key.quote) {
                                _high = utils.get_asset_price(bucket.high_base, baseAsset, bucket.high_quote, quoteAsset);
                                _low = utils.get_asset_price(bucket.low_base, baseAsset, bucket.low_quote, quoteAsset);
                                open = utils.get_asset_price(bucket.open_base, baseAsset, bucket.open_quote, quoteAsset);
                                close = utils.get_asset_price(bucket.close_base, baseAsset, bucket.close_quote, quoteAsset);
                            } else {
                                _high = utils.get_asset_price(bucket.low_quote, baseAsset, bucket.low_base, quoteAsset);
                                _low = utils.get_asset_price(bucket.high_quote, baseAsset, bucket.high_base, quoteAsset);
                                open = utils.get_asset_price(bucket.open_quote, baseAsset, bucket.open_base, quoteAsset);
                                close = utils.get_asset_price(bucket.close_quote, baseAsset, bucket.close_base, quoteAsset);
                            }
                            if (isNaN(high) || high === Infinity) {
                                high = findMax(open, close);
                            }
                            if (high > 1.3 * ((open + close) / 2)) {
                                high = findMax(open, close);
                            }
                            if (_high > high) high = _high;
                            if (low == 0 || _low < low) low = _low;

                            if (!first) {
                                first = results[1][i > 0 ? i - 1 : i];
                                invert = first.key.base === baseAsset.get("id");
                            }
                            if (invert) {
                                // volumeBase += parseInt(bucket.base_volume, 10);
                                volumeQuote += parseInt(bucket.quote_volume, 10);
                            } else {
                                volumeQuote += parseInt(bucket.base_volume, 10);
                                // volumeBase += parseInt(bucket.quote_volume, 10);
                            }
                        }
                    });
                    // volumeBase = utils.get_asset_amount(volumeBase, baseAsset);
                    volumeQuote = utils.get_asset_amount(volumeQuote, quoteAsset);
                    if (!first) {
                        first = results[1][0];
                    }
                    last = results[1][results[1].length -1];
                    /* Some market histories have 0 value for price values, set to 1 in that case */
                    function removeZeros(entry) {
                        for (let key in entry) {
                            if (key.indexOf("volume") === -1 && entry[key] === 0) {
                                entry[key] = 1;
                            }
                        }
                    }
                    removeZeros(last);
                    removeZeros(first);

                    let open, close;
                    if (invert) {
                        open = utils.get_asset_price(first.open_quote, quoteAsset, first.open_base, baseAsset, invert);
                        close = utils.get_asset_price(last.close_quote, quoteAsset, last.close_base, baseAsset, invert);
                    } else {
                        open = utils.get_asset_price(first.open_quote, baseAsset, first.open_base, quoteAsset, invert);
                        close = utils.get_asset_price(last.close_quote, baseAsset, last.close_base, quoteAsset, invert);
                    }

                    change = noTrades ? 0 : Math.round(10000 * (close - open) / open) / 100;
                    if (!isFinite(change) || isNaN(change)) {
                        change = 0;
                    }
                }
                this.setState({
                    latestPrice,
                    change: change.toFixed(2),
                    // volumeBase,
                    volumeQuote,
                    high,
                    low,
                    sub: `${quoteAsset.get("id")}_${baseAsset.get("id")}`
                })
            }).catch((error) => {
                console.error(`Error in subscribeMarket ${quoteAsset.get("symbol")}_${baseAsset.get("symbol")}:`, error);
            });
        }
    }

    clickHandler() {
        browserHistory.push(`/market/${this.props.quoteAsset.get('symbol')}_${this.props.baseAsset.get('symbol')}`)
    }

    render() {
        const { quoteAsset, baseAsset } = this.props;
        return(
            <tr>
                <td>{`${quoteAsset.get('symbol')}/${baseAsset.get('symbol')}`}</td>
                <td>{utils.price_text(this.state.latestPrice, quoteAsset, baseAsset)}</td>
                <td><span className={this.state.change >= 0 ? "c4" : "c3"}>  {this.state.change > 0 ? `+${this.state.change}` : `${this.state.change}` }%</span> </td>
                <td>{this.state.low.toFixed(2)}</td>
                <td>{this.state.high.toFixed(2)}</td>
                <td>{utils.format_volume(this.state.volumeQuote)}</td>
                <td><button className='button' onClick={this.clickHandler.bind(this)}>去交易</button></td>
            </tr>
        )
    }
}

MarketCard = BindToChainState(MarketCard, {keep_updating: true, show_loader: true});

export default MarketCard;
