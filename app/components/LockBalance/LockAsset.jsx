import React from "react";
import Translate from "react-translate-component";
import AccountSelector from "../Account/AccountSelector";
import AmountSelector from "../Utility/AmountSelector";
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

    onPeriodChanged(e) {

        this.setState({period:e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        var tr = WalletApi.new_transaction();
        let issuer_id=ChainStore.getAccount(this.state.issuer).get("id")
        let asset_obj=ChainStore.getAsset(this.state.asset_id)
        let precision = utils.get_asset_precision(asset_obj.get("precision"))
        let amount=parseInt(this.state.amount,10)*precision
        let period=parseInt(this.state.period,10)
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
                        <div className="inline-label input-wrapper">
                            <input
                                type="text"
                                value={this.state.period}
                                placeholder={lock_period_str}
                                onChange={this.onPeriodChanged.bind(this) }
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