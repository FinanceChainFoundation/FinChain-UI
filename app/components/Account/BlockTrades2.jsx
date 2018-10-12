import React, { Component } from "react";
import "./style.css";
import ReactTooltip from "react-tooltip";
import copy from 'copy-to-clipboard';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from "qrcode.react";

var guan = require("./guanbi.png");
export default class BlockTrades2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: "",
            displays:"none",
            top:"",
            left:""

        };
        this.onCopy = this.onCopy.bind(this);
        this.clic = this.clic.bind(this);
    }



    componentDidMount() {
        var that =this;
        var input = this.refs.myInput.value;
        var filter = '{"where":{"bts_account":"'+input+'"},"include":{"relation":"depositAddresss","scope":{"where":{"address_type":"ETH"}}}}';
        fetch("https://server.finchain.info/api/BtsAccountRegisterManages/findOne?filter="+filter, {
            headers: {
                "Accept": "application/json, text/plain, */*",
            }

        })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    console.log(data);
                    if(data.error.statusCode == 404){
                        console.log(data.error);
                        let postData = {
                            "bts_account": input,
                            "asset_type": "ETH"};
                       var url2 = "https://server.finchain.info/api/BtsAccountRegisterManages/registerDepositAccount";
                        fetch(url2,{
                            method:"post",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(postData)

                        }).then(res=>res.json())
                            .then(data =>{

                                if(data.flag =="building"){
                                    setTimeout(function(){

                                        fetch("https://server.finchain.info/api/BtsAccountRegisterManages/findOne?filter="+filter, {
                                            headers: {
                                                "Accept": "application/json, text/plain, */*",
                                            }

                                        })

                                            .then(res => res.json())
                                            .then(data => {
                                                console.log(data);
                                                console.log(1234);
                                                that.setState({num: data.depositAddresss[0].address});  ////赋值到本地数据
                                            });

                                        // location.reload();
                                    },15000,input,filter,that);

                                }

                                // this.setState({num: data.depositAddresss[0].address});
                                // console.log(data);
                            });
                    }

                }else{

                    this.setState({num: data.depositAddresss[0].address});  ////赋值到本地数据
                }

            })

            .catch(function (err) {
                console.log("Fetch错误:" + err);
            });
    }

        render() {
        let {account} = this.props;

        return (
            <div className="desport_content">
                <div className="content_cd left">
                    <select className="content_cd sel">
                        <option className="sel_option" value ="ETH">请选择</option>
                        <option className="sel_option" selected="selected" value ="ETH">ETH</option>
                        <option className="sel_option" value ="GUSD">GUSD</option>
                    </select>
                    <span className="content_cd_sp1">注意</span>
                    <p className="content_cd_p1">1.禁止充值ETH/GUSD以外的资产,任何充入的非ETH/GUSD资产将不可找回
                    </p>
                    <span className="content_cd_sp2">账号</span>
                    <input className="content_cd_inpu" type="text" ref="myInput"
                           value={account.get("name")}
                           placeholder={null}
                           disabled
                           onChange={() => {}}
                           onKeyDown={() => {}}
                           tabIndex={1}
                    />
                    <span className="content_cd_sp2">以太坊充值地址</span>
                    <input className="content_cd_inpu" type="text"
                           value={this.state.num}
                           placeholder={null}
                           disabled
                           onChange={() => {}}
                           onKeyDown={() => {}}
                           tabIndex={1}
                    />

                    <div className="content_cd_di">
                        <CopyToClipboard text={this.state.num}
                                         onCopy={this.onCopy}>
                            <span>复制地址到剪切板</span>
                        </CopyToClipboard>
                        <span style={{"marginLeft":"28px"}} onClick={this.clic}>展示二维码</span>

                    </div>

                    <div className="content_cd_di">
                        <p className="ontent_cd_di_p">温馨提示</p>
                        <li className="ontent_cd_di_li">使用ETH地址充值需要30个网络确认才能到账。</li>
                        <li className="ontent_cd_di_li">充值完成后，你可以进入历史记录跟踪进度</li>
                    </div>

                </div>

                <div className="info_cont" style={{display:this.state.displays, top:this.state.top,left:this.state.left}}>
                    <img src={guan}  onClick={this.clic}  style={{float:"right", margin:"10px"}}/>
                        <p className="info_cont_p1">ETC充值地址</p>
                        <div className="info_cont_img">
                            <div style={{padding:"10px",width:"256px" ,height:"276px"}}>
                                <QRCode style={{margin: "20px"}} size={256} value={this.state.num}/>
                            </div>
                        </div>
                        <p className="info_cont_p2">{this.state.num}</p>
                </div>

            </div>

        );
    }


    onCopy(){
        if(copy(this.state.num)){
            alert("复制成功");
        }else{
            alert("复制失败");
        }
    }
    clic(){

        if(this.state.displays == "none" ){
            var Width = document.body.clientWidth;
            var Height = document.body.clientHeight;
            var divWidth= 560;
            var divHeight= 700;
            var left = (Width-divWidth)/4 +20;
            var top = (Height-divHeight)/4 +50;
            this.setState({displays: "block",top:top, left: left});

        }else{
            this.setState({displays: "none"});
        }

    }
}
