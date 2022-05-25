<template>
	<view class="payment-order">
		<!-- <hx-navbar left-text="支付订单" backTabbarUrl="/pages/order/order" :backgroundColor="[241,241,241]"></hx-navbar> -->
		<view class="top" :style="'height: '+navH+'px;background-color:'+bgColor+';margin-bottom:'+navH+'px;'">
			<view class="back_icon" @click.stop.prevent="backPage"></view>
			<!-- <image class="back_icon" src="/static/back_icon.png" @click.stop="backPage"></image> -->
			<text>支付订单</text>
		</view>
		<!-- 支付倒计时及金额 -->
		<view class="time-and-amount" :style="'margin-top:'+navH+'px;'">
			<view class="payment-countdown" v-if="showTime">
				<span>订单已超时</span>
			</view>
			<view class="payment-countdown" v-else>
				<span>支付剩余时间</span>
				<span class='time'>{{minutes}}:{{seconds}}</span>
			</view>
			<view class="payment-amount">
				<span>￥<span class="amount-of-money">{{payNum}}</span></span>
			</view>
			<view class="order-details">
				<span>{{headName}}</span>
				<!-- <span class="see-order-details" @tap='seeOrderDetails'>订单详情 <image src="../../static/home/jiantou.png"></image> -->
				<!-- </span> -->
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="payment-method">
			<view class="choice-payment">
				<span class="wx-payment">
					<image src="../../static/wechat-pay.png" mode=""></image>
					<span>微信支付</span>
				</span>
				<radio class="radio" value="1" :checked="checkedState==='1'" color="#F8D373" style="transform:scale(0.8)" />
			</view>
		</view>
		<!-- 确认支付 -->
		<view class="confirm-payment">
			<view class="btn-block" v-if="showTime">
				<button type="" class="payment-btn" @click="onHome">返回首页</button>
			</view>
			<view class="btn-block" v-else>
				<button type="" class="payment-btn" @click="onOrder">确认支付</button>
				<button type="" class="others-btn" open-type='share'>他人代付</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';

	export default {
		data() {
			return {
				bgColor: 'transparent',
				navH: 0,
				payNum: "",
				headName: "",
				arr: null,
				checkedState: "1",
				minutes: '',
				seconds: '',
				curTime: null,
				orderTime: null,
				test1: null,
				orderid: null,
				showTime: false

			}
		},
		onLoad(options) {
			uni.showShareMenu({
				withShareTicket: true
			})
			// console.log(this.$store.state.token,"token1111111")
			this.navH = this.$store.state.navHeight + 20;
			this.headName = uni.getStorageSync("user").hospitalName
			this.payNum = Number(options.payNum)
			this.orderid = options.orderid
		},
		onShow() {
			http.getPaytime(this.orderid).then(res => {
				this.curTime = res.data.curTime
				this.orderTime = res.data.orderTime
				this.count_down();
			})
			if (uni.getStorageSync('token').length == 0) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		},
		onHide() {
			clearTimeout(this.test1)
			uni.hideToast();
		},
		onUnload() {
			clearTimeout(this.test1); //清除定时器
			uni.hideToast();
		},
		methods: {
			fill_zero_prefix(num) {
				return num < 10 ? "0" + num : num
			},
			count_down() {
				var that = this
				//2016-12-27 12:47:08 转换日期格式
				// let time = begin.replace(/-/g, '/');
				var a = this.orderTime.split(/[^0-9]/);
				var b = this.curTime.split(/[^0-9]/)
				//截止日期：日期转毫秒
				var expireMs = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
				var currentTime = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
				// console.log(a,"+++++++")
				//倒计时秒
				var time = (expireMs.getTime() - (currentTime).getTime()) / 1000;
				// 渲染倒计时时钟
				that.test1 = setInterval(function() {
					time = time - 1;
					if (time < 0) {
						clearTimeout(that.test1);
						that.showTime = true;
						uni.showToast({
							title: '订单超时',
							icon: 'none',
							duration: 2000
						})
					} else {
						that.minutes = that.fill_zero_prefix(parseInt(time / 60));
						that.seconds = that.fill_zero_prefix(parseInt(time % 60));
					}
				}, 1000);
			},

			// 查看订单详情
			seeOrderDetails() {
				uni.navigateTo({
					url: "/pages/orderdetails/orderdetails"
				})
			},
			backPage() {
				uni.switchTab({
					url: '/pages/customer/customer'
				})
			},
			onHome() {
				uni.switchTab({
					url: "/pages/home/home"
				})
			},
			getSend(arry) {
				let that = this
				// console.log("3")
				uni.showLoading({
					title: '加载中...',
				})
				http.getSendOk(arry).then(res => {
					uni.hideLoading()
					uni.switchTab({
						url: '../home/home'
					})
				})
			},
			onOrder() {
				// console.log('调支付接口')
				var arr = {
					orderId: this.orderid,
					openid: uni.getStorageSync("openid")
				}
				var that = this
				http.getPay({
					openid: uni.getStorageSync('openid'),
					orderId: this.orderid,
					bigDecimal: this.payNum
				}).then((res) => {
					// console.log(res)
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.package,
						signType: res.signType,
						paySign: res.paySign,
						success: function(res) {
							// console.log('success:' + JSON.stringify(res));
							
							// console.log("1")
							uni.requestSubscribeMessage({
								tmplIds: ['z8pxhkJSHVrkMw4BLQBmUNIVUfamCOROqXUpSZJFg44'],
								success(res) {
									// console.log("2",res)
									if (res.z8pxhkJSHVrkMw4BLQBmUNIVUfamCOROqXUpSZJFg44 === 'accept') {
										that.getSend(arr)
									}
								}
							})

						},
						fail: function(err) {
							// console.log('fail:' + JSON.stringify(err));
						}
					});
				})

			}
		},

		onShareAppMessage: function(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}
			return {
				title: '有一笔营养膳食订单请帮我支付',
				path: '/pages/paymentOrder/paymentOrder?orderid=' + this.orderid + '&payNum=' + this.payNum
			}
		},

		watch: {
			// second: {
			// 	handler(newVal) {
			// 		this.num(newVal)
			// 	}
			// },
			// minute: {
			// 	handler(newVal) {
			// 		this.num(newVal)
			// 	}
			// }
		},
		computed: {
			// second: function() {
			// 	return this.num(this.seconds)
			// },
			// minute: function() {
			// 	return this.num(this.minutes)
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		position: fixed;
		left: 0;
		top: 0;
		font-size: 16px;
		font-weight: 600;
		width: 100%;
		// background-color: #fff;
		z-index: 999999999;

		.back_icon {
			position: absolute;
			bottom: 14px;
			left: 20upx;
			width: 48upx;
			height: 48upx;
			background-image: url('~@/static/back_icon.png');
			background-size: 24upx 48upx;
			background-position: center;
			background-repeat: no-repeat;
			z-index: 999999999;
		}

		text {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 16px;
		}
	}

	.payment-order {
		width: 100%;
		height: 100vh;
		background-color: #f6f6f6;
		overflow: hidden;

		.time-and-amount {
			width: 100%;
			height: 20%;
			// height: 350upx;
			padding: 50upx 0;
			box-sizing: border-box;

			&>view {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.payment-countdown {
				height: 30%;
				color: #5c5c5c;
				font-size: 26upx;

				.time {
					margin-left: 15upx;
				}
			}

			.payment-amount {
				height: 40%;

				.amount-of-money {
					font-size: 70upx;
					font-weight: 700;
				}
			}

			.order-details {
				height: 30%;
				color: #5c5c5c;
				font-size: 26upx;

				.see-order-details {
					margin-left: 20upx;

					&>image {
						width: 30upx;
						height: 30upx;
						vertical-align: -6upx;
					}
				}
			}
		}

		// 支付方式
		.payment-method {
			height: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 30upx;

			.choice-payment {
				width: 100%;
				height: 150upx;
				background-color: #fff;
				border-radius: 15upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20upx;

				.wx-payment {
					display: flex;
					align-items: center;

					&>image {
						width: 50upx;
						height: 50upx;
						margin-right: 15upx;
					}
				}
			}
		}

		// 确认支付
		.confirm-payment {
			height: 40%;
			padding: 0 30upx;
			box-sizing: border-box;

			.btn-block {
				height: 100%;
				width: 100%;
				position: relative;
			}

			.payment-btn {
				position: absolute;
				bottom: 200upx;
				width: 100%;
				background: #F8D373;
				color: #202021;
				border: none;
				font-size: 35upx;
				font-weight: 600;
			}

			.others-btn {
				position: absolute;
				bottom: 80upx;
				width: 100%;
				background: #F8D373;
				color: #202021;
				border: none;
				font-size: 35upx;
				font-weight: 600;
			}

			.payment-btn::after {
				border: none;
			}

			.others-btn::after {
				border: none;
			}
		}

	}
</style>
