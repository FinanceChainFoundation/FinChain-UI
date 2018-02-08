import React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import PresaleActions from "../../actions/PresaleActions";
import Translate from "react-translate-component";
import {Apis} from "bitsharesjs-ws";
import {ChainStore} from "bitsharesjs/es";
import {Link} from "react-router/es";
import BuyModal from "../Modal/BuyModal";
import PresaleAccept from "./PresaleAccept";

class PresaleHistory extends React.Component {
    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired
    }

    constructor() {
        super();

        this.state = {
            presales: [],
            current_presale: {
                accepts: []
            }
        };


    }

    componentWillMount() {
        Apis.instance().db_api().exec("get_asset_presales", [this.props.asset.get("id")]).then(presales => {
            this.setState({presales: presales});
        });
    }

    buy(presale) {
        this.setState({current_presale: presale});
        this.refs.settlement_modal.show();
    }

    render() {

        let presales = this.state.presales.map(presale => {
            let accepts = presale.accepts.map(accept => {
                //let symbol = ChainStore.getAsset(accept.asset_id).get("symbol")
                return (
                    <PresaleAccept key={accept.asset_id} asset={accept.asset_id}></PresaleAccept>
                );
            });
            return (
                <tr key={presale.id}>
                    <td>{presale.amount}</td>
                    <td>{presale.start} - {presale.stop}</td>
                    <td>{accepts}</td>
                    <td><button className="button outline" onClick={this.buy.bind(this, presale)}><Translate content="presale.buy"/></button></td>
                </tr>
            )
        })

        return (
            <div className="grid-block vertical">
                <div className="grid-block page-layout vertical">
                    <div className="grid-block main-content small-12 medium-10 medium-offset-1 main-content vertical">
                        <Translate content="presale.history" component="h3" />
                        <small>- {this.props.asset.get("symbol")}</small>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>筹资金额</th>
                                <th>起止时间</th>
                                <th>支持币种</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {presales}
                            </tbody>
                        </table>
                    </div>
                </div>
                <BuyModal ref="settlement_modal" asset={this.props.asset} presale={this.state.current_presale}/>
            </div>
        );
    }
}

PresaleHistory = BindToChainState(PresaleHistory);

class PresaleHistoryWrapper extends React.Component {

    render() {
        let asset = this.props.params.asset;
        return <PresaleHistory asset={asset} {...this.props}/>;
    }
}

export default PresaleHistoryWrapper;