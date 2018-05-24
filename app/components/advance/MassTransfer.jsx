import React from "react";
import AccountActions from "actions/AccountActions";
import Translate from "react-translate-component";
import AccountStore from "stores/AccountStore";
import AmountSelector from "../Utility/AmountSelector";
import utils from "common/utils";

import {ChainStore} from "bitsharesjs/es";
import {connect} from "alt-react";
import { checkFeeStatusAsync, checkBalance } from "common/trxHelper";
import { debounce, isNaN } from "lodash";
import { Asset } from "common/MarketClasses";
import {Apis} from "bitsharesjs-ws";
import WalletUnlockActions from "actions/WalletUnlockActions";

var Sleep=require("sleep.js")

class FileInputs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            keyStore:""
        }
    }


    upload(e) {
        console.log("upload file")
        var onGetKeyStore=this.props.onGetKeyStore
        if (window.FileReader) {
            var file = e.target.files[0]
            var filename =file.name.split(".")[0];
            var reader = new FileReader();
            reader.onload = function() {
                //console.log(this.result)
                onGetKeyStore(this.result);
                //alert(this.result);
            }
            reader.readAsText(file);
        }
        //支持IE 7 8 9 10
        else if (typeof window.ActiveXObject != 'undefined'){
            var xmlDoc;
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.load(input.value);
            alert(xmlDoc.xml);
        }
        //支持FF
        else if (document.implementation && document.implementation.createDocument) {
            var xmlDoc;
            xmlDoc = document.implementation.createDocument("", "", null);
            xmlDoc.async = false;
            xmlDoc.load(input.value);
            alert(xmlDoc.xml);
        } else {
            alert('error');
        }
    }

    render() {

        return (
            <div >
                <div>
                    <span>选择文件:</span>
                </div>
                <div>
                    <input type="file" onChange={this.upload.bind(this)} />
                </div>
            </div>)
    }
}

class MassTransfer extends React.Component {

    constructor(props) {
        super(props);
        this.state = MassTransfer.getInitialState();
        let currentAccount = AccountStore.getState().currentAccount;
        this.state.issuer=currentAccount
        let account_obj= ChainStore.getAccount(currentAccount)
        let account_balances = account_obj?account_obj.get("balances").toJS():[];
        this.state.asset_types = Object.keys(account_balances).sort(utils.sortID);

        this.state.asset=ChainStore.getAsset(this.state.asset_types[0])

    }


    static getInitialState() {
        return {
            fileName: "",
            issuer:null,
            asset_types:null,
            asset:null,
            toAndValues: {},
            unknownAccount:{},
            statistics:null,
            showType:null,
            asset:null,
            log:null,
            finishRate:0
        };

    };
    onGetKeyStore(result) {

        let toAndValues = {}
        let toAndValuesA={}
        let datas = result.split("\r")
        let totalSends=0
        let totalAount=datas.length;
        let realTotalSends=0
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i].split("\t")
            if(data[0]!="") {
                let accountName=(data[0].replace(/(^\s*)|(\s*$)/g, "")).toLowerCase()

                toAndValues[accountName]={
                    name:accountName,
                    id: "",
                    value: parseInt(data[1], 10)
                }
                totalSends += parseInt(data[1], 10)
            }
        }

        Apis.instance().db_api().exec("get_account_ids", [Object.keys(toAndValues)]).then(results=> {

            for(let i=0;i<results.length;i++){
                let account_name=results[i][0]
                toAndValues[account_name]["id"]=results[i][1]
            }

            //console.log(toAndValues)

            let keys=Object.keys(toAndValues)
            let noAccounts={}
            for(let i=0;i<keys.length;i++){
                let name =keys[i]
                if (toAndValues[name]["id"]== "")
                    {noAccounts[name]=toAndValues[name]}
                else{
                    toAndValuesA[name]=toAndValues[name]
                    realTotalSends+=parseInt(toAndValues[name].value, 10)
                }
            }
            console.log(noAccounts)
            let statistics={
                totalAount:totalAount,
                totalSends:totalSends,
                totalRealAccount:Object.keys(toAndValuesA).length,
                totalRealSends:realTotalSends,
                totalUnAccount:totalAount-Object.keys(toAndValuesA).length,
                totalUnSends:totalSends-realTotalSends

            }

            this.setState({
                toAndValues: toAndValuesA,
                unknownAccount:noAccounts,
                statistics:statistics
            })

        })
    }

    onSubmit(e) {

        this._transfer(e)

    }
    showClick(type,e){
        e.preventDefault();
        let showType=this.state.showType||type
        if(type=this.state.showType)
            showType=null
        this.setState({showType:showType})
    }
    onAmountChanged({amount, asset}){
        this.setState({ asset:asset})
    }
    _transfer(e){
        e.preventDefault();
        const {toAndValues} = this.state;

        let keys=Object.keys(toAndValues)
        let i=0;
        let sleep=new Sleep()
        let asset=this.state.asset
        let self=this
        let precision = utils.get_asset_precision(asset.get("precision"))

        let issuerId=ChainStore.getAccount(this.state.issuer).get("id")
        WalletUnlockActions.unlock().then(()=>
        {
            sleep.loop(1000, function () {
                let name = keys[i++]
                let to = toAndValues[name].id;
                let value = toAndValues[name].value * precision
                if (to != "") {
                    self.setState({
                        log: "发送 " + toAndValues[name].value + asset.get("symbol") + " 到 " + name,
                        finishRate:i*100/self.state.statistics.totalAount
                    })
                    console.log(issuerId,
                        to,
                        value,
                        asset.get("id"),
                        null,
                        null,
                        "1.3.0",
                        false,
                        1000,
                        "broadcast_transaction",
                        true)
                    AccountActions.transfer(
                        issuerId,
                        to,
                        value,
                        asset.get("id"),
                        null,
                        null,
                        "1.3.0",
                        false,
                        1000,
                        "broadcast_transaction",
                        true
                    ).then(() => {
                        //self.resetForm.call(this);
                        //TransactionConfirmStore.unlisten(this.onTrxIncluded);
                        //TransactionConfirmStore.listen(this.onTrxIncluded);
                    }).catch(e => {
                        let msg = e.message ? e.message.split('\n')[1] : null;
                        console.log("error: ", e, msg);
                        self.setState({error: msg});
                    });

                }
                else
                    console.log(toAndValues[name])
            })
        })
    }
    /*_mass_transfer(e){
        e.preventDefault();
        let asset=this.state.asset
        let precision = utils.get_asset_precision(ChainStore.getAsset(asset).get("precision"));
        const {toAndValues} = this.state;

        let keys=Object.keys(toAndValues)
        let i=0;
        let sleep=new Sleep()
        let self=this

        let unknownAccount=[]
        const maxOps=100
        const sec=10000
        sleep.loop(sec,function(){

            let subKeys=keys.slice(i*maxOps,(i+1)*maxOps-1)
            let tos=[];
            let amounts=[];

            for(let i=0;i<100;i++){
                let name=keys[i++]
                let to = toAndValues[name].id;

                tos.push(to)
                amounts.push(toAndValues[name].value*precision)
                console.log("try to send token ", to, toAndValues[name].value)

            }
            AccountActions.mass_transfer(
                "1.2.542",
                tos,
                amounts,
                asset,
                "",
                null,
                "1.3.0",
                false,
                sec
            ).then(() => {
                self.resetForm.call(this);
            }).catch(e => {
                let msg = e.message ? e.message.split('\n')[1] : null;
                console.log("error: ", e, msg);
                self.setState({error: msg});
            });
        })
    }*/
    render() {

        let isSendNotValid=false
        let tabIndex=0

        let listAccounts;
        let listAccountsLabel
        if(this.state.showType=="unknow"){
            listAccounts=this.state.unknownAccount
            listAccountsLabel="无效账户"
        }
        else if(this.state.showType=="know"){
            listAccounts=this.state.toAndValues
            listAccountsLabel="有效账户"
        }
        let arr=listAccounts?Object.keys(listAccounts):[];
        let listAccountsRender=arr.length?arr
            .map(key => {
                let to_value=listAccounts[key]
                return (
                    <tr >
                        <td>{to_value.name}</td>
                        <td>{to_value.id}</td>
                        <td>{to_value.value}</td>
                    </tr>
                );
            }):null;

        let statistics=this.state.statistics

        let amount=statistics?statistics.totalRealSends:null
        let asset_types=this.state.asset_types
        console.log(this.state.asset_types)

        return (
            <div className="grid-block vertical">
                <div className="grid-block shrink vertical medium-horizontal" style={{paddingTop: "2rem"}}>
                    <form style={{paddingBottom: 20, overflow: "visible"}} className="grid-content small-12 medium-6 large-5 large-offset-1 full-width-content"  noValidate>
                        <label className="right-label">资产群发：</label>
                        <label className="right-label">1.xls表格第一列为用户名，第二列为数量，不能有表头和删除无用的空白行</label>
                        <label className="right-label">2.将xls转化为以制表符分割的文本格式</label>
                        <label className="right-label">3.每次群发不能超过2000个账户</label>
                        <FileInputs onGetKeyStore={this.onGetKeyStore.bind(this)}/>

                        {statistics ? <div className="content-block generic-bordered-box">
                            <div className="block-content-header">
                                统计
                            </div>
                            <div className="box-content">

                                <table className="table dashboard-table">
                                    <thead>
                                    <tr>
                                        <th>账户总数</th>
                                        <th>发送总量</th>
                                        <th>有效账户数</th>
                                        <th>有效发送总量</th>
                                        <th>无效账户数</th>
                                        <th>无效账户发送总量</th>
                                        <th>发送完成情况</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>{statistics.totalAount}</td>
                                        <td>{statistics.totalSends}</td>
                                        <td>
                                            <input type="submit" onClick={this.showClick.bind(this, "know")} value= {statistics.totalRealAccount} className="button outline" />
                                        </td>
                                        <td>{statistics.totalRealSends}</td>
                                        <td>
                                            <input type="submit"onClick={this.showClick.bind(this, "unknow")} value = {statistics.totalUnAccount} className="button outline" />

                                        </td>

                                        <td>{statistics.totalUnSends}</td>
                                        <td>{this.state.finishRate +"%"}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>:null}

                        {this.state.showType ?
                            <div className="content-block generic-bordered-box">
                                <div className="block-content-header">
                                    {listAccountsLabel}
                                </div>
                                <div className="box-content">

                                    <table className="table dashboard-table">
                                        <thead>
                                        <tr>
                                            <th>账户名</th>
                                            <th style={{maxWidth: "200px"}}>账户ID</th>
                                            <th>发送数量</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {listAccountsRender}
                                        </tbody>
                                    </table>
                                </div>
                            </div>:null}
                        {amount?<div className="content-block transfer-input">
                            <AmountSelector
                                label="transfer.amount"
                                amount={amount}
                                onChange={this.onAmountChanged.bind(this)}
                                asset={this.state.asset?this.state.asset.get("id"):asset_types[0]}
                                assets={asset_types}
                                tabIndex={tabIndex++}
                            />
                            {this.state.balanceError ? <p className="has-error no-margin" style={{paddingTop: 10}}><Translate content="transfer.errors.insufficient" /></p>:null}
                        </div>
                            :null}
                        <input onClick={this.onSubmit.bind(this)} type="submit" value="群发" className="button outline" />
                        <label className="right-label">{this.state.log}</label>
                    </form>
                </div>

            </div>
                )
    }
}

export default connect(MassTransfer, {
    listenTo() {
        return [AccountStore];
    },
    getProps() {
        return {
            currentAccount: AccountStore.getState().currentAccount,
            passwordAccount: AccountStore.getState().passwordAccount
        };
    }
});
