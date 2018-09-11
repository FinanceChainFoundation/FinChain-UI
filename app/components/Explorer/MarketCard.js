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
                    noTrades = true;

                if (results[1].length) {
                    let first;
                    results[1].forEach((bucket, i) => {
                        let date = new Date(bucket.key.open + "+00:00").getTime();
                        if (date > yesterday) {
                            noTrades = false;
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
        const { quoteAsset, baseAsset, logo } = this.props;
        return(
            <div className="my-l" onClick={this.clickHandler.bind(this)}>
                <div className="my-l-img">
                    <img src={logo} alt='asset logo'/>
                </div>
                <div className="my-l-txt">
                    <p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>{`${quoteAsset.get('symbol')}/${baseAsset.get('symbol')}`}</p>
                    <div> <p><Translate content="All_increase.trade_jg" /></p>   &nbsp;<p className="c1">{utils.price_text(this.state.latestPrice, quoteAsset, baseAsset)}</p></div>
                    <div> <p><Translate content="All_increase.trade_sl" /></p>   <p className="c2">{utils.format_volume(this.state.volumeQuote)}</p> </div>
                    <div> <p><Translate content="All_increase.trade_zdf" /></p>    <p className={this.state.change >= 0 ? "c4" : "c3"}>  {this.state.change > 0 ? `+${this.state.change}` : `${this.state.change}` }%</p> </div>
                </div>
            </div>
        )
    }
}

MarketCard = BindToChainState(MarketCard, {keep_updating: true, show_loader: true});

export default MarketCard;
