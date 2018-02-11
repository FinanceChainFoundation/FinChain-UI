import React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";

class PresaleBoughtRow extends React.Component {
    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired
    }

    render() {
        return (
            <tr key={this.props.asset.get("id")}>
                <td>{this.props.asset.get("symbol")}</td>
            </tr>
        )
    }
}

export default BindToChainState(PresaleBoughtRow, {keep_updating: true});
