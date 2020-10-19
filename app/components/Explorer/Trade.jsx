import React from "react";
import TabsControl from "./react_tab.jsx";
require("./jys.css");
import Background from "./backgroud.png";
import Translate from "react-translate-component";
import SliderItem2 from "./Slider/SliderItem2";
import MarketCard from "./MarketCard";
import MarketCard2 from "./MarketCard2";
var back ={
    height:"560px",
    position:"relative",
    backgroundImage: `url("${Background}")`

};


var b66 ={
    width:"100%",
    margin:"0 auto",
    height:"50px",
    borderBottom: "#28395F 2px solid",

};
var lo1 = require("./yibit_di.png");
var lo = require("./yibit-1.png");
var a1 = require("./banner1.png");
var a2 = require("./banner2.png");
var a3 = require("./banner3.png");
// var a4 = require("./zixuan1.png");
var a5 = require("./q1.png");
var a6 = require("./q2.png");
var a7 = require("./q3.png");
var b1 = require("./1.png");
var b2 = require("./2.png");
var b3 = require("./3.png");
var b4 = require("./4.png");
var b5 = require("./5.png");
var b6 = require("./6.png");
var b7 = require("./7.png");
var b8 = require("./8.png");
var b9 = require("./9.png");

var ban_1 = require("./ban_1.png");
var ban_2 = require("./ban_2.png");
var ban_3 = require("./ban_3.png");
var ban_4 = require("./ban_41.png");
const IMAGE_DATA = [
    {
        src: require("./1.1.png"),
        src2: require("./1.2.png"),
        alt: "images-1",
        herf :"https://www.feixiaohao.com",
        key:1,
    },
    {
        src: require("./2.1.png"),
        alt: "images-2",
        src2: require("./2.2.png"),
        key:2,
        herf :"https://www.mytoken.io",
    },
    {
        src: require("./3.1.png"),
        alt: "images-2",
        src2: require("./3.2.png"),
        herf :"https://www.magicw.net",
        key:3,
    },{
        src: require("./4.1.png"),
        alt: "images-2",
        src2: require("./4.2.png"),
        herf :"http://gbacenter.org/",
        key:4,
    },{
        src: require("./5.2.png"),
        alt: "images-2",
        src2: require("./5.1.png"),
        herf :"https://www.8btc.com",
        key:5,
    },{
        src: require("./6.1.png"),
        alt: "images-2",
        src2: require("./6.2.png"),
        herf :"https://www.gdex.io/",
        key:6,
    },{
        src: require("./7.1.png"),
        alt: "images-2",
        src2: require("./7.2.png"),
        herf :"http://www.rightbtc.com",
        key:7,
    },{
        src: require("./8.1.png"),
        alt: "images-2",
        src2: require("./8.2.png"),
        herf :"https://www.ucoin.pw",
        key:8,
    },
    {
        src: require("./9.1.png"),
        alt: "images-2",
        src2: require("./9.2.png"),
        herf :"http://www.syex.io",
        key:9,
    },
    {
        src: require("./10.1.png"),
        alt: "images-2",
        src2: require("./10.2.png"),
        herf :"https://www.aex.com",
        key:10,
    },
    {
        src: "",
        alt: "images-2",
        src2:"",
        key:11,
    },
    {
        src: "",
        alt: "images-2",
        src2:"",
        key:12,
    },


];

class Trade extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bool: false
        };
        this.handleBoolean = this.handleBoolean.bind(this);
        // this.handleEnter = this.handleEnter.bind(this);
        // this.handleOut = this.handleOut.bind(this);
    }
    handleBoolean(bool) {
        this.setState({ bool });
    }


    render() {

        return(
            <div  style={{background: `url(${Background}) no-repeat center`,height:"560px",
                position:"relative",}}>
                <div className="mybox warp">
                    <div className="mybox warp wp1">
                        <div style={{height:"40px"}}></div>
                        <img src={lo} />
                        <h3><Translate content="All_increase.title_content" /></h3>
                    </div>
                    <div className="banner-container" style={{width:"1200px"}}>
                        <div className="banner1">
                            <ul className="banner-imgs" style={{width:"2432px"}}>
                                <li className="li-img" style={{width:"278px",marginLeft:"0px"}}>
                                    <a href="http://order.finchain.info/article/view/26" target="_blank">
                                        <img src={ban_1} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a href="http://order.finchain.info/article/zhi" target="_blank">
                                        <img src={ban_2} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a href="http://order.finchain.info/article/view/26" target="_blank">
                                        <img src={ban_3} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a href="https://block.cc/exchange/yibit" target="_blank">
                                        <img src={ban_4} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a>
                                        <img src={a2} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a>
                                        <img src={a3} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"330px",marginLeft:"36px"}}>
                                    <a>
                                        <img src={a1} />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <ul className="banner-dots">
                            <li className="li-dot actives"> </li>
                            <li className="li-dot"> </li>
                        </ul>
                    </div>
                </div>
                <div className="transparent-wrapper">
                    <div className="transparent-auto">
                        <a  href="http://order.finchain.info/article" target="_blank" >
                            <span className="new"> <Translate content="All_increase.choise" /></span>
                            <span className="texts" target="_blank" style={{color:"#fff"}}>
                              <Translate content="All_increase.notice" />
                            </span>

                            <span target="_blank" className="more-news" >
                               <Translate content="All_increase.more" /> >
                            </span>
                        </a>

                    </div>
                </div>

                <div style={{background:"#f6f8fb"}}>

                    <div className="home-market">
                        <div className="home-marketwarp">
                            <div className="market-info">
                                <span style={{marginLeft:"30px"}}>主交易区</span>
                            </div>
                        </div>
                        <div className="container">
                            <TabsControl>
                                <div name = "ETH交易区">
                                    <div className="btc_info">
                                        <table className="productTickers">
                                            <thead>
                                            <tr>
                                                <th className="align-left" style={{width:"150px",paddingLeft:"20px"}}>交易对</th>
                                                <th className="align-left" style={{width:"230px"}}>最新价</th>
                                                <th className="align-left" style={{width:"75px"}}>24H涨跌幅</th>
                                                <th className="align-right">24H最低</th>
                                                <th className="align-right">24H最高</th>
                                                <th className="align-right">24H成交量</th>
                                                <th className="align-center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {[
                                                {
                                                    quoteAsset: 'JRC',
                                                    baseAsset: 'ETH'
                                                }, {
                                                    quoteAsset: 'USDT',
                                                    baseAsset: 'ETH'
                                                },
                                                {
                                                    quoteAsset: 'BMAN',
                                                    baseAsset: 'ETH'
                                                },
                                            ].map(i => <MarketCard key={`${i.quoteAsset}_${i.baseAsset}`} quoteAsset={i.quoteAsset} baseAsset={i.baseAsset}/> )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div name = "JRC交易区">
                                    <div className="btc_info">
                                        <table className="productTickers">
                                            <thead>
                                            <tr>
                                                <th className="align-left" style={{width:"150px",paddingLeft:"20px"}}>交易对</th>
                                                <th className="align-left" style={{width:"230px"}}>最新价</th>
                                                <th className="align-left" style={{width:"75px"}}>24H涨跌幅</th>
                                                <th className="align-right">24H最低</th>
                                                <th className="align-right">24H最高</th>
                                                <th className="align-right">24H成交量</th>
                                                <th className="align-center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {[
                                                {
                                                    quoteAsset: 'BMAN',
                                                    baseAsset: 'JRC'
                                                },
                                                {
                                                    quoteAsset: 'USDT',
                                                    baseAsset: 'JRC'
                                                },
                                                {
                                                    quoteAsset: 'GUSD',
                                                    baseAsset: 'JRC'
                                                },
                                            ].map(i => <MarketCard key={`${i.quoteAsset}_${i.baseAsset}`} quoteAsset={i.quoteAsset} baseAsset={i.baseAsset}/> )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div name = "USDT交易区">
                                    <div className="btc_info">
                                        <table className="productTickers">
                                            <thead>
                                            <tr>
                                                <th className="align-left" style={{width:"150px",paddingLeft:"20px"}}>交易对</th>
                                                <th className="align-left" style={{width:"230px"}}>最新价</th>
                                                <th className="align-left" style={{width:"75px"}}>24H涨跌幅</th>
                                                <th className="align-right">24H最低</th>
                                                <th className="align-right">24H最高</th>
                                                <th className="align-right">24H成交量</th>
                                                <th className="align-center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {[
                                                {
                                                    quoteAsset: 'JRC',
                                                    baseAsset: 'USDT',
                                                }, {
                                                    quoteAsset: 'ETH',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'BTC',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'BCH',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'EOS',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'ETC',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'LTC',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'IOTA',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'XRP',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'XRP',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'XMR',
                                                    baseAsset: 'USDT'
                                                },
                                                {
                                                    quoteAsset: 'XLM',
                                                    baseAsset: 'USDT'
                                                },


                                            ].map(i => <MarketCard key={`${i.quoteAsset}_${i.baseAsset}`} quoteAsset={i.quoteAsset} baseAsset={i.baseAsset}/> )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div name = "BTC交易区">
                                    <div className="btc_info">
                                        <table className="productTickers">
                                            <thead>
                                            <tr>
                                                <th className="align-left" style={{width:"150px",paddingLeft:"20px"}}>交易对</th>
                                                <th className="align-left" style={{width:"230px"}}>最新价</th>
                                                <th className="align-left" style={{width:"75px"}}>24H涨跌幅</th>
                                                <th className="align-right">24H最低</th>
                                                <th className="align-right">24H最高</th>
                                                <th className="align-right">24H成交量</th>
                                                <th className="align-center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {[
                                                {
                                                    quoteAsset: 'JRC',
                                                    baseAsset: 'BTC'
                                                }, {
                                                    quoteAsset: 'USDT',
                                                    baseAsset: 'BTC'
                                                },
                                            ].map(i => <MarketCard key={`${i.quoteAsset}_${i.baseAsset}`} quoteAsset={i.quoteAsset} baseAsset={i.baseAsset}/> )
                                            }
                                            </tbody>
                                        </table>
									</div>
                                </div>
                            </TabsControl>
                        </div>

                    </div>

                    <div>
                        {[
                            {
                                quoteAsset: 'JRC',
                                baseAsset: 'ETH'
                            }, {
                                quoteAsset: 'USDT',
                                baseAsset: 'ETH'
                            },
                            {
                                quoteAsset: 'BMAN',
                                baseAsset: 'ETH'
                            },
                            {
                                quoteAsset: 'BMAN',
                                baseAsset: 'JRC'
                            },
                            {
                                quoteAsset: 'USDT',
                                baseAsset: 'JRC'
                            },
                            {
                                quoteAsset: 'GUSD',
                                baseAsset: 'JRC'
                            },
                            {
                                quoteAsset: 'JRC',
                                baseAsset: 'USDT',
                            }, {
                                quoteAsset: 'ETH',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'BTC',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'BCH',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'EOS',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'ETC',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'LTC',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'IOTA',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'XRP',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'XRP',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'XMR',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'XLM',
                                baseAsset: 'USDT'
                            },
                            {
                                quoteAsset: 'JRC',
                                baseAsset: 'BTC'
                            }, {
                                quoteAsset: 'USDT',
                                baseAsset: 'BTC'
                            },

                        ].map(i => <MarketCard2 key={`${i.quoteAsset}_${i.baseAsset}`} quoteAsset={i.quoteAsset} baseAsset={i.baseAsset}/> )
                        }
                    </div>


                    <div style={{height:"50px"}}></div>




                    <div className="bwarp03">
                        <div className="bwarp03 warp">
                            <div className="bwaphh">
                                <span>
                                    <Translate content="All_increase.choose" />
                                </span>
                                <em></em>
                            </div>
                            <ul className="clear">
                                <li style={{marginLeft:"18px"}}>
                                    <em>
                                        <img src={a5} />
                                    </em>
                                    <div><Translate content="All_increase.choose1" /></div>
                                    <p><Translate content="All_increase.choose1_p1" /></p>
                                    <p><Translate content="All_increase.choose1_p2" /></p>
                                    <p><Translate content="All_increase.choose1_p3" /></p>
                                </li>

                                <li style={{marginLeft:"110px"}}>
                                    <em>
                                        <img src={a6}/>
                                    </em>
                                    <div><Translate content="All_increase.choose2" /></div>
                                    <p><Translate content="All_increase.choose2_p1" /></p>
                                    <p><Translate content="All_increase.choose2_p2" /></p>
                                    <p><Translate content="All_increase.choose2_p3" /></p>
                                </li>
                                <li style={{marginLeft:"36px"}}>
                                    <em>
                                        <img src={a7}/>
                                    </em>
                                    <div><Translate content="All_increase.choose3" /></div>
                                    <p><Translate content="All_increase.choose3_p1" /></p>
                                    <p><Translate content="All_increase.choose3_p2" /></p>
                                    <p><Translate content="All_increase.choose3_p3" /></p>
                                </li>
                            </ul>
                            <div className="bwaphh">
                                <span>
                                    <Translate content="All_increase.super" />
                                </span>
                                <em></em>
                            </div>
                        </div>
                    </div>

                    <div className="bwarp04">
                        <div className="bwarp04 warp">
                            <div className="bwrap warp info">
                                <ul className="clear">
                                    <li style={{marginLeft:"18px"}}>
                                    <em>
                                        <img src={b1} />
                                    </em>

                                     <divs>
                                         <Translate content="All_increase.xing1" />
                                     </divs>
                                    <p><Translate content="All_increase.xing1_p" /></p>
                                </li>

                                    <li style={{marginLeft:"110px"}}>
                                        <em>
                                            <img src={b2}/>
                                        </em>
                                        <divs>
                                            <Translate content="All_increase.xing2" />
                                        </divs>
                                        <p><Translate content="All_increase.xing2_p" /></p>
                                    </li>
                                    <li style={{marginLeft:"102px"}}>
                                        <em>
                                            <img src={b3}/>
                                        </em>
                                        <divs>
                                            <Translate content="All_increase.xing3" />
                                        </divs>
                                        <p><Translate content="All_increase.xing3_p" /></p>
                                    </li>


                                    <li style={{marginLeft:"18px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b4} />
                                        </em>

                                        <divs>
                                            <Translate content="All_increase.xing4" />
                                        </divs>
                                        <p><Translate content="All_increase.xing4_p" /></p>
                                    </li>

                                    <li style={{marginLeft:"110px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b5}/>
                                        </em>
                                        <divs>
                                            <Translate content="All_increase.xing5" />
                                        </divs>
                                        <p><Translate content="All_increase.xing5_p" /></p>
                                    </li>
                                    <li style={{marginLeft:"102px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b6}/>
                                        </em>
                                        <divs>
                                            <Translate content="All_increase.xing6" />
                                        </divs>
                                        <p><Translate content="All_increase.xing6_p" /></p>
                                    </li>

                                    <li style={{marginLeft:"18px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b7} />
                                        </em>

                                        <divs>
                                            <Translate content="All_increase.xing7" />
                                        </divs>
                                        <p><Translate content="All_increase.xing7_p" /></p>
                                    </li>

                                    <li style={{marginLeft:"110px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b8}/>
                                        </em>
                                        <divs>
                                            <Translate content="All_increase.xing8" />
                                        </divs>
                                        <p><Translate content="All_increase.xing8_p" /></p>
                                    </li>
                                    <li style={{marginLeft:"102px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b9}/>
                                        </em>
                                        <divs>
                                            <Translate content="All_increase.xing9" />
                                        </divs>
                                        <p><Translate content="All_increase.xing9_p" /></p>
                                    </li>
                                </ul>


                            </div>
                            <div className="bwarp04 warp cla">
                            </div>
                            <div className="bwaphh2">

                                    <Translate content="All_increase.hezuo" />

                                <p></p>
                            </div>

                            <div className="bwarp04 warpaa">
                                <Show
                                    items={IMAGE_DATA}
                                    bool={this.state.bool}
                                    handleBoolean={this.handleBoolean}
                                />
                            </div>

                        </div>
                        <div style={b66}></div>
                    </div>

                    <footer className="kesUfh">
                        <div className="gTqwWp2">
                            <div className="gTqwWp2 left">
                                <em>
                                    <img src={lo1} />
                                </em>

                                    <Translate content="All_increase.tit" />

                                <p>Copyright © 2018 YIBIT</p>
                            </div>
                            <div className="gTqwWp2 left">
                                <divs> <Translate content="All_increase.Contactus" style={{opacity: 1}} /></divs>
                                <p className="gTqwWp2leftpp"><Translate content="All_increase.tit2" /> ：</p>
                                <p className="gTqwWp2leftpp">xuleizhen@finchain.info</p>
                                <p className="gTqwWp2leftpp"><Translate content="All_increase.tit3" /> ：https://t.me/YIBITCOM</p>
                                <p className="gTqwWp2leftpp"><Translate content="All_increase.tit4" />  ：btc508</p>
                            </div>
                            <div className="gTqwWp2 right">
                                <ul>
                                    <li >
                                        <divs> <Translate content="All_increase.About" style={{opacity: 1}} /></divs>
                                    </li>
                                    <li>
                                        <divs> <Translate content="All_increase.service" style={{opacity: 1}} /></divs>
                                    </li>
                                    <li>
                                        <divs> <Translate content="All_increase.follow" style={{opacity: 1}}/></divs>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site" target="_blank">
                                            <Translate content="All_increase.Introduction" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/standard" target="_blank">
                                            <Translate content="All_increase.fees" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/cont" target="_blank" >
                                            <Translate content="All_increase.off" />
                                        </a>
                                    </li>
                                    <li>
                                        <a  href="http://finchain.mikecrm.com/LrZ8QqS" target="_blank" >
                                            <Translate content="All_increase.Apply" />
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <Translate content="All_increase.token" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/cont" target="_blank" >
                                            <Translate content="All_increase.mico" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/article/zhi" target="_blank" >
                                            <Translate content="All_increase.Guide" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/service" target="_blank" >
                                            <Translate content="All_increase.term" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/YIBITCOM" target="_blank" >
                                            <Translate content="All_increase.tele" />
                                        </a>
                                    </li>
                                    <li>
                                        <a>

                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/binance-exchange/binance-official-api-docs" target="_blank"  >
                                            <Translate content="All_increase.api" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/yibite1" target="_blank" >
                                            <Translate content="All_increase.twi" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div style={b66}></div>

                        <div className="gTqwWp">
                            <ul className="eSzczK">
                                <li className="gQYxPK hMCSUO" >
                                    <a className="hMCSUO a1">
                                        <Translate content="All_increase.link" />
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a  className="hMCSUO a2" href="http://www.finchain.info" target="_blank">
                                        FINCHAIN
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a  className="hMCSUO a2" href="https://mp.weixin.qq.com/s/03kF0trtzYBvgyAwnRL6Jg" target="_blank">
                                        YIBIT公众号
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href="https://www.chainfor.com/home/member/articles.html?authorId=1198" target="_blank">
                                        链向财经
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href="https://block.cc" target="_blank">
                                        block.cc
                                    </a>
                                </li>

                                <li className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href="https://www.jinse.com/" target="_blank">
                                        金色财经
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href=" https://www.8btc.com/" target="_blank">
                                        巴比特
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href="http://www.gongxiangcj.com/" target="_blank">
                                        共享财经
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href="">
                                        AICOIN
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href="">
                                        Block123
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </footer>


                </div>
            </div>
        );
    }
}

class  Show extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bool: false
        };
        this.handleBoolean = this.handleBoolean.bind(this);
        // this.handleEnter = this.handleEnter.bind(this);
        // this.handleOut = this.handleOut.bind(this);
    }
    handleBoolean(bool) {
        this.setState(bool);
    }

    render(){
        let itemNodes = this.props.items.map((item, idx) => {
            return <SliderItem2 item={item}  key={"item" + idx} bool={this.state.bool} />;
        });

        return <ul>{itemNodes}</ul> ;

    }


}




export default Trade;