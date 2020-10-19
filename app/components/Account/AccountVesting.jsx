import React from "react";
import Translate from "react-translate-component";
import FormattedAsset from "../Utility/FormattedAsset";
import {ChainStore} from "bitsharesjs/es";
import utils from "common/utils";
import WalletActions from "actions/WalletActions";
import {Apis} from "bitsharesjs-ws";

class VestingBalance extends React.Component {

    _onClaim(claimAll, e) {
        e.preventDefault();
        WalletActions.claimVestingBalance(this.props.account.id, this.props.vb, claimAll);
    }

    render() {
        let {vb} = this.props;
        if (!this.props.vb) {
            return null;
        }
        // let vb = ChainStore.getObject( this.props.vb );
        // if (!vb) {
        //     return null;
        // }

        let cvbAsset, vestingPeriod, earned, secondsPerDay = 60 * 60 * 24,
            availablePercent, balance;
        if (vb) {
            balance = vb.balance.amount;
            cvbAsset = ChainStore.getAsset(vb.balance.asset_id);
            earned = vb.policy[1].coin_seconds_earned;
            vestingPeriod = vb.policy[1].vesting_seconds;
            availablePercent = vestingPeriod === 0 ? 1 : earned / (vestingPeriod * balance);
        }

        if (!cvbAsset) {
            return null;
        }

        if (!balance) {
            return null;
        }

        return (
            <div style={{paddingBottom: "1rem"}}>
                <div className="">
                    <div className="grid-content no-padding">
                        <Translate component="h5" content="account.vesting.balance_number" id={vb.id} />

                        <table className="table key-value-table">
                            <tbody>
                                <tr>
                                    <td><Translate content="account.member.cashback"/> </td>
                                    <td><FormattedAsset amount={vb.balance.amount} asset={vb.balance.asset_id} /></td>
                                </tr>
                                <tr>
                                    <td><Translate content="account.member.earned" /></td>
                                    <td>{utils.format_number(utils.get_asset_amount(earned / secondsPerDay, cvbAsset), 0)} <Translate content="account.member.coindays" /></td>
                                </tr>
                                <tr>
                                    <td><Translate content="account.member.required" /></td>
                                    <td>{utils.format_number(utils.get_asset_amount(vb.balance.amount * vestingPeriod / secondsPerDay, cvbAsset), 0)} <Translate content="account.member.coindays" /></td>
                                </tr>
                                <tr>
                                    <td><Translate content="account.member.remaining" /></td>
                                    <td>{utils.format_number(vestingPeriod * (1 -  availablePercent) / secondsPerDay || 0, 2)} days</td>
                                </tr>
                                <tr>
                                    <td><Translate content="account.member.available" /></td>
                                    <td>{utils.format_number(availablePercent * 100, 2)}% / <FormattedAsset amount={availablePercent * vb.balance.amount} asset={cvbAsset.get("id")} /></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{textAlign: "right"}}>
                                        <button onClick={this._onClaim.bind(this, false)} className="button outline"><Translate content="account.member.claim" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

class AccountVesting extends React.Component {
    constructor() {
        super();

        this.state = {
            vbs: null
        };
    }

    componentWillMount() {
        this.retrieveVestingBalances.call(this, this.props.account.get("id"));
    }

    componentWillUpdate(nextProps){
        let newId = nextProps.account.get("id");
        let oldId = this.props.account.get("id");

        if(newId !== oldId){
            this.retrieveVestingBalances.call(this, newId);
        }
    }

    retrieveVestingBalances(accountId){
        Apis.instance().db_api().exec("get_vesting_balances", [
            accountId
        ]).then(vbs => {
            this.setState({vbs});
        }).catch(err => {
            console.log("error:", err);
        });
    }

    render() {
        let {vbs} = this.state;
        if (!vbs || !this.props.account || !this.props.account.get("vesting_balances")) {
            return null;
        }

        let account = this.props.account.toJS();

        let balances = vbs.map(vb => {
            if (vb.balance.amount) {
                return <VestingBalance key={vb.id} vb={vb} account={account}/>;
            }
        }).filter(a => {
            return !!a;
        });

        return (
            <div className="grid-content" style={{overflowX: "hidden"}}>
                <Translate content="account.vesting.explain" component="p" />
                {!balances.length ? (
                <h4 style={{paddingTop: "1rem"}}>
                    <Translate content={"account.vesting.no_balances"}/>
                </h4>) : balances}
            </div>
);
    }
}

AccountVesting.VestingBalance = VestingBalance;
export default AccountVesting;
