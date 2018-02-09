import React from "react";
import {PropTypes} from "react";
import AssetActions from "actions/AssetActions";
import SettingsActions from "actions/SettingsActions";
import {Link} from "react-router/es";
import Immutable from "immutable";
import Translate from "react-translate-component";
import LinkToAccountById from "../Utility/LinkToAccountById";
import assetUtils from "common/asset_utils";
import counterpart from "counterpart";
import FormattedAsset from "../Utility/FormattedAsset";
import AssetName from "../Utility/AssetName";
import {Tabs, Tab} from "../Utility/Tabs";
import {ChainStore} from "bitsharesjs/es";
import AccountStore from "../../stores/AccountStore";

class Assets extends React.Component {

    constructor(props) {
        super();
        this.state = {
            foundLast: false,
            lastAsset: "",
            assetsFetched: 0,
            filterUIA: props.filterUIA || "",
            filterMPA: props.filterMPA || "",
            filterPM: props.filterPM || ""
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !Immutable.is(nextProps.assets, this.props.assets) ||
            nextState.filterMPA !== this.state.filterMPA ||
            nextState.filterUIA !== this.state.filterUIA ||
            nextState.filterPM !== this.state.filterPM
        );
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

    linkToAccount(name_or_id) {
        if(!name_or_id) {
            return <span>-</span>;
        }

        return <LinkToAccountById account={name_or_id}/>
    }

    _onFilter(type, e) {
        this.setState({[type]: e.target.value.toUpperCase()});
        SettingsActions.changeViewSetting({
            [type]: e.target.value.toUpperCase()
        });
    }

    render() {console.log(ChainStore.getAccount("1.2.13"))
        let {assets} = this.props;

        let placeholder = counterpart.translate("markets.filter").toUpperCase();
        let coreAsset = ChainStore.getAsset("1.3.0");

        let uia = assets.filter(a => {
            return !a.market_asset  && a.symbol.indexOf(this.state.filterUIA) !== -1;
        }).map((asset) => {
            let description = assetUtils.parseDescription(asset.options.description);

            let marketID = asset.symbol + "_" + (description.market ? description.market : coreAsset ? coreAsset.get("symbol") : "BTS");
            console.log(AccountStore.getState().currentAccount, asset.issuer);
            return (
                <tr key={asset.symbol}>
                    <td><Link to={`/asset/${asset.symbol}`}><AssetName name={asset.symbol} /></Link></td>
                    <td>{this.linkToAccount(asset.issuer)}</td>
                    <td><FormattedAsset amount={asset.dynamic.current_supply} asset={asset.id} hide_asset={true}/></td>
                    <td>
                        <Link className="button outline" to={`/market/${marketID}`}><Translate content="header.exchange" /></Link>
                        <Link className="button outline" to={`/presale/history/${asset.symbol}`}><Translate content="presale.history"/></Link>
                        {/*{*/}
                            {/*ChainStore.getAccount(AccountStore.getState().currentAccount).get("id") == asset.issuer ?*/}
                                {/*<Link className="button outline" to={`/presale/create/${asset.symbol}`}><Translate content="presale.create"/></Link>*/}
                                {/*:*/}
                                {/*null*/}
                        {/*}*/}
                    </td>
                </tr>
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

        let mia = assets.filter(a => {
            return a.bitasset_data && !a.bitasset_data.is_prediction_market && a.symbol.indexOf(this.state.filterMPA) !== -1;
        }).map((asset) => {
            let description = assetUtils.parseDescription(asset.options.description);

            let marketID = asset.symbol + "_" + (description.market ? description.market : coreAsset ? coreAsset.get("symbol") : "BTS");

            return (
                <tr key={asset.symbol}>
                    <td><Link to={`/asset/${asset.symbol}`}><AssetName name={asset.symbol} /></Link></td>
                    <td>{this.linkToAccount(asset.issuer)}</td>
                    <td><FormattedAsset amount={asset.dynamic.current_supply} asset={asset.id} hide_asset={true}/></td>
                    <td><Link className="button outline" to={`/market/${marketID}`}><Translate content="header.exchange" /></Link></td>
                </tr>
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



        let pm = assets.filter(a => {

            let description = assetUtils.parseDescription(a.options.description);

            return (
                a.bitasset_data &&
                a.bitasset_data.is_prediction_market &&
                (a.symbol.toLowerCase().indexOf(this.state.filterPM.toLowerCase()) !== -1 || description.main.toLowerCase().indexOf(this.state.filterPM.toLowerCase()) !== -1)
            );
        }).map((asset) => {
            let description = assetUtils.parseDescription(asset.options.description);
            let marketID = asset.symbol + "_" + (description.market ? description.market : coreAsset ? coreAsset.get("symbol") : "BTS");

            return (
                <tr key={asset.id.split(".")[2]}>
                    <td style={{width: "80%"}}>
                        <div style={{paddingTop: 10, fontWeight: "bold"}}>
                            <Link to={`/asset/${asset.symbol}`}><AssetName name={asset.symbol} /></Link>
                            {description.condition ? <span> ({description.condition})</span> : null}
                        </div>
                        {description ?
                        <div style={{padding: "10px 20px 5px 0", lineHeight: "18px"}}>
                            {description.main}
                        </div> : null}
                        <div style={{padding: "0 20px 5px 0", lineHeight: "18px"}}>
                            <LinkToAccountById account={asset.issuer} />
                            <span> - <FormattedAsset amount={asset.dynamic.current_supply} asset={asset.id} /></span>
                            {description.expiry ? <span> - {description.expiry}</span> : null}
                        </div>
                    </td>
                    <td style={{width: "20%"}}>
                        <Link className="button outline" to={`/market/${marketID}`}><Translate content="header.exchange" /></Link>
                    </td>
                </tr>
            );
        }).sort((a, b) => {
            if (a.key > b.key) {
                return -1;
            } else if (a.key < b.key) {
                return 1;
            } else {
                return 0;
            }
        }).toArray();

        return (
            <div className="grid-block vertical">
                <div className="grid-block page-layout vertical">
                    <div className="grid-block main-content small-12 medium-10 medium-offset-1 main-content vertical">
                        <div className="generic-bordered-box">
                            <Tabs
                                tabsClass="no-padding bordered-header"
                                setting="assetsTab"
                                className="grid-block vertical no-overflow no-padding"
                                contentClass="grid-block vertical"
                            >
                                <Tab title="explorer.assets.market">
                                    <div className="grid-block shrink">
                                        <div className="grid-content">
                                            <input style={{maxWidth: "500px"}} placeholder={placeholder} type="text" value={this.state.filterMPA} onChange={this._onFilter.bind(this, "filterMPA")}></input>
                                        </div>
                                    </div>
                                    <div className="grid-block" style={{paddingBottom: 20}}>
                                        <div className="grid-content">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th><Translate component="span" content="explorer.assets.symbol" /></th>
                                                    <th><Translate component="span" content="explorer.assets.issuer" /></th>
                                                    <th><Translate component="span" content="markets.supply" /></th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {mia}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab>

                                <Tab title="explorer.assets.user">
                                    <div className="grid-block shrink">
                                        <div className="grid-content">
                                            <input style={{maxWidth: "500px"}} placeholder={placeholder} type="text" value={this.state.filterUIA} onChange={this._onFilter.bind(this, "filterUIA")}></input>
                                        </div>
                                    </div>
                                    <div className="grid-block" style={{paddingBottom: 20}}>
                                        <div className="grid-content">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th><Translate component="span" content="explorer.assets.symbol" /></th>
                                                    <th><Translate component="span" content="explorer.assets.issuer" /></th>
                                                    <th><Translate component="span" content="markets.supply" /></th>
                                                    <th></th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {uia}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab>

                                <Tab title="explorer.assets.prediction">
                                    <div className="grid-block shrink">
                                        <div className="grid-content">
                                            <input style={{maxWidth: "500px"}} placeholder={counterpart.translate("markets.search").toUpperCase()} type="text" value={this.state.filterPM} onChange={this._onFilter.bind(this, "filterPM")}></input>
                                        </div>
                                    </div>
                                    <div className="grid-block" style={{paddingBottom: 20}}>
                                        <div className="grid-content">
                                            <table className="table">
                                                <tbody>
                                                {pm}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Assets.defaultProps = {
    assets: {}
};

Assets.propTypes = {
    assets: PropTypes.object.isRequired
};

export default Assets;
