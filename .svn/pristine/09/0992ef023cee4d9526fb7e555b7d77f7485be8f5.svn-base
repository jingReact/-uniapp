<template>
	<view class="login">
		<view class="user">
			<image src="../../static/home/login.jpg" mode="widthFix"></image>
			<view class="btn code" @click="send">
				扫腕带登录
			</view>
			<button class="btn accredit" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber($event,'yh')">微信登录</button>

			<button class="btn qs" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber($event,'pcy')">
				配餐员登录
			</button>
			<!-- 用户协议 -->
			<view class="yhxy">
				<label class="list_box">
					<!-- <view>
						<radio :checked="checkout" style="transform:scale(0.6)"  @click="checkout = !checkout"/>
					</view> -->
					<view class="list_wz"><text>登录即代表您已同意</text><text class="yyds" @click="Toback">《用户服务协议》</text><text @click="Toback1">《隐私政策》</text></view>
					<view class="wll">
						此小程序仅本院住院患者及家属使用
					</view>
				</label>
			</view>
		
			<view class="wz">
				<view>武汉市第一医院</view>
				<view>云医膳</view>
			</view>
		</view>
	</view>
</template>

<script>
  import http from '@/common/js/http.js';
  import  {Decrypt, Encrypt}  from '@/common/js/crypto.js'
	export default {
		data() {
			return {
				checkout:false,
				isShow: false,
				phone: "",
				code: "",
				usertype:''
			}
		},
		methods: {
			Toback(){
				uni.navigateTo({
					url:'../agreement/agreement'
				})
			},
			Toback1(){
				uni.navigateTo({
					url:'../privacy/privacy'
				})
			},
			send() {
				let that = this
				uni.scanCode({
					success: function(res) {
						let arr = res.result
						http.getScan(res.result).then(list=>{
							uni.setStorageSync('token', list.data.token);
							that.$store.dispatch('setUserInfo')
							http.getuserinfo({}).then(item => {
								if(item.code === 9999){
									uni.showToast({
										title: item.msg,
										icon:'none',
										duration: 2000
									});
									return
								}
								uni.setStorageSync('user', item.data.profile);
								uni.setStorageSync('usertype', '5');
								uni.switchTab({
									url: '/pages/home/home'
								});
							})
						})
					}
				});
			
				uni.login({
					provider: 'weixin',
					success: res => {
						that.code = res.code
						// console.log(that.code,"222")
						http.getOpenid(
						that.code,
						).then(list => {
							// console.log(list.data,'99999999999')
							uni.setStorageSync('openid', list.openid)
						})
					}
				});
			},
			// toSwitch() {
			// 	uni.navigateTo({
			// 		// url: '/pages/home/home',
			// 		url: '/pages/loginqs/loginqs'
			// 	});
			// 	console.log('点击了')
			// },
			onGetPhoneNumber(e,user) {
				let that = this;
				let pages = getCurrentPages();
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
					// console.log("ooooo")
					//拒绝授权后弹出一些提示  
					return;
				}
				// console.log(e,"===========")
				if(user ==='yh'){
					this.usertype = '3'
				}else if (user === 'pcy'){
					this.usertype = '4'
				}
				uni.login({
					provider: 'weixin',
					success: res => {
						that.code = res.code
						http.getlogout({
							codes: that.code,
							encryptedData: e.detail.encryptedData,
							iv: e.detail.iv
						}).then(list => {
							uni.setStorageSync('openid', list.data.openid)
							http.getlogin({
								userType: Encrypt(this.usertype),
								username: Encrypt(list.data.phone),
								password: Encrypt("123456")
							}).then(res => {
								uni.setStorageSync('token', res.data.token);
								that.$store.dispatch('setUserInfo')
								if(res.code === 9999){
									uni.showToast({
										title: res.msg,
										icon:'none',
										duration: 2000
									});
									return
								}
								http.getuserinfo({}).then(item => {
									uni.setStorageSync('user', item.data.profile);
									uni.setStorageSync('usertype', this.usertype);
									   if(pages[pages.length - 2]){
									     //如果有上一页，就返回上一页
									     uni.navigateBack({//返回
									       delta: 1
									     })
									   }else{
										   if(this.usertype ==="3"){
											   uni.switchTab({
											   	url: '/pages/home/home'
											   });
										   }else{
											   uni.switchTab({
											   	url: '/pages/caballero/caballero'
											   });
										   }
									     
									   } 
								})
							})
						})
											
					}
				})


				// console.log(e, "++++")
				// e.detail.encryptedData //加密的用户信息  
				// e.detail.iv //加密算法的初始向量  时要用到  

			},
			
		},
		//微信朋友分享
				onShareAppMessage(res) {
					return {
						title: '市一云医膳--提供住院点餐服务',
						path: '/pages/login/login',
						imageUrl: '/static/dianjia.png',
						success: (res) => {
							this.$util.msg('分享成功')
						},
						fail: (res) => {
							this.$util.msg('分享失败')
						}
					}
				},
				//朋友圈分享
				onShareTimeline() {
					return {
						title: '市一云医膳--提供住院点餐服务',
						path: '/pages/login/login',
						imageUrl: '/static/dianjia.png',
						success: (res) => {
							this.$util.msg('分享成功')
						},
						fail: (res) => {
							this.$util.msg('分享失败')
						}
		
					}
				},
		onLoad: function(options) {
			let that = this;
			uni.login({
				provider: 'weixin',
				success: res => {
					that.code = res.code
					// console.log(that.code)
				}
			})
		}

	}
</script>

<style lang="scss" scoped>
	.login {
		width: 100%;
		height: 100vh;
		.user{
			background-color: #EEF7FF;
		}
		.user,
		.rider {
			width: 100%;
			height: 100vh;
			position: relative;

			image {
				width: 100%;
				// height: 100vh;
			}

			.btn {
				position: absolute;
				width: 500upx;
				height: 100upx;
				border-radius: 100upx;
				text-align: center;
				line-height: 100upx;
				padding-left: 0;
				padding-right: 0;
				border: none;
				left: 50%;
				transform: translate(-50%, 0);
			}

			.code {
				bottom: 370upx;
				background-color: #0D7AFF;
				color: #fff;

			}
			.accredit {
				// bottom: 190upx;
				bottom: 250upx;
				background-color: #01BE6E;
				color: #fff;
			}
			
			.qs {
				bottom: 130upx;
				left: 50%;
				background-color: #fff;
				transform: translate(-50%, 0);
				color: #000;
			}
		}
	}
	.yhxy{
		position: absolute;
		bottom: 25upx;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.list_box{
		width: 750upx;
		height: 60upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		font-size: 22upx;
		.list_wz{
			text:last-child{
				color: #04C2FF;
			}
			.yyds{
				color: #04C2FF;
			}
			margin-bottom: 5upx;
		}
		.wll{
			margin-right: 10upx;
		}
	}
	
	.wz{
		position: absolute;
		top: 70upx;
		left: 50upx;
		font-size: 32upx;
		font-weight: 700;
	}

</style>
