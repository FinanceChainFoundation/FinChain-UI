import React from "react";
import BaseModal from "./BaseModal";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import ChainTypes from "../Utility/ChainTypes";
import AmountSelector from "../Utility/AmountSelector";
import Translate from "react-translate-component";
import BalanceComponent from "../Utility/BalanceComponent";
import {ChainStore} from "bitsharesjs/es";
import utils from "common/utils";
import AccountStore from "../../stores/AccountStore";
import {PropTypes} from "react";
import counterpart from "counterpart";
import PresaleActions from "../../actions/PresaleActions";


class ModalContent extends React.Component {
    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired,
        assets: ChainTypes.ChainAssetsList,
        presale: PropTypes.object
    }

    constructor() {
        super();

        this.state = {
            amount: 0,
            asset: null,
            asset_id: "1.3.0"
        }
    }

    onAmountChanged({amount, asset}) {
        if (!asset) {
            return;
        }
        this.setState({amount, asset, asset_id: asset.get("id")});
    }

    onSubmit() {
        let args = {

            issuer: ChainStore.getAccount(AccountStore.getState().currentAccount).get("id"),
            presale: this.props.presale.id,
            amount: {
                amount: this.state.amount,
                asset_id: this.state.asset_id
            },
            extensions: 0
        };

        PresaleActions.buyPresale(args);
    }

    render() {
        let {asset, account} = this.props;


        let ids = this.props.presale.accepts.map(acc => {
            return acc.asset_id;
        })


        return (
            <form className="grid-block vertical full-width-content">
                <div className="content-block">
                <AmountSelector
                    label="modal.settle.amount"
                    amount={this.state.amount}
                    asset={this.state.asset_id}
                    assets={ids}
                    onChange={this.onAmountChanged.bind(this)}/>
                </div>
                <div className="content-block button-group">
                    <input
                        type="submit"
                        className="button success"
                        onClick={this.onSubmit.bind(this)}
                        value={counterpart.translate("wallet.submit")}
                        tabIndex={2}
                    />

                </div>
            </form>
        )
    }
}

class BuyModal extends React.Component {
    show() {
        ZfApi.publish("settlement_modal", "open");
    }

    render() {
        return (
            <BaseModal id="settlement_modal" overlay={true} ref="settlement_modal">
                <Translate component="h3" content="presale.buy"/>
                <div className="grid-block vertical">
                    <ModalContent {...this.props} />
                </div>
            </BaseModal>
        );
    }
}

export default BuyModal;