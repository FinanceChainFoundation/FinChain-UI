import React from "react";
import { PropTypes } from "react";
import Ps from "perfect-scrollbar";
import utils from "common/utils";
import Translate from "react-translate-component";
import SettingsActions from "actions/SettingsActions";
import classnames from "classnames";
import PriceText from "../Utility/PriceText";
import TransitionWrapper from "../Utility/TransitionWrapper";
import AssetName from "../Utility/AssetName";

class OrderBookRowVertical extends React.Component {

	shouldComponentUpdate(nextProps) {
		if(nextProps.order.market_base !== this.props.order.market_base) return false;
		return(
			nextProps.order.ne(this.props.order) ||
			nextProps.index !== this.props.index
		);
	}

	render() {
		let {
			order,
			quote,
			base,
			quote1 = 4,
			final
		} = this.props;
		const isBid = order.isBid();
		const isCall = order.isCall();
		let integerClass = isCall ? "orderHistoryCall" : isBid ? "orderHistoryBid" : "orderHistoryAsk";
		let price = <PriceText price={order.getPrice()} quote={quote} base={base} />;
		return(
			<tr onClick={this.props.onClick} className={classnames({"final-row": final})}>
                <td style={{width:"30%"}} className={integerClass}>
                    {price}
                </td>

                <td style={{width:"30%"}}>{utils.format_number(order[isBid ? "amountToReceive" : "amountForSale"]().getAmount({real: true}), quote.get("precision"))}</td>
                {/*<td style={{width:"35%"}}>{utils.format_number(order[isBid ? "amountToReceive" : "amountForSale"]().getAmount({real: true}), quote1)}</td>*/}
                <td style={{width:"30%"}}>{utils.format_number(order[isBid ? "amountForSale" : "amountToReceive"]().getAmount({real: true}), base.get("precision"))}</td>
            </tr>
		);
	}
}

class OrderBookRowHorizontal extends React.Component {
	shouldComponentUpdate(np) {
		return(
			np.order.ne(this.props.order) ||
			np.position !== this.props.position ||
			np.index !== this.props.index
		);
	}

	render() {
		let {
			order,
			quote,
			base,
			position
		} = this.props;
		const isBid = order.isBid();
		const isCall = order.isCall();

		let integerClass = isCall ? "orderHistoryCall" : isBid ? "orderHistoryBid" : "orderHistoryAsk";

		let price = <PriceText price={order.getPrice()} quote={quote} base={base} />;
		let amount = isBid ?
			utils.format_number(order.amountToReceive().getAmount({
				real: true
			}), quote.get("precision")) :
			utils.format_number(order.amountForSale().getAmount({
				real: true
			}), quote.get("precision"));
		let value = isBid ?
			utils.format_number(order.amountForSale().getAmount({
				real: true
			}), base.get("precision")) :
			utils.format_number(order.amountToReceive().getAmount({
				real: true
			}), base.get("precision"));
		let total = isBid ?
			utils.format_number(order.totalForSale().getAmount({
				real: true
			}), base.get("precision")) :
			utils.format_number(order.totalToReceive().getAmount({
				real: true
			}), base.get("precision"));

		return(
			<tr onClick={this.props.onClick} >
            	<td className={integerClass}>
                    {price}
                </td>
                <td>{amount}</td>
                <td >{value}</td>
                <td>{total}</td>
                {/*{position === "left" ? <td>{total}</td> :
                <td style={{width: "25%"}} className={integerClass}>
                    {price}
                </td>
                }
                <td>{position === "left" ? value : amount}</td>
                <td>{position === "left" ? amount : value}</td>
                {position === "right" ? <td>{total}</td> :
                <td style={{width: "25%"}} className={integerClass}>
                    {price}
                </td>
                }*/}
            </tr>
		);

	}
}

class OrderBook extends React.Component {
	constructor(props) {
		super();
		this.state = {
			scrollToBottom: true,
			flip: props.flipOrderBook,
			showAllBids: false,
			showAllAsks: false,
			rowCount: 20
		};

		this._updateHeight = this._updateHeight.bind(this);
	}

	// shouldComponentUpdate(nextProps, nextState) {
	//     console.log("calls changed:", !Immutable.is(nextProps.calls, this.props.calls), nextProps.calls && nextProps.calls.toJS(), this.props.calls && this.props.calls.toJS());
	//     const callsChanged = didOrdersChange(nextProps.calls, this.props.calls);
	//     const limitsChanged = didOrdersChange(nextProps.orders, this.props.orders);
	//     console.log("callsChanged:", callsChanged, "limitsChanged", limitsChanged);
	//     return (
	//         !Immutable.is(nextProps.orders, this.props.orders) ||
	//         !Immutable.is(nextProps.calls, this.props.calls) ||
	//         nextProps.horizontal !== this.props.horizontal ||
	//         !utils.are_equal_shallow(nextProps.latest, this.props.latest) ||
	//         nextProps.smallScreen !== this.props.smallScreen ||
	//         nextProps.wrapperClass !== this.props.wrapperClass ||
	//         !utils.are_equal_shallow(nextState, this.state)
	//     );
	// }

	componentWillReceiveProps(nextProps) {
		if(!nextProps.marketReady) {
			this.setState({
				scrollToBottom: true
			});
		}

		// Change of market or direction
		if(nextProps.base.get("id") !== this.props.base.get("id") || nextProps.quote.get("id") !== this.props.quote.get("id")) {
			this.setState({
				scrollToBottom: true
			});

			if(this.refs.askTransition) {
				this.refs.askTransition.resetAnimation();
				if(this.refs.hor_asks) this.refs.hor_asks.scrollTop = 0;
				if(this.refs.hor_bids) this.refs.hor_bids.scrollTop = 0;
			}

			if(this.refs.bidTransition) {
				this.refs.bidTransition.resetAnimation();
			}

			if(this.refs.vert_bids) this.refs.vert_bids.scrollTop = 0;
		}

		if(!utils.are_equal_shallow(nextProps.combinedAsks, this.props.combinedAsks) ||
			!utils.are_equal_shallow(nextProps.combinedBids, this.props.combinedBids)
		) {
			this.setState({}, () => {
				this.psUpdate();
			});
		}
	}

	_updateHeight() {
		if(!this.props.horizontal) {
			let containerHeight = this.refs.orderbook_container.offsetHeight;
			let priceHeight = this.refs.center_text.offsetHeight;
			let asksHeight = this.refs.asksWrapper.offsetHeight;
			let newAsksHeight = Math.floor((containerHeight - priceHeight) / 2);
			let newBidsHeight = containerHeight - priceHeight - asksHeight - 2;
			if(newAsksHeight !== this.state.vertAsksHeight || newBidsHeight !== this.state.vertBidsHeight) {
				this.setState({
					vertAsksHeight: newAsksHeight,
					vertBidsHeight: newBidsHeight
				}, this.psUpdate);
			}

		}
	}

	componentWillMount() {
		window.addEventListener("resize", this._updateHeight, {
			capture: false,
			passive: true
		});
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this._updateHeight);
	}

	componentDidMount() {

		if(!this.props.horizontal) {
			this._updateHeight();

			let asksContainer = this.refs.vert_asks;
			Ps.initialize(asksContainer);
			let bidsContainer = this.refs.vert_bids;
			Ps.initialize(bidsContainer);
		} else {
			let bidsContainer = this.refs.hor_bids;
			Ps.initialize(bidsContainer);
			let asksContainer = this.refs.hor_asks;
			Ps.initialize(asksContainer);
		}

	}

	psUpdate() {
		if(!this.props.horizontal) {
			let asksContainer = this.refs.vert_asks;
			Ps.update(asksContainer);
			if(this.state.scrollToBottom) {
				asksContainer.scrollTop = asksContainer.scrollHeight;
			};
			let bidsContainer = this.refs.vert_bids;
			Ps.update(bidsContainer);
		} else {
			let bidsContainer = this.refs.hor_bids;
			Ps.update(bidsContainer);
			let asksContainer = this.refs.hor_asks;
			Ps.update(asksContainer);
		}
	}

	componentDidUpdate() {
		this._updateHeight();
	}

	_onBidScroll(e) {

		if(e.target.scrollTop < (e.target.scrollHeight - this.state.vertAsksHeight)) {
			if(this.state.scrollToBottom) {
				this.setState({
					scrollToBottom: false
				});
			}
		} else {
			this.setState({
				scrollToBottom: false
			});
		}
	}

	_flipBuySell() {
		SettingsActions.changeViewSetting({
			flipOrderBook: !this.state.flip
		});

		this.setState({
			flip: !this.state.flip
		});
	}

	_onToggleShowAll(type) {
		if(type === "asks") {
			this.setState({
				showAllAsks: !this.state.showAllAsks
			});

			if(this.state.showAllAsks) {
				this.refs.hor_asks.scrollTop = 0;
			}

		} else {
			this.setState({
				showAllBids: !this.state.showAllBids
			});

			if(this.state.showAllBids) {
				this.refs.hor_bids.scrollTop = 0;
			}
		}
	}

	render() {
		let {
			currencyPrice,
			combinedBids,
			combinedAsks,
			highestBid,
			lowestAsk,
			quote,
			base,
			totalAsks,
			totalBids,
			quoteSymbol,
			baseSymbol,
			horizontal
		} = this.props;
		let {
			showAllAsks,
			showAllBids,
			rowCount
		} = this.state;

		let bidRows = null,
			askRows = null;
		if(base && quote) {
			bidRows = combinedBids
				.filter(a => {
					if(this.state.showAllBids || combinedBids.length <= rowCount) {
						return true;
					}
					return a.getPrice() >= highestBid.getPrice() / 5;
				})
				.map((order, index) => {
					return(horizontal ?
						<
						OrderBookRowHorizontal index = {
							index
						}
						key = {
							order.getPrice() + (order.isCall() ? "_call" : "")
						}
						order = {
							order
						}
						onClick = {
							this.props.onClick.bind(this, order)
						}
						base = {
							base
						}
						quote = {
							quote
						}
						position = {!this.state.flip ? "left" : "right"
						}
						/> : <
						OrderBookRowVertical index = {
							index
						}
						key = {
							order.getPrice() + (order.isCall() ? "_call" : "")
						}
						order = {
							order
						}
						onClick = {
							this.props.onClick.bind(this, order)
						}
						base = {
							base
						}
						quote = {
							quote
						}
						final = {
							index === 0
						}
						/>
					);
				});

			let tempAsks = combinedAsks
				.filter(a => {
					if(this.state.showAllAsks || combinedBids.length <= rowCount) {
						return true;
					}
					return a.getPrice() <= lowestAsk.getPrice() * 5;
				});
			if(!horizontal) {
				tempAsks.sort((a, b) => {
					return b.getPrice() - a.getPrice();
				});
			}
			askRows = tempAsks.map((order, index) => {
				return(horizontal ?

					<
					OrderBookRowHorizontal index = {
						index
					}
					key = {
						order.getPrice() + (order.isCall() ? "_call" : "")
					}
					order = {
						order
					}
					onClick = {
						this.props.onClick.bind(this, order)
					}
					base = {
						base
					}
					quote = {
						quote
					}
					type = {
						order.type
					}
					position = {!this.state.flip ? "right" : "left"
					}
					/> : <
					OrderBookRowVertical index = {
						index
					}
					key = {
						order.getPrice() + (order.isCall() ? "_call" : "")
					}
					order = {
						order
					}
					onClick = {
						this.props.onClick.bind(this, order)
					}
					base = {
						base
					}
					quote = {
						quote
					}
					type = {
						order.type
					}
					final = {
						0 === index
					}
					/>
				);
			});

		}

		if(this.props.horizontal) {

			let totalBidsLength = bidRows.length;
			let totalAsksLength = askRows.length;
			if(!showAllBids) {
				bidRows.splice(rowCount, bidRows.length);
			}

			if(!showAllAsks) {
				askRows.splice(rowCount, askRows.length);
			}

			let leftHeader = (
				<thead>
                    <tr key="top-header" className="top-header">
                    	<th>
                            <Translate className={(this.state.flip ? "ask-total" : "bid-total") + " header-sub-title"} content="exchange.price" />
                        </th>
                        <th><span className="header-sub-title"><AssetName dataPlace="top" name={quoteSymbol} /></span></th>
                        <th><span className="header-sub-title"><AssetName dataPlace="top" name={baseSymbol} /></span></th>
                        <th><Translate className="header-sub-title" content="exchange.total" /><span className="header-sub-title"> (<AssetName dataPlace="top" name={baseSymbol} />)</span></th>
                    </tr>
                </thead>
			);

			let rightHeader = (
				<thead>
                    <tr key="top-header" className="top-header">
                        <th>
                            <Translate className={(!this.state.flip ? "ask-total" : "bid-total") + " header-sub-title"} content="exchange.price" />
                        </th>
                        <th><span className="header-sub-title"><AssetName dataPlace="top" name={quoteSymbol} /></span></th>
                        <th><span className="header-sub-title"><AssetName dataPlace="top" name={baseSymbol} /></span></th>
                        <th><Translate className="header-sub-title" content="exchange.total" /><span className="header-sub-title"> (<AssetName dataPlace="top" name={baseSymbol} />)</span></th>
                    </tr>
                </thead>
			);

			return(
				<div className={classnames(this.props.wrapperClass, "grid-block orderbook no-padding small-vertical medium-horizontal align-spaced no-overflow small-12 xlarge-8")}>
                        <div className={classnames("small-12 medium-6 middle-content", this.state.flip ? "order-1" : "order-2")}>
                            <div className="exchange-bordered">
                                <div className="exchange-content-header ask">
                                    <Translate content="exchange.asks" />
                                    {this.state.flip ? (
                                    <span>
                                        <span onClick={this._flipBuySell.bind(this)} style={{cursor: "pointer", fontSize: "1rem"}}>  &#8646;</span>
                                        {!this.props.smallScreen ? <span onClick={this.props.moveOrderBook} style={{cursor: "pointer", fontSize: "1rem"}}> &#8645;</span> : null}
                                    </span>) : null}
                                    <div style={{lineHeight: "16px"}} className="float-right header-sub-title">
                                        <Translate content="exchange.total" />
                                        <span>: </span>
                                        {utils.format_number(totalAsks, quote.get("precision"))}
                                        <span> (<AssetName name={quoteSymbol} />)</span>
                                    </div>
                                </div>
                                <table className="table order-table table-hover fixed-table text-right">
                                    {!this.state.flip ? rightHeader : leftHeader}
                                </table>
                                <div className="grid-block" ref="hor_asks" style={{paddingRight: !showAllAsks ? 0 : 15, overflow: "hidden", maxHeight: 210}}>
                                    <table style={{paddingBottom: 5}} className="table order-table table-hover fixed-table text-right no-overflow">
                                        <TransitionWrapper
                                            ref="askTransition"
                                            className="orderbook"
                                            component="tbody"
                                            transitionName="newrow"
                                        >
                                            {askRows}
                                        </TransitionWrapper>
                                    </table>
                                </div>
                                {totalAsksLength > rowCount ? (
                                <div className="orderbook-showall">
                                    <a onClick={this._onToggleShowAll.bind(this, "asks")}>
                                        <Translate content={showAllAsks ? "exchange.hide" : "exchange.show_asks"} />
                                        {!showAllAsks ? <span> ({totalAsksLength})</span> : null}
                                    </a>
                                </div>) : null}
                            </div>
                        </div>

                        <div className={classnames("small-12 medium-6 middle-content", this.state.flip ? "order-2" : "order-1")}>
                            <div className="exchange-bordered">
                                <div className="exchange-content-header bid">
                                    <Translate content="exchange.bids" />
                                    {!this.state.flip ? (
                                    <span>
                                        <span onClick={this._flipBuySell.bind(this)} style={{cursor: "pointer", fontSize: "1rem"}}>  &#8646;</span>
                                        <span onClick={this.props.moveOrderBook} style={{cursor: "pointer", fontSize: "1rem"}}> &#8645;</span>
                                    </span>) : null}
                                    <div style={{lineHeight: "16px"}} className="float-right header-sub-title">
                                        <Translate content="exchange.total" />
                                        <span>: </span>
                                        {utils.format_number(totalBids, base.get("precision"))}
                                        <span> (<AssetName name={baseSymbol} />)</span>
                                    </div>
                                </div>
                                <table className="table order-table table-hover fixed-table text-right">
                                    {this.state.flip ? rightHeader : leftHeader}
                                </table>
                                <div className="grid-block" ref="hor_bids" style={{paddingRight: !showAllBids ? 0 : 15, overflow: "hidden", maxHeight: 210}}>
                                    <table style={{paddingBottom: 5}} className="table order-table table-hover fixed-table text-right no-overflow">
                                        <TransitionWrapper
                                            ref="bidTransition"
                                            className="orderbook"
                                            component="tbody"
                                            transitionName="newrow"
                                        >
                                            {bidRows}
                                        </TransitionWrapper>
                                    </table>
                                </div>
                                {totalBidsLength > rowCount ? (
                                <div className="orderbook-showall">
                                    <a onClick={this._onToggleShowAll.bind(this, "bids")}>
                                        <Translate content={showAllBids ? "exchange.hide" : "exchange.show_bids"} />
                                        {!showAllBids ? <span> ({totalBidsLength})</span> : null}
                                    </a>
                                </div>) : null}
                            </div>
                        </div>
                    </div>
			);
		} else {
			// Vertical orderbook
			return(
				<div className="left-order-book no-padding no-overflow">
                    <div className="grid-block shrink left-orderbook-header" style={{paddingRight: 15, zIndex: 10}}>
                        <table className="table expand order-table table-hover text-right">
                            <thead>
                                <tr>
                                    <th style={{paddingBottom: 8, textAlign: "right", "borderBottomColor": "#777",width:"33.3%"}}>
                                        <Translate className="header-sub-title" content="exchange.price" />
                                        (<AssetName name={baseSymbol} />)
                                    </th>
                                    <th style={{paddingBottom: 8, textAlign: "right", "borderBottomColor": "#777",width:"33.3%"}}>
                                        <Translate className="header-sub-title" content="exchange.value" />	(<span className="header-sub-title"><AssetName name={quoteSymbol} /></span>)
                                    </th>

                                    <th style={{paddingBottom: 8, textAlign: "right", "borderBottomColor": "#777",width:"33.3%"}}>
                                        <Translate className="header-sub-title" content="exchange.total" /> (<span className="header-sub-title"><AssetName name={baseSymbol} /></span>)
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="grid-block vertical no-padding" ref="orderbook_container" style={{width: "100%",height:"100%"}}>
                            <div id="asksWrapper" style={{overflow:"hidden",height:"382px"}} ref="asksWrapper">
                                <div onScroll={this._onBidScroll.bind(this)} className="grid-block" ref="vert_asks" style={{overflow: "hidden", maxHeight: this.state.vertAsksHeight || 382}}>
                                    <div style={{paddingRight: 10, width: "100%", height: "100%", display: "table-cell", verticalAlign: "bottom"}}>
                                        <table style={{position: "relative", bottom: 0}} className="table order-table table-hover text-center">
                                            <TransitionWrapper
                                                ref="askTransition"
                                                className="ps-container"
                                                component="tbody"
                                                transitionName="newrow"
                                            >
                                                {askRows}
                                            </TransitionWrapper>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div ref="center_text" style={{minHeight: 35}}>
                                    <div key="spread" className="orderbook-latest-price" ref="centerRow">
                                        <div className="text-center spread">
                                            {this.props.latest ? <span className={this.props.changeClass}><PriceText preFormattedPrice={this.props.latest} /> <AssetName name={baseSymbol} /> ≈ {currencyPrice}</span> : null}
                                        </div>
                                    </div>
                            </div>
                            <div id="bidsWrapper" style={{overflow:"hidden",height:"371px"}}>
                                <div className="grid-block" ref="vert_bids" style={{overflow: "hidden", height: this.state.vertBidsHeight || 371}}>
                                <div style={{paddingRight: 10, width: "100%", height: "100%", display: "table-cell", verticalAlign: "top"}}>
                                    <table className="table order-table table-hover text-center">
                                        <TransitionWrapper
                                            ref="bidTransition"
                                            className="ps-container"
                                            component="tbody"
                                            transitionName="newrow"
                                        >
                                            {bidRows}
                                        </TransitionWrapper>
                                    </table>
                                </div>
                                </div>
                            </div>
                    </div>
                    <div style={{width: "100%",display:"none"}} className="v-align no-padding align-center grid-block footer shrink bottom-header">
                        <div onClick={this.props.moveOrderBook} className="button small outline horizontal-button">
                            <Translate content="exchange.horizontal" />
                        </div>
                    </div>
                </div>
			);
		}
	}
}

OrderBook.defaultProps = {
	bids: [],
	asks: [],
	orders: {}
};

OrderBook.propTypes = {
	bids: PropTypes.array.isRequired,
	asks: PropTypes.array.isRequired,
	orders: PropTypes.object.isRequired
};

export default OrderBook;