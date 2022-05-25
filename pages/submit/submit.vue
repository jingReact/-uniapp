<template>
	<view class="submit">
		<scroll-view class="housing_box" scroll-y="true" @scrolltolower="upper()">
			<view class="address">
				<view class="add_top" @click="toAddress" v-if="orders.currrent_address">
					<view class="dizhi">
						<text>{{orders.currrent_address}}</text>
						<text>{{orders.addr_user_name}} {{orders.cart.addr_user_id}}</text>
					</view>
					<view>
						<image src="../../static/home/jiantou.png" mode=""></image>
					</view>
				</view>
				<view v-else class="add_dz" @click="toAddress">
					<view>
						请选择收货地址
					</view>
				</view>
				<!-- <view class="aad_btm" v-if="orders.cart.is_prepare == 0">
					<text>立即送出</text>
					<text>大约{{orders.cart.deliver_time.slice(10,16)}}送达</text>
				</view> -->
				<!-- v-if="orders.cart.is_prepare == 1" -->
				<view class="ys_btm" >
					<view>送达时间</view>
					<!-- @click="showPopup1" -->
					<view >
						<input type="text" :value="orders.cart.deliver_time" placeholder="必选" disabled="true" style="text-align: right;"/>
						<image src="../../static/home/jiantou.png" mode=""></image>
					</view>
				</view>
				<view class="aad_btm">
					<text>支付方式</text>
					<text>微信支付</text>
				</view>
			</view>
			<view class="crad">
				<view class="merchants">
					<view class="merchants_l">
						<view class="img_mer">
							<image src="../../static/dianjia.png" mode=""></image>
						</view>
						<view class="wz_mer">
							<text>{{merchantName}}</text>
						</view>
					</view>
					<view class="merchants_r">
						<image src="../../static/home/jiantou.png" mode=""></image>
					</view>
				</view>
				<view class="goods" v-for="(item,index) in orders.cart.groups" :key="index">
					<view class="goods_l">
						<view class="goods_img">
								<image :src="httpImg+item.imagePath" mode=""></image>
						</view>
						<view class="sp">
							{{item.name}}
						</view>
					</view>
					<view class="goods_r">
						<text>¥{{item.price}}</text>
						<text>共{{item.quantity}}件</text>
					</view>
				</view>
				<view class="ps">
					<view>配送费</view>
					<view :class="orders.cart.deliver_amount == '0' ? 'pay_ation' : ''">¥{{orders.cart.deliver_amount}}</view>
				</view>
				<view class="bz">
					<view>备注</view>
					<view @click="toNote">
						<image src="../../static/home/jiantou.png" mode=""></image>
						<text>{{beizu}}</text>
					</view>
				</view>
				<view class="canju">
					<view>餐具份数</view>
					<view @click="showPopup"><text>{{select}}</text>
						<image src="../../static/home/jiantou.png" mode=""></image>
					</view>
				</view>
				<view class="xiaoji">
					<text>{{orders.cart.total}}</text>
					<text>¥</text>
					<text>小计</text>
				</view>
			</view>
		</scroll-view>
		
		<view class="submit_btn">
			<view>¥{{orders.cart.total}}</view>
			<button type="primary" @tap="toPay">提交订单</button>
		</view>
		
		<!-- 订单确认 -->
		<!-- <view class="shouwd" v-if="notice">
			<view class="yhxz">
				<view class="head">
					订单确认
				</view>
				<view class="wz_ms">
					您订单的餐次:{{riqi}}日的{{species}}
				</view>
				
				<view class="xx_bottom">
					<view @click="notice=false">取消</view>
					<button type="info" @click="agree">同意</button>
				</view>
			</view>
		</view> -->
		<van-popup :show="show" :z-index="666" round position="bottom" style="position: relative;">
			<view class="anniu">
				<view @click="show = false">取消</view>
				<view @click="checkout">确认</view>
			</view>
			<van-picker :columns="columns" @change="onChange" title="标题"/>
		</van-popup>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	import testData from "@/common/js/testdata.js";
	export default {
		data() {
			return {
				riqi:'',
				species:'',
				httpImg:'',
				notice:false,
				unique_id:'',
				num:1,
				num1:1,
				merchantName:"", //商家名称
				beizu:"点击选择备注信息",
				orders:null,
				addressData:null,
				parems:null,
				select:"可选",
				select1:"可选",
				select2:"",
				sdsj:"",
				show: false,
				sdTime:false,
				columns: ['无需餐具', '1份', '2份', '3份', '4份','5份','6份','7份','5份','8份','9份','10份'],
			}
		},
		methods: {
			upper(){},
			agree(){
				let that = this
				let prames ={
					  address: this.orders.currrent_address,
					  cartId: this.orders.id,
					  come_from: "mobile",
					  deliver_time:this.orders.cart.deliver_time,
					  area:this.orders.area,
					  areaCode:this.orders.areaCode,
					  delivery_fee: this.orders.cart.deliver_amount,
					  description: "",
					  userId:this.orders.cart.user_id,
					  remarks:this.beizu ==='点击选择备注信息'?'':this.beizu,
					  cjNum: this.num,
					  addr_user_name:this.orders.addr_user_name,
					  addr_user_id:this.orders.cart.addr_user_id,
					  cbId: this.orders.cbId
					  
				}
				http.getorders(prames).then(res1 =>{
					that.notice = false;
					that.unique_id = res1.data.unique_id
					let arry = {
						orderId:Number(res1.data.unique_id),
						openid:uni.getStorageSync("openid")
					}
					uni.requestSubscribeMessage({
					      tmplIds: ['qrwiEz4m0iKlxBN928R4y5EgUfuRXLqqGTiAwFGazCM'],
					      success (res) {
							if(res.qrwiEz4m0iKlxBN928R4y5EgUfuRXLqqGTiAwFGazCM === 'accept'){
								that.getSend(arry)
							}
							else{
								uni.navigateTo({
									url: "/pages/paymentOrder/paymentOrder?payNum="+that.orders.cart.total+"&orderid="+that.unique_id
								})
							}
						}
					})
				})
			},
			toAddress(){
				uni.navigateTo({
					url:"/pages/address/address?source=1"
				})
			},
			onChange(picker, value, index) {
				this.select1 = picker.detail.value
				this.num = picker.detail.index
			},
			onChange1(picker) {
				this.select2 = picker.detail.value
				this.num1 = picker.detail.index
			},
			checkout(){
				this.select =this.select1 
				this.show =false
			},
			showPopup() {
				this.show = true
			},
			toPay() {
				if(this.orders.currrent_address ===''){
					uni.showToast({
					   title: '请选择地址',
					   icon: "none",
					   duration: 1000
					})
					return
				}
				// if(this.sdsj ==""){
				// 	this.$util.msg('请选择配送时间')
				// 	return;
				// }
				// this.notice = true;
				let that = this;
				uni.showModal({
				    title: '订单确认',
				    content:'您订单的餐次:'+that.riqi+'日的'+that.species,
				    success: function (res) {
				        if (res.confirm) {
				           that.agree();
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				});
				
			},
			getSend(arry){
				let that = this
				uni.showLoading({
				  title: '加载中...',
				})
				http.getSend(arry).then(res =>{
					uni.hideLoading()
					uni.navigateTo({
						url: "/pages/paymentOrder/paymentOrder?payNum="+that.orders.cart.total+"&orderid="+that.unique_id
					})
				})
			},
			toNote(){
				// console.log("点击")
				uni.navigateTo({
					//跳转备注页面
					url: '/pages/notes/notes'
				})
			}
		},
		onLoad(options) {
			this.httpImg = testData.httpImg
			this.orders =JSON.parse(options.parems)
			this.merchantName = uni.getStorageSync('user').hospitalName
			// switch (this.orders.cbId) {
			//     case '3':
			//        this.species = "早餐";
			//        break;
			//     case '9':
			//         this.species = "午餐";
			//         break;
			//     case '6':
			//         this.species = "晚餐";
			//         break;
			// 		case '11':
			// 		this.species = "线上超市";
			// 		break;
			// }
			this.species = this.orders.cbName
			let riqi = this.orders.cart.day.split("-");
			this.riqi = riqi[2];
		},
		onShow() {
		    var that = this;
		    var pages = getCurrentPages();
		    var currPage = pages[pages.length - 1]; //当前页面
			this.beizu = currPage.data.sh;
		    // console.log(this.addressData,"_______")//为传过来的值
			if(!(this.orders.currrent_address.indexOf("床")==-1) &&!(this.orders.currrent_address.indexOf("护士")==-1)){
				this.orders.currrent_address +'床'
			}
			if(this.addressData !== null){
				this.orders.currrent_address =this.addressData.address+this.addressData.area+this.addressData.floor+this.addressData.bed
				this.orders.cart.addr_user_id = this.addressData.mobile
				this.orders.addr_user_name = this.addressData.name 
				this.orders.area = this.addressData.area
				this.orders.areaCode = this.addressData.areaCode
				// console.log(this.orders.addr_user_id,"oooo")
			}
		},
	}
</script>

<style lang="scss" scoped>
	.housing_box{
		height: 100vh;
	}
	.submit {
		position: relative;
		width: 100%;
		// height: 100%;
		background-color: #f6f6f6;
		padding: 30upx 20upx 0;
		box-sizing: border-box;

		.address {
			width: 100%;
			// height: 250upx;
			background-color: #fff;
			border-radius: 20upx;
			padding: 30upx 20upx;
			box-sizing: border-box;
			margin-bottom: 30upx;

			.add_top {
				display: flex;
				justify-content: space-between;
				width: 100%;
				view{
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					text:first-child {
						font-size: 32upx;
						// height: 50upx;
						line-height: 50upx;
						margin-bottom: 5upx;
						width: 640upx;
						// overflow: hidden;
						// white-space: nowrap;
						// text-overflow: ellipsis;
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2; 
					}
					
					text:last-child {
						font-size: 24upx;
						color: #c3c3c3;
						height: 50upx;
						line-height: 50upx;
					}
					image{
						width: 30upx;
						height: 30upx;
					}
				}
				
			}
			.add_dz{
				height: 120rpx;
				display:flex;
				justify-content: center;
				align-items: center;
				view{
					width: 300rpx;
					height: 65rpx;
					border: 1px solid #F0AD4E;
					line-height: 65rpx;
					color: #F0AD4E;
					text-align: center;
					border-radius: 35rpx;
				}
			}
			.aad_btm {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;

				text:last-child {
					color: #0D7AFF;
					height: 80upx;
					line-height: 80upx;
				}
			}
			.ys_btm {
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				margin-bottom: 20upx;
				height: 40upx;
				line-height: 40upx;
				view {
					display: flex;
					align-items: center;
					justify-content: right;
				
					image {
						width: 30upx;
						height: 30upx;
						margin-left: 5upx;
					}
				}
			}
		}

		.crad {
			width: 100%;
			// height: 600upx;
			background-color: #FFf;
			border-radius: 20upx;
			padding: 20upx 20upx 0;
			box-sizing: border-box;
			margin-bottom: 200upx;
			.merchants {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 20upx;
				margin-bottom: 20upx;
				border-bottom: 1upx solid #F5F5F5;

				.merchants_l {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 70%;
					font-size: 32upx;

					.img_mer {
						width: 60upx;
						height: 60upx;
						border-radius: 10upx;
						margin-right: 10upx;
						overflow: hidden;
					
						image {
							width: 100%;
							height: 100%;
						}
					}

					.wz_mer {
						flex: 1;
					}
				}

				.merchants_r {
					image {
						width: 30upx;
						height: 30upx;
						margin-left: 5upx;
					}
				}
			}

			.goods {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20upx;

				.goods_l {
					width: 75%;
					display: flex;
					align-items: center;
					font-size: 30upx;

					.goods_img {
						height: 150upx;
						width: 150upx;
						margin-right: 15upx;
						// background-color: skyblue;
						border-radius: 10upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}

				.goods_r {
					display: flex;
					flex-direction: column;

					text:first-child {
						font-size: 32upx;
					}

					text:last-child {
						font-size: 26upx;
						color: #777777;
					}
				}
			}

			.ps,
			.bz,
			.canju {
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				margin-bottom: 20upx;
				height: 40upx;
				line-height: 40upx;
			}
			.ps .pay_ation{
			text-decoration:line-through;
			}
			.canju {
				view {
					display: flex;
					align-items: center;
					justify-content: right;

					image {
						width: 30upx;
						height: 30upx;
						margin-left: 5upx;
					}
				}

			}
			.bz{
				width: 100%;
				view:last-child{
					display: flex;
					flex-direction: row-reverse;
					// justify-content: right;
					align-items: center;
					width: 75%;
					image {
						width: 30upx;
						height: 30upx;
						margin-left: 5upx;
					}
					text{
						width: 80%;
						text-align: right;
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap;
					}
				}
			}

			.act {
				background-color: #3875F7;
				color: #fff;
			}

			.xiaoji {
				display: flex;
				// justify-content: right;
				flex-direction: row-reverse;
				// align-items: center;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				border-top: 1upx solid #f6f6f6;

				text:nth-child(1) {
					font-size: 38upx;

				}

				text:nth-child(2) {
					font-size: 26upx;
					margin-right: 5upx;
				}

				text:nth-child(3) {
					margin-right: 15upx;
					font-size: 26upx;
				}
			}
		}

		.submit_btn {
			position: fixed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			bottom: 40upx;
			left: 20upx;
			width: 710upx;
			height: 100upx;
			background-color: #fff;
			border-radius: 50upx;

			button {
				width: 200upx;
				height: 100%;
				line-height: 100upx;
				border-top-right-radius: 50upx;
				border-bottom-right-radius: 50upx;
				margin: 0;
				font-size: 32upx;
				background-color: #F5C044;
				color: #000;
			}

			view {
				margin-left: 30upx;
			}
		}
		.anniu{
			position: absolute;
			top: 20upx;
			left: 0;
			width: 690upx;
			height: 60upx;
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			z-index: 668;
			view{
				font-size: 32upx;
				line-height: 60upx;
			}
			
		}
	}

	.shouwd{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.3);
		.yhxz{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			width: 600upx;
			height: 370upx;
			border-radius: 20upx;
			background-color: #2C2C2C;
			box-sizing: border-box;
			.head{
				padding: 40upx 0;
				width: 100%;
				text-align: center;
				color: #CFCFCF;
				font-size: 32upx;
			}
			.wz_ms{
				text-align: center;
				width: 100%;
				padding: 0 40upx 20upx;
				box-sizing: border-box;
				color: #868686;
			}
			.xx_bottom{
					position: absolute;
					left: 0;
					bottom: 0;
					height: 100upx;
					width: 100%;
					display: flex;
					justify-content: left;
					border-top:1upx solid #868686;
					view,button{
						width: 300upx;
						height: 100%;
						line-height: 100upx;
						font-size: 32upx;
						text-align: center;
						box-sizing: border-box;
						background-color: #2C2C2C;
						color: #727C8C;
					}
					view:nth-child(1){
						color: #868686;
						box-sizing:border-box;
						border-right:1upx solid #868686;
					}
					button::after {
					border-radius:0;
					}
					button{
						padding-left: 0;
						padding-right: 0;
						border: none;
					}
			}
		}
	}
</style>
