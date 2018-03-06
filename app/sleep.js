function sleep(statTime) {
    this.__sleepAbsTime=statTime
    this.cycStart=false
};

sleep.prototype.go=function(fun,time){

    //console.log(fun)
    this.__sleepAbsTime+=time
    setTimeout(fun,this.__sleepAbsTime)
};
sleep.prototype.loop=function(cyc,fun){

    if(!this.end_loop||this.end_loop==undefined) {
        var self = this

        setTimeout(function () {
            if (!self.cycStart)
                self.cycStart = true
            fun()
            if (cyc > 0)
                self.loop(cyc, fun)
            else
                console.log("cyc <0")
        }, this.cycStart ? cyc : 1)
    }
}
sleep.prototype.endLoop=function(){
    this.end_loop=true
}
module.exports = sleep