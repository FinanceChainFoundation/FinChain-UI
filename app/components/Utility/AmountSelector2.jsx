import React from "react";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import FormattedAsset from "./FormattedAsset";
import FloatingDropdown from "./FloatingDropdown2";
import Immutable from "immutable";
import counterpart from "counterpart";

class AssetSelector extends React.Component {

    static propTypes = {
        assets: ChainTypes.ChainAssetsList,
        value: React.PropTypes.string, // asset id
        onChange: React.PropTypes.func
    };

    render() {
        if(this.props.assets.length === 0) return null;

        return <FloatingDropdown
            entries={this.props.assets.map(a => a && a.get("symbol")).filter(a => !!a)}
            values={this.props.assets.reduce((map, a) => {if (a && a.get("symbol")) map[a.get("symbol")] = a; return map;}, {})}
            singleEntry={this.props.assets[0] ? <FormattedAsset asset={this.props.assets[0].get("id")} amount={0} hide_amount={true}/> : null}
            value={this.props.value}
            onChange={this.props.onChange}
        />;
    }
}

AssetSelector = BindToChainState(AssetSelector);

class AmountSelector2 extends React.Component {

    static propTypes = {
        label: React.PropTypes.string, // a translation key for the label
        asset: ChainTypes.ChainAsset.isRequired, // selected asset by default
        assets: React.PropTypes.array,
        amount: React.PropTypes.any,
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        tabIndex: React.PropTypes.number,
        error: React.PropTypes.string
    };

    static defaultProps = {
        disabled: false
    };

    componentDidMount() {
        this.onAssetChange(this.props.asset);
    }

    formatAmount(v) {
        /*// TODO: use asset's precision to format the number*/
        if (!v) v = "";
        if (typeof v === "number") v = v.toString();
        let value = v.trim().replace(/,/g, "");

        return value;
    }

    _onChange(event) {
        let amount = event.target.value;
        this.props.onChange({amount: amount, asset: this.props.asset});
    }

    onAssetChange(selected_asset) {
        this.props.onChange({amount: this.props.amount, asset: selected_asset});
    }

    render() {
        let value = this.props.error ? counterpart.translate(this.props.error) : this.formatAmount(this.props.amount);
        return (
            <div className="amount-selector" style={this.props.style}>

                <Translate className="left-label" component="label" content="transfer.header3"/>
                <div className="form-label select floating-dropdown"
                 style={{backgroundColor: "rgba(128, 128, 128, 0.45)",
                     border: 0, margin:"1rem 0",borderRadius:"5px"}}>
                    <AssetSelector
                        ref={this.props.refCallback}
                        value={this.props.asset.get("symbol")}
                        assets={Immutable.List(this.props.assets)}
                        onChange={this.onAssetChange.bind(this)}
                    />
                </div>

                <label className="right-label">{this.props.display_balance}</label>
                <Translate className="left-label" component="label" content={this.props.label}/>
                <div className="inline-label input-wrapper">
                    <input
                        disabled={this.props.disabled}
                        type="text"
                        value={value || ""}
                        placeholder={this.props.placeholder}
                        onChange={this._onChange.bind(this) }
                        tabIndex={this.props.tabIndex}
                    />

                </div>
            </div>
        )
    }
}
AmountSelector2 = BindToChainState(AmountSelector2);

export default AmountSelector2;
