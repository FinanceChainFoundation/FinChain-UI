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


class PresaleCreate extends React.Component {
    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired,
        assets: ChainTypes.ChainAssetsList
    };

    constructor(props) {
        super(props);

        this.state = {
            asset: ChainStore.getAsset(this.props.asset.get("id")),
            assets: AssetStore.getState().assets,
            error: null,
            asset_id: "",
            asset: null,
            accept_id: "1.3.0",

            amount: 1,
            start: 0,
            stop: 0,
            mode: 0,
            least: 0,
            most: 0,
            accepts: [],
            unlock_type: ["none", "liner", "deadline"],
            lock_mode: "none",
            early_bird_part: []
        };
    }

    onAmountChanged({amount, asset}) {

        this.setState({amount, asset, asset_id: asset.get("id"), error: null});
    }

    _checkBalance() {

    }

    componentDidMount() {

        AssetActions.getAssetList.defer(0, 100);;
    }

    _changeType(e) {
        this.setState({
            lock_mode: this.state.unlock_type.indexOf(e.target.value)
        });
    }

    onLeastChanged({amount, asset}) {
        if (!asset) {
            return;
        }
        this.setState({least: amount});
    }

    onMostChanged({amount, asset}) {
        if (!asset) {
            return;
        }
        this.setState({most: amount});
    }

    onSubmit() {

        let args = {
            issuer: ChainStore.getAccount(AccountStore.getState().currentAccount).get("id"),
            asset_id: this.props.asset.get("id"),
            amount: this.state.amount,
            start: this.state.start,
            stop: this.state.stop,
            accepts: this.state.accepts,
            early_bird_part: 0,
            asset_of_top: 0,
            soft_top: 0,
            hard_top: 0,
            early_bird_pecents: [],
            lock_period: 0,
            unlock_type: 0,
            mode: 0
        }

        PresaleActions.createPresale(args);
    }

    addAccept() {
        var accepts = this.state.accepts;
        accepts.push({
            asset_id: this.state.accept_id,
            symbol: ChainStore.getAsset(this.state.accept_id).get("symbol"),
            amount: 0,
            least: 0,
            most: 0,
            base_price: 1000000000000
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

    render() {
        let {amount, assets, least, most, accepts} = this.state;
        // let support_assets = assets.map((ast) => {
        //     if (ast.symbol == this.props.asset.get("symbol")) {
        //         return (<div key={ast.id}></div>);
        //     }
        //     return (
        //         <div className="grid-block buy-sell-row" key={ast.id} style={{marginLeft: 0, width: "50%"}}>
        //             <div className="grid-block small-5 no-margin no-overflow buy-sell-input">
        //                 <ExchangeInput autoComplete="off" placeholder="0.00" />
        //             </div>
        //             <div className="grid-block small-4 no-margin no-overflow buy-sell-box">
        //                 <AssetName dataPlace="right" name={ast.symbol} />
        //                 &nbsp;/&nbsp;
        //                 <AssetName dataPlace="right" name={this.props.asset.get("symbol")} />
        //             </div>
        //         </div>
        //     );
        // }).sort((a, b) => {
        //     if (a.key > b.key) {
        //         return 1;
        //     } else if (a.key < b.key) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // }).toArray();

        let options = this.state.unlock_type.map(mode => {
            return <option key={mode} value={mode}>{counterpart.translate(`presale.lockmode_${mode}`)} </option>;
        });

        let accepts_part = accepts.map(accept => {
            return (
                <tr key={accept.asset_id}>
                    <td>{accept.symbol}</td>
                    <td><input type="text" value={accept.amount} onChange={this.changeAcceptAmount.bind(this, accept)}/></td>
                    <td><input type="text" value={accept.least} onChange={this.changeAcceptLeast.bind(this, accept)}/></td>
                    <td><input type="text" value={accept.most} onChange={this.changeAcceptMost.bind(this, accept)}/></td>
                    <td><button className="button" onClick={this.removeAccept.bind(this, accept.id)}>删除</button></td>
                </tr>
            );
        });

        let supports = assets.filter(ast => {
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
                    {/*{support_assets}*/}
                    <table className="table">
                        <thead>
                        <tr>
                            <th>资产名称</th>
                            <th>总量</th>
                            <th>最低数量</th>
                            <th>最高数量</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {accepts_part}
                        </tbody>
                    </table>
                </label>
            );
        } else {
            modesection = (
                <label>
                    <label style={{width: "50%", display: "inline-block", paddingRight: "2.5%"}}>

                        <AmountSelector
                            label="presale.mintotal"
                            amount={least}
                            onChange={this.onLeastChanged.bind(this)}
                            asset={this.props.asset.get('id')}
                            assets={[this.props.asset.get('id')]}
                            placeholder="0.00"
                        />
                    </label>
                    <label style={{width: "50%", display: "inline-block", paddingLeft: "2.5%"}}>
                        <AmountSelector
                            label="presale.maxtotal"
                            amount={most}
                            onChange={this.onMostChanged.bind(this)}
                            asset={this.props.asset.get('id')}
                            assets={[this.props.asset.get('id')]}
                            placeholder="0.00"
                        />
                    </label>
                </label>
            );
        }

        return (
            <div className="grid-block" style={{paddingTop: "30px"}}>
                <div className="grid-content large-8 large-offset-2 small-12">
                    <Translate content="presale.create" component="h3" />
                    <label>
                        <AmountSelector
                            label="presale.amount"
                            //amount={amount}
                            onChange={this.onAmountChanged.bind(this)}
                            asset={this.props.asset.get("id")}
                            assets={[this.props.asset.get("id"), "1.3.2"]}
                            placeholder="0.00"
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
                        <label style={{display: "inline-block", marginRight: "30"}}>
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
                        <Translate content="presale.lockmode"/>
                        <select
                            //onChange={this._changeType.bind(this)}
                            className="bts-select"
                            //value={this.state.unlock_type[0]}
                        >
                            {options}
                        </select>
                    </label>
                    <div className="button-group">
                        <div className="button" type="submit" onClick={this.onSubmit.bind(this)}>发起众筹</div>
                    </div>
                </div>
            </div>
        );
    }
}

// PresaleCreate.defaultProps = {
//     assets: {}
// };
//
// PresaleCreate.propTypes = {
//     assets: PropTypes.object.isRequired
// };

PresaleCreate = BindToChainState(PresaleCreate);

class AssetUpdateWrapper extends React.Component {

    render() {
        let asset = this.props.params.asset;
        return <PresaleCreate asset={asset} {...this.props}/>;
    }
}

export default AssetUpdateWrapper;