<template>
	<view class="caballero">
		<van-tabs v-model="active" @change="onChange" color="#F9DC67">
			<van-tab title="待取货">
				<view class="housing_box">
					<!-- <scroll-view  scroll-y="true" @scrolltolower="upper()" style="height:100%;"> -->
					<view class="empty_content" v-if="noDataFlag">
						<image src="../../static/bg.png" mode=""></image>
						<text>暂无订单</text>
					</view>
					<block v-else>
						<view class="allorder">
							<view class="crad" v-for="(item,index) in Picklist" :key="index">
								<view class="merchants">
									<view class="merchants_l">
										<view class="img_mer">
											<image src="../../static/dianjia.png" mode=""></image>
										</view>
										<view class="wz_mer">
											<text>{{item.restaurant_name}}</text>
										</view>
									</view>
									<view class="merchants_r">
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
								</view>
								<view class="goods" v-for="(item1,index1) in item.basket.group" :key="index1">
									<view class="goods_l">
										<view class="goods_img">
											<image style="width: 100%;height: 100%;" :src="httpImg+item1.imagePath" mode="scaleToFill"></image>
										</view>
										<view class="sp">
											{{item1.name}}
										</view>
									</view>
									<view class="goods_r">
										<text>¥{{item1.price}}</text>
										<text>共{{item1.quantity}}件</text>
									</view>

								</view>

								<view class="info_kh">
									<view class="dz">
										<text>{{item.currrent_address}}</text>
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
									<view class="xx">
										<text>{{item.addr_user_name}}</text>
										<text @click="contact(item.addr_user_id)">{{item.addr_user_id}}</text>
									</view>
								</view>
								<view class="ps">
									<view>配送费</view>
									<view>¥{{item.basket.deliveryFee}}</view>
								</view>
								<view class="jg_content">
									<view class="ddje_content">
										订单金额:¥{{item.total_amount}}
									</view>
									<view class="sfje_content">
										实付金额:¥{{item.actual_mount}}
									</view>
								</view>
								<!-- <view class="sj">
									<view>立即送出</view>
									<view><text>大约{{item.formatted_deivery_time.slice(10,16)}}送达</text>
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
								</view> -->
								<view class="lsh">
									商家流水号: {{item.seqText}}
								</view>
								<view class="btn act" @click="Pinkfood(item.delivery.account,item.unique_id)">
									取货
								</view>
								<view class="btn act single" @click="Single(item.unique_id)">
									分单
								</view>
							</view>
							<uni-load-more :status="loadingStatus"></uni-load-more>
						</view>
					</block>
					<!-- </scroll-view> -->

				</view>

			</van-tab>
			<van-tab title="配送中">
				<view class="housing_box">
					<!-- <scroll-view scroll-y="true" @scrolltolower="upper()" style="height:100%;"> -->
					<view class="empty_content" v-if="noDataFlag">
						<image src="../../static/bg.png" mode=""></image>
						<text>暂无订单</text>
					</view>
					<block v-else>
						<view class="allorder">
							<view class="crad" v-for="(item,index) in shippinglist" :key="index">
								<view class="merchants">
									<view class="merchants_l">
										<view class="img_mer">
											<image src="../../static/dianjia.png" mode=""></image>
										</view>
										<view class="wz_mer">
											<text>{{item.restaurant_name}}</text>
										</view>
									</view>
									<view class="merchants_r">
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
								</view>
								<view class="goods" v-for="(item1,index1) in item.basket.group" :key="index1">
									<view class="goods_l">
										<view class="goods_img">
											<image style="width: 100%;height: 100%;" :src="httpImg+item1.imagePath" mode="scaleToFill"></image>
										</view>
										<view class="sp">
											{{item1.name}}
										</view>
									</view>
									<view class="goods_r">
										<text>¥{{item1.price}}</text>
										<text>共{{item1.quantity}}件</text>
									</view>
								</view>
								<view class="info_kh">
									<view class="dz">
										<text>{{item.currrent_address}}</text>
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
									<view class="xx">
										<text>{{item.addr_user_name}}</text>
										<text @click="contact(item.addr_user_id)">{{item.addr_user_id}}</text>
									</view>
								</view>
								<view class="ps">
									<view>配送费</view>
									<view>¥{{item.basket.deliveryFee}}</view>
								</view>
								<view class="jg_content">
									<view class="ddje_content">
										订单金额:¥{{item.total_amount}}
									</view>
									<view class="sfje_content">
										实付金额:¥{{item.actual_mount}}
									</view>
								</view>
								<!-- <view class="sj">
									<view>立即送出</view>
									<view><text>大约{{item.formatted_deivery_time.slice(10,16)}}送达</text>
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
								</view> -->
								<view class="lsh">
									商家流水号: {{item.seqText}}
								</view>
								<view class="upload">
									<!-- <view class="sc" @click="uplode(item.delivery.account,item.unique_id)">
										上传图片送达
									</view> -->
									<view class="sc" @click="Confirmdel(item.delivery.account,item.unique_id)">
										送达
									</view>

								</view>
							</view>
							<uni-load-more :status="loadingStatus"></uni-load-more>
						</view>
					</block>
					<!-- </scroll-view> -->

				</view>

			</van-tab>

			<van-tab title="已完成">
				<view class="housing_box">
					<!-- <scroll-view scroll-y="true" @scrolltolower="upper()" style="height:100%;"> -->
					<view class="empty_content" v-if="noDataFlag">
						<image src="../../static/bg.png" mode=""></image>
						<text>暂无订单</text>
					</view>
					<block v-else>
						<view class="allorder">
							<view class="crad" v-for="(item,index) in riderlist" :key="index">
								<view class="merchants">
									<view class="merchants_l">
										<view class="img_mer">
											<image src="../../static/dianjia.png" mode=""></image>
										</view>
										<view class="wz_mer">
											<text>{{item.restaurant_name}}</text>
										</view>
									</view>
									<view class="merchants_r">
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
								</view>
								<view class="goods" v-for="(item1,index1) in item.basket.group" :key="index1">
									<view class="goods_l">
										<view class="goods_img">
											<image style="width: 100%;height: 100%;" :src="httpImg+item1.imagePath" mode="scaleToFill"></image>
										</view>
										<view class="sp">
											{{item1.name}}
										</view>
									</view>
									<view class="goods_r">
										<text>¥{{item1.price}}</text>
										<text>共{{item1.quantity}}件</text>
									</view>

								</view>

								<view class="info_kh">
									<view class="dz">
										<text>{{item.currrent_address}}</text>
										<image src="../../static/home/jiantou.png" mode=""></image>
									</view>
									<view class="xx">
										<text>{{item.addr_user_name}}</text>
										<text @click="contact(item.addr_user_id)">{{item.addr_user_id}}</text>
									</view>
								</view>
								<view class="ps">
									<view>配送费</view>
									<view>¥{{item.basket.deliveryFee}}</view>
								</view>
								<view class="jg_content">
									<view class="ddje_content">
										订单金额:¥{{item.total_amount}}
									</view>
									<view class="sfje_content">
										实付金额:¥{{item.actual_mount}}
									</view>
								</view>
								<!-- <view class="sj">
										<view>立即送出</view>
										<view><text>大约{{item.formatted_deivery_time.slice(10,16)}}送达</text>
											<image src="../../static/home/jiantou.png" mode=""></image>
										</view>
									</view> -->
								<view class="lsh">
									商家流水号: {{item.seqText}}
								</view>
								<!-- <view class="btn" @click="Receiving(item.user_id,item.unique_id)">
										接单
									</view> -->

							</view>
							<uni-load-more :status="loadingStatus"></uni-load-more>
						</view>
					</block>

					<!-- </scroll-view> -->

				</view>

			</van-tab>
		</van-tabs>
		<view class="dialog" v-if="isflag">
			<view class="img_box">
				<view v-for="(image,index) in imageList" :key="index">
					<image class="img_con" :src="image" :data-src="image" @tap="previewImage"></image>
					<view class="jb" @tap='deleteImage'>
						<image src="../../static/evaluation/guanbi.png" mode=""></image>
					</view>
				</view>
				<view class="upload" @tap="chooseImage" v-if="imageList.length < imageLength">
					<image src="../../static/evaluation/xiangji.png" mode=""></image>
					<text>添加图片</text>
				</view>
			</view>
			<view class="ts">
				请上传照片
			</view>
			<view class="btn_xz">
				<text @click="Confirmdel()">确认</text>
				<text @click="cancel">取消</text>
			</view>
		</view>
		<view class="zzc" v-if="isflag">
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :type="type" :animation="false" :maskClick="true">
				<view class="popup_title">
					<view>请选择</view>
					<image src="../../static/evaluation/guanbi.png" mode="" @click="onAllot"></image>
				</view>
				<select-lay :value="tval" name="name" slabel="name" svalue="account" :options="datalist" @selectitem="selectitem"></select-lay>
				<view class="popup_btn"@click="onAllot">
					确认
				</view>
			</view>
			<!-- <view class="popup-content"> -->
			<!-- <view class="popup_title">请选择</view> -->
			<!-- <select-lay :value="tval" name="name" slabel="name" svalue="account" :options="datalist" @selectitem="selectitem"></select-lay>
				<view class="popup_btn">
					<view @click="close">取消</view>
					<view @click="onAllot">确认</view>
				</view> -->
			<!-- </view> -->
		</uni-popup>
		<tab-bar class="tabbar" :pagePath="'/pages/caballero/caballero'"></tab-bar>
	</view>
</template>

<script>
	var sourceType = [
		["camera"], //拍照
		["album"], //相册
		["camera", "album"], //拍照或相册
	];
	var sizeType = [
		["compressed"], //压缩
		["original"], //原图
		["compressed", "original"], //压缩或原图
	];
	import http from "@/common/js/http.js";
	import testData from "@/common/js/testdata.js";
	export default {
		data() {
			return {
				type: "",
				hospitalId: "",
				accountId: "",
				tval: "",
				datalist: [{
						label: "label1",
						value: "value1"
					},
					{
						label: "label2",
						value: "value2"
					},
					{
						label: "label3",
						value: "value3"
					}
				],
				numTab: 0,
				httpImg: '',
				loadingStatus: "none",
				noDataFlag: false,
				riderlist: [],
				isflag: false,
				active: 0,
				fileList: [],
				limit: 3,
				pageNum: 1,
				total: 0,
				Picklist: [],
				shippinglist: [],
				imageList: [], //保存图片路径集合
				imageLength: 1, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2,
				txt: "",
				deliveryId: "", //配送员id
				orderId: "",
			};
		},
		methods: {
			selectitem(index, item) {
				if (index >= 0) {
					this.tval = item.account;
				} else {
					this.tval = ""
				}
			},
			//获取配餐员列表接口
			personList() {
				var prmar = {
					hospitalId: this.hospitalId,
					id: this.accountId
				}
				http.getDeliveryList(prmar).then(res => {
					this.datalist = res.data;
				})
			},
			onAllot() {
				var prmar = {
					orderId: this.orderId,
					deliveryId: this.accountId,
					newdeliveryId: this.tval
				}
				http.getRematch(prmar).then(res => {
					this.first();
					this.close();

				})
			},
			close() {
				this.$refs.popup.close()
			},

			Single(unique_id) {

				this.type = "bottom";
				this.$refs.popup.open()
				this.personList()
				this.orderId = unique_id
			},
			contact(item) {
				uni.makePhoneCall({
					phoneNumber: item //仅为示例，并非真实的电话号码
				})

			},
			onPullDownRefresh() {
				this.first()
			},
			onReachBottom() {
				//阻止重复加载
				this.upper()
			},
			//上拉加载
			upper() {
				this.pageNum += 1;
				if (this.active == 2) {
					if (this.riderlist.length !== this.total) {
						// console.log(456)
						this.loadingStatus = "loading";
						this.onChange(null, "pullUp");
					} else {
						// console.log(123)
						this.loadingStatus = "noMore";
					}
				} else if (this.active == 0) {
					if (this.Picklist.length !== this.total) {
						this.loadingStatus = "loading";
						this.onChange(null, "pullUp");
					} else {
						this.loadingStatus = "noMore";
					}
				} else if (this.active == 1) {
					if (this.shippinglist.length !== this.total) {
						this.loadingStatus = "loading";
						this.onChange(null, "pullUp");
					} else {
						this.loadingStatus = "noMore";
					}
				}
			},
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
				// console.log(file);
			},
			//初次请求
			first() {
				uni.showLoading({
					title: '加载中...',
				})
				if (this.numTab == 1) {

					http.getRiderorders({
							limit: this.limit,
							pageNum: 1,
							id: uni.getStorageSync('user').hospitalId,
							phone: uni.getStorageSync('user').account,
							status: 3,
						})
						.then((res) => {
							this.shippinglist = res.data.records;
							this.total = res.data.total
							uni.hideLoading();
							uni.stopPullDownRefresh();
						});
				} else if (this.numTab == 2) {

					http.getRiderorders({
							limit: this.limit,
							pageNum: 1,
							id: uni.getStorageSync('user').hospitalId,
							phone: uni.getStorageSync('user').account,
							status: 4,
						})
						.then((res) => {
							this.riderlist = res.data.records;
							this.total = res.data.total
							uni.hideLoading();
							uni.stopPullDownRefresh();
						});
				} else {
					http.getRiderorders({
							limit: this.limit,
							pageNum: 1,
							id: uni.getStorageSync('user').hospitalId,
							phone: uni.getStorageSync('user').account,
							status: 5,
						})
						.then((res) => {
							this.Picklist = res.data.records;
							this.total = res.data.total
							uni.hideLoading();
							uni.stopPullDownRefresh();
						});
				}
			},
			// 请求列表
			getRequestList(active, pullUp) {
				http.getRiderorders({
						limit: this.limit,
						pageNum: this.pageNum,
						id: uni.getStorageSync('user').hospitalId,
						status: active == 1 ? 3 : active == 0 ? 5 : active == 2 ? 4 : null,
						phone: uni.getStorageSync('user').account
					})
					.then((res) => {
						if (res.data.records.length > 0) {
							this.loadingStatus = "none";
							if (active == 0) {
								if (pullUp === 'operation') {
									this.Picklist = []
								}
								this.Picklist = this.Picklist.concat(res.data.records);
							} else if (active == 2) {
								if (pullUp === 'operation') {
									this.riderlist = []
								}
								this.riderlist = this.riderlist.concat(res.data.records);
								// console.log(this.riderlist, "PPPPPPP")
							} else if (active == 1) {
								if (pullUp === 'operation') {
									this.shippinglist = []
								}
								this.shippinglist = this.shippinglist.concat(res.data.records);
							}

							this.total = res.data.total;
							// console.log(this.total)
							if (pullUp != "pullUp") {
								this.noDataFlag = false;
							}
						} else {
							if (pullUp != "pullUp") {
								this.noDataFlag = true;
							}
						}
					});
			},
			onChange(e, pullUp) {
				if (pullUp != "pullUp") {
					this.active = e.detail.index;
					this.numTab = e.detail.index;
					this.pageNum = 1;
					this.riderlist = [];
					this.Picklist = [];
					this.shippinglist = [];
					this.total = 0;
					this.loadingStatus = "none";
					this.noDataFlag = false;
				}
				this.getRequestList(this.active, pullUp);
			},
			// uplode(item, Did) {
			// 	this.isflag = true;
			// 	this.deliveryId = item;
			// 	this.orderId = Did;
			// },
			//待配送
			Receiving(order, userid) {
				// console.log(order, userid);
				http
					.getDeliveryorder({
						deliveryId: order,
						orderId: userid,
					})
					.then((res) => {
						this.$util.msg('接单成功');
						this.getRequestList(this.active, 'operation');
					});
			},
			//待取货
			Pinkfood(userid, order) {
				console.log(order, userid);
				http.getPickgoods({
						deliveryId: userid,
						orderId: order,
					})
					.then((res) => {
						if (res.code === 9999) {
							this.$util.msg("取货失败");
							return;
						}
						this.$util.msg("取货成功");
						this.getRequestList(this.active, 'operation');
					});
			},
			// Pickgood(order) {
			// 	let that = this;
			// 	uni.scanCode({
			// 		success: function(res) {
			// 			// console.log("条码类型：" + res.scanType);
			// 			// console.log("条码内容：" + res.result);
			// 			uni.showModal({
			// 				title: "提示",
			// 				content: "是否确认取货",
			// 				success: function(data) {
			// 					if (data.confirm) {
			// 						// console.log('用户点击确定');
			// 						//当前骑手手机号 扫码内容
			// 						that.Pinkfood(order, res.result);
			// 					} else if (data.cancel) {
			// 						// console.log('用户点击取消');
			// 					}
			// 				},
			// 			});
			// 		},
			// 	});
			// },
			cancel() {
				if (this.isflag) {
					this.isflag = false;
				} else {
					this.isflag = true;
				}
			},
			Confirmdel(item, Did) {
				http.getDelConfirm({
						deliveryId: item,
						// imagePath: this.imageList[0],
						imagePath: "",
						orderId: Did,
					})
					.then((res) => {
						// console.log(res,'++++++')
						this.isflag = false;
						this.$util.msg('已送达成功')
						this.getRequestList(this.active, 'operation');
					});
			},
			//选择图片
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageLength - this.imageList.length,
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
				});
			},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src;
				uni.previewImage({
					current: current,
					urls: this.imageList,
				});
			},
			//删除图片
			deleteImage: function(e) {
				// console.log("已执行");
				var index = e.target.dataset.index;
				var that = this;
				var images = that.imageList;
				images.splice(index, 1);
				that.imageList = images;
			},
		},
		onLoad() {
			this.httpImg = testData.httpImg
			this.accountId = uni.getStorageSync("user").account;
			this.hospitalId = uni.getStorageSync("user").hospitalId;
			this.usertype = uni.getStorageSync("usertype");
			uni.hideTabBar({})
		},
		onShow() {
			// this.personList()
			this.first()
		}
	};
</script>

<style lang="scss" scoped>
	.jg_content {
		width: 100%;
		height: 50upx;
		display: flex;
		justify-content: space-between;
		// margin-bottom: 20rpx;
	}

	.sfje_content,
	.ddje_content {
		text-align: right;
		font-size: 26upx;
		line-height: 50upx;
	}

	.housing_box {
		width: 100%;
		// height: calc(100vh - 175upx);
		min-height: calc(100vh - 175upx);
		background-color: #f5f5f6;
	}

	.caballero {
		position: relative;
		// width: 100%;
		// height: 100vh;
	}

	.allorder {
		width: 100%;
		// height: calc(100vh - 88upx);
		background-color: #f6f6f6;
		padding: 20upx 20upx;
		box-sizing: border-box;

		.crad {
			width: 100%;
			// height: 600upx;
			overflow: hidden;
			background-color: #fff;
			border-radius: 20upx;
			padding: 20upx;
			box-sizing: border-box;
			margin-bottom: 20upx;

			.merchants {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 20upx;
				margin-bottom: 20upx;
				border-bottom: 1upx solid #f5f5f5;

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
						overflow: hidden;
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

			.info_kh {
				// height: 80upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// margin-bottom: 20upx;

				.dz {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 26upx;

					image {
						width: 30upx;
						height: 30upx;
					}
				}

				.xx {
					padding: 10rpx 0;
					display: flex;
					color: #909292;
					font-size: 26upx;

					text:first-child {
						margin-right: 30upx;
					}
				}
			}

			.ps {
				display: flex;
				justify-content: space-between;
				font-size: 26upx;
				// margin-bottom: 20upx;
				height: 50upx;
				line-height: 50upx;
			}

			.sj {
				margin-bottom: 20upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26upx;

				view {
					display: flex;
					align-items: center;

					image {
						width: 30upx;
						height: 30upx;
					}

					text {
						color: #ef8934;
					}
				}
			}

			.lsh {
				height: 50upx;
				line-height: 50upx;
				font-size: 26upx;
				margin-bottom: 10upx;
			}

			.btn {
				// border: 1upx solid #777777;
				border-radius: 10upx;
				font-size: 32upx;
				line-height: 60upx;
				width: 170upx;
				height: 60upx;
				text-align: center;
				float: right;
				background-color: #f9dc67;
			}

			.act {
				background-color: #3875f7;
				color: #fff;
			}

			.single {
				margin-right: 15upx;
			}

			.upload {
				view {
					border-radius: 10upx;
					font-size: 32upx;
					line-height: 60upx;
					width: 160upx;
					height: 60upx;
					text-align: center;
					float: right;
					color: #fff;
				}

				.sc {
					background-color: #5fb4f7;
					margin-left: 20upx;
				}

				.code {
					background-color: #58be6b;
				}
			}
		}
	}

	.dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		width: 600upx;
		height: 580upx;
		border-radius: 20upx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 100upx 30upx 50upx;

		.title {
			font-size: 28upx;
			color: #999999;
			margin-bottom: 50upx;
		}

		.uploader {
			width: 100%;
			padding-bottom: 20upx;
			border-bottom: 1px solid #f5f5f5;
			margin-bottom: 20upx;
		}

		.ts {
			font-size: 24upx;
			color: #999999;
			margin-bottom: 60upx;
			margin-top: 50upx;
		}

		.btn_xz {
			position: absolute;
			width: 100%;
			bottom: 65upx;
			left: 0;
			padding: 0 30upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			text {
				width: 240upx;
				height: 100upx;

				border-radius: 10upx;
				text-align: center;
				line-height: 100upx;
			}

			text:nth-child(1) {
				background-color: #07c062;
				color: #fff;
			}

			text:nth-child(2) {
				background-color: #f2f2f2;
			}
		}
	}

	.zzc {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 888;
		background-color: rgba($color: #000000, $alpha: 0.4);
	}

	.img_box {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding-bottom: 30upx;
		margin-bottom: 3upx;
		border-bottom: 1upx solid #c3c3c3;

		// height: 100upx;
		view {
			position: relative;
			width: 140upx;
			height: 140upx;
			border: 1upx solid #ccc;
			border-radius: 15upx;
			margin-right: 20upx;
			overflow: hidden;

			.jb {
				position: absolute;
				top: 0;
				right: 0;
				width: 30upx;
				height: 30upx;
				background-color: #c3c3c3;
				border-radius: 15upx;
				margin-right: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.img_con {
				width: 100%;
				height: 100%;
			}
		}

		.upload {
			padding: 15upx 0;
			box-sizing: border-box;
			display: flex;
			border: 1upx solid #ccc;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
			}

			text {
				font-size: 20upx;
				color: #777;
			}
		}
	}

	.empty_content {
		width: 100%;
		padding-top: 100upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			// width: 100%;
			height: 350upx;
		}

		text {
			color: #c3c3c3;
			font-size: 26upx;
		}
	}

	.popup-content {
		position: relative;
		background-color: #fff;
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
		height: 750rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.popup_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		margin-bottom: 20rpx;

		image {
			width: 30rpx;
			height: 30rpx;
		}
	}

	.popup_btn {
		position: absolute;
		bottom: 120rpx;
		left: 30rpx;
		width: 690rpx;
		height: 100rpx;
		background-color: #0D7AFF;
		border-radius: 15rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 36rpx;
		color: #fff;
	}
</style>
