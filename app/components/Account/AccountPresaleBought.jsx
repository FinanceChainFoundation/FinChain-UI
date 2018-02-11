import React from "react";
import AssetName from "../Utility/AssetName";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import BalanceComponent from "../Utility/BalanceComponent";
import Translate from "react-translate-component";
import {ChainStore} from "bitsharesjs/es";
import PresaleBoughtRow from "./PresaleBoughtRow";

class AccountPresaleBought extends React.Component {

    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired,
    }

    render() {
        console.log(this.props.account.get("presales").toJS())

        var presales_sec = this.props.account.get("presales").map(p => {console.log(1, ChainStore.getAsset(p.presale_id))

            return (
                <PresaleBoughtRow key={p.presale_id} asset={p.records[0].asset_id}/>
            )
        })
        return (
            <div className="grid-content">

                <div className="content-block generic-bordered-box">
                    <div className="block-content-header">
                        <Translate content="presale.bought" />
                    </div>
                    <div className="box-content">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>众筹资产</th>
                                <th>数量</th>
                            </tr>
                            </thead>
                            <tbody>
                            {presales_sec}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

AccountPresaleBought = BindToChainState(AccountPresaleBought);

export default AccountPresaleBought;