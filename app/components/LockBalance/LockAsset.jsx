import React from "react";
import Translate from "react-translate-component";
import AccountSelector from "../Account/AccountSelector";
import AmountSelector from "../Utility/AmountSelector";
import FloatingDropdown from "../Utility/FloatingDropdown";
import counterpart from "counterpart";
import { RecentTransactions } from "../Account/RecentTransactions";
import {ChainStore} from "bitsharesjs/es";
import {connect} from "alt-react";
import { checkFeeStatusAsync, checkBalance } from "common/trxHelper";
import { debounce, isNaN } from "lodash";
import BindToChainState from "../Utility/BindToChainState";
import AccountStore from "stores/AccountStore";
import utils from "common/utils";
import { Asset } from "common/MarketClasses";
import Immutable from "immutable";
import classnames from "classnames";
import WalletApi from "api/WalletApi";
import WalletDb from "stores/WalletDb";
import ChainTypes from "../Utility/ChainTypes";
import {Apis} from "bitsharesjs-ws";

class PeriodInput extends React.Component {

    static propTypes = {
        label: React.PropTypes.string, // a translation key for the label
        period: React.PropTypes.any,
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        tabIndex: React.PropTypes.number,
        asset:ChainTypes.ChainAsset.isRequired

    };

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            uint:1,
            days:"",
            interest:1,
            period_days:0

        };
    }

    _onChange(event) {
        let days = event.target.value;
        this.setState({days:days})
        let period=parseInt(days,10)*parseInt(this.state.uint,10)
        this.props.onChange(period);
        let period_s=parseInt(period,10)*3600*24
        this.setState({period_days:period})
        this._onPeriodChange(period_s)
    }

    onUintChange(uint) {
        this.setState({uint:uint})
        let period=parseInt(this.state.days,10)*parseInt(uint,10)
        this.props.onChange(period);
        let period_s=parseInt(period,10)*3600*24
        this.setState({period_days:period})
        this._onPeriodChange(period_s)
    }
    
    _onPeriodChange(period){
        let self=this
        Apis.instance().db_api().exec("get_asset_lock_data", [this.props.asset,period]).then( results => {

            let interest=results.current_interest.active_interest
            self.setState({interest:interest})
            console.log(interest)
        })
    }

    render() {
        let dayStr=counterpart.translate("lock.day")
        let monthStr=counterpart.translate("lock.month")
        let yearStr=counterpart.translate("lock.year")

        let periodUints={}
        periodUints[dayStr]=1
        periodUints[monthStr]=30
        periodUints[yearStr]=360
        let periodUintsStr=Object.keys(periodUints)

        let _periodUints={}
        periodUintsStr.forEach(function(key){
            let value=periodUints[key]
            _periodUints[value]=key
        })

        //console.log(this.props.asset)

        let interest_per_day=Math.pow(this.state.interest,1/this.state.period_days)
        let interest_per_year=Math.pow(interest_per_day,360)

        let interest=interest_per_year*100-100+"%"
        let value = this.state.days;

        let interest_render=this.state.interest-1?
            <div className="inline-label input-wrapper">
                <label className="right-label"> 年化收益: </label><span className="right-label">{interest}</span>
            </div>:null
        return (
            <div className="amount-selector" style={this.props.style}>
                <label className="right-label">{this.props.display_balance}</label>
                <Translate className="left-label" component="label" content={this.props.label}/>
                <div className="inline-label input-wrapper">
                    <input
                        disabled={this.props.disabled}
                        type="text"
                        value={value}
                        placeholder={this.props.placeholder}
                        onChange={this._onChange.bind(this) }
                        tabIndex={this.props.tabIndex}
                    />
                    <div className="form-label select floating-dropdown">
                        <FloatingDropdown
                            entries={periodUintsStr}
                            values={periodUints}
                            value={_periodUints[this.state.uint]}
                            onChange={this.onUintChange.bind(this)}
                        />;
                    </div>
                    {/*<Translate component="span" content="lock_balance.lock" />*/}
                </div>
                {interest_render}

            </div>
        )
    }
}
BindToChainState(PeriodInput, {keep_updating: true});

class LockAsset extends React.Component {

    constructor(props) {
        super(props);
        this.state = LockAsset.getInitialState();
        let {query} = this.props.location;

        if(query.issuer) {
            this.state.issuer = query.issuer;
            ChainStore.getAccount(query.issuer);
        }
        if(query.amount) this.state.amount = query.amount;
        if(query.asset) {
            this.state.asset_id = query.asset;
            this.state.asset = ChainStore.getAsset(query.asset);
        }
        let currentAccount = AccountStore.getState().currentAccount;
        this.state.issuer=currentAccount
    }
    static getInitialState(){
        return {
            issuer:"",
            issuer_id: "",
            asset_id:"",
            asset:"",
            amount: "",
            period:0,
            asset: null,
            error: null,
        };
    }


    onIssuerChanged(issuer){
        this.setState({
            account:issuer.get("name"),
            accountid:issuer.get("id")
        });
    }
    onChanged(account){
        this.setState({
            issuer:account,

        });
    }
    onAmountChanged({amount, asset}) {
        if (!asset) {
            return;
        }
        this.setState({amount, asset, asset_id: asset.get("id"), error: null}, this._checkBalance);
    }

    onPeriodChanged(days) {

        this.setState({period:days});
        console.log("period",days)
    }

    onSubmit(e) {
        e.preventDefault();
        var tr = WalletApi.new_transaction();
        let issuer_id=ChainStore.getAccount(this.state.issuer).get("id")
        let asset_obj=ChainStore.getAsset(this.state.asset_id)
        let precision = utils.get_asset_precision(asset_obj.get("precision"))
        let amount=parseInt(this.state.amount,10)*precision
        let period=parseInt(this.state.period,10)*3600*24
        tr.add_type_operation("lock_balance", {
            fee: {
                amount: 0,
                asset_id: 0
            },
            issuer: issuer_id,
            amount:{
                amount: amount,
                asset_id: this.state.asset_id
            },
            period:period,
            extensions:[]
        });
        return WalletDb.process_transaction(tr, null, true).then(result => {
            // this.dispatch(account_id);
            return true;
        }).catch(error => {
            console.error("lock balance error: ", error);
            return false;
        });
    }

    render() {
        let tabIndex=0
        let from_error = null;
        let {issuer,issuer_id, asset, asset_id,
            amount} = this.state;
        let asset_types = []
        let account_obj= ChainStore.getAccount(issuer)
        let account_balances = account_obj?account_obj.get("balances").toJS():[];
        asset_types = Object.keys(account_balances).sort(utils.sortID);
        let lock_period_str=counterpart.translate("lock.period")
        let accountsList = Immutable.Set();
        accountsList = accountsList.add(issuer);

        //console.log(this.state.asset_id)
        return (
            <div className="grid-block vertical">
                <div className="grid-block shrink vertical medium-horizontal" style={{paddingTop: "2rem"}}>

                    <form style={{paddingBottom: 20, overflow: "visible"}} className="grid-content small-12 medium-6 large-5 large-offset-1 full-width-content" onSubmit={this.onSubmit.bind(this)} noValidate>

                        <Translate content="lock.header" component="h2" />
                        {/*  ISSUER  */}
                        <div className="content-block">
                            <AccountSelector label="lock.issuer" ref="from"
                                             accountName={issuer}
                                             onChange={this.onChanged.bind(this)}
                                             onAccountChanged={this.onIssuerChanged.bind(this)}
                                             account={issuer}
                                             size={60}
                                             disableActionButton={true}
                                             tabIndex={tabIndex++}
                            />
                        </div>
                        {/*  A M O U N T   */}
                        <div className="content-block transfer-input">
                            <AmountSelector
                                label="lock.amount"
                                amount={amount}
                                onChange={this.onAmountChanged.bind(this)}
                                asset={asset_id}
                                assets={asset_types}
                                tabIndex={tabIndex++}
                            />
                            {this.state.balanceError ? <p className="has-error no-margin" style={{paddingTop: 10}}><Translate content="transfer.errors.insufficient" /></p>:null}
                        </div>
                        <div className="content-block transfer-input">
                            <PeriodInput
                                label="lock.period"
                                type="text"
                                placeholder={lock_period_str}
                                onChange={this.onPeriodChanged.bind(this) }
                                asset={this.state.asset_id}
                                tabIndex={tabIndex++}
                            />
                        </div>
                        <button className={classnames("button float-right no-margin")} type="submit" value="Submit" tabIndex={tabIndex++}>
                            <Translate component="span" content="lock.lock" />
                        </button>
                    </form>
                    <div className="grid-content small-12 medium-6 large-4 large-offset-1 right-column">
                        <div className="grid-content no-padding">
                            <RecentTransactions
                                accountsList={accountsList}
                                limit={25}
                                compactView={true}
                                filter="transfer"
                                fullHeight={true}
                            />
                        </div>
                    </div>

                    <div className="grid-content medium-6 large-4">

                    </div>
                </div>
            </div>
        );
    }
}
export default BindToChainState(LockAsset, {keep_updating: true});