import React from "react";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import WalletUnlockStore from "stores/WalletUnlockStore";
import GatewayStore from "stores/GatewayStore";
import AccountLeftPanel from "./AccountLeftPanel";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import { connect } from "alt-react";
import accountUtils from "common/account_utils";

class AccountPage extends React.Component {

    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired
    };

    static defaultProps = {
        account: "props.params.account_name"
    };

    componentDidMount() {
        if (this.props.account && AccountStore.isMyAccount(this.props.account)) {
            AccountActions.setCurrentAccount.defer(this.props.account.get("name"));
        }

        // Fetch possible fee assets here to avoid async issues later (will resolve assets)
        accountUtils.getPossibleFees(this.props.account, "transfer");
    }

    render() {
        let {myAccounts, linkedAccounts, account_name, searchAccounts, settings, wallet_locked, account, hiddenAssets} = this.props;

        let isMyAccount = AccountStore.isMyAccount(account);

        return (
            <div className="grid-block page-layout">
                <div className="show-for-medium grid-block shrink left-column no-padding" style={{minWidth: 200}}>
                    <AccountLeftPanel
                        account={account}
                        isMyAccount={isMyAccount}
                        linkedAccounts={linkedAccounts}
                        myAccounts={myAccounts}
                        viewSettings={this.props.viewSettings}
                        passwordLogin={settings.get("passwordLogin")}
                    />
                </div>
                <div className="grid-block main-content">
                    <div className="grid-container">
                    {React.cloneElement(
                        React.Children.only(this.props.children),
                        {
                            account_name,
                            linkedAccounts,
                            searchAccounts,
                            settings,
                            wallet_locked,
                            account,
                            isMyAccount,
                            hiddenAssets,
                            contained: true,
                            balances: account.get("balances", null),
                            orders: account.get("orders", null),
                            backedCoins: this.props.backedCoins,
                            bridgeCoins: this.props.bridgeCoins,
                            gatewayDown: this.props.gatewayDown,
                            viewSettings: this.props.viewSettings,
                            proxy: account.getIn(["options", "voting_account"])
                        }
                    )}
                    </div>
                </div>
            </div>
        );
    }
}
AccountPage = BindToChainState(AccountPage, {keep_updating: true, show_loader: true});

class AccountPageStoreWrapper extends React.Component {
    render () {
        let account_name = this.props.routeParams.account_name;

        return <AccountPage {...this.props} account_name={account_name}/>;
    }
}

export default connect(AccountPageStoreWrapper, {
    listenTo() {
        return [AccountStore, SettingsStore, WalletUnlockStore, GatewayStore];
    },
    getProps() {
        return {
            linkedAccounts: AccountStore.getState().linkedAccounts,
            searchAccounts: AccountStore.getState().searchAccounts,
            settings: SettingsStore.getState().settings,
            hiddenAssets: SettingsStore.getState().hiddenAssets,
            wallet_locked: WalletUnlockStore.getState().locked,
            myAccounts:  AccountStore.getState().myAccounts,
            viewSettings: SettingsStore.getState().viewSettings,
            backedCoins: GatewayStore.getState().backedCoins,
            bridgeCoins: GatewayStore.getState().bridgeCoins,
            gatewayDown: GatewayStore.getState().down
        };
    }
});
