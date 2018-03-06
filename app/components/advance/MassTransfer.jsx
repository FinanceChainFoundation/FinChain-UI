import React from "react";
import BalanceComponent from "../Utility/BalanceComponent";
import AccountActions from "actions/AccountActions";
import Translate from "react-translate-component";
import AccountSelect from "../Forms/AccountSelect";
import AccountSelector from "../Account/AccountSelector";
import AccountStore from "stores/AccountStore";
import AmountSelector from "../Utility/AmountSelector";
import utils from "common/utils";
import counterpart from "counterpart";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import { RecentTransactions } from "../Account/RecentTransactions";
import Immutable from "immutable";
import {ChainStore} from "bitsharesjs/es";
import {connect} from "alt-react";
import { checkFeeStatusAsync, checkBalance } from "common/trxHelper";
import { debounce, isNaN } from "lodash";
import classnames from "classnames";
import { Asset } from "common/MarketClasses";
import {Apis} from "bitsharesjs-ws";

class FileInputs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            keyStore:""
        };
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
    }


    static getInitialState() {
        return {
            fileName: "",
            toAndValues: {},
            totalSends: 0
        };

    };
    onGetKeyStore(result) {

        let toAndValues = {}
        let datas = result.split("\r")
        let totalSends=0
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i].split("\t")
            if(data[0]!="") {
                let accountName=(data[0].replace(/(^\s*)|(\s*$)/g, "")).toLowerCase()

                toAndValues[accountName]={
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

            console.log(toAndValues)
            this.setState({
                toAndValues: toAndValues,
                totalSends:totalSends
            })
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const {toAndValues} = this.state;

        Object.keys(toAndValues).forEach(name=>{
            let to=toAndValues[name].id;
            let value=toAndValues[name].value*100000000
            if(to!=""){
                console.log("send token " ,to,value)
                AccountActions.transfer(
                    "1.2.542",
                    to,
                    value,
                    "1.3.0",
                    "Initial send",
                    null,
                    "1.3.0",
                    false,
                    600
                ).then( () => {
                    this.resetForm.call(this);
                    TransactionConfirmStore.unlisten(this.onTrxIncluded);
                    TransactionConfirmStore.listen(this.onTrxIncluded);
                }).catch( e => {
                    let msg = e.message ? e.message.split( '\n' )[1] : null;
                    console.log( "error: ", e, msg);
                    this.setState({error: msg});
                } );

            }

        })

    }



    render() {

        let isSendNotValid=false
        let tabIndex=0
        return (
            <div className="grid-block vertical">
                <div className="grid-block shrink vertical medium-horizontal" style={{paddingTop: "2rem"}}>
                    <form style={{paddingBottom: 20, overflow: "visible"}} className="grid-content small-12 medium-6 large-5 large-offset-1 full-width-content" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <FileInputs onGetKeyStore={this.onGetKeyStore.bind(this)}/>
                        <button className={classnames("button float-right no-margin", {disabled: isSendNotValid})} type="submit" value="Submit" tabIndex={tabIndex++}>
                            <Translate component="span" content="transfer.send" />
                        </button>
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
