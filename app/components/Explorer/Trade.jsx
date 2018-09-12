import React from "react";
// import { Link } from "react-router/es";
// import Translate from "react-translate-component";
// import Icon from "../Icon/Icon";
// import Slider from './Slider/Slider';
// import ExchangeHeader from "../Exchange/Exchange";
import TabsControl from "./react_tab.jsx";
require("./jys.css");
import Background from "./backgroud.png";
import MyMarkets0830 from "../Exchange/MyMarkets0830";
import Translate from "react-translate-component";
import SliderItem2 from "./Slider/SliderItem2";
import SliderItem from "./Slider/SliderItem";
import {Link} from "react-router";
import MarketCard from './MarketCard';

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
var a4 = require("./zixuan1.png");
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
                        <h3>欢迎来到全球首个去中心化AI数字资产交易平台</h3>
                    </div>
                    <div className="banner-container" style={{width:"1200px"}}>
                        <div className="banner1">
                            <ul className="banner-imgs" style={{width:"2432px"}}>
                                <li className="li-img" style={{width:"278px",marginLeft:"0px"}}>
                                    <a>
                                        <img src={a1} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a href="http://order.finchain.info/article/zhi" target="_blank">
                                        <img src={a2} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a href="http://finchain.mikecrm.com/LrZ8QqS" target="_blank">
                                        <img src={a3} />
                                    </a>
                                </li>
                                <li className="li-img" style={{width:"278px",marginLeft:"30px"}}>
                                    <a>
                                        <img src={a1} />
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



                    {/*<Slider*/}
                    {/*items={IMAGE_DATA}*/}
                    {/*speed={1.2}*/}
                    {/*delay={5.1}*/}
                    {/*pause={true}*/}
                    {/*autoplay={true}*/}
                    {/*dots={true}*/}
                    {/*arrows={true}*/}
                    {/*/>*/}
                </div>
                <div className="transparent-wrapper">
                    <div className="transparent-auto">
                        <a  href="http://order.finchain.info/article" target="_blank" >
                            <span className="new">公告</span>
                            <span className="texts" target="_blank" style={{color:"#fff"}}>
                                重要通知  :   YIBIT交易所可自主进行JRC主网币兑换
                            </span>

                            <span target="_blank" className="more-news" >
                                更多>
                            </span>
                        </a>

                    </div>
                </div>

                <div style={{background:"#f6f8fb"}}>

                    {/*<div className="home-market">*/}
                        {/*<div className="home-marketwarp">*/}
                            {/*<div className="market-info">*/}
                                {/*<span style={{marginLeft:"30px"}}>主交易区</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="container">*/}
                            {/*<TabsControl>*/}
                                {/*<div name = "自选">*/}
                                    {/*<MyMarkets0830*/}
                                        {/*headerStyle={{paddingTop: 0}}*/}
                                        {/*columns={*/}
                                            {/*[*/}
                                                {/*{name: "star", index: 1},*/}
                                                {/*{name: "market", index: 2},*/}
                                                {/*{name: "vol", index: 3},*/}
                                                {/*{name: "price", index: 4},*/}
                                                {/*{name: "change", index: 5}*/}
                                            {/*]*/}
                                        {/*}*/}
										{/*// current={`${quoteSymbol}_${baseSymbol}`}*/}
                                    {/*/>*/}

                                {/*</div>*/}
                                {/*<div name = "BTC交易区">*/}
                                    {/*<div className="btc_info">*/}
										{/*<table className="productTickers">*/}
											{/*<thead>*/}
											{/*<tr>*/}
												{/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
												{/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
												{/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
												{/*<th className="align-right">24H最低</th>*/}
												{/*<th className="align-right">24H最高</th>*/}
												{/*<th className="align-right">24H成交量</th>*/}
												{/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
											{/*</tr>*/}
											{/*</thead>*/}
											{/*<tbody>*/}
											{/*<tr>*/}
												{/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
											{/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
											{/*</tbody>*/}
										{/*</table>*/}
									{/*</div>*/}
                                {/*</div>*/}
                                {/*<div name = "USDT交易区">*/}
                                    {/*<div className="btc_info">*/}
                                        {/*<table className="productTickers">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
                                                {/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
                                                {/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
                                                {/*<th className="align-right">24H最低</th>*/}
                                                {/*<th className="align-right">24H最高</th>*/}
                                                {/*<th className="align-right">24H成交量</th>*/}
                                                {/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div name = "ETH交易区">*/}
                                    {/*<div className="btc_info">*/}
                                        {/*<table className="productTickers">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
                                                {/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
                                                {/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
                                                {/*<th className="align-right">24H最低</th>*/}
                                                {/*<th className="align-right">24H最高</th>*/}
                                                {/*<th className="align-right">24H成交量</th>*/}
                                                {/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div name = "JRC交易区">*/}
                                    {/*<div className="btc_info">*/}
                                        {/*<table className="productTickers">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
                                                {/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
                                                {/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
                                                {/*<th className="align-right">24H最低</th>*/}
                                                {/*<th className="align-right">24H最高</th>*/}
                                                {/*<th className="align-right">24H成交量</th>*/}
                                                {/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</TabsControl>*/}
                        {/*</div>*/}

                    {/*</div>*/}



                    {/*<div className="home-market2">*/}
                        {/*<div className="home-marketwarp">*/}
                            {/*<div className="market-info">*/}
                                {/*<span style={{marginLeft:"30px"}}>自由区</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="container">*/}
                            {/*<TabsControl>*/}
                                {/*<div name = "自选">*/}
                                    {/*<MyMarkets0830*/}
                                        {/*headerStyle={{paddingTop: 0}}*/}
                                        {/*columns={*/}
                                            {/*[*/}
                                                {/*{name: "star", index: 1},*/}
                                                {/*{name: "market", index: 2},*/}
                                                {/*{name: "vol", index: 3},*/}
                                                {/*{name: "price", index: 4},*/}
                                                {/*{name: "change", index: 5}*/}
                                            {/*]*/}
                                        {/*}*/}
                                        {/*// current={`${quoteSymbol}_${baseSymbol}`}*/}
                                    {/*/>*/}

                                {/*</div>*/}
                                {/*<div name = "BTC交易区">*/}
                                    {/*<div className="btc_info">*/}
                                        {/*<table className="productTickers">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
                                                {/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
                                                {/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
                                                {/*<th className="align-right">24H最低</th>*/}
                                                {/*<th className="align-right">24H最高</th>*/}
                                                {/*<th className="align-right">24H成交量</th>*/}
                                                {/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div name = "USDT交易区">*/}
                                    {/*<div className="btc_info">*/}
                                        {/*<table className="productTickers">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
                                                {/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
                                                {/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
                                                {/*<th className="align-right">24H最低</th>*/}
                                                {/*<th className="align-right">24H最高</th>*/}
                                                {/*<th className="align-right">24H成交量</th>*/}
                                                {/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div name = "ETH交易区">*/}
                                    {/*<div className="btc_info">*/}
                                        {/*<table className="productTickers">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
                                                {/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
                                                {/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
                                                {/*<th className="align-right">24H最低</th>*/}
                                                {/*<th className="align-right">24H最高</th>*/}
                                                {/*<th className="align-right">24H成交量</th>*/}
                                                {/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div name = "JRC交易区">*/}
                                    {/*<div className="btc_info">*/}
                                        {/*<table className="productTickers">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th className="align-left" style={{width:"150px",paddingLeft:"20px"}} >交易对</th>*/}
                                                {/*<th className="align-left" style={{width:"230px"}}>最新价</th>*/}
                                                {/*<th className="align-left" style={{width:"70px"}}>24H涨跌幅</th>*/}
                                                {/*<th className="align-right">24H最低</th>*/}
                                                {/*<th className="align-right">24H最高</th>*/}
                                                {/*<th className="align-right">24H成交量</th>*/}
                                                {/*<th className="align-center">操作</th>*/}
                                                {/*<th className="align-left"></th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}

                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td style={{paddingLeft:"20px"}}>BTC / JRC</td>*/}
                                                {/*<td><span>23567890.00</span> /<span className="tbodspan2">≈¥43300.15</span></td>*/}
                                                {/*<td>*/}
                                                    {/*<span className="tdsnnzhang">*/}
                                                        {/*+4.90%*/}
                                                    {/*</span>*/}

                                                {/*</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">234567890.00</td>*/}
                                                {/*<td className="tbotd1">4,545,454,545</td>*/}
                                                {/*<td className="tbotd2">*/}
                                                    {/*<span className="tbotd2sp">*/}
                                                        {/*去交易*/}
                                                    {/*</span>*/}
                                                {/*</td>*/}
                                                {/*<td className="tbotd1img">*/}
                                                    {/*<img  src={a4} />*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</TabsControl>*/}
                            {/*<div className="contaclas">*/}
                                {/*查看更多*/}
                            {/*</div>*/}
                        {/*</div>*/}

                    {/*</div>*/}

                    <table>
                        <thead>
                            <tr>
                                <th>交易对</th>
                                <th>最新价</th>
                                <th>24H涨跌幅</th>
                                <th>24H最低</th>
                                <th>24H最高</th>
                                <th>24H成交量</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    quoteAsset: 'ETH',
                                    baseAsset: 'JRC'
                                }, {
                                    quoteAsset: 'BTC',
                                    baseAsset: 'JRC'
                                }, {
                                    quoteAsset: 'USDT',
                                    baseAsset: 'JRC'
                                }, {
                                    quoteAsset: 'ETH',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'BTC',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'BCH',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'BMAN',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'EOS',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'ETC',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'LTC',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'IOTA',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'XRP',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'XMR',
                                    baseAsset: 'USDT'
                                }, {
                                    quoteAsset: 'XLM',
                                    baseAsset: 'USDT'
                                }
                            ].map(i => <MarketCard key={`${i.quoteAsset}_${i.baseAsset}`} quoteAsset={i.quoteAsset} baseAsset={i.baseAsset}/> )
                            }
                        </tbody>
                    </table>


                    <div className="bwarp03">
                        <div className="bwarp03 warp">
                            <div className="bwaphh">
                                <span>
                                    为什么选择YIBIT
                                </span>
                                <em></em>
                            </div>
                            <ul className="clear">
                                <li style={{marginLeft:"18px"}}>
                                    <em>
                                        <img src={a5} />
                                    </em>
                                    <span>去中心化</span>
                                    <p>服务器节点</p>
                                    <p>数字资产管理</p>
                                    <p>社区自由上币</p>
                                </li>

                                <li style={{marginLeft:"110px"}}>
                                    <em>
                                        <img src={a6}/>
                                    </em>
                                    <span>人工智能</span>
                                    <p>智能风控(选币)</p>
                                    <p>智能投顾（选时）</p>
                                    <p>智能交易助手</p>
                                </li>
                                <li style={{marginLeft:"36px"}}>
                                    <em>
                                        <img src={a7}/>
                                    </em>
                                    <span>一站式服务</span>
                                    <p>数字资产发行、众筹</p>
                                    <p>数字资产交易</p>
                                    <p>数字资产管理</p>
                                </li>
                            </ul>
                            <div className="bwaphh">
                                <span>
                                    超级节点推荐审核项
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

                                    <span>赵俊</span>
                                    <p>趋格资本发起人</p>
                                </li>

                                    <li style={{marginLeft:"110px"}}>
                                        <em>
                                            <img src={b2}/>
                                        </em>
                                        <span>巨蟹</span>
                                        <p>GBAC董事长</p>
                                    </li>
                                    <li style={{marginLeft:"102px"}}>
                                        <em>
                                            <img src={b3}/>
                                        </em>
                                        <span>史伯平</span>
                                        <p>君瀚资本合伙人</p>
                                    </li>


                                    <li style={{marginLeft:"18px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b4} />
                                        </em>

                                        <span>黄连金</span>
                                        <p>美国 DistributedApps CEO和创始人</p>
                                    </li>

                                    <li style={{marginLeft:"110px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b5}/>
                                        </em>
                                        <span>曹寅</span>
                                        <p>数字文艺复兴基金会合伙人</p>
                                    </li>
                                    <li style={{marginLeft:"102px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b6}/>
                                        </em>
                                        <span>初夏虎</span>
                                        <p>维优元界创始人兼CEO</p>
                                    </li>

                                    <li style={{marginLeft:"18px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b7} />
                                        </em>

                                        <span>丁阳</span>
                                        <p>比莱资本合伙人</p>
                                    </li>

                                    <li style={{marginLeft:"110px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b8}/>
                                        </em>
                                        <span>钱包</span>
                                        <p>瑞普咨询</p>
                                    </li>
                                    <li style={{marginLeft:"102px",marginTop: "50px"}}>
                                        <em>
                                            <img src={b9}/>
                                        </em>
                                        <span>于卫华</span>
                                        <p>NULS战略投资部</p>
                                    </li>
                                </ul>




                            </div>
                            <div className="bwarp04 warp cla">
                            </div>
                            <div className="bwaphh2">
                                <span>
                                    合作伙伴
                                </span>
                                <p></p>
                            </div>

                            <div className="bwarp04 warpaa">

                                    {/*<li style={b11}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c1} />*/}
                                        {/*</em>*/}

                                    {/*</li>*/}

                                    {/*<li style={b22}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c2}/>*/}
                                        {/*</em>*/}

                                    {/*</li>*/}
                                    {/*<li style={b22}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c3}/>*/}
                                        {/*</em>*/}

                                    {/*</li>*/}
                                    {/*<li style={b33}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c4}/>*/}
                                        {/*</em>*/}

                                    {/*</li>*/}

                                    {/*<li style={b11}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c5} />*/}
                                        {/*</em>*/}

                                    {/*</li>*/}

                                    {/*<li style={b22}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c6}/>*/}
                                        {/*</em>*/}

                                    {/*</li>*/}
                                    {/*<li style={b22}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c7}/>*/}
                                        {/*</em>*/}

                                    {/*</li>*/}
                                    {/*<li style={b33}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c8}/>*/}
                                        {/*</em>*/}

                                    {/*</li>*/}

                                    {/*<li style={b45}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c9} />*/}
                                        {/*</em>*/}

                                    {/*</li>*/}

                                    {/*<li style={b44}>*/}
                                        {/*<em>*/}
                                            {/*<img src={c10}/>*/}
                                        {/*</em>*/}

                                    {/*</li>*/}
                                    {/*<li style={b44}>*/}
                                        {/*<em>*/}
                                            {/*/!*<img src={a7}/>*!/*/}
                                        {/*</em>*/}

                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<em>*/}
                                            {/*/!*<img src={a7}/>*!/*/}
                                        {/*</em>*/}

                                    {/*</li>*/}
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
                                <span>全球首个去中心化AI交易平台</span>
                                <p>Copyright © 2018 YIBIT</p>
                            </div>
                            <div className="gTqwWp2 left">
                                <span style={{opacity: 1}}>联系我们</span>
                                <p className="gTqwWp2leftpp">客服邮箱 ：xuleizhen@finchain.info</p>
                                <p className="gTqwWp2leftpp">电报群 ：https://t.me/YIBITCOM</p>
                                <p className="gTqwWp2leftpp">客服微信号 ：btc508</p>
                            </div>
                            <div className="gTqwWp2 right">
                                <ul>
                                    <li >
                                        <span style={{opacity: 1}} >
                                            关于我们
                                        </span>
                                    </li>
                                    <li>
                                        <span style={{opacity: 1}}>
                                            服务支持
                                        </span>
                                    </li>
                                    <li>
                                        <span style={{opacity: 1}}>
                                            加入社区
                                        </span>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site" target="_blank">
                                            YIBIT介绍
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/standard" target="_blank">
                                            费率标准
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/cont" target="_blank" >
                                            官方公众号
                                        </a>
                                    </li>
                                    <li>
                                        <a  href="http://finchain.mikecrm.com/LrZ8QqS" target="_blank" >
                                            上币申请
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                           币种介绍
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/cont" target="_blank" >
                                            微博
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/article/zhi" target="_blank" >
                                            帮助中心
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://order.finchain.info/site/service" target="_blank" >
                                            用户协议
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/YIBITCOM" target="_blank" >
                                            电报群
                                        </a>
                                    </li>
                                    <li>
                                        <a>

                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/binance-exchange/binance-official-api-docs" target="_blank"  >
                                            API文档
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/yibite1" target="_blank" >
                                            推特
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
                                        友情链接 :
                                    </a>
                                </li>
                                <li className="gQYxPK hMCSUO">
                                    <a  className="hMCSUO a2" href="www.finchain.info" target="_blank">
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
                                    <a className="hMCSUO a2" href="https://www.toutiao.com/c/user/67196788842/#mid=1576593621722125" target="_blank">
                                        趣味区块链
                                    </a>
                                </li>
                                <li  className="gQYxPK hMCSUO">
                                    <a className="hMCSUO a2" href="https://mp.weixin.qq.com/s/Q0uyDcQ7wVTvAF5oT5Grwg" target="_blank">
                                        区块链超人
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




                    {/*<div className="my-jg"></div>*/}

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
    //
    // handleEnter() {
    //     this.props.handleBoolean(true);
    //     this.setState({
    //         bool: true
    //     });
    // }
    // handleOut() {
    //     this.setState({
    //         bool: false
    //     });
    //     this.props.handleBoolean(false);
    // }

    render(){
        let itemNodes = this.props.items.map((item, idx) => {
            return <SliderItem2 item={item}  key={"item" + idx} bool={this.state.bool} />;
        });
        // let item = this.props.items;
        // let style = {};
        // if (this.props.bool) {
        //     style = {
        //         float: "left",
        //         width: "340px",
        //         height: "340px",
        //         backgroundColor: "black",
        //         transition: "all 1s"
        //     };
        // }
        // if (this.state.bool) {
        //     style = {
        //         float: "left",
        //         width: "340px",
        //         height: "340px",
        //         backgroundImage:"red",
        //
        //     };
        // }
        return <ul>{itemNodes}</ul> ;

    }


}




export default Trade;