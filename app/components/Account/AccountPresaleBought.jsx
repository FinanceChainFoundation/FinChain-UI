import React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
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
                <PresaleBoughtRow key={p.presale_id} presale_id={p.presale_id} records={p.records} account={p.owner} presale={p}/>
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
                                <th><Translate content="explorer.assets.title"/></th>
                                <th><Translate content="presale.total"/></th>
                                <th><Translate content="presale.claimed"/></th>
                                <th><Translate content="presale.buy_history"/></th>
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