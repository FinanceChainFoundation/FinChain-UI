import React from "react";
import ChainTypes from "./ChainTypes";
import BindToChainState from "./BindToChainState";

class SymbolName extends React.Component {
    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired
    }

    render() {
        return (
            <span>{this.props.asset.get("symbol")}</span>
        );
    }
}

export default BindToChainState(SymbolName);