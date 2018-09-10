import React from "react";
import { Link } from "react-router/es";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import Slider from './Slider/Slider';
import ExchangeHeader from "../Exchange/Exchange";
require("./jys.css");
import Background from './backgroud.png';
var back ={
	height:"560px",
	position:'relative',
    backgroundImage: `url(${Background})`

};
var lo = require("./yibit-1.png");
var a1 = require("./banner1.png");
var a2 = require("./banner2.png");
var a3 = require("./banner3.png");
const IMAGE_DATA = [{
		src: require('./image/banner-1.png'),
		alt: 'images-1',

	},
	{
		src: require('./image/banner-2.png'),
		alt: 'images-2',
	},
    {
        src: require('./image/banner-3.png'),
        alt: 'images-2',
    },
    {
        src: require('./image/banner-1.png'),
        alt: 'images-2',
    },


];

class Trade2 extends React.Component {

	render() {
		return(
			<div className="my-box">
						<Slider
						    items={IMAGE_DATA}
						    speed={1.2}
						    delay={2.1}
						    pause={true}
						    autoplay={true}
						    dots={true}
						    arrows={true}
						/>     

				<div style={{background:"white",width:"100%"}}>

		        	{/*<div className="my-list">*/}
							{/*<div className="my-l">*/}
								{/*<div className="my-l-img">*/}
									{/*<img src={require('./image/icon-01.png')}/>*/}
								{/*</div>*/}
								{/*<div className="my-l-txt">*/}
									{/*<Link to={"/market/JRC_BTC"}>*/}
											{/*<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>GDEX.BTC</p>*/}
									{/*</Link>*/}
									{/*<div> <p><Translate content="All_increase.trade_jg" /></p>   <p className="c1">57，999.99829</p></div>*/}
									{/*<div> <p><Translate content="All_increase.trade_sl" /></p>   <p className="c2">500.40K</p> </div>*/}
									{/*<div> <p><Translate content="All_increase.trade_zdf" /></p>    <p className="c3">  -8.65%</p> </div>*/}
								{/*</div>*/}
							{/*</div>*/}
							{/*<div className="my-l">*/}
								{/*<div className="my-l-img">*/}
									{/*<img src={require('./image/icon-02.png')}/>*/}
								{/*</div>*/}
								{/*<div className="my-l-txt">*/}
									{/*<Link to={"/market/JRC_BMT"}> */}
										{/*<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>WWW.BMT</p>*/}
									{/*</Link>*/}
									{/*<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">4,999.929</p></div>*/}
									{/*<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">6789K</p> </div>*/}
									{/*<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +7.65%</p> </div>*/}
								{/*</div>*/}
							{/*</div>*/}
							{/*<div className="my-l">*/}
								{/*<div className="my-l-img">*/}
									{/*<img src={require('./image/icon-03.png')}/>*/}
								{/*</div>*/}
								{/*<div className="my-l-txt">*/}
									{/*<Link to={"/market/JRC_TEST"}>*/}
											{/*<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>WWW.TEST</p>*/}
									{/*</Link>*/}
									{/*<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">112</p></div>*/}
									{/*<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">997.87K</p> </div>*/}
									{/*<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c3">  -9.45%</p> </div>*/}
								{/*</div>*/}
							{/*</div>*/}
						{/*</div>*/}

							{/*{TabsControl}*/}


							
						
								
		        	<div className="my-list">
							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/icon-02.png')}/>
								</div>
								<div className="my-l-txt">
									<Link to={"/market/ETH_JRC"}>
											<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>ETH/JRC</p>
									</Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p>   <p className="c1">57，999.99829</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p>   <p className="c2">500.40K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p>    <p className="c3">  -8.65%</p> </div>
								</div>
							</div>
							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/icon-01.png')}/>
								</div>
								<div className="my-l-txt">
									<Link to={"/market/BTC_JRC"}>
										<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>BTC/JRC</p>
									</Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">4,999.929</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">6789K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +7.65%</p> </div>
								</div>
							</div>
							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/12.png')}/>
								</div>
								<div className="my-l-txt">
									<Link to={"/market/USDT_JRC"}>
											<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>USDT/JRC</p>
									</Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">112</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">997.87K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c3">  -9.45%</p> </div>
								</div>
							</div>
							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/icon-02.png')}/>
								</div>
								<div className="my-l-txt">
                                    <Link to={"/market/ETH_USDT"}>
										<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>ETH/USDT</p>
                                    </Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">3.98</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">67.99K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c3">  -8.65%</p> </div>
								</div>
							</div>
							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/icon-01.png')}/>
								</div>
								<div className="my-l-txt">
                                    <Link to={"/market/BTC_USDT"}>
										<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>BTC/USDT</p>
                                    </Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">700.968</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">679.09K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c3">  -10.65%</p> </div>
								</div>
							</div>
							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/13.png')}/>
								</div>
								<div className="my-l-txt">
                                    <Link to={"/market/BCH_USDT"}>
										<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>BCH/USDT</p>
                                    </Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
								</div>
							</div>

							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/15.png')}/>
								</div>
								<div className="my-l-txt">
									<Link to={"/market/BMAN_USDT"}>
										<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>BMAN/USDT</p>
									</Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
								</div>
							</div>

							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/icon-03.png')}/>
								</div>
								<div className="my-l-txt">
									<Link to={"/market/EOS_USDT"}>
										<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>EOS/USDT</p>
									</Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
								</div>
							</div>
							<div className="my-l">
								<div className="my-l-img">
									<img src={require('./image/14.png')}/>
								</div>
								<div className="my-l-txt">
									<Link to={"/market/ETC_USDT"}>
										<p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>ETC/USDT</p>
									</Link>
									<div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
									<div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
									<div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
								</div>
							</div>

                        <div className="my-l">
                            <div className="my-l-img">
                                <img src={require('./image/17.png')}/>
                            </div>
                            <div className="my-l-txt">
                                <Link to={"/market/LTC_USDT"}>
                                    <p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>LTC/USDT</p>
                                </Link>
                                <div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
                                <div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
                                <div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
                            </div>
                        </div>

                        <div className="my-l">
                            <div className="my-l-img">
                                <img src={require('./image/16.png')}/>
                            </div>
                            <div className="my-l-txt">
                                <Link to={"/market/IOTA_USDT"}>
                                    <p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>IOTA/USDT</p>
                                </Link>
                                <div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
                                <div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
                                <div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
                            </div>
                        </div>

                        <div className="my-l">
                            <div className="my-l-img">
                                <img src={require('./image/19.png')}/>
                            </div>
                            <div className="my-l-txt">
                                <Link to={"/market/XRP_USDT"}>
                                    <p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>XRP/USDT</p>
                                </Link>
                                <div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
                                <div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
                                <div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
                            </div>
                        </div>

                        <div className="my-l">
                            <div className="my-l-img">
                                <img src={require('./image/20.png')}/>
                            </div>
                            <div className="my-l-txt">
                                <Link to={"/market/XMR_USDT"}>
                                    <p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>XMR/USDT</p>
                                </Link>
                                <div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
                                <div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
                                <div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
                            </div>
                        </div>

                        <div className="my-l">
                            <div className="my-l-img">
                                <img src={require('./image/21.png')}/>
                            </div>
                            <div className="my-l-txt">
                                <Link to={"/market/XLM_USDT"}>
                                    <p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>XLM/USDT</p>
                                </Link>
                                <div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
                                <div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
                                <div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
                            </div>
                        </div>

                        <div className="my-l">
                            <div className="my-l-img">
                                <img src={require('./image/icon-02.png')}/>
                            </div>
                            <div className="my-l-txt">
                                <Link to={"/market/ETH_JRC"}>
                                    <p style={{fontFamily: "MicrosoftYaHei-Bold",fontSize: "20px", color: "#4A5660"}}>ETH/JRC</p>
                                </Link>
                                <div> <p><Translate content="All_increase.trade_jg" /></p> <p className="c1">1.78</p></div>
                                <div> <p><Translate content="All_increase.trade_sl" /></p> <p className="c2">55.88K</p> </div>
                                <div> <p><Translate content="All_increase.trade_zdf" /></p><p className="c4">  +8.65%</p> </div>
                            </div>
                        </div>
					</div>
                </div>
					
					<div className="my-jg"></div>
					<div style={{background:"white",width:"100%",overflow: "hidden"}}>
				      <div className="my-footer">
										<div className="my-ft">
											<p><Translate content="All_increase.trade_f1" /></p>
										</div>
										<div className="my-fb">
												<div>
													<img src={require('./image/group1.png')}/>
													<p className="t1"><Translate content="All_increase.trade_f2" /></p>
													<p className="t2"><Translate content="All_increase.trade_f3" /><br />
						<Translate content="All_increase.trade_f4" /></p>
												</div>
												<div>
													<img src={require('./image/group2.png')}/>
													<p className="t1"><Translate content="All_increase.trade_f5" /></p>
													<p className="t2"><Translate content="All_increase.trade_f6" /><br />
						<Translate content="All_increase.trade_f7" /></p>
												</div>
												<div>
													<img src={require('./image/group3.png')}/>
													<p className="t1"><Translate content="All_increase.trade_f8" /></p>
													<p className="t2"><Translate content="All_increase.trade_f9" /><br />
						<Translate content="All_increase.trade_f10" /></p>
												</div>
										</div>
							</div>
					</div>
					<footer className="kesUfh">
						<div className="gTqwWp">
							<ul className="eSzczK">
									<li className="gQYxPK hMCSUO">
											<a href="http://order.finchain.info/site" target="_blank">
                                                <Translate content="footer.abouts_us" />
											</a>
									</li>
									<li className="gQYxPK hMCSUO">
											<a href="http://order.finchain.info/site/service" target="_blank">
                                                <Translate content="footer.fuwu" />
											</a>
									</li>
									<li className="gQYxPK hMCSUO">
											<a href="http://order.finchain.info/site/notice" target="_blank">
                                                <Translate content="footer.yinsi" />
											</a>
									</li>
									<li className="gQYxPK hMCSUO">
											<a href="http://order.finchain.info/site/standard" target="_blank">
                                                <Translate content="footer.feilv" />
											</a>
									</li>
									<li className="gQYxPK hMCSUO">
											<a href="http://order.finchain.info/site/cont" target="_blank">
                                                <Translate content="footer.lianxi" />
											</a>
									</li>
									<li className="gQYxPK hMCSUO">
											<a href="https://github.com/binance-exchange/binance-official-api-docs">
                                                <Translate content="footer.apiss" />
											</a>
									</li>
									<li className="gQYxPK hMCSUO">
											<a href="http://finchain.mikecrm.com/LrZ8QqS" target="_blank">
                                                <Translate content="footer.shang" />
											</a>
									</li>
									<li className="gQYxPK hMCSUO">
											<a href="/clientDownloads.html">
                                                <Translate content="footer.down" />
											</a>
									</li>
							</ul>
						</div>
					</footer>
				</div>	

		);
	}
}

export default Trade2;