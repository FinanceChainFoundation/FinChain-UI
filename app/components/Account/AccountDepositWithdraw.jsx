import React from "react";
import { connect } from "alt-react";
import accountUtils from "common/account_utils";
import utils from "common/utils";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import BlockTrades2 from "./BlockTrades2";
import BlockTrades3 from "./BlockTrades3";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import SettingsActions from "actions/SettingsActions";
import { Apis } from "bitsharesjs-ws";
import { settingsAPIs, rudexAPIs } from "api/apiConfig";

import GatewayStore from "stores/GatewayStore";
import GatewayActions from "actions/GatewayActions";
import AccountImage from "../Account/AccountImage";

class AccountDepositWithdraw extends React.Component {

    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired,
        contained: React.PropTypes.bool
    };

    static defaultProps = {
        contained: false
    };

    constructor(props) {
        super();
        this.state = {
            olService: props.viewSettings.get("olService", "gateway"),
            rudexService: props.viewSettings.get("rudexService", "gateway"),
            btService: props.viewSettings.get("btService", "bridge"),
            metaService: props.viewSettings.get("metaService", "bridge"),
            activeService: props.viewSettings.get("activeService", 0)
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.account !== this.props.account ||
            nextProps.servicesDown !== this.props.servicesDown ||
            !utils.are_equal_shallow(nextProps.blockTradesBackedCoins, this.props.blockTradesBackedCoins) ||
            !utils.are_equal_shallow(nextProps.openLedgerBackedCoins, this.props.openLedgerBackedCoins) ||
            nextState.olService !== this.state.olService ||
            nextState.rudexService !== this.state.rudexService ||
            nextState.btService !== this.state.btService ||
            nextState.metaService !== this.state.metaService ||
            nextState.activeService !== this.state.activeService
        );
    }

    componentWillMount() {
        accountUtils.getFinalFeeAsset(this.props.account, "transfer");
    }

    toggleOLService(service) {
        this.setState({
            olService: service
        });

        SettingsActions.changeViewSetting({
            olService: service
        });
    }

    toggleRuDEXService(service) {
        this.setState({
            rudexService: service
        });

        SettingsActions.changeViewSetting({
            rudexService: service
        });
    }

    toggleBTService(service) {
        this.setState({
            btService: service
        });

        SettingsActions.changeViewSetting({
            btService: service
        });
    }

    toggleMetaService(service) {
        this.setState({
            metaService: service
        });

        SettingsActions.changeViewSetting({
            metaService: service
        });
    }

    onSetService(e) {
        //let index = this.state.services.indexOf(e.target.value);
        this.setState({
            activeService: parseInt(e.target.value)
        });

        SettingsActions.changeViewSetting({
            activeService: parseInt(e.target.value)
        });
    }

    renderServices(openLedgerGatewayCoins, rudexGatewayCoins) {
        //let services = ["Openledger (OPEN.X)", "BlockTrades (TRADE.X)", "Transwiser", "BitKapital"];
        let serList = [];
        let { account } = this.props;
        let { olService, btService, rudexService } = this.state;

        serList.push({
            name: "Openledger (OPEN.X)",
            template: (
                <div className="content-block">
                        {/* <div className="float-right">
                            <a href="https://www.ccedk.com/" target="__blank" rel="noopener noreferrer"><Translate content="gateway.website" /></a>
                        </div> */}
                        <div className="service-selector">
                            <ul className="button-group segmented no-margin">
                                <li onClick={this.toggleOLService.bind(this, "gateway")} className={olService === "gateway" ? "is-active" : ""}><a><Translate content="gateway.gateway" /></a></li>
                                <li onClick={this.toggleOLService.bind(this, "fiat")} className={olService === "fiat" ? "is-active" : ""}><a><Translate content="gateway.gateways" /></a></li>
                            </ul>
                        </div>

                        {olService === "gateway" ?
                            <BlockTrades2
                                account={account}
                            /> :null}

                        {olService === "fiat" ?
                            <BlockTrades3
                            />
                        : null}
                    </div>
            )
        });


        return serList;
    }

    render() {
        let { account, servicesDown } = this.props;
        let { activeService } = this.state;

        let openLedgerGatewayCoins = this.props.openLedgerBackedCoins.map(coin => {
            return coin;
        })
        .sort((a, b) => {
            if (a.symbol < b.symbol)
                return -1;
            if (a.symbol > b.symbol)
                return 1;
            return 0;
        });

        let rudexGatewayCoins = this.props.rudexBackedCoins.map(coin => {
            return coin;
        })
        .sort((a, b) => {
            if (a.symbol < b.symbol)
                return -1;
            if (a.symbol > b.symbol)
                return 1;
            return 0;
        });

        let services = this.renderServices(openLedgerGatewayCoins, rudexGatewayCoins);

        let options = services.map((services_obj, index) => {
            return <option key={index} value={index}>{services_obj.name}</option>;
        });

        const serviceNames = ["OPEN", "RUDEX", "TRADE", "BITKAPITAL"];
        const currentServiceName = serviceNames[activeService];
        const currentServiceDown = servicesDown.get(currentServiceName);

        return (
            <div className={this.props.contained ? "grid-content" : "grid-container"}>
                <div className={this.props.contained ? "" : "grid-content"} style={{paddingTop: "2rem"}}>

                    {/*<Translate content="gateway.title" component="h2" />*/}
                    {/*<div className="grid-block vertical medium-horizontal no-margin no-padding">*/}
                        {/*<div className="medium-6 show-for-medium">*/}
                            {/*<HelpContent path="components/DepositWithdraw" section="deposit-short"/>*/}
                        {/*</div>*/}
                        {/*<div className="medium-5 medium-offset-1">*/}
                            {/*/!*<HelpContent account={account.get("name")} path="components/DepositWithdraw" section="receive"/>*!/*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <div>
                        <div className="grid-block vertical medium-horizontal no-margin no-padding">

                            {/*<div className="medium-5  small-order-1 medium-order-1" style={{paddingBottom: 20}}>*/}
                                {/*<Translate component="label" className="left-label" content="gateway.your_account" />*/}
                                {/*<div className="inline-label">*/}
                                    {/*<AccountImage*/}
                                        {/*size={{height: 40, width: 40}}*/}
                                        {/*account={account.get("name")} custom_image={null}*/}
                                    {/*/>*/}
                                    {/*<input type="text"*/}
                                           {/*value={account.get("name")}*/}
                                           {/*placeholder={null}*/}
                                           {/*disabled*/}
                                           {/*onChange={() => {}}*/}
                                           {/*onKeyDown={() => {}}*/}
                                           {/*tabIndex={1}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    <div className="grid-content no-padding" style={{paddingTop: 15}}>
                    {currentServiceDown ? null : activeService && services[activeService] ? services[activeService].template : services[0].template}
                    </div>
                </div>
            </div>
        );
    }
};
AccountDepositWithdraw = BindToChainState(AccountDepositWithdraw);

class DepositStoreWrapper extends React.Component {

    componentWillMount() {
        if (Apis.instance().chain_id.substr(0, 8) === "4018d784") { // Only fetch this when on BTS main net
            GatewayActions.fetchCoins.defer(); // Openledger
            GatewayActions.fetchCoinsSimple.defer({backer: "RUDEX", url:rudexAPIs.BASE+rudexAPIs.COINS_LIST}); // RuDEX
            GatewayActions.fetchCoins.defer({backer: "TRADE"}); // Blocktrades
        }
    }

    render() {
        return <AccountDepositWithdraw {...this.props}/>;
    }
}

export default connect(DepositStoreWrapper, {
    listenTo() {
        return [AccountStore, SettingsStore, GatewayStore];
    },
    getProps() {
        return {
            account: AccountStore.getState().currentAccount,
            viewSettings: SettingsStore.getState().viewSettings,
            openLedgerBackedCoins: GatewayStore.getState().backedCoins.get("OPEN", []),
            rudexBackedCoins: GatewayStore.getState().backedCoins.get("RUDEX", []),
            blockTradesBackedCoins: GatewayStore.getState().backedCoins.get("TRADE", []),
            servicesDown: GatewayStore.getState().down || {}
        };
    }
});
