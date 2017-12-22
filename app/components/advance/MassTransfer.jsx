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

var xlsx=require('node-xlsx')

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
            toAndValues: [],
            totalSends: 0
        };

    };
    onGetKeyStore(result){

        var tos_values=[]
        var datas=result.split("\n")
        for(var i=0;i<datas.length;i++){
            var data=datas[i].split("\t")
            tos_values.push({
                to:data[0],
                value:parseInt(data[1],10)
            })
        }
        console.log(tos_values)

    }

    render() {

        return (
            <div >
                <FileInputs onGetKeyStore={this.onGetKeyStore.bind(this)}/>
            </div>)
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
