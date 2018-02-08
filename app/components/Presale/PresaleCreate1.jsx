import React from "react";
import {PropTypes} from "react";
import { connect } from "alt-react";
import {RadioGroup, Radio} from 'react-radio-group';
import ApplicationApi from "api/ApplicationApi";
import AccountStore from "stores/AccountStore";
import notify from "actions/NotificationActions";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ExchangeInput from "../Exchange/ExchangeInput";
import AssetName from "../Utility/AssetName";
import AssetStore from '../../stores/AssetStore'
import AssetActions from "actions/AssetActions";
import Immutable from "immutable";
import AmountSelector from "../Utility/AmountSelector";

class PresaleCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            start: new Date(),
            end: null,
            pay: null,
            url: "http://",
            vesting: 7,
            mode: "0", // 0:fixed prices but wait until presale success  1:total price mode
            perprice: "0.00",
            mintotal: "0.00",
            maxtotal: "0.00",
            lockMode: ["none", "liner", "deadline"],
            accepts: [],
            as: AssetStore,
            value: [],
            assetsFetched: 0,
            balanceError: 1,
            presale: {
                start: 0,
                stop: 0,
                amount: 0,
                lock_period: 0,
                unlock_type: 0,
                mode: 0,
                least: 0,
                most: 0,
                accepts: []
            }
        };
    }


    onSubmit() {
        ApplicationApi.createWorker(this.state, this.props.currentAccount).catch(error => {
            console.log("error", error);
            let error_msg = error.message && error.message.length && error.message.length > 0 ? error.message.split("stack")[0] : "unknown error";

            notify.addNotification({
                message: `Failed to create worker: ${error_msg}`,
                level: "error",
                autoDismiss: 10
            });
        });
    }

    _changeType(e) {

        this.setState({
            lockMode: this.state.lockMode.indexOf(e.target.value)
        });
    }

    componentWillMount() {
        this._checkAssets(this.props.assets, true);
    }

    _checkAssets(assets, force) {
        let lastAsset = assets.sort((a, b) => {
            if (a.symbol > b.symbol) {
                return 1;
            } else if (a.symbol < b.symbol) {
                return -1;
            } else {
                return 0;
            }
        }).last();

        if (assets.size === 0 || force) {
            AssetActions.getAssetList.defer("A", 100);
            this.setState({assetsFetched: 100});
        } else if (assets.size >= this.state.assetsFetched) {
            AssetActions.getAssetList.defer(lastAsset.symbol, 100);
            this.setState({assetsFetched: this.state.assetsFetched + 99});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.assets !== this.props.assets) {
            this._checkAssets(nextProps.assets);
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (
    //         //nextProps.assets !== this.props.assets
    //         !Immutable.is(nextProps.assets, this.props.assets) ||
    //         nextState.mode !== this.state.mode
    //     );
    // }

    _getAvailableAssets(state = this.state) {
        const { feeStatus } = this.state;
        function hasFeePoolBalance(id) {
            if (feeStatus[id] === undefined) return true;
            return feeStatus[id] && feeStatus[id].hasPoolBalance;
        }

        function hasBalance(id) {
            if (feeStatus[id] === undefined) return true;
            return feeStatus[id] && feeStatus[id].hasBalance;
        }

        const { from_account, from_error } = state;
        let asset_types = [], fee_asset_types = [];
        if (!(from_account && from_account.get("balances") && !from_error)) {
            return {asset_types, fee_asset_types};
        }
        let account_balances = state.from_account.get("balances").toJS();
        asset_types = Object.keys(account_balances).sort(utils.sortID);
        fee_asset_types = Object.keys(account_balances).sort(utils.sortID);
        for (let key in account_balances) {
            let balanceObject = ChainStore.getObject(account_balances[key]);
            if (balanceObject && balanceObject.get("balance") === 0) {
                asset_types.splice(asset_types.indexOf(key), 1);
                if (fee_asset_types.indexOf(key) !== -1) {
                    fee_asset_types.splice(fee_asset_types.indexOf(key), 1);
                }
            }
        }

        fee_asset_types = fee_asset_types.filter(a => {
            return hasFeePoolBalance(a) && hasBalance(a);
        });

        return {asset_types, fee_asset_types};
    }

    render() {
        console.log("state:", this.state);

        let asset1 = this.props.params.asset;
        console.log(asset1)
        let { asset_types, fee_asset_types } = this._getAvailableAssets();
        let {propose, from_account, to_account, asset, asset_id, propose_account, feeAmount,
            amount, error, to_name, from_name, memo, feeAsset, fee_asset_id, balanceError} = this.state;
        let options = this.state.lockMode.map(mode => {
            return <option key={mode} value={mode}>{counterpart.translate(`presale.lockmode_${mode}`)} </option>;
        });
        let {assets} = this.props;

        var opts = assets.map(asset => {
            return {label: asset.symbol, value: asset.id};
        }).toArray();
        console.log(opts)

        let uia = assets.map((asset) => {

            return (
                <div className="grid-block buy-sell-row" key={asset.id} style={{marginLeft: 0, width: "50%"}}>
                    <div className="grid-block small-5 no-margin no-overflow buy-sell-input">
                        <ExchangeInput autoComplete="off" placeholder="0.00" />
                    </div>
                    <div className="grid-block small-4 no-margin no-overflow buy-sell-box">
                        <AssetName dataPlace="right" name={asset.symbol} />
                        &nbsp;/&nbsp;
                        <AssetName dataPlace="right" name={asset.symbol} />
                    </div>
                </div>
            );
        }).sort((a, b) => {
            if (a.key > b.key) {
                return 1;
            } else if (a.key < b.key) {
                return -1;
            } else {
                return 0;
            }
        }).toArray();

        return <div className="grid-block" style={{paddingTop: 20}}>
            <div className="grid-content large-9 large-offset-3 small-12">
                <Translate content="presale.create" component="h3" />
                <form style={{maxWidth: 800}}>
                    <div className="content-block transfer-input">
                        {/*<AmountSelector*/}
                            {/*label="account.user_issued_assets.base"*/}
                            {/*amount={core_exchange_rate.base.amount}*/}
                            {/*onChange={this._onCoreRateChange.bind(this, "base")}*/}
                            {/*asset={core_exchange_rate.base.asset_id}*/}
                            {/*assets={[core_exchange_rate.base.asset_id]}*/}
                            {/*placeholder="0.0"*/}
                            {/*tabIndex={1}*/}
                            {/*style={{width: "100%", paddingLeft: "10px"}}*/}
                        {/*/>*/}
                        {this.state.balanceError ? <p className="has-error no-margin" style={{paddingTop: 10}}>123</p>:null}
                    </div>
                    <label>
                        <span>众筹数量</span>
                        <input onChange={(e) => {this.setState({title: e.target.value});}} type="text"></input>123

                    </label>
                    <div style={{width: "50%", paddingRight: "2.5%", display: "inline-block"}}>
                        <label>
                            <Translate content="account.votes.start" />
                            <input  onChange={(e) => {this.setState({start: new Date(e.target.value)});}} type="date"></input>
                        </label>
                    </div>
                    <div style={{width: "50%", paddingLeft: "2.5%", display: "inline-block"}}>
                        <label>
                            <Translate content="account.votes.end" />
                            <input onChange={(e) => {this.setState({end: new Date(e.target.value)});}} type="date"></input>
                        </label>
                    </div>
                    <div>
                        <Translate content="presale.mode.title" />
                        <RadioGroup name="mode" selectedValue={this.state.mode} onChange={(e) => {this.setState({mode: e});}}>
                            <label style={{marginRight: "20px"}}><Radio value="0"/><Translate content="presale.mode.per"/></label>
                            <label style={{marginRight: "20px"}}><Radio value="1" /><Translate content="presale.mode.total"/></label>
                        </RadioGroup>
                    </div>
                    {this.state.mode == 0 ?
                        <div>
                            {uia}
                        </div>
                        :
                        <div>
                            <label>
                                <Translate content="presale.mintotal"/>
                                <input defaultValue={this.state.mintotal}
                                       onChange={(e) => {this.setState({mintotal: parseInt(e.target.value)});}}
                                       type="number"></input>
                            </label>
                            <label>
                                <Translate content="presale.maxtotal" />
                                <input defaultValue={this.state.maxtotal} onChange={(e) => {this.setState({maxtotal: parseInt(e.target.value)});}} type="number"></input>
                            </label>
                        </div>
                    }

                    <div>
                        <Translate content="presale.lockmode"/>
                        <select
                            onChange={this._changeType.bind(this)}
                            className="bts-select"
                            value={this.state.lock_mode}
                        >
                            {options}
                        </select>
                    </div>



                    <div className="button-group" onClick={this.onSubmit.bind(this)}>
                        <div className="button" type="submit">发起众筹</div>
                    </div>
                </form>
            </div>
        </div>;
    }
}

PresaleCreate.defaultProps = {
    assets: {}
};

PresaleCreate.propTypes = {
    assets: PropTypes.object.isRequired
};

export default PresaleCreate = connect(PresaleCreate, {
    listenTo() {
        return [AccountStore];
    },
    getProps() {
        return {
            currentAccount: AccountStore.getState().currentAccount
        };
    }
});
