import { ChainStore} from "bitsharesjs/es";

function FixBalance(account_id,asset_id){
    this.asset_id=asset_id
    this.account_obj=ChainStore.getObject(account_id)
    this.fix_balance_ids=account_obj.fix_balances.get("asset_id")
    this.amount=0
    this.fix_balances_obj=[]
    this.fix_balance_ids.forEach(function(id){
        let obj=ChainStore.getObject(id)
        amount=amount+parseInt(obj.locked_balance,10)
        this.fix_balances_obj.push(ChainStore.getObject(id))
    })
}
FixBalance.prototype.get_fix_balance_ids=function(){
    return this.fix_balance_ids
}

FixBalance.prototype.get_fix_balances=function(){
    return this.fix_balances_obj
}

FixBalance.prototype.get_fix_amount=function(){
    return {
        "asset_id":this.asset_id,
        "amount":this.amount
    }
}
var fixBalance = new FixBalance()
export default fixBalance