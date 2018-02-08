import WalletApi from "../api/WalletApi";
import alt from "alt-instance";
import WalletDb from "stores/WalletDb";
import {Apis} from "bitsharesjs-ws";

class PresaleActions {
    createPresale(args) {
        console.log("create presale");
        let tr = WalletApi.new_transaction();

        tr.add_type_operation("asset_presale_create", args);
        return (dispatch) => {
            return WalletDb.process_transaction(tr, null, true).then(result => {
                console.log("presale create result:", result);
                // this.dispatch(account_id);
                dispatch(true);
            }).catch(error => {
                console.log("[PresaleActions.js:150] ----- createPresale error ----->", error);
                dispatch(false);
            });
        };
    }

    getPresales(asset_id) {
        return dispatch => {
            return Apis.instance().db_api().exec("get_asset_presales", [asset_id]).then(presales => {
                console.log(presales)
            })
        }
    }

    buyPresale(args) {
        console.log("buy presale");
        let tr = WalletApi.new_transaction();

        tr.add_type_operation("asset_presale_buy", args);
        return (dispatch) => {
            return WalletDb.process_transaction(tr, null, true).then(result => {
                console.log("presale buy result:", result);
                // this.dispatch(account_id);
                dispatch(true);
            }).catch(error => {
                console.log("[PresaleActions.js:150] ----- buyPresale error ----->", error);
                dispatch(false);
            });
        };
    }
}

export default alt.createActions(PresaleActions);