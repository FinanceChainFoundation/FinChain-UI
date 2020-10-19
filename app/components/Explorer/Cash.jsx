import React from "react";
import { Link } from "react-router/es";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";

require("./global.css");
require("./ct.css");

class Cash extends React.Component {
	constructor(){
		super()
		this.state={
			showHide:false
		}
	}

	render() {
		 const icons = [
			  { img: './image/icon-01.png', bz: 'BTC', bz1: 'bitcion'},
			  { img: './image/icon-02.png', bz: '111', bz1: 'bitcion'},
			  { img: './image/icon-03.png', bz: '222', bz1: 'bitcion'},
			  { img: './image/icon-04.png', bz: '333', bz1: 'bitcion'},
			  { img: './image/icon-05.png', bz: '444', bz1: 'bitcion'},
			  { img: './image/icon-06.png', bz: '555', bz1: 'bitcion'},
			  { img: './image/icon-01.png', bz: '666', bz1: 'bitcion'}
			];
		return(
			<div className="wrap1">
			
				<div className="dw" >
					<div className="container">
						<div className="dw-title">提现</div>
						<div className="dw-body f-cb">
							{/*提现币种 */}
							<div className="f-fl" style={{minHeight: "521px"}}>
								<div className="withdrawBox">
									<div className="asset-info">
										<div className="selectBox selectAsset">
											<div className="selectIpt" 
											onClick={()=>{ this.setState({showHide : !this.state.showHide}) }}>
												<div className="curAssetInfo">
													<img src={require('./image/icon-01.png')}/>
													<strong>JRC</strong>
													<span> - Finchain</span>
												</div>
											</div>
											<ul className="scrollStyle" className={this.state.showHide?"":"hide"}>
												<li className="filterIpt"><input type="text" placeholder="请输入币种关键字"/></li>
												{icons.map((ico,i) => {
										          return (
										            <li className="coinInfo" key={i}>
														<img src={ico.img}/>
														<strong>{ico.bz}</strong>
														<span> - {ico.bz1}</span>
														<span className="notallowed" ></span>
													</li>
										          )
										        })}
											</ul>
										</div>
										<div style={{position:"relative"}}>
											<table className="curAsset">
												<colgroup style={{width:"120px"}}></colgroup>
												<colgroup style={{width:"180px"}}></colgroup>
												<tbody>
													<tr>
														<th>总额</th>
														<td>0.00000000 JRC</td>
													</tr>
													<tr>
														<th>下单冻结</th>
														<td>0.00000000 JRC</td>
													</tr>
													<tr>
														<th>可用余额</th>
														<td>0.00000000 JRC</td>
													</tr>
												</tbody>
											</table>
											<a href="javascript:;" target="_blank" className="binanceInfo">
												<i className="iconfont icon-infoicoShi"></i>什么是BTS？
											</a>
											
											<div className="speBox">
												{/*注意*/}
												<div className="importants">
													<strong>注意</strong>
													<ul>
														<li>最小提现数量为:50 BTS。</li>
														<li>请勿直接提现至众筹或ICO地址.我们不会处理未来代币的发放.</li>
													</ul>
												</div>
												{/*表单*/}
												<form className="withdrawalForm" id="withdrawalForm">
													<input type="text" name="asset" style={{display:"none"}} />
													<div className="filed">
														<div className="label1"><strong>BTS提现地址</strong></div>
														<div  className="selectBox" style={{marginBottom:"24px"}}>
															<input type="text" name="address" className="selectIpt" title="提现地址" />
															<p className="f-nomargin Validform_checktip"></p>
															<i className="iconfont"></i>
															<ul className="scrollStyle" style={{display:"none"}}>
																<li className="addAddress"><i className="iconfont icon-jia"></i>使用新地址</li>
															</ul>
														</div>
													</div>

													<div className="filed">
														<div className="label1 f-cb">
															<strong>BTS 提现备注</strong>
															<font className="f-fr hv">
								 								<input type="checkbox"/>无备注
								 							</font>
														</div>
														<input id="addressTag" type="text" name="addressTag"  datatype="addressTag"/>
														<p className="f-nomargin Validform_checktip"></p>
													</div> 
													 {/*提现数量*/}
													<div className="filed">
														<div className="label1 f-cb">
															<strong>提现数量</strong>
															<span className="f-fr">24h提现额度: <strong>0 / 2 BTC</strong></span>
														</div>
														<div className="inputGroup">
															<input id="amount" type="text" name="amount"  datatype="amount" />
															<span className="unit"> BTS </span>					
															{/*可用余额*/}
															<div className="available" style={{cursor:"pointer"}}>
																<font>可用余额:</font>
																<span>0.00000000</span>
															</div>
															<p className="f-nomargin Validform_checktip"></p>
														</div>
													</div>
													{/*手续费*/}
													<div className="total f-cb">
														手续费: <strong>0.00000000</strong>
														<span className="f-fr">实际到账: <strong>0.00000000</strong></span>
													</div>
													<input type="button" value="提交" className="btn btn-orange btn-block" id="btn-withdraw" />
												</form>
											</div>
											
											{/*温馨提示*/}
											<div className="tips">
												<strong>温馨提示</strong>
												<ul>
													<li>提现请求申请成功后，请去邮箱点击链接确认本次提现请求。</li>
													<li>您可以在充值提现<a href="javascript:;" className="yellow">历史记录</a>页面跟踪状态。</li>
												</ul>
											</div>
										</div>
									</div>
									{/*去交易*/}
									<div className="asset-link">
										<strong>去交易</strong>
										<div className="pairs">
											<a href="javascript:;">BTS/ JRC ></a>
										</div>
									</div>
								</div>
							</div>
							
							{/*提现记录 */}
							<div className="f-fr" style={{minHeight: "521px"}}>
								<div className="lists deposit">
									<div className="lists-title">
										历史记录
										<a href="javascript:;" className="more">更多</a>
										<span className="f-fr deposit-fail">未收到确认邮件
											<i className="iconfont icon-wen" style={{marginLeft: "5px", fontSize: "13px"}}></i>
										</span>
									</div>
									<ul className="nodata">
										
									</ul>
									<div className="nodata">
										<img src={require('./image/zups.png')}/>
										<p className="ng-binding">无提现记录</p>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>
			
		</div>
		);
	}
}

export default Cash;