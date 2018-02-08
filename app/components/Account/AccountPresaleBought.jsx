import React from "react";
import AssetName from "../Utility/AssetName";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import BalanceComponent from "../Utility/BalanceComponent";

class AccountPresaleBought extends React.Component {

    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired,
    }

    render() {
        return (
            <div className="grid-content">
                <table className="table">
                    <thead>
                    <tr>
                        <th>众筹资产</th>
                        <th>数量</th>
                    </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

AccountPresaleBought = BindToChainState(AccountPresaleBought);

export default AccountPresaleBought;