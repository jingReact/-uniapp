<template>
	<view class="details">
		<view class="toback" style="margin-left: 6px; font-size: 22px;" @click="navBack">
			<i class="hxicon-back" style="color: ;"></i>
		</view>
		<view class="bg_img">
			<image :src="httpImg+detailsData.image" @click="previewImg(httpImg+detailsData.image)" mode=""></image>
		</view>
		<view class="caip">
			<view class="caip_top">
				<text>{{detailsData.name}}</text><text>¥{{detailsData.price}}</text>
			</view>
			<view class="caip_bom">
				<view class="biaoq">
					<block v-for="(item,index) in detailsData.foodTags" :key="index">
						<text>{{item.name}}</text>
					</block>
				</view>
				<!-- <view class="shopping">
					加入购物车
				</view> -->
				<hx-number-box @change="addGoodsChange" :value="detailsData.number" :rowData="detailsData" :clickTime="animaTime"
				  :show="false" :yans="detailsData.valid == 0 ? true:false"></hx-number-box>
			</view>
		</view>
		
		<view class="yyzz">
			<text>本餐品由 “武汉第一医院全派餐饮” 供应</text>
			<image src="../../static/img/wenhao.png" mode="" @click="license"></image>
		</view>
		<!-- 购物车 v-if="showFoot"-->
		<view class="foot" @touchmove.stop.prevent="mpClear" :style="{height: footHeight}" v-if="showFoot">
			<view class="zz" @click="hideShoppingCar"></view>
			<view class="btn-box" v-if="goodsTotalNumber!==0">
				<!-- <view class="btn-box-left" @click="contact">
					<view class="imgBox">
						<image src="../../static/merchants/contact.png" mode=""></image>
					</view>
					<text>联系商家</text>
				</view> -->
				<view class="btn-box-line"></view>
				<view class="btn-box-center" @click="showShoppingCar">
					<view class="cart" :animation="cartAnimationData">
						<view class="tag cartNum" v-if="goodsTotalNumber>0">{{goodsTotalNumber}}</view>
						<image :src="goodsTotalNumber ? '/static/merchants/cart.png' : '/static/merchants/cart2.png'" mode=""></image>
					</view>
					<view class="priceBox">
						<view class="hx-txt-18 hx-color-white" v-if="goodsTotalPrice>0">
							￥{{goodsTotalPrice}}
						</view>
						<view class="hx-txt-10 hx-color-gray">
						
							<text>另需配送费</text><text :class="shippingDees == '0' ? 'pay_ation' : ''">¥{{shippingDees}}</text>
						</view>
					</view>
				</view>
				<view class="btn-box-right">
					<view class="jiesuan" v-if="goodsTotalPrice>0 && goodsTotalPrice >= startingPrice" @click="jiesuan">
						去结算
					</view>
					<view class="pscj hx-txt-10 hx-color-gray" v-else>
						<text v-if="startingPrice>0">差￥{{-(goodsTotalPrice-startingPrice)}}起送</text>
					</view>
		
				</view>
			</view>
			<view class="cart-box" :style="{display: showCar ? 'flex' : 'none'}">
				<view class="box-container operating-box">
					<view class="operating-box_right">
		
					</view>
					<view class="operating-box_left clear" @click="clearShoppingCart">
						<i class="hxicon-delete"></i>
						<text>清空购物车</text>
					</view>
				</view>
				<view class=" goods-box">
					<view class="" style="flex: 1;">
						<scroll-view scroll-y="true" class="goods-list-scroll" :scroll-top="carGoodsScrollTop">
							<view class="goods-list">
								<view class="box" v-for="(rowData,i) in shoppCart" :key="rowData.id" v-if="rowData.number>0">
		
									<view class="m-store-item">
										<view class="m-img">
									
											<image style="width: 100%;height: 100%;" :src="httpImg+rowData.image" mode="scaleToFill"></image>
											<text class="actins" v-if="rowData.spec === 1">新品</text>
											<text v-else-if="rowData.spec === 2">招牌</text>
										</view>
										<view class="m-text">
											<view class="m-title">
												{{rowData.name}}
											</view>
											<view class="m-descripe">
												<block v-for="(item2,index) in rowData.foodTags" :key="index">
													<text>{{item2.name}}</text>
												</block>
												
											</view>
											<view class="m-price-box">
												<view class="symbol">￥</view>
												<view class="m-price">{{rowData.price}}</view>
												<view class="m-old-price" v-if="rowData.oldprice">
													<text>￥{{rowData.oldprice}}</text>
												</view>
											</view>
											<view class="m-distance">
												<view :class="'addEle2_' + rowData.id" class="jumpPosition">
												</view>
												<hx-number-box @change="addGoodsChange" :value="rowData.number" :rowData="rowData" :clickTime="animaTime"
												  :show="true" :yans="false"></hx-number-box>
		
											</view>
										</view>
		
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
		
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	import testData from "@/common/js/testdata.js";
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import hxNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	export default {
		components: {
			uniIcons,
			hxNumberBox
		},
		data() {
			return {
				hospitalName:"",
				dateTime: [],
				showCar:false,
				//配送起步价
				startingPrice: 0,
				storeData:[],
				//当前门店购物车
				shoppCart: [],
				//所有购物车
				shoppingCartAll: [],
				//购物车缓存 Storage 名称
				shoppingCartStorageName: 'shopping_cart',
				//配送费
				shippingDees: 0,
				//购物车商品价格合计
				goodsTotalPrice: 0,
				//购物车商品数量合计
				goodsTotalNumber: 0,
				//显示购物车
				cartAnimationData: {},
				//购物车位置数据
				cartBasketRect: {},
				hospitalName:"",
				showFoot: true,
				//foot 高度
				footHeight: '0',
				id:"",
				cbId:"",
				day:"",
				detailsData:null,
				httpImg: ""
			}
		},
		methods:{
			previewImg(imgurl) {
				console.log('放大图片')
					let _this = this;
					let imgsArray = [];
					imgsArray[0] = imgurl
					uni.previewImage({
						current: 0,
						urls: imgsArray
					});
				},
			license(){
				uni.navigateTo({
					url:"../aptitude/aptitude"
				})
			},
			formFirstAddGoods() {
				let that = this
				that.formAddGoodsChange(1, that.currentGoodsData)
				// that.touchOnAddGoods('#ggAddBtn', that.currentGoodsData)
			},
			//清空该门店的购物车
			clearShoppingCart() {
				let that = this;
				that.shoppCart = [];
				that.storeData.shopping_cart = [];
				for (let i in that.shoppingCartAll) {
					if (that.shoppingCartAll[i].store_id == that.storeData.store_id) {
						that.shoppingCartAll[i] = that.storeData
					}
				}
				uni.setStorageSync(that.shoppingCartStorageName, that.shoppingCartAll);
			
				// for (let i in that.CpDatalist) {
				// 	that.CpDatalist[i].number = 0;
				// }
				that.detailsData.number = 0;
				
				//购物车商品价格合计
				that.goodsTotalPrice = 0;
				//购物车商品数量合计
				that.goodsTotalNumber = 0;
				that.hideShoppingCar();
			},
			//加入购物车
			formAddGoodsChange(number, goodsData) {
				let that = this;
				if (number >= 1) {
					for (let i in goodsData.form_child) {
						if (goodsData.form_child[i].select == true) {
							that.currentGoodsData.current_form = goodsData.form_child[i]
							break
						}
					}
				}
				that.addGoodsChange(number, that.currentGoodsData)
			
			},
			//新增商品计算价格
			addGoodsChange(number, rowData) {
			
				number = Number(number)
				var that = this;
			
				let shoppCart = [];
				let totalPrice = 0;
				let totalNumber = 0;
				let existedGoods = false;
				//门店第一次添加商品
				let isFirstAddGoods = true;
				//是否为有规格的商品
				let isFormGoods = false
				if (rowData.current_form) {
					isFormGoods = true
				}
				let deleteGoods = null
				let carts = uni.getStorageSync(that.shoppingCartStorageName) || [];
				if (carts.length != 0) {
					isFirstAddGoods = false
					//根据缓存数据 获取购物车中属于本商店的商品
					for (let i in carts) {
						if (carts[i].store_id == that.storeData.store_id) {
							shoppCart = carts[i].shopping_cart ? carts[i].shopping_cart : [];
							break;
						}
					}
					//检查该商品是否为第一次添加，
					for (var i in shoppCart) {
						if (shoppCart[i].id == rowData.id) {
							if (isFormGoods) {
								//相同商品比较规格是否也相同
								if (shoppCart[i].current_form.id == rowData.current_form.id) {
									existedGoods = true;
								}
							} else {
								existedGoods = true;
							}
							if (existedGoods) {
								//在购物车中移除该商品
								if (number <= 0) {
									deleteGoods = shoppCart[i];
									break;
								}
								//非第一次添加，直接修改商品数量，并计算出单品合计
								if (isFormGoods) {
									shoppCart[i].price = rowData.current_form.price
									shoppCart[i].oldprice = rowData.current_form.oldprice
									shoppCart[i].total = number * rowData.current_form.price
								} else {
									shoppCart[i].price = rowData.price
									shoppCart[i].total = number * rowData.price
									shoppCart[i].oldprice = rowData.oldprice
								}
								shoppCart[i].number = rowData.number = number
								break;
							}
						}
					}
				}
				//在购物车中移除该商品
				if (deleteGoods != null) {
					if (carts) {
						//根据缓存数据 获取购物车中属于本商店的商品
						for (let i in carts) {
							if (carts[i].store_id == that.storeData.store_id) {
								var index = shoppCart.indexOf(deleteGoods);
			
								if (index > -1) {
									shoppCart.splice(index, 1);
								}
								carts[i].shopping_cart = shoppCart
								uni.setStorageSync(that.shoppingCartStorageName, carts);
								break;
							}
						}
						setTimeout(() => {
							// this.init();
						}, 100)
					} else {
						that.storeData.shopping_cart = []
						uni.setStorageSync(that.shoppingCartStorageName, that.storeData);
					}
			
					return
				}
			
				//第一次添加
				if (!existedGoods) {
					if (rowData.form) {
						rowData.price = rowData.current_form.price
						rowData.oldprice = rowData.current_form.oldprice
						rowData.total = number * rowData.current_form.price
					} else {
						rowData.total = number * rowData.price
					}
					rowData.number = number;
					shoppCart.push(rowData);
				}
			
				//计算总商品数量和总价
				for (var i in shoppCart) {
					//总价
					totalPrice += shoppCart[i].total
					totalNumber += shoppCart[i].number
				}
				//更改商品列表中的已购买数量
				// for (let i in that.CpDatalist) {
					if (that.detailsData.id == rowData.id) {
						that.detailsData = rowData
						// break;
					}
				// }
			
				that.goodsTotalPrice = totalPrice
				that.goodsTotalNumber = totalNumber
			
				that.shoppCart = shoppCart;
				that.storeData.shopping_cart = shoppCart;
			
				// that.setLabelNumber();
				if (isFirstAddGoods) {
					carts.push(that.storeData)
				}
				if (that.goodsTotalNumber == 0) {
					that.hideShoppingCar();
				}
				//购物车商品数据缓存至本地
				uni.setStorageSync(that.shoppingCartStorageName, carts);
			},
			getTimeArray(date) {
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				const hour = date.getHours();
				const minute = date.getMinutes();
				const second = date.getSeconds();
				if (month >= 10) {
					month = month;
				} else {
					month = "0" + month;
				}
				if (day >= 10) {
					day = day;
				} else {
					day = "0" + day;
				}
				return this.dateTime = [year, month, day, hour, minute, second];
			},
			
			//去结算
			jiesuan() {
				let newArr = JSON.parse(JSON.stringify(this.shoppCart))
				newArr.map(item => {
					item.quantity = item.number
					delete item.number
					delete item.image
					delete item.oldprice
					delete item.type_id
					delete item.total
					delete item.oldprice
					delete item.name
					delete item.descripe
				});
				var filternewArr = newArr.filter(function(person,index,arrs){
				 return person.quantity !== 0;
				})
					let parems = {
						come_from: "mobile",
						restaurant_id: uni.getStorageSync("user").hospilId,
						delivery_fee: this.shippingDees,
						entities: filternewArr,
						day:this.dateTime[0] + '-' + this.dateTime[1] + '-' + this.dateTime[2],
					 	is_prepare:1,
						cbId:"9"
					}
					http.getcheckout(parems).then(res =>{
						if(res.code == 9999){
							uni.showToast({
							    title: res.msg,
							    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
							    duration: 2000     
							}) 
							return
						}
						uni.navigateTo({
							url: "/pages/submit/submit?parems=" + JSON.stringify(res.data)
						})
						
					})
			},
			
			//添加商品
			addCart(id){
				console.log("当前id:"+id)
				this.goodsTotalNumber += 1;
			},
			mpClear(e) {
				// TODO nvue 取消冒泡
				e.stopPropagation()
			},
			//显示购物车
			showShoppingCar() {
				if (this.goodsTotalNumber == 0) {
					return;
				}
				this.footHeight = '100%';
				this.showCar = true;
				this.carGoodsScrollTop = 0;
			},
			//隐藏购物车
			hideShoppingCar() {
				this.footHeight = '0';
				this.showCar = false;
			},
			
			
			
			getfoodXq(){
				http.getfoodXq({
					itemId:Number(this.id),
					cbId:Number(this.cbId),
					day:this.day
				}).then(res =>{
					this.detailsData = res.data
				})
			},
			navBack() {
				if (getCurrentPages().length > 1) {
					uni.navigateBack();
				} else {
					uni.reLaunch({
						url: '/pages/home/home'
					});
				}
			},
		},
		onLoad(option) {
			var myDate = new Date();
			myDate.setTime(myDate.getTime() + 24 * 60 * 60 * 1000);
			this.getTimeArray(myDate);
			this.id = option.id;
			this.cbId = option.cbId;
			this.day = option.day;
			this.httpImg = testData.httpImg;
			this.storeData = testData.storeData;
			this.hospitalName =  uni.getStorageSync("user").hospitalName
		},
		onShow() {
			this.getfoodXq()
		}
	}
</script>

<style scoped lang="scss">
	.hx-color-white {
		color: #FFFFFF;
	}
	//主题颜色
	$hx-theme-color: #FFC107;
	$hx-theme-color-light: #FFEB3B;
	.details{
		.toback{
			position: fixed;
			top: 50upx;
			left: 0;
		}
	}
	.bg_img{
		width: 100%;
		height: 400upx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.caip{
		width: 100%;
		padding: 30upx 20upx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #888;
		.caip_top,.caip_bom{
			display: flex;
			justify-content: space-between;
		}
		.caip_top{
			margin-bottom: 30upx;
			font-size: 28rpx;
		}
		.caip_bom{
			.biaoq{
				display: flex;
				justify-content: left;
				text {
					font-size: 18upx;
					padding: 5upx 10upx;
					border: 1upx solid #EA3C0C;
					margin-right: 10upx;
					border-radius: 10upx;
					color: #EA3C0C;
					height: 30rpx;
					line-height: 28rpx;
				}
			}
			.shopping{
				width: 160upx;
				height: 60upx;
				border-radius: 30upx;
				background-color: #EA3C0C;
				color: #fff;
				font-size: 24rpx;
				text-align: center;
				line-height: 60rpx;
			}
		}
		
	}
	.yyzz{
		padding-top: 50upx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		text{
			margin-right: 10upx;
		}
		image{
			width: 30upx;
			height: 30upx;
		}
	}
	.foot {
		position: fixed;
		display: flex;
		z-index: 999;
	
		justify-content: center;
		align-items: center;
		bottom: 0;
		height: 100%;
		width: 100%;
	
		/*width: calc(100% - 32px);*/
		.btn-box {
			position: absolute;
			display: flex;
			// bottom: 30upx;
			bottom: 30upx;
			justify-content: center;
			align-items: center;
			margin: 0;
			height: 100upx;
			width: calc(100% - 64upx);
			z-index: 9;
	
			&-left {
				background: #222222;
				border-top-left-radius: 100upx;
				border-top-right-radius: 18upx;
				border-bottom-left-radius: 100upx;
				border-bottom-right-radius: 18upx;
				padding-left: 6upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-self: center;
				width: 140upx;
				height: 100%;
				color: #f6d200;
				text-align: center;
	
				.imgBox {
					display: flex;
					text-align: center;
					justify-content: center;
	
					image {
						width: 40upx;
						height: 40upx;
					}
				}
	
				text {
					font-size: 20upx;
				}
			}
	
			&-line {
				background: #ffffff;
				width: 4upx;
				height: 100%;
			}
	
			&-center {
				height: 100%;
				flex: auto;
				display: flex;
				justify-content: flex-start;
				align-self: center;
				align-items: center;
				background: #222222;
				border-top-left-radius: 50upx;
				border-bottom-left-radius: 50upx;
				padding-left: 50upx;
	
				.cart {
					position: relative;
					width: 72upx;
					height: 72upx;
					margin-right: 10upx;
					image {
						width: 100%;
						height: 100%;
					}
	
					.tag {
						position: absolute;
						right: 12upx;
						top: 16upx;
						height: 36upx;
						width: 36upx;
						background-color: #ff4000;
						color: #ffffff;
						border-radius: 50%;
						z-index: 1;
						font-size: 20upx;
						text-align: center;
						line-height: 36upx;
					}
				}
	
				.priceBox {
					flex: auto;
				}
	
			}
	
			&-right {
				width: 140upx;
				height: 100%;
				position: relative;
				display: flex;
				justify-content: flex-start;
				align-self: center;
				align-items: center;
	
	
				.pscj {
					width: 100%;
					height: 100%;
					border-top-right-radius: 100upx;
					border-bottom-right-radius: 100upx;
					background: #222222;
					text-align: center;
					display: flex;
					justify-content: center;
					align-self: center;
					align-items: center;
				}
	
				.jiesuan {
					width: 100%;
					height: 100%;
					font-size: 28upx;
					border-top-right-radius: 100upx;
					border-bottom-right-radius: 100upx;
					text-align: center;
					display: flex;
					justify-content: center;
					align-self: center;
					align-items: center;
					background: linear-gradient(45deg, $hx-theme-color-light, $hx-theme-color);
					font-weight: bold;
					color: #222222;
				}
			}
		}
	
		.zz {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, .7);
			z-index: 1;
		}
	
		.cart-box {
			display: flex;
			justify-content: flex-start;
			flex-flow: column;
			background: #ffffff;
			position: absolute;
			bottom: 0;
			z-index: 2;
			max-height: 66%;
	
			// padding-bottom: 62px;
			padding-bottom: 224upx;
			border-top-left-radius: 32upx;
			border-top-right-radius: 32upx;
			overflow: hidden;
			width: 100%;
	
			.rebate-box {
				height: 60rpx;
				background: #FFC107;
				color: #FF9900;
				text-align: center;
				line-height: 60rpx;
				font-size: 28rpx;
			}
	
			.box-container {
				box-sizing: border-box;
				padding: 0 32upx;
			}
	
			.operating-box {
				font-size: 24upx;
				line-height: 80upx;
				height: 80upx;
				border-bottom: 2upx solid #f6f6f6;
				color: #666666;
				display: flex;
				flex-direction: row;
	
				&_right {
					flex: 1;
				}
	
				&_left {
					display: flex;
					flex-direction: row;
				}
	
			}
	
			.goods-box {
				height: 100%;
				overflow: hidden;
				flex: 1;
				display: flex;
	
				.goods-list-scroll {
					height: 100%;
	
					.goods-list {
	
						width: 100%;
						display: flex;
						flex-wrap: wrap;
	
						.box {
							width: 100%;
							border-bottom: 2upx solid #f6f6f6;
							box-sizing: border-box;
							padding: 0 36upx;
	
							.m-store-item {
								display: flex;
								flex-direction: row;
								width: 100%;
								justify-content: space-between;
								align-items: flex-end;
								padding-top: 30upx;
								padding-bottom: 30upx;
	
								.m-img {
									position: relative;
									flex: 0 0 170upx;
									height: 170upx;
									background: #eee;
									border-radius: 8upx;
	
									text {
										position: absolute;
										top: 0;
										left: 0;
										display: block;
										height: 32upx;
										padding: 0 10upx;
										font-size: 22upx;
										background-color: #f6d200;
										border-bottom-right-radius: 8upx;
										border-top-left-radius: 8upx;
									}
	
									.actins {
										background-color: #27C56E;
									}
								}
	
								.m-text {
									flex: 1;
									position: relative;
									height: 170upx;
									padding: 0 12upx;
									display: flex;
									align-content: space-between;
									flex-direction: column;
	
									.m-title {
										font-size: 28upx;
										color: #555555;
										height: 42upx;
										font-weight: bold;
									}
	
									.m-descripe {
										font-size: 24upx;
										color: #999999;
										// margin-top: 5px;
										height: 52upx;
										display: flex;
										justify-content: left;
										align-items: center;
	
										text {
											height: 40upx;
											border-radius: 6upx;
											background-color: #eee;
											font-size: 24upx;
											padding: 0 6upx;
											line-height: 40upx;
											margin-right: 10upx;
										}
									}
	
									.m-price-box {
										height: 48upx;
										font-weight: bold;
										display: flex;
										flex-direction: row;
										align-items: flex-end;
	
										.symbol {
											color: #ff582b;
											font-size: 24upx;
										}
	
										.m-price {
											position: relative;
											top: 4upx;
											font-size: 32upx;
											color: #ff582b;
										}
	
										.m-old-price {
											margin-left: 6upx;
											display: flex;
											flex-direction: row;
											font-size: 20upx;
											color: #999999;
											margin-top: 5upx;
											text-decoration: line-through;
											font-weight: normal;
										}
									}
	
									.m-distance {
										position: absolute;
										right: 0;
										bottom: 10upx;
										z-index: 16;
										color: #b2b2b2;
										font-size: 20upx;
										text-align: right;
	
										.jumpPosition {
											position: absolute;
											bottom: 46upx;
											right: 0;
											z-index: 2;
											width: 56upx;
											height: 56upx;
										}
									}
	
								}
	
							}
						}
					}
				}
			}
		}
	}
	.hx-txt-10 {
		font-size: 20upx;
	}
	.hx-color-gray {
		color: #bbbbbb;
		.pay_ation{
			text-decoration:line-through;
		}
	}

</style>
