import React from "react";
import {Apis} from "bitsharesjs-ws";
import SymbolName from "../Utility/SymbolName";
import {Link} from "react-router/es";
import Translate from "react-translate-component";

class PresaleBoughtRow extends React.Component {

    constructor() {
        super();

        this.state = {
            asset_id: "",
            raw: {
                records: []
            }
        };
    }

    componentWillMount() {
        Apis.instance().db_api().exec("get_objects", [[this.props.presale_id]]).then(presales => {
            this.setState({asset_id: presales[0].asset_id});
        });
    }

    render() {

        let records_sec = this.props.records.map(r => {
            return (
                <tr key={r.when}>
                    <td>{r.amount} <SymbolName asset={r.asset_id}/></td>
                    <td>{r.when}</td>
                </tr>
            );
        });

        return (
            <tr key={this.props.presale_id}>
                <td>
                    <Link to={`presale/history/${this.state.asset_id}`}><SymbolName asset={this.state.asset_id}/></Link>
                </td>
                <td>{this.props.presale.total_balance}</td>
                <td>{this.props.presale.claimed_balance}</td>
                <td>
                    <table className="table">
                        <thead>
                        <tr>
                            <th><Translate content="presale.amount"/></th>
                            <th><Translate content="presale.buy_time"/></th>
                        </tr>
                        </thead>
                        <tbody>
                        {records_sec}
                        </tbody>
                    </table>
                </td>
            </tr>
        )
    }
}

export default PresaleBoughtRow;
