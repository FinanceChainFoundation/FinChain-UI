import React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";

class PresaleAccept extends React.Component {
    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired
    }

    render() {
        return (
            <div>{this.props.asset.get("symbol")}</div>
        )
    }
}

PresaleAccept = BindToChainState(PresaleAccept);

export default PresaleAccept;