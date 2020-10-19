import React from "react";
import counterpart from "counterpart";
import IntlActions from "actions/IntlActions";
import Translate from "react-translate-component";
import SettingsActions from "actions/SettingsActions";
import WebsocketAddModal from "./WebsocketAddModal";
import SettingsEntry from "./SettingsEntry";
import AccountsSettings from "./AccountsSettings";
import WalletSettings from "./WalletSettings";
import PasswordSettings from "./PasswordSettings";
import RestoreSettings from "./RestoreSettings";
import BackupSettings from "./BackupSettings";
import AccessSettings from "./AccessSettings";

class Settings extends React.Component {

    constructor(props) {
        super();

        let menuEntries = this._getMenuEntries(props);
        let activeSetting = props.viewSettings.get("activeSetting", 0);
        if (activeSetting > (menuEntries.length - 1)) {
            activeSetting = 0;
        }

        this.state = {
            apiServer: props.settings.get("apiServer"),
            activeSetting,
            menuEntries,
            settingEntries: {
                general: ["locale", "unit", "showSettles", "walletLockTimeout", "themes",
                "showAssetPercent", "passwordLogin", "reset"],
                access: ["apiServer", "faucet_address"]
            }
        };
    }

    componentWillReceiveProps(np) {
        if (np.settings.get("passwordLogin") !== this.props.settings.get("passwordLogin")) {
            const currentEntries = this._getMenuEntries(this.props);
            const menuEntries = this._getMenuEntries(np);
            const currentActive = currentEntries[this.state.activeSetting];
            const newActiveIndex = menuEntries.indexOf(currentActive);
            const newActive = menuEntries[newActiveIndex];
            this.setState({
                menuEntries
            });
            if (newActiveIndex && newActiveIndex !== this.state.activeSetting) {
                this.setState({
                    activeSetting: menuEntries.indexOf(currentActive)
                });
            } else if (!newActive || this.state.activeSetting > (menuEntries.length - 1)) {
                this.setState({
                    activeSetting: 0
                });
            }
        }
    }

    _getMenuEntries(props) {
        let menuEntries = [
            "general",
            "wallet",
            "accounts",
            "password",
            "backup",
            "restore",
            "access",
            "faucet_address"
        ];

        if (props.settings.get("passwordLogin")) {
            menuEntries.splice(4, 1);
            menuEntries.splice(3, 1);
            menuEntries.splice(1, 1);
        }
        return menuEntries;
    }

    triggerModal(e, ...args) {
        this.refs.ws_modal.show(e, ...args);
    }

    _onChangeSetting(setting, e) {
        e.preventDefault();

        let {defaults} = this.props;
        let value = null;

        function findEntry(targetValue, targetDefaults) {
            if (!targetDefaults) return targetValue;
            if (targetDefaults[0].translate) {
                for (var i = 0; i < targetDefaults.length; i++) {
                    if (counterpart.translate(`settings.${targetDefaults[i].translate}`) === targetValue) {
                        return i;
                    }
                }
            } else {
                return targetDefaults.indexOf(targetValue);
            }
        }

        switch (setting) {
        case "locale":
            let myLocale = counterpart.getLocale();
            if (e.target.value !== myLocale) {
                IntlActions.switchLocale(e.target.value);
                SettingsActions.changeSetting({setting: "locale", value: e.target.value });
            }
            break;

        case "themes":
            SettingsActions.changeSetting({setting: "themes", value: e.target.value });
            break;

        case "defaultMarkets":
            break;

        case "walletLockTimeout":
            let newValue = parseInt(e.target.value, 10);
            if (isNaN(newValue)) newValue = 0;
            if (!isNaN(newValue) && typeof newValue === "number") {
                SettingsActions.changeSetting({setting: "walletLockTimeout", value: newValue });
            }
            break;

        case "inverseMarket":
        case "confirmMarketOrder":
            value = findEntry(e.target.value, defaults[setting]) === 0; // USD/BTS is true, BTS/USD is false
            break;

        case "apiServer":
            SettingsActions.changeSetting({setting: "apiServer", value: e.target.value });
            this.setState({
                apiServer: e.target.value
            });
            break;

        case "showSettles":
        case "showAssetPercent":
        case "passwordLogin":
            let reference = defaults[setting][0];
            if (reference.translate) reference = reference.translate;
            SettingsActions.changeSetting({setting, value: e.target.value === reference });
            break;

        case "unit":
            let index = findEntry(e.target.value, defaults[setting]);
            SettingsActions.changeSetting({setting: setting, value: defaults[setting][index]});
            break;

        default:
            value = findEntry(e.target.value, defaults[setting]);
            break;
        }

        if (value !== null) {
            SettingsActions.changeSetting({setting: setting, value: value });
        }

    }

    onReset() {
        SettingsActions.clearSettings();
    }

    _onChangeMenu(entry) {
        let index = this.state.menuEntries.indexOf(entry);
        this.setState({
            activeSetting: index
        });

        SettingsActions.changeViewSetting({activeSetting: index});
    }

    render() {
        let {settings, defaults} = this.props;
        const {menuEntries, activeSetting, settingEntries} = this.state;
        let entries;
        let activeEntry = menuEntries[activeSetting] || menuEntries[0];
        switch (activeEntry) {

        case "accounts":
            entries = <AccountsSettings />;
            break;

        case "wallet":
            entries = <WalletSettings />;
            break;

        case "password":
            entries = <PasswordSettings />;
            break;

        case "backup":
            entries = <BackupSettings />;
            break;

        case "restore":
            entries = <RestoreSettings passwordLogin={this.props.settings.get("passwordLogin")} />;
            break;

        case "access":
            entries = <AccessSettings faucet={settings.get("faucet_address")} nodes={defaults.apiServer} onChange={this._onChangeSetting.bind(this)} triggerModal={this.triggerModal.bind(this)} />;
            break;
        case "faucet_address":
            entries = <input type="text" defaultValue={settings.get("faucet_address")} onChange={this._onChangeSetting.bind(this, "faucet_address")}/>
            break;
        default:
            entries = settingEntries[activeEntry].map(setting => {
                return (
                    <SettingsEntry
                        key={setting}
                        setting={setting}
                        settings={settings}
                        defaults={defaults[setting]}
                        onChange={this._onChangeSetting.bind(this)}
                        locales={this.props.localesObject}
                        {...this.state}
                    />);
            });
            break;
        }

        return (
            <div className="grid-block page-layout">
                <div className="grid-block main-content wrap">
                    <div className="grid-content large-offset-2 shrink" style={{paddingRight: "4rem"}}>
                        <Translate style={{paddingBottom: 20}} className="bottom-border" component="h4" content="header.settings" />

                        <ul className="settings-menu">
                            {menuEntries.map((entry, index) => {
                                return <li className={index === activeSetting ? "active" : ""} onClick={this._onChangeMenu.bind(this, entry)} key={entry}><Translate content={"settings." + entry} /></li>;
                            })}
                        </ul>
                    </div>

                    <div className="grid-content" style={{paddingLeft: "1rem", paddingRight: "1rem", maxWidth: 1000}}>
                        <div className="grid-block small-12 medium-10 no-margin vertical">
                            <Translate component="h3" content={"settings." + menuEntries[activeSetting]} />
                            {activeEntry != "access" && <Translate unsafe style={{paddingTop: 10, paddingBottom: 20, marginBottom: 30}} className="bottom-border" content={`settings.${menuEntries[activeSetting]}_text`} />}
                            {entries}
                        </div>
                    </div>
                </div>
                <WebsocketAddModal
                    ref="ws_modal"
                    apis={defaults["apiServer"]}
                    api={defaults["apiServer"].filter(a => {return a.url === this.state.apiServer;}).reduce((a, b) => {return b && b.url;}, null)}
                    changeConnection={(apiServer) => {this.setState({apiServer});}}
                />
            </div>
        );
    }
}

export default Settings;
