import React, { Component } from "react";
import "./style.css";
import Transfer from "../Transfer/Transfer2";
export default class BlockTrades3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
             num: "",
        };
    }

        render() {
            let {account} = this.props;
        return (
            <div className="desport_content">
                <div className="content_cd2 left">
                    <span className="content_cd_sp1"> 注意 </span>
                    <p className="content_cd_p1">1.最小提币数量为0.02ETH，1GUSD</p>
                    <p className="content_cd_p1">2.请勿直接提现至众筹或ICO地址，我们不会处理未来代币的发放。</p>
                    <Transfer
                    />
                </div>

            </div>


        );
    }
}
