import React from "react";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import AmountSelector from "../Utility/AmountSelector";
import Translate from "react-translate-component";
import AssetStore from "../../stores/AssetStore";
import ExchangeInput from "../Exchange/ExchangeInput";
import AssetName from "../Utility/AssetName";
import AssetActions from "../../actions/AssetActions";
import counterpart from "counterpart";
import ApplicationApi from "../../api/ApplicationApi";
import PresaleActions from "../../actions/PresaleActions";
import AccountStore from "../../stores/AccountStore";
import {ChainStore} from "bitsharesjs/es";
import { connect } from "alt-react";
import { Map, List } from "immutable";
import {PropTypes} from "react";

class AccountPresaleCreate extends React.Component {
    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired,
        assets: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            assets: AssetStore.getState().assets,
            error: null,
            asset_id: "",
            asset: null,
            accept_id: "1.3.0",
            assetsFetched: 0,
            total_mode_asset_id: null,
            total_mode_asset: null,

            amount: "",
            start: 0,
            stop: 0,
            mode: 0,
            soft_top: 0,
            hard_top: 0,
            accepts: [],
            unlock_type: 0,
            lock_period: 0,
            lock_mode: "none",
            early_bird_part: []
        };

        //AssetActions.getAssetList.defer(0, 100);
    }

    onAmountChanged({amount, asset}) {

        this.setState({amount: amount, asset});
    }

    onSoftTopChanged({amount, asset}) {
        if (!asset) {
            return;
        }console.log("ast", asset)
        this.setState({soft_top: amount, total_mode_asset: asset, total_mode_asset_id: asset.get("id")});
    }

    onHardTopChanged({amount, asset}) {
        if (!asset) {
            return;
        }
        this.setState({hard_top: amount, total_mode_asset: asset, total_mode_asset_id: asset.get("id")});
    }

    addAccept() {
        var accepts = this.state.accepts;
        accepts.push({
            asset_id: this.state.accept_id,
            symbol: ChainStore.getAsset(this.state.accept_id).get("symbol"),
            amount: 0,
            least: 0,
            most: 0,
            base_price: 1
        });
        this.setState({accepts: accepts});
        console.log(this.state.accept_id)
    }

    removeAccept(id) {
        var accepts = this.state.accepts;
        for (var i in accepts) {
            if (accepts[i].id == id) {
                accepts.splice(i, 1);
                break;
            }
        }
        this.setState({accepts: accepts});
    }

    supportChange(e) {
        this.setState({accept_id: e.target.value})
    }

    changeAcceptAmount(act, e) {
        this.state.accepts.forEach(accept => {
            if (accept == act) {
                accept.amount = e.target.value;
            }
        });
        this.setState({});
    }

    changeAcceptLeast(act, e) {
        this.state.accepts.forEach(accept => {
            if (accept == act) {
                accept.least = e.target.value;
            }
        });
        this.setState({});
    }

    changeAcceptMost(act, e) {
        this.state.accepts.forEach(accept => {
            if (accept == act) {
                accept.most = e.target.value;
            }
        });
        this.setState({});
    }

    changeUnlockType(e) {
        this.setState({unlock_type: e.target.value});
    }

    onSubmit() {
        //console.log(this.state.stop);return;
        let args = {
            issuer: ChainStore.getAccount(AccountStore.getState().currentAccount).get("id"),
            asset_id: this.props.asset.get("id"),
            amount: this.state.amount,
            start: this.state.start,
            stop: this.state.stop,
            accepts: this.state.accepts,
            early_bird_part: 0,
            asset_of_top: 0,
            soft_top: this.state.soft_top,
            hard_top: this.state.hard_top,
            early_bird_pecents: [],
            lock_period: 0,
            unlock_type: 0,
            mode: parseInt(this.state.mode)
        }

        PresaleActions.createPresale(args);
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

    changeBasePrice(act) {

        this.state.accepts.forEach(accept => {
            if (accept == act) {
                accept.base_price = e.target.value;
            }
        });
        this.setState({});
    }

    render() {

        let accepts_part = this.state.accepts.map(accept => {
            return (
                <tr key={accept.asset_id}>
                    <td>{accept.symbol}</td>
                    <td>

                        <div className="grid-block buy-sell-row" style={{margin: 0}}>
                            <div className="grid-block no-margin no-overflow buy-sell-input" style={{width: "50px"}}>
                                <ExchangeInput value={accept.amount} onChange={this.changeAcceptAmount.bind(this, accept)} autoComplete="off" placeholder="0" />
                            </div>
                            <div className="grid-block no-margin no-overflow buy-sell-box" style={{width: "20px"}}>
                                <AssetName dataPlace="right" name={this.props.asset.get("symbol")} />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="grid-block no-padding buy-sell-row" style={{margin: 0}}>
                            <div className="grid-block no-margin no-overflow buy-sell-input" style={{width: "40px"}}>
                                <ExchangeInput value={accept.base_price} onChange={this.changeBasePrice.bind(this, accept)} autoComplete="off" placeholder="0.0" />
                            </div>
                            <div className="grid-block no-margin no-overflow buy-sell-box">
                                <AssetName dataPlace="right" name={accept.symbol} />
                                &nbsp;/&nbsp;
                                <AssetName dataPlace="right" name={this.props.asset.get("symbol")} />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="grid-block no-padding buy-sell-row" style={{margin: 0}}>
                            <div className="grid-block no-margin no-overflow buy-sell-input" style={{width: "40px"}}>
                                <ExchangeInput value={accept.least} onChange={this.changeAcceptLeast.bind(this, accept)} placeholder="0" />
                            </div>
                            <div className="grid-block no-margin no-overflow buy-sell-box" style={{width: "20px"}}>
                                <AssetName dataPlace="right" name={accept.symbol} />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="grid-block no-padding buy-sell-row" style={{margin: 0}}>
                            <div className="grid-block no-margin no-overflow buy-sell-input" style={{width: "40px"}}>
                                <ExchangeInput value={accept.most} onChange={this.changeAcceptMost.bind(this, accept)} placeholder="0" />
                            </div>
                            <div className="grid-block no-margin no-overflow buy-sell-box" style={{width: "20px"}}>
                                <AssetName dataPlace="right" name={accept.symbol} />
                            </div>
                        </div>
                    </td>
                    <td><button className="button" onClick={this.removeAccept.bind(this, accept.id)}>删除</button></td>
                </tr>
            );
        });

        let supports = this.props.assets.filter(ast => {
            return ast.id != this.props.asset.get("id");
        }).map(ast => {
            return <option key={ast.id} value={ast.id}>{ast.symbol}</option>
        })

        let modesection;

        if (this.state.mode == 0) {
            modesection = (
                <label>
                    <select style={{width: "30%", display: "inline-block", marginRight: "30px", height: "40px"}} value={this.state.accept_id} onChange={this.supportChange.bind(this)}>
                        {supports}
                    </select>
                    <button className="button" style={{display: "inline-block"}} onClick={this.addAccept.bind(this)}>添加接受资产类型</button>
                    {this.state.accepts.length ?
                        <table className="table">
                            <thead>
                            <tr>
                                <th>资产名称</th>
                                <th>总量</th>
                                <th>单价</th>
                                <th>最低购买数量</th>
                                <th>最高购买数量</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {accepts_part}
                            </tbody>
                        </table>
                        :
                        null
                    }
                </label>
            );
        } else {

            let ids = [];
            this.props.assets.forEach(ast => {
                if (ast.id != this.props.asset.get("id")) {
                    ids.push(ast.id)
                }
            })
            console.log("ids",ids)
            modesection = (
                <label>
                    <label style={{width: "50%", display: "inline-block", paddingRight: "2.5%"}}>

                        {/*<AmountSelector*/}
                            {/*label="presale.mintotal"*/}
                            {/*amount={this.state.soft_top}*/}
                            {/*onChange={this.onSoftTopChanged.bind(this)}*/}
                            {/*asset={ids[0]}*/}
                            {/*assets={ids}*/}
                            {/*placeholder="0.00"*/}
                        {/*/>*/}
                    </label>
                    <label style={{width: "50%", display: "inline-block", paddingLeft: "2.5%"}}>
                        {/*<AmountSelector*/}
                            {/*label="presale.maxtotal"*/}
                            {/*amount={this.state.hard_top}*/}
                            {/*onChange={this.onHardTopChanged.bind(this)}*/}
                            {/*asset={this.state.total_mode_asset}*/}
                            {/*assets={ids}*/}
                            {/*placeholder="0.00"*/}
                        {/*/>*/}
                    </label>
                </label>
            );
        };


        let unlock_type_options = [
            <option key={0} value="0">线性解冻</option>,
            <option key={1} value="1">到期解冻</option>
        ];

        return (
            <div className="grid-block" style={{paddingTop: "30px"}}>
                <div className="grid-content large-12 small-12">
                    <Translate content="presale.create" component="h3" />
                    <label>
                        <AmountSelector
                            label="presale.amount"
                            amount={this.state.amount}
                            onChange={this.onAmountChanged.bind(this)}
                            asset={"1.3.0"}
                            assets={["1.3.0", "1.3.1"]}
                            placeholder="0.00"
                            tabIndex={1}
                        />
                    </label>
                    <label style={{width: "50%", paddingRight: "2.5%", display: "inline-block"}}>
                        <label>
                            <Translate content="account.votes.start" />
                            <input onChange={(e) => {this.setState({start: new Date(e.target.value)});}} type="datetime-local"></input>
                        </label>
                    </label>
                    <label style={{width: "50%", paddingLeft: "2.5%", display: "inline-block"}}>
                        <label>
                            <Translate content="account.votes.end" />
                            <input onChange={(e) => {this.setState({stop: new Date(e.target.value)});}} type="datetime-local"></input>
                        </label>
                    </label>

                    <label>
                        <Translate content="presale.mode.title"/>
                        <div></div>
                        <label style={{display: "inline-block", marginRight: "30px"}}>
                            <input type="radio" name="mode"
                                   value="0"
                                   checked={this.state.mode == 0}
                                   onChange={e => {this.setState({mode: e.currentTarget.value})}} /><Translate content="presale.mode.per"/>
                        </label>
                        <label style={{display: "inline-block"}}>
                            <input type="radio" name="mode"
                                   value="1"
                                   checked={this.state.mode == 1}
                                   onChange={e => {this.setState({mode: e.currentTarget.value})}} /><Translate content="presale.mode.total"/>
                        </label>
                    </label>

                    {modesection}
                    <label>
                        <Translate content="presale.lock_period"/>
                        <input value={this.state.lock_period} onChange={e => {this.setState({lock_period: e.target.value})}} type="datetime-local"/>
                    </label>
                    <label>
                        <Translate content="presale.lockmode"/>
                        {/*<select*/}
                            {/*onChange={this.changeUnlockType.bind(this)}*/}
                            {/*className="bts-select"*/}
                            {/*value={this.state.unlock_type}*/}
                        {/*>*/}
                            {/*{unlock_type_options}*/}
                        {/*</select>*/}
                    </label>
                    <div className="button-group">
                        <div className="button" type="submit" onClick={this.onSubmit.bind(this)}>发起众筹</div>
                    </div>
                </div>
            </div>
        );
    }
}

AccountPresaleCreate = BindToChainState(AccountPresaleCreate);

export default connect(AccountPresaleCreate, {
    listenTo() {
        return [AssetStore];
    },
    getProps(props) {
        let assets = Map();

        assets = AssetStore.getState().assets;
        return {assets, asset: props.params.asset};
    }
});