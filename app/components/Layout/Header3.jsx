import React from "react";
import {Link} from "react-router/es";
import { connect } from "alt-react";
import ActionSheet from "react-foundation-apps/src/action-sheet";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Icon from "../Icon/Icon";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import WalletDb from "stores/WalletDb";
import WalletUnlockStore from "stores/WalletUnlockStore";
import WalletUnlockActions from "actions/WalletUnlockActions";
import WalletManagerStore from "stores/WalletManagerStore";
import cnames from "classnames";
import TotalBalanceValue from "../Utility/TotalBalanceValue";
import ReactTooltip from "react-tooltip";
import { Apis } from "bitsharesjs-ws";
import notify from "actions/NotificationActions";
import IntlActions from "actions/IntlActions";
import AccountImage from "../Account/AccountImage";

var logo = require("./logo02.png");
var tem = require("./tele1.png");
var wx = require("./weixin1.png");

var warpspans ={
    position: "relative",
    float: "right",
    width: "70px",
    backgroundImage:`url(${tem})no-repeat`
};

const FlagImage = ({flag,width = 20,height = 20}) => {
    return <img height={height} width={width} src={`${__BASE_URL__}language-dropdown/${flag.toUpperCase()}.png`} />;
};

class Header3 extends React.Component {

    static contextTypes = {
        location: React.PropTypes.object.isRequired,
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props);
        this.state = {
            modalIsOpen:'none',
            atUserItems:false,
            active: context.location.pathname
        };

        this.unlisten = null;
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.userCenter = this.userCenter.bind(this);
        this.handleMouseUserOver = this.handleMouseUserOver.bind(this);
    }

    handleMouseOver(){
        this.setState({
            modalIsOpen: 'block',
        });
    }

    handleMouseOut(){

        this.setState({
            modalIsOpen: 'none',
        });

    }
    handleMouseUserOver(){
        this.setState({
            modalIsOpen: 'block',
        });
    }
    userCenter(){
        this.setState({
            modalIsOpen: 'none',
        });
    }


    componentWillMount() {
        this.unlisten = this.context.router.listen((newState, err) => {
            if (!err) {
                if (this.unlisten && this.state.active !== newState.pathname) {
                    this.setState({
                        active: newState.pathname
                    });
                }
            }
        });
    }

    componentDidMount() {
        setTimeout(() => {
            ReactTooltip.rebuild();
        }, 1250);
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
            this.unlisten = null;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.linkedAccounts !== this.props.linkedAccounts ||
            nextProps.currentAccount !== this.props.currentAccount ||
            nextProps.passwordLogin !== this.props.passwordLogin ||
            nextProps.locked !== this.props.locked ||
            nextProps.current_wallet !== this.props.current_wallet ||
            nextProps.lastMarket !== this.props.lastMarket ||
            nextProps.starredAccounts !== this.props.starredAccounts ||
            nextProps.currentLocale !== this.props.currentLocale ||
            nextState.active !== this.state.active
        );
    }

    _triggerMenu(e) {
        e.preventDefault();
        ZfApi.publish("mobile-menu", "toggle");
    }

    _toggleLock(e) {
        e.preventDefault();
        if (WalletDb.isLocked()) {
            WalletUnlockActions.unlock().then(() => {
                AccountActions.tryToSetCurrentAccount();
            });
        } else {
            WalletUnlockActions.lock();
        }
    }

    _onNavigate(route, e) {
        e.preventDefault();
        this.context.router.push(route);
    }

    _onGoBack(e) {
        e.preventDefault();
        window.history.back();
    }

    _onGoForward(e) {
        e.preventDefault();
        window.history.forward();
    }

    _accountClickHandler(account_name, e) {
        e.preventDefault();
        ZfApi.publish("account_drop_down", "close");
        if (this.context.location.pathname.indexOf("/account/") !== -1) {
            let currentPath = this.context.location.pathname.split("/");
            currentPath[2] = account_name;
            this.context.router.push(currentPath.join("/"));
        }
        if (account_name !== this.props.currentAccount) {
            AccountActions.setCurrentAccount.defer(account_name);
            notify.addNotification({
                message: counterpart.translate("header.account_notify", {account: account_name}),
                level: "success",
                autoDismiss: 3
            });
        }
        // this.onClickUser(account_name, e);
    }

	// onClickUser(account, e) {
	//     e.stopPropagation();
	//     e.preventDefault();
	//
	//     this.context.router.push(`/account/${account}/overview`);
	// }

    render() {
        let {active} = this.state;
        let {currentAccount, starredAccounts, passwordLogin} = this.props;
        let locked_tip = counterpart.translate("header.locked_tip");
        let unlocked_tip = counterpart.translate("header.unlocked_tip");

        let tradingAccounts = AccountStore.getMyAccounts();

        if(starredAccounts.size) {
            for(let i = tradingAccounts.length - 1; i >= 0; i--) {
                if(!starredAccounts.has(tradingAccounts[i])) {
                    tradingAccounts.splice(i, 1);
                }
            };
            starredAccounts.forEach(account => {
                if(tradingAccounts.indexOf(account.name) === -1) {
                    tradingAccounts.push(account.name);
                }
            });
        }

        let myAccounts = AccountStore.getMyAccounts();
        let myAccountCount = myAccounts.length;

        let walletBalance = myAccounts.length && this.props.currentAccount ? (

            <div className="grp-menu-item header-balance">
                <a><TotalBalanceValue.AccountWrapper label="header.account_value" accounts={[this.props.currentAccount]} inHeader={true}/></a>
            </div>) : null;

        let dashboard = (
            <a
                style={{paddingTop: 12, paddingBottom: 12}}
                className={cnames({active: active === "/" || (active.indexOf("trade") !== -1 && active.indexOf("trade") === -1)})}
                onClick={this._onNavigate.bind(this, "/trade")}
            >
                <img style={{margin: 0, height: 40}} src={logo} />
            </a>
        );

        let createAccountLink = myAccountCount === 0 ? (
            <ActionSheet.Button title="" setActiveState={() => {}}>
                <a className="button create-account" onClick={this._onNavigate.bind(this, "/trade")} style={{padding: "1rem", border: "none"}} >
                    <Icon className="icon-14px" name="user"/> <Translate content="header.create_account" />
                </a>
            </ActionSheet.Button>
        ) : null;

        let lock_unlock = ((!!this.props.current_wallet) || passwordLogin) ? (
            <div className="menu-bars2">
                { this.props.locked ?
                    <a style={{padding: "1rem"}} href onClick={this._toggleLock.bind(this)} data-class="unlock-tooltip" data-offset="{'left': 50}" data-tip={locked_tip} data-place="bottom" data-html><Icon className="icon-14px" name="locked"/></a>
                    : <a style={{padding: "1rem"}} href onClick={this._toggleLock.bind(this)} data-class="unlock-tooltip" data-offset="{'left': 50}" data-tip={unlocked_tip} data-place="bottom" data-html><Icon className="icon-14px" name="unlocked"/></a> }
            </div>
        ) : null;

        let tradeLink = this.props.lastMarket ?
			<a className = {cnames({active: active.indexOf("market/") !== -1})}onClick = {
			this._onNavigate.bind(this, `/market/${this.props.lastMarket}`)
		}><Translate component = "span" content = "header.exchange" /> </a>:
			<a className = {cnames({active: active.indexOf("market/") !== -1})}
		onClick = {
			this._onNavigate.bind(this, "/market/JRC_BTC")
		} > <Translate component = "span"
		content = "header.exchange" /> </a>;

		// Account selector: Only active inside the exchange
        let accountsDropDown = null, account_display_name, accountsList;
        if(currentAccount) {
            account_display_name = currentAccount.length > 20 ? `${currentAccount.slice(0, 20)}..` : currentAccount;
            if(tradingAccounts.indexOf(currentAccount) < 0) {
                tradingAccounts.push(currentAccount);
            }
            if(tradingAccounts.length >= 1) {
                accountsList = tradingAccounts
                    .sort()
                    .map((name, index) => {
                        return(
                            <li className={name === account_display_name ? "current-account" : ""} key={name}>
                                <a href onClick={this._accountClickHandler.bind(this, name)}>
                                    <div className="table-cell"><AccountImage style={{position: "relative", top: 5}} size={{height: 20, width: 20}} account={name}/></div>
                                    <div className="table-cell" style={{paddingLeft: 10}}><span className="lower-case">{name}</span></div>
                                </a>
                            </li>
                        );
                    });
            }
        }
        accountsDropDown = createAccountLink ?
			createAccountLink :
			tradingAccounts.length === 1 ?
			(<ActionSheet.Button title="" setActiveState={() => {}}>
            <a onClick={this._accountClickHandler.bind(this, account_display_name)} style={{cursor: "default", padding: "1rem", border: "none"}} className="button">
                <div className="table-cell"><AccountImage style={{display: "inline-block"}} size={{height: 20, width: 20}} account={account_display_name}/></div>
                <div className="table-cell" style={{paddingLeft: 5, verticalAlign: "middle"}}><div className="inline-block"><span className="lower-case">{account_display_name}</span></div></div>
            </a>
        </ActionSheet.Button>) :

			(<ActionSheet>
            <ActionSheet.Button title="">
                <a style={{padding: "1rem", border: "none"}} className="button">
                    <div className="table-cell"><AccountImage style={{display: "inline-block"}} size={{height: 20, width: 20}} account={account_display_name}/></div>
                    <div className="table-cell" style={{paddingLeft: 5, verticalAlign: "middle"}}><div className="inline-block"><span className="lower-case">{account_display_name}</span></div></div>
                </a>
            </ActionSheet.Button>
            {tradingAccounts.length > 1 ?
            <ActionSheet.Content>
                <ul className="no-first-element-top-border">
                     {accountsList}
                </ul>
            </ActionSheet.Content> : null}
        </ActionSheet>);

        let settingsDropdown = <ActionSheet>
            <ActionSheet.Button title="">
                <a style={{padding: "1rem", border: "none",color:"white",backgroundColor:"red" }} className="button">
                    <Icon className="icon-14px" name="cog"/>
                </a>
            </ActionSheet.Button>
            <ActionSheet.Content>
                <ul className="no-first-element-top-border">
                    <li>
                        <a href onClick={this._onNavigate.bind(this, "/settings")}>
                            <span><Translate content="header.settings" /></span>
                        </a>
                    </li>


                    <li>
                        <a href onClick={this._onNavigate.bind(this, "/explorer")}>
                            <span><Translate content="header.explorer" /></span>
                        </a>
                    </li>
                    <li>
                        <a href onClick={this._onNavigate.bind(this, "/help/introduction/bitshares")}>
                            <span><Translate content="header.help" /></span>
                        </a>
                    </li>
                </ul>

            </ActionSheet.Content>
        </ActionSheet>;

        const flagDropdown = <ActionSheet>
            <ActionSheet.Button title="">
                <a style={{padding: "1rem", border: "none",marginTop:"6px"}} className="button">
                    <FlagImage flag={this.props.currentLocale} />
                </a>
            </ActionSheet.Button>
            <ActionSheet.Content>
                <ul className="no-first-element-top-border">
                    {this.props.locales.map(locale => {
                        return (
                            <li key={locale}>
                                <a href onClick={(e) => {e.preventDefault(); IntlActions.switchLocale(locale);}}>
                                    <div className="table-cell"><FlagImage flag={locale} /></div>
                                    <div className="table-cell" style={{paddingLeft: 10}}><Translate content={"languages." + locale} /></div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </ActionSheet.Content>
        </ActionSheet>;

        const enableDepositWithdraw = Apis.instance().chain_id.substr(0, 8) === "4018d784";

        return(
            <div className="header">
                <div className="menu-bar1">
                    <div className="menu-bar1 warp">
                        <div className="warp spans">
                            <span className="warp spans sll"  >客服邮箱：xuleizhen@finchain.info</span>
                            <span className="warp spans sll2" >客服微信号：finchain4</span>
                            <div className="warp spans a" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut}><img src={wx} /></div>
                            <div className="warp spans cc"> <img src={tem} /></div>
                            <div className="warp spans a" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
                                <img src={tem} />
                            </div>
                            <div className="warp spans cc"> <img src={tem} /></div>

                        </div>
                    </div>
                </div>
                <div className="menu-bar2">
                    <div className="menu-bar2 warp">
                        <ul className="menu-bars">
                            <li>{dashboard}</li>
                            {!currentAccount ? null : <li><Link to={`/account/${currentAccount}/overview`} className={cnames({active: active.indexOf("account/") !== -1})}><Translate content="header.account" /></Link></li>}
                            <li>{tradeLink}</li>

                            {currentAccount || myAccounts.length ? <li><a className={cnames({active: active.indexOf("deposit-withdraw") !== -1})} href="https://gateway-tran.finchain.info/qrcode" target="_blank"><Translate component="span" content="account.deposit_withdraw" /></a></li> : null}

                            {currentAccount || myAccounts.length ? <li><a className={cnames({active: active.indexOf("transfer") !== -1})} onClick={this._onNavigate.bind(this, "/transfer")}><Translate component="span" content="header.payments" /></a></li> : null}

                            {/*currentAccount || myAccounts.length ? <li><a className={cnames({active: active.indexOf("transfer") !== -1})} onClick={this._onNavigate.bind(this, "/lock")}><Translate component="span" content="header.deposit" /></a></li> : null*/}
                            {!(currentAccount || myAccounts.length) ? <li><a className={cnames({active: active.indexOf("explorer") !== -1})} onClick={this._onNavigate.bind(this, "/explorer")}><Translate component="span" content="header.explorer" /></a></li> : null}
                            {enableDepositWithdraw && currentAccount && myAccounts.indexOf(currentAccount) !== -1 ? <li><a href="https://gateway-tran.finchain.info/qrcode" target="_blank" ><Translate content="account.deposit_withdraw"/></a></li> : null}
                            <li>
                                <a href="http://order.finchain.info/article" target="_blank" >
                                    <Translate component="span" content="header.work_orde" />
                                </a>
                            </li>
                            <li>
                                <a href="http://order.finchain.info/" target="_blank" >
                                    <Translate component="span" content="header.work_order" />
                                </a>
                            </li>
                        </ul>
                        {lock_unlock}
                        {myAccountCount !== 0 ? null :<div className="menu-bars2" >
                            {settingsDropdown}
                        </div>}
                        {myAccountCount !== 0 ? null :<div className="menu-bars2" >
                            {flagDropdown}
                        </div>}
                        {<div className="menu-bars2">
                            {!(currentAccount || myAccounts.length) ?<a className={cnames({active: active.indexOf("create-account") !== -1})} onClick={this._onNavigate.bind(this, "/create-account")}>注册</a>: null}

                        </div>}
                        <div className="menu-bars2" >
                                {!(currentAccount || myAccounts.length) ?<a className={cnames({active: active.indexOf("create-account") !== -1})} onClick={this._onNavigate.bind(this, "/create-account")}>登录</a>: null}
                        </div>









                    </div>
                </div>
                {__ELECTRON__ ? <div className="grid-block show-for-medium shrink electron-navigation">
                    {/*<ul className="menu-bar">*/}
                        {/*<li>*/}
                            {/*<div style={{marginLeft: "1rem", height: "3rem"}}>*/}
                                {/*<div style={{marginTop: "0.5rem"}} onClick={this._onGoBack.bind(this)} className="button outline small">{"<"}</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<div style={{height: "3rem", marginLeft: "0.5rem", marginRight: "0.75rem"}}>*/}
                                {/*<div style={{marginTop: "0.5rem"}} onClick={this._onGoForward.bind(this)} className="button outline small">></div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    {/*</ul>*/}
                </div> : null}
                {/*<div className="grid-block show-for-medium">*/}
                    {/*<ul className="menu-bar">*/}
                        {/*<li>{dashboard}</li>*/}
                        {/*{!currentAccount ? null : <li><Link to={`/account/${currentAccount}/overview`} className={cnames({active: active.indexOf("account/") !== -1})}><Translate content="header.account" /></Link></li>}*/}
                        {/*<li>{tradeLink}</li>*/}

                        {/*{currentAccount || myAccounts.length ? <li><a className={cnames({active: active.indexOf("deposit-withdraw") !== -1})} href="https://gateway-tran.finchain.info/qrcode" target="_blank"><Translate component="span" content="account.deposit_withdraw" /></a></li> : null}*/}

                        {/*{currentAccount || myAccounts.length ? <li><a className={cnames({active: active.indexOf("transfer") !== -1})} onClick={this._onNavigate.bind(this, "/transfer")}><Translate component="span" content="header.payments" /></a></li> : null}*/}

                        {/*/!*currentAccount || myAccounts.length ? <li><a className={cnames({active: active.indexOf("transfer") !== -1})} onClick={this._onNavigate.bind(this, "/lock")}><Translate component="span" content="header.deposit" /></a></li> : null*!/*/}
                        {/*{!(currentAccount || myAccounts.length) ? <li><a className={cnames({active: active.indexOf("explorer") !== -1})} onClick={this._onNavigate.bind(this, "/explorer")}><Translate component="span" content="header.explorer" /></a></li> : null}*/}
                        {/*{enableDepositWithdraw && currentAccount && myAccounts.indexOf(currentAccount) !== -1 ? <li><a href="https://gateway-tran.finchain.info/qrcode" target="_blank" ><Translate content="account.deposit_withdraw"/></a></li> : null}*/}
                        {/*<li>*/}
                            {/*<a href="http://order.finchain.info/article" target="_blank" >*/}
                                {/*<Translate component="span" content="header.work_orde" />*/}
                            {/*</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<a href="http://order.finchain.info/" target="_blank" >*/}
                                {/*<Translate component="span" content="header.work_order" />*/}
                            {/*</a>*/}
                        {/*</li>*/}
                    {/*</ul>*/}

                    {/*<div className="my-login"  style={{position:"absolute",right:"0",bottom:"20px",width:"80px",height:"20px",lineHeight:"20px",textAlign:"center"}} >*/}
                        {/*{!(currentAccount || myAccounts.length) ?<a className={cnames({active: active.indexOf("create-account") !== -1})} onClick={this._onNavigate.bind(this, "/create-account")}><Translate content="All_increase.login" /></a>: null}*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div className="grid-block show-for-medium shrink">*/}

                    {/*<div className="grp-menu-items-group header-right-menu">*/}


                        {/*{!myAccountCount || !walletBalance ? null : walletBalance}*/}



                        {/*{<div className="grp-menu-item overflow-visible account-drop-down">*/}
                            {/*{accountsDropDown}*/}
                        {/*</div>}*/}

                        {/*{!myAccountCount ? null : <div className="grp-menu-item overflow-visible account-drop-down">*/}
                            {/*{flagDropdown}*/}
                        {/*</div>}*/}

                        {/*{!myAccountCount ? null : <div className="grp-menu-item overflow-visible" >*/}
                            {/*{settingsDropdown}*/}
                        {/*</div>}*/}

                        {/*{lock_unlock}*/}

                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default connect(Header3, {
    listenTo() {
        return [AccountStore, WalletUnlockStore, WalletManagerStore, SettingsStore];
    },
    getProps() {
        const chainID = Apis.instance().chain_id;
        return {
            linkedAccounts: AccountStore.getState().linkedAccounts,
            currentAccount: AccountStore.getState().currentAccount || AccountStore.getState().passwordAccount,
            locked: WalletUnlockStore.getState().locked,
            current_wallet: WalletManagerStore.getState().current_wallet,
            lastMarket: SettingsStore.getState().viewSettings.get(`lastMarket${chainID ? ("_" + chainID.substr(0, 8)) : ""}`),
            starredAccounts: AccountStore.getState().starredAccounts,
            passwordLogin: SettingsStore.getState().settings.get("passwordLogin"),
            currentLocale: SettingsStore.getState().settings.get("locale"),
            locales: SettingsStore.getState().defaults.locale
        };
    }

});