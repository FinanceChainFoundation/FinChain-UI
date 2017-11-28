import React from "react";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import BaseModal from "./BaseModal";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import utils from "common/utils";
import BalanceComponent from "../Utility/BalanceComponent";
import WalletApi from "api/WalletApi";
import WalletDb from "stores/WalletDb";
import counterpart from "counterpart";
import {ChainStore} from "bitsharesjs/es";
import AmountSelector from "../Utility/AmountSelector";
import FormattedAsset from "../Utility/FormattedAsset";

class ModalContent extends React.Component {
    /*static propTypes = {
     locked_obj:
     type: ChainTypes.ChainAccount.isRequired
     expired：false
     };
     */

    constructor() {
        super();
    }



    onSubmit(e) {
        e.preventDefault();
        ZfApi.publish("unlock_modal", "close");
        var tr = WalletApi.new_transaction();
        let locked_id=this.props.locked_obj.id;
        let account_id=this.props.account_id
        tr.add_type_operation("unlock_balance", {
            fee: {
                amount: 0,
                asset_id: 0
            },
            issuer:account_id,
            locked: {
                locked_id:locked_id,
                expired:this.props.expired
            }
        });
        return WalletDb.process_transaction(tr, null, true).then(result => {
            // console.log("asset settle result:", result);
            // this.dispatch(account_id);
            return true;
        }).catch(error => {
            console.error("unlock balance error: ", error);
            return false;
        });

    }

    render() {

        let locked_obj=this.props.locked_obj
        if(locked_obj==undefined)
            return(<div></div>)
        let expired=this.props.expired
        let prompt=expired?"lock.profit_prompt_period":"lock.profit_prompt_unperiod"

        let profit=locked_obj.locked_balance-locked_obj.initial_lock_balance
        let profitRender=expired?
            <FormattedAsset
                amount={profit}
                asset={locked_obj.asset_id}
            />:null
        let promptRender=
            <div className="grid-container " style={{paddingTop: "2rem"}}>
                <Translate component="Label" content={prompt}/>
                {profitRender}
            </div>
        return (
            <form className="grid-block vertical full-width-content">
                {promptRender}
                <div className="content-block">
                    <input type="submit" className="button success"
                           onClick={this.onSubmit.bind(this)}
                           value={counterpart.translate("lock.unlock")}/>
                </div>
            </form>
        )
    }
}
ModalContent = BindToChainState(ModalContent, {keep_updating: true});

class UnlockModal extends React.Component {

    show() {
        ZfApi.publish("unlock_modal", "open");
    }

    render() {
        return (
            <BaseModal id="unlock_modal" overlay={true} ref="unlock_modal">
                <div className="grid-block vertical">
                    <ModalContent {...this.props} />
                </div>
            </BaseModal>
        );
    }
}

export default UnlockModal;