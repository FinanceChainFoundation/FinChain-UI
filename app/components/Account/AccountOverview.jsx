import React from "react";
import Immutable from "immutable";
import Translate from "react-translate-component";
import BalanceComponent from "../Utility/BalanceComponent";
import TotalBalanceValue from "../Utility/TotalBalanceValue";
import SettleModal from "../Modal/SettleModal";
import UnlockModule from "../Modal/UnlockModal";
import {BalanceValueComponent, EquivalentValueComponent} from "../Utility/EquivalentValueComponent";
import AssetName from "../Utility/AssetName";
import CollateralPosition from "../Blockchain/CollateralPosition";
import { RecentTransactions } from "./RecentTransactions";
import Proposals from "components/Account/Proposals";
import {ChainStore} from "bitsharesjs/es";
import SettingsActions from "actions/SettingsActions";
import assetUtils from "common/asset_utils";
import counterpart from "counterpart";
import Icon from "../Icon/Icon";
import {Link} from "react-router";
import ChainTypes from "../Utility/ChainTypes";
import FormattedAsset from "../Utility/FormattedAsset";
import BindToChainState from "../Utility/BindToChainState";
import utils from "common/utils";
import BorrowModal from "../Modal/BorrowModal";
import ReactTooltip from "react-tooltip";
import SimpleDepositWithdraw from "../Dashboard/SimpleDepositWithdraw";
import SimpleDepositBlocktradesBridge from "../Dashboard/SimpleDepositBlocktradesBridge";
import { Apis } from "bitsharesjs-ws";
import GatewayActions from "actions/GatewayActions";
import LinkToAssetById from "../Utility/LinkToAssetById";

require("datejs");
class AccountOverview extends React.Component {

    static propTypes = {
        balanceAssets: ChainTypes.ChainAssetsList
    };

    constructor() {
        super();
        this.state = {
            settleAsset: "1.3.0",
            showHidden: false,
            depositAsset: null,
            withdrawAsset: null,
            bridgeAsset: null,
            alwaysShowAssets: [
                "JRC"
            ],
            lockDetails:{
                asset_id:"1.3.0",
                show:false
            },
            toUnlock_id:"2.17.0",
            toUnlock_asset_id:"1.3.0",
            toUnlockObj:{}
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !utils.are_equal_shallow(nextProps.balanceAssets, this.props.balanceAssets) ||
            !utils.are_equal_shallow(nextProps.backedCoins, this.props.backedCoins) ||
            !utils.are_equal_shallow(nextProps.balances, this.props.balances) ||
            nextProps.account !== this.props.account ||
            nextProps.settings !== this.props.settings ||
            nextProps.hiddenAssets !== this.props.hiddenAssets ||
            !utils.are_equal_shallow(nextState, this.state)
        );
    }

    _onSettleAsset(id, e) {
        e.preventDefault();
        this.setState({
            settleAsset: id
        });

        this.refs.settlement_modal.show();
    }

    _hideAsset(asset, status) {
        SettingsActions.hideAsset(asset, status);
    }

    _showDepositWithdraw(action, asset, fiatModal, e) {
        e.preventDefault();
        this.setState({
            [action === "bridge_modal" ? "bridgeAsset" : action === "deposit_modal" ? "depositAsset" : "withdrawAsset"]: asset,
            fiatModal
        }, () => {
            this.refs[action].show();
        });
    }

    onLockedDetail(asset,e){
        e.preventDefault()
        let show =this.state.lockDetails.show
        let asset_id=this.state.lockDetails.asset_id

        if(asset_id==asset)
        {
            show=!show
        } else {
            show=true
        }
        let lockDetails={
            asset_id:asset,
            show:show
        }
        this.setState({

            lockDetails:lockDetails
        })
    }

    _getSeparator(render) {
        return render ? <span>&nbsp;|&nbsp;</span> : null;
    }

    _onNavigate(route, e) {
        e.preventDefault();
        this.props.router.push(route);
    }
    _onUnlockOperation(locked_id,if_period,e){

        e.preventDefault();
        if(!if_period)
            return
        let toUnlockObj=ChainStore.getObject(locked_id).toObject()
        this.setState({
            toUnlockObj: toUnlockObj
        });

        this.refs.unlock_modal.show();
    }


    _renderLockDetails(){
        let account=this.props.account
        let asset_type=this.state.lockDetails.asset_id
        let account_balances = account.get("balances");
        let account_balances_id=account_balances.get(asset_type);
        let balanceObject =account_balances.size&&account_balances_id? ChainStore.getObject(account_balances_id):null;
        let lockeds=balanceObject?balanceObject.get("lockeds").toObject():[]
        let keys=Object.keys(lockeds);

        let LockDetails=[]
        let self=this
        LockDetails=keys.map(function(key){
            let locked_id=lockeds[key]
            let fix_balance_obj=ChainStore.getObject(locked_id).toObject()
            let start=fix_balance_obj.lock_time
            let startStr=new Date(start*1000).toString("yyyy/MM/dd HH:mm")
            let period=fix_balance_obj.lock_period
            let periodStr=period/(3600*24)+"天"
            let endStr=new Date((start+period)*1000).toString("yyyy/MM/dd HH:mm")
            let deposit_balance=fix_balance_obj.initial_lock_balance
            let locked_balance=fix_balance_obj.locked_balance

            let interest=(locked_balance/deposit_balance*100-100).toString()
            let interestStr=interest.substring(0,interest.indexOf(".")+4)+"%"
            let profit=locked_balance-deposit_balance;

            let rowKey=fix_balance_obj.id

            let if_period=(start+period)<= Date.now() / 1000
            let operationStr=if_period?"lock.unlock":"lock.ahead_unlock"

            let OperationLink =if_period? <a href  onClick={self._onUnlockOperation.bind(self, rowKey,if_period)} disabled={!if_period}><Translate content={operationStr} /></a>:null
            return(<tr key={rowKey} style={{maxWidth: "100rem"}}>

                <td style={{textAlign: "right", paddingLeft: 10}}>
                    <FormattedAsset
                        amount={deposit_balance}
                        asset={asset_type}
                        hide_asset
                    />
                </td>

                <td style={{textAlign: "right", paddingLeft: 10}}>
                    <FormattedAsset
                        amount={profit}
                        asset={asset_type}
                        hide_asset
                    />
                </td>

                <td style={{textAlign: "right", paddingLeft: 10}}>
                    {startStr}
                </td>

                <td style={{textAlign: "right", paddingLeft: 10}}>
                    {periodStr}
                </td>

                <td style={{textAlign: "right", paddingLeft: 10}}>
                    {endStr}
                </td>

                <td style={{textAlign: "right", paddingLeft: 10}}>
                    {interestStr}
                </td>

                <td style={{textAlign: "right", paddingLeft: 10}}>
                    {OperationLink}
                </td>
            </tr>)
        })

        return   this.state.lockDetails.show?
            <div className="generic-bordered-box">
                <div className="block-content-header" style={{position: "relative"}}>
                    <Translate content="lock.lock_details" />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{textAlign: "right"}}>
                                <Translate content="lock.deposit_amount" />
                            </th>
                            <th style={{textAlign: "right"}}>
                                <Translate content="lock.profit" />
                            </th>
                            <th style={{textAlign: "right"}}>
                                <Translate content="lock.start" />
                            </th>
                            <th style={{textAlign: "right"}}>
                                <Translate component="span" content="lock.period" />
                            </th>
                            <th style={{textAlign: "right"}}>
                                <Translate content="lock.end" />
                            </th>
                            <th style={{textAlign: "right"}}>
                                <Translate content="lock.profit_rate" />
                            </th>
                            <th style={{textAlign: "right"}}>
                                <Translate content="lock.operation" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {LockDetails}
                    </tbody>
                </table>
            </div>:null

    }

    _renderBalances(balanceList, optionalAssets, visible) {
        const core_asset = ChainStore.getAsset("1.3.0");
        let {settings, hiddenAssets, orders} = this.props;
        let preferredUnit = settings.get("unit") || "1.3.0";
        let showAssetPercent = settings.get("showAssetPercent", false);

        const renderBorrow = (asset, account) => {
            let isBitAsset = asset && asset.has("bitasset_data_id");
            let modalRef = "cp_modal_" + asset.get("id");
            return {
                isBitAsset,
                borrowModal: !isBitAsset ? null : <BorrowModal
                    ref={modalRef}
                    quote_asset={asset.get("id")}
                    backing_asset={asset.getIn(["bitasset", "options", "short_backing_asset"])}
                    account={account}
                />,
                borrowLink: !isBitAsset ? null : <a onClick={() => {ReactTooltip.hide();this.refs[modalRef].show();}}><Translate content="exchange.borrow" /></a>
            };
        };

        let balances = [], openOrders = [];
        balanceList.forEach( balance => {
            let balanceObject = ChainStore.getObject(balance);
            let asset_type = balanceObject.get("asset_type");
            let asset = ChainStore.getObject(asset_type);

            let fix_balances_amount=0;
            let total_balances_amount=0
            let fix_balances_obj=[]
            let lockeds=balanceObject.get("lockeds").toObject()
            let keys=Object.keys(lockeds);
            for(var i=0;i<keys.length;i++){
                let fix_balance_obj=ChainStore.getObject(lockeds[keys[i]])
                fix_balances_amount+=parseInt(fix_balance_obj.get("locked_balance"),10)
                fix_balances_obj.push(fix_balance_obj)
            }

            total_balances_amount=parseInt(balanceObject.get("balance"),10)+parseInt(fix_balances_amount,10);
            //console.log(balanceObject.toObject(),fix_balances_obj,fix_balances_amount)

            let assetInfoLinks;
            let marketLink, directMarketLink, settleLink, transferLink;
            let symbol = "";
            if (!asset) return null;

            const assetName = asset.get("symbol");
            const notCore = asset.get("id") !== "1.3.0";
            let {market} = assetUtils.parseDescription(asset.getIn(["options", "description"]));
            symbol = asset.get("symbol");
            if (symbol.indexOf("OPEN.") !== -1 && !market) market = "USD";
            let preferredMarket = market ? market : core_asset ? core_asset.get("symbol") : "BTS";

            /* Table content */
            const assetDetailURL = `/asset/${asset.get("symbol")}`;
            const marketURL = `/market/${asset.get("symbol")}_${preferredMarket}`;

            marketLink = notCore ? <a href={marketURL} onClick={this._onNavigate.bind(this, marketURL)}><AssetName name={asset.get("symbol")} /> : <AssetName name={preferredMarket} /></a> : null;
            directMarketLink = notCore ? <Link to={`/market/${asset.get("symbol")}_${preferredMarket}`}><Translate content="account.trade" /></Link> : null;
            transferLink = <Link to={`/transfer?asset=${asset.get("id")}`}><Translate content="transaction.trxTypes.transfer" /></Link>;
            let lockLink = <Link to={`/lock/?asset=${asset.get("id")}`}><Translate content="account.lock_balance.lock" /></Link>;

            let {isBitAsset, borrowModal, borrowLink} = renderBorrow(asset, this.props.account);
            // if (isBitAsset) {


            // let modalRef = "cp_modal_" + asset.get("id");
            // borrowModal = <BorrowModal
            //     ref={modalRef}
            //     quote_asset={asset.get("id")}
            //     backing_asset={asset.getIn(["bitasset", "options", "short_backing_asset"])}
            //     account={this.props.account}
            // />;
            //
            // borrowLink = <a onClick={() => {ReactTooltip.hide();this.refs[modalRef].show();}}><Translate content="exchange.borrow" /></a>;
            // }

            /* Popover content */
            settleLink = <a href onClick={this._onSettleAsset.bind(this, asset.get("id"))}>
                <Translate content="account.settle"/></a>;
            assetInfoLinks = (
                <ul>
                    <li><a href={assetDetailURL} onClick={this._onNavigate.bind(this, assetDetailURL)}><Translate content="account.asset_details"/></a></li>
                    {notCore ? <li>{marketLink}</li> : null}
                    {isBitAsset ? <li>{settleLink}</li> : null}
                </ul>);

            const includeAsset = !hiddenAssets.includes(asset_type);
            const hasBalance = !!balanceObject.get("balance");
            const hasOnOrder = !!orders[asset_type];
            const hasFixBalance = !!lockeds;
            const canDepositWithdraw = !!this.props.backedCoins.get("OPEN", []).find(a => a.symbol === asset.get("symbol"));
            const canWithdraw = canDepositWithdraw && (hasBalance && balanceObject.get("balance") != 0);
            const canBuy = !!this.props.bridgeCoins.get(symbol);

            let onOrders = hasOnOrder ? <FormattedAsset amount={orders[asset_type]} asset={asset_type} /> : null;

            if (hasOnOrder) {
                let goToLink = <Link to={`/account/${this.props.account.get("name")}/orders`}><Translate content="account.see_open" /></Link>;
                openOrders.push(
                    <tr key={asset.get("symbol")} style={{maxWidth: "100rem"}}>
                        <td style={{textAlign: "right"}}>
                            <div className="tooltip" data-place="bottom" data-tip={counterpart.translate("account.in_open", {asset: symbol})} style={{paddingTop: 8}}>{onOrders}</div>
                        </td>
                        <td style={{textAlign: "right"}} className="column-hide-small">
                            <div className="tooltip" data-place="bottom" data-tip={counterpart.translate("account.in_open_value", {asset: symbol})} style={{paddingTop: 8}}>
                                <EquivalentValueComponent amount={orders[asset_type]} fromAsset={asset_type} noDecimals={true} toAsset={preferredUnit}/>
                            </div>
                        </td>
                        <td colSpan="3" style={{textAlign: "center"}}>
                            {directMarketLink}
                            {directMarketLink ? <span> | </span> : null}
                            {goToLink}
                        </td>
                    </tr>
                );
            }
            //let fix_balances=balance
            let asset_key=asset.get("id")
            let locked_detail_button =
                <a href onClick={this.onLockedDetail.bind(this,asset_key)}>
                    <Translate content="lock.details"/>
                </a>;
            balances.push(
                <tr key={asset_key} style={{maxWidth: "100rem"}}>
                    <td style={{textAlign: "left", paddingLeft: 10}}>
                        <LinkToAssetById asset={asset.get("id")} />
                    </td>
                    <td style={{textAlign: "right"}}>
                        {hasBalance || hasOnOrder||hasFixBalance ? <BalanceComponent balance={balance} assetInfo={assetInfoLinks} hide_asset/> : null}
                    </td>
                    <td style={{textAlign: "right"}}>
                        {hasBalance || hasOnOrder ||hasFixBalance?
                            <FormattedAsset
                                amount={fix_balances_amount}
                                asset={asset_type}
                                hide_asset
                            />: null}
                    </td>
                    <td style={{textAlign: "center"}}>{locked_detail_button}</td>
                    <td style={{textAlign: "right"}}>
                        {hasBalance || hasOnOrder||hasFixBalance ?
                            <FormattedAsset
                                amount={total_balances_amount}
                                asset={asset_type}
                                hide_asset
                            />: null}
                    </td>
                    {/*
                        <td style={{textAlign: "right"}} className="column-hide-small">
                            {hasBalance || hasOnOrder ? <BalanceValueComponent balance={balance} toAsset={preferredUnit}/> : null}
                        </td>
                        {showAssetPercent ? <td style={{textAlign: "right"}}>
                            {hasBalance ? <BalanceComponent balance={balance} asPercentage={true}/> : null}
                        </td> : null}
                    */}
                    <td style={{textAlign: "center"}}>
                        {transferLink}
                    </td>
                    <td style={{textAlign: "center"}}>
                        {lockLink}
                    </td>

                    <td style={{textAlign: "center"}}>
                        {directMarketLink}
                        {isBitAsset ? <div className="inline-block" data-place="bottom" data-tip={counterpart.translate("tooltip.borrow", {asset: symbol})}>{this._getSeparator(true)}{borrowLink}{borrowModal}</div> : null}
                        {isBitAsset ? <div className="inline-block" data-place="bottom" data-tip={counterpart.translate("tooltip.settle", {asset: symbol})}>{this._getSeparator(true)}{settleLink}</div> : null}
                    </td>
                    {/*
                    <td style={{textAlign: "center"}} className="column-hide-small" data-place="bottom" data-tip={counterpart.translate("tooltip." + (includeAsset ? "hide_asset" : "show_asset"))}>
                        <a style={{marginRight: 0}} className={includeAsset ? "order-cancel" : "action-plus"} onClick={this._hideAsset.bind(this, asset_type, includeAsset)}>
                            <Icon name={includeAsset ? "cross-circle" : "plus-circle"} className="icon-14px" />
                        </a>
                    </td>
                   */}
                </tr>
            );
        });

        const currentIndex = balances.length;

        if (optionalAssets) {
            optionalAssets.filter(asset => {
                let isAvailable = false;
                this.props.backedCoins.get("OPEN", []).forEach(coin => {
                    if (coin && (coin.symbol === asset)) {
                        isAvailable = true;
                    }
                });
                if (!!this.props.bridgeCoins.get(asset)) {
                    isAvailable = true;
                }
                let keep = true;
                balances.forEach(a => {
                    if (a.key === asset) keep = false;
                });

                return keep && isAvailable;
            }).forEach(a => {
                let asset = ChainStore.getAsset(a);
                if (asset && this.props.isMyAccount) {
                    const includeAsset = !hiddenAssets.includes(asset.get("id"));

                    const canDepositWithdraw = !!this.props.backedCoins.get("OPEN", []).find(a => a.symbol === asset.get("symbol"));
                    const canBuy = !!this.props.bridgeCoins.get(asset.get("symbol"));

                    const notCore = asset.get("id") !== "1.3.0";
                    let {market} = assetUtils.parseDescription(asset.getIn(["options", "description"]));
                    if (asset.get("symbol").indexOf("OPEN.") !== -1 && !market) market = "USD";
                    let preferredMarket = market ? market : core_asset ? core_asset.get("symbol") : "BTS";
                    let directMarketLink = notCore ? <Link to={`/market/${asset.get("symbol")}_${preferredMarket}`}><Translate content="account.trade" /></Link> : null;
                    let {isBitAsset, borrowModal, borrowLink} = renderBorrow(asset, this.props.account);
                    if (includeAsset && visible || !includeAsset && !visible) balances.push(
                        <tr key={"zz" + a} style={{maxWidth: "100rem"}}>
                            <td style={{textAlign: "right"}}>
                                <AssetName name={a} />
                            </td>
                            <td></td>
                            <td colSpan="1" style={{textAlign: "center"}}>
                                {canDepositWithdraw && this.props.isMyAccount ?
                                    <span>
                                    <a onClick={this._showDepositWithdraw.bind(this, "deposit_modal", a, false)}>
                                        <Translate content="gateway.deposit" />
                                    </a>
                                </span> : null}

                                {canBuy  && this.props.isMyAccount ?
                                    <span>
                                    {this._getSeparator(canDepositWithdraw)}
                                    <a onClick={this._showDepositWithdraw.bind(this, "bridge_modal", a, false)}>
                                        <Translate content="exchange.buy" />
                                    </a>
                                </span> : null}
                            </td>
                            <td style={{textAlign: "center"}}>
                                {directMarketLink}
                                {isBitAsset ? <div className="inline-block" data-place="bottom" data-tip={counterpart.translate("tooltip.borrow", {asset: asset.get("symbol")})}> {this._getSeparator(!!directMarketLink)}{borrowLink}{borrowModal}</div> : null}
                            </td>
                            <td style={{textAlign: "center"}} className="column-hide-small" data-place="bottom" data-tip={counterpart.translate("tooltip." + (includeAsset ? "hide_asset" : "show_asset"))}>
                                <a style={{marginRight: 0}} className={includeAsset ? "order-cancel" : "action-plus"} onClick={this._hideAsset.bind(this, asset.get("id"), includeAsset)}>
                                    <Icon name={includeAsset ? "cross-circle" : "plus-circle"} className="icon-14px" />
                                </a>
                            </td>
                        </tr>
                    );
                }
            });

            if (balances.length !== currentIndex) {
                balances.splice(currentIndex + 1, 0, <tr style={{backgroundColor: "transparent"}} key={"hidden_" + currentIndex} ><td style={{height: 20}} colSpan="5"></td></tr>);
            }
        }

        function sortAlphabetic(a, b) {
            if (a.key > b.key) return 1;
            if (a.key < b.key) return -1;
            return 0;
        };

        balances.sort(sortAlphabetic);
        openOrders.sort(sortAlphabetic);
        return {balances, openOrders};
    }

    _toggleHiddenAssets() {
        this.setState({
            showHidden: !this.state.showHidden
        });
    }

    render() {
        let {account, hiddenAssets, settings, orders} = this.props;
        let {showHidden} = this.state;

        if (!account) {
            return null;
        }

        let call_orders = [], collateral = 0, debt = {};

        if (account.toJS && account.has("call_orders")) call_orders = account.get("call_orders").toJS();
        let includedBalances, hiddenBalances, includedOrders, hiddenOrders, hasOpenOrders = false;
        let account_balances = account.get("balances");
        let fix_balances=account_balances?account.get("fix_balances"):[];
        //console.log("fix_balances:",fix_balances.toObject())

        let includedBalancesList = Immutable.List(), hiddenBalancesList = Immutable.List();
        call_orders.forEach( (callID) => {
            let position = ChainStore.getObject(callID);
            if (position) {
                collateral += parseInt(position.get("collateral"), 10);

                let debtAsset = position.getIn(["call_price", "quote", "asset_id"]);
                if (!debt[debtAsset]) {
                    debt[debtAsset] = parseInt(position.get("debt"), 10);
                } else {
                    debt[debtAsset] += parseInt(position.get("debt"), 10);
                }
            }
        });

        if (account_balances) {
            // Filter out balance objects that have 0 balance or are not included in open orders
            account_balances = account_balances.filter((a, index) => {
                let balanceObject = ChainStore.getObject(a);
                if (balanceObject && (!balanceObject.get("balance") && !orders[index]&&!balanceObject.get("lockeds"))) {
                    return false;
                } else {
                    return true;
                }
            });

            // Separate balances into hidden and included
            account_balances.forEach((a, asset_type) => {
                if (hiddenAssets.includes(asset_type)) {
                    hiddenBalancesList = hiddenBalancesList.push(a);
                } else {
                    includedBalancesList = includedBalancesList.push(a);
                }
            });

            let included = this._renderBalances(includedBalancesList, this.state.alwaysShowAssets, true);
            includedBalances = included.balances;
            includedOrders = included.openOrders;
            let hidden = this._renderBalances(hiddenBalancesList, this.state.alwaysShowAssets);
            hiddenBalances = hidden.balances;
            hiddenOrders = hidden.openOrders;

            hasOpenOrders = hiddenOrders.length || includedOrders.length;
        }

        if (fix_balances) {

        }
        if (hiddenBalances) {
            hiddenBalances.unshift(<tr style={{backgroundColor: "transparent"}} key="hidden"><td style={{height: 20}} colSpan="4"></td></tr>);
        }

        let totalBalanceList = includedBalancesList.concat(hiddenBalancesList);
        let totalBalance = totalBalanceList.size ?
            <TotalBalanceValue
                balances={totalBalanceList}
                openOrders={orders}
                debt={debt}
                collateral={collateral}
                label="account.estimate_value"
            /> : null;

        let showAssetPercent = settings.get("showAssetPercent", false);

        let LockDetails=this._renderLockDetails()

        // Find the current Openledger coins
        const currentDepositAsset = this.props.backedCoins.get("OPEN", []).find(c => {
                return c.symbol === this.state.depositAsset;
            }) || {};
        const currentWithdrawAsset = this.props.backedCoins.get("OPEN", []).find(c => {
                return c.symbol === this.state.withdrawAsset;
            }) || {};
        const currentBridges = this.props.bridgeCoins.get(this.state.bridgeAsset) || null;
        
        let toUnlockObj=this.state.toUnlockObj
        let toUnlockExpired= (toUnlockObj.lock_time + toUnlockObj.lock_period) <= Date.now() / 1000

        return (
            <div className="grid-content" style={{overflowX: "hidden"}}>
                <div className="content-block small-12">
                    <div className="generic-bordered-box">
                        <div className="block-content-header" style={{position: "relative"}}>
                            <Translate content="transfer.balances" />
                            {hiddenBalances && hiddenBalances.length - 1 > 0 ? <div
                                className="button outline small column-hide-small no-margin"
                                style={{position: "absolute", top: 0, right: 0}}
                                onClick={this._toggleHiddenAssets.bind(this)}
                            >
                                <Translate content={`account.${showHidden ? "hide_hidden" : "show_hidden"}`} /><span> ({hiddenBalances.length - 1})</span>
                            </div> : null}
                        </div>
                        <table className="table">
                            <thead>
                            <tr>
                                {/*<th><Translate component="span" content="modal.settle.submit" /></th>*/}
                                {/*<<th style={{textAlign: "right"}}><Translate component="span" content="account.bts_market" /></th>
                                <th style={{textAlign: "right"}} className="column-hide-small"><Translate component="span" content="account.eq_value" /></th>
                                {showAssetPercent ? <th style={{textAlign: "right"}}><Translate component="span" content="account.percent" /></th> : null}
                                 */}
                                <th ><Translate component="span" content="account.asset" /></th>
                                <th style={{textAlign: "center"}}>
                                    <Translate content="account.current_balance" />
                                </th>
                                <th style={{textAlign: "center"}}>
                                    <Translate content="account.fix_balance" />
                                </th>
                                <th style={{textAlign: "center"}}>
                                    <Translate content="lock.lock_details" />
                                </th>
                                <th style={{textAlign: "right"}}><Translate component="span" content="account.total_balance" /></th>
                                <th style={{textAlign: "center"}}>
                                    <Translate content="account.transfer_actions" />
                                </th>
                                <th style={{textAlign: "center"}}>
                                    <Translate content="account.lock_balance.lock" />
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {includedBalances}
                            {totalBalanceList.size > 1 ?
                                <tr className="tooltip" data-place="bottom" data-tip={counterpart.translate("account.total_estimate")} style={{backgroundColor: "transparent"}}>
                                    <td colSpan="2" style={{textAlign: "right", fontWeight: "bold", paddingTop: 20}}>
                                        <span>{totalBalance}</span>
                                    </td>
                                </tr> : null}
                            {showHidden ? hiddenBalances : null}

                            {/* Open orders */}
                            {hasOpenOrders ? <tr style={{backgroundColor: "transparent"}}><td style={{height: 20}} colSpan="4"></td></tr> : null}
                            {hasOpenOrders ? <tr style={{backgroundColor: "transparent"}}>
                                <td colSpan="5" className="no-padding">
                                    <div className="block-content-header">
                                        <Translate content="account.open_orders" />
                                    </div>
                                </td>
                            </tr>  : null}
                            {includedOrders}
                            {hiddenOrders}
                            </tbody>
                        </table>
                        {/*<SettleModal ref="settlement_modal" asset={this.state.settleAsset} account={account.get("name")}/>*/}
                        <UnlockModule ref="unlock_modal" locked_obj={toUnlockObj} expired={toUnlockExpired} account_id={account.get("id") } asset_id={this.state.toUnlock_asset_id}/>
                    </div>
                    {LockDetails}
                </div>

                {call_orders.length > 0 ? (

                    <div className="content-block">
                        <div className="generic-bordered-box">
                            <div className="block-content-header">
                                <Translate content="account.collaterals" />
                            </div>
                            <CollateralPosition callOrders={call_orders} account={account} />
                        </div>
                    </div>) : null}

                {account.get("proposals") && account.get("proposals").size ?
                    <div className="content-block">
                        <div className="block-content-header">
                            <Translate content="explorer.proposals.title" account={account.get("id")} />
                        </div>
                        <Proposals account={account.get("id")}/>
                    </div> : null}

                <div className="content-block">
                    <RecentTransactions
                        accountsList={Immutable.fromJS([account.get("id")])}
                        compactView={false}
                        showMore={true}
                        fullHeight={true}
                        limit={10}
                        showFilters={true}
                    />
                </div>

                {/* Deposit Modal */}
                <SimpleDepositWithdraw
                    ref="deposit_modal"
                    action="deposit"
                    fiatModal={this.state.fiatModal}
                    account={this.props.account.get("name")}
                    sender={this.props.account.get("id")}
                    asset={this.state.depositAsset}
                    modalId="simple_deposit_modal"
                    balances={this.props.balances}
                    {...currentDepositAsset}
                />

                {/* Withdraw Modal */}
                <SimpleDepositWithdraw
                    ref="withdraw_modal"
                    action="withdraw"
                    fiatModal={this.state.fiatModal}
                    account={this.props.account.get("name")}
                    sender={this.props.account.get("id")}
                    asset={this.state.withdrawAsset}
                    modalId="simple_withdraw_modal"
                    balances={this.props.balances}
                    {...currentWithdrawAsset}
                />

                {/* Bridge modal */}
                <SimpleDepositBlocktradesBridge
                    ref="bridge_modal"
                    action="deposit"
                    account={this.props.account.get("name")}
                    sender={this.props.account.get("id")}
                    asset={this.state.bridgeAsset}
                    modalId="simple_bridge_modal"
                    balances={this.props.balances}
                    bridges={currentBridges}
                />
            </div>

        );
    }
}

AccountOverview = BindToChainState(AccountOverview);

class BalanceWrapper extends React.Component {

    static propTypes = {
        balances: ChainTypes.ChainObjectsList,
        orders: ChainTypes.ChainObjectsList
    };

    static defaultProps = {
        balances: Immutable.List(),
        orders: Immutable.List()
    };

    componentWillMount() {
        if (Apis.instance().chain_id.substr(0, 8) === "4018d784") { // Only fetch this when on BTS main net
            GatewayActions.fetchCoins();
            GatewayActions.fetchBridgeCoins();
        }
    }

    render() {
        let balanceAssets = this.props.balances.map(b => {
            return b && b.get("asset_type");
        }).filter(b => !!b);

        let ordersByAsset = this.props.orders.reduce((orders, o) => {
            let asset_id = o.getIn(["sell_price", "base", "asset_id"]);
            if (!orders[asset_id]) orders[asset_id] = 0;
            orders[asset_id] += parseInt(o.get("for_sale"), 10);
            return orders;
        }, {});

        for (let id in ordersByAsset) {
            if (balanceAssets.indexOf(id) === -1) {
                balanceAssets.push(id);
            }
        }

        return (
            <AccountOverview {...this.state} {...this.props} orders={ordersByAsset} balanceAssets={Immutable.List(balanceAssets)} />
        );
    };
}

export default BindToChainState(BalanceWrapper);
