<template>
	<view class="refund">
		<view class="cause">
			<view class="cause_top">
				<text>退款原因</text><text>请选择真实原因，帮助我们改进</text>
			</view>
			<view class="list_xz">
				<radio-group @change="radioChange">
					<label class="list_box" v-for="(item, index) in items" :key="item.id">
						<view class="list_wz">{{item.name}}</view>
						<view>
							<radio style="transform:scale(0.7)" :value="item.name" :checked="index === current" />
						</view>
					</label>
				</radio-group>
				<!-- <label class="list_box">
					<view class="list_wz">其他</view>
					<view>
						<radio :checked="checkout" style="transform:scale(0.7)"  @click="changTq"/>
					</view>
				</label> -->
			</view>
			<view class="tkyy" v-if="checkout">
				<textarea placeholder-style="color:#C3C3C3" placeholder="退款原因" v-model="txt" style="height: 160upx;font-size: 26rpx;" @input="changeTxt"
				 maxlength="50" />
				</view>
			<view class="tupian">
				<view>请上传餐品图片</view>
				<view class="img_box">
					<view v-for="(image, index) in imageList" :key="index">
					    <image
					      class="img_con"
					      :src="image"
					      :data-src="image"
					      @tap="previewImage"
					    ></image>
					    <view class="jb" @tap="deleteImage">
					      <image src="../../static/evaluation/guanbi.png" mode=""></image>
					    </view>
					  </view>
					  <view
					    class="upload"
					    @tap="chooseImage"
					    v-if="imageList.length < imageLength"
					  >
					    <image src="../../static/evaluation/xiangji.png" mode=""></image>
					    <text>上传图片</text>
					  </view>
					</view>
					<view class="tkje">
						<text>退款金额:</text><text class="jinge">¥{{money}}</text>
					</view>
				</view>
			</view>
			<button type="primary" style="background-color: #3875f7" @click="submitImg">
			   申请退款
			 </button>
		</view>
		<!-- <view class="evaluation_s">
			<textarea placeholder-style="color:#C3C3C3" placeholder="退款原因" v-model="txt" style="height: 200upx" @input="changeTxt"
			 maxlength="50" />
			<view class="img_box">
        <view v-for="(image, index) in imageList" :key="index">
          <image
            class="img_con"
            :src="image"
            :data-src="image"
            @tap="previewImage"
          ></image>
          <view class="jb" @tap="deleteImage">
            <image src="../../static/evaluation/guanbi.png" mode=""></image>
          </view>
        </view>
        <view
          class="upload"
          @tap="chooseImage"
          v-if="imageList.length < imageLength"
        >
          <image src="../../static/evaluation/xiangji.png" mode=""></image>
          <text>上传图片</text>
        </view>
      </view>
	  <view class="tkje">
	  	<text>退款金额:</text><text class="jinge">¥{{money}}</text>
	  </view>
    </view> -->
   <!-- <button type="primary" style="background-color: #3875f7" @click="submitImg">
      申请退款
    </button> -->
	</view>
</template>

<script>
	var sourceType = [
		['camera'], //拍照
		['album'], //相册
		['camera', 'album'] //拍照或相册
	]
	var sizeType = [
		['compressed'], //压缩
		['original'], //原图
		['compressed', 'original'] //压缩或原图
	]
	import http from '@/common/js/http.js';
	export default {
		data() {
			return {
				items: [{
						id: 'USA',
						name: '美国'
					}
					
				],
				current: 0,
				checkout:false,
				money: null,
				orderId: "",
				merchant: "",
				txt: "",
				imgurl: "",
				order_id: null,
				imageList: [], //保存图片路径集合
				imageLength: 1, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2,
			}
		},
		methods: {
			getRefund(){
				http.getRefund('').then(res =>{
					this.items = res.data
				})
			},
			radioChange(val){
				console.log(this.current,"123",val)
				if(val.detail.value === '其他'){
					this.checkout = true
					this.txt= ''
				}else{
					this.checkout = false
					this.txt = val.detail.value
				}
			},
			changTq(e){
				this.checkout = !this.checkout
				this.txt =''
			},
			//上传图片
			submitImg() {
				let that = this;
				if (this.imageList.length) {
					uni.uploadFile({
						url: 'https://www.whyys.com.cn/api/file',
						header: {
							// "Content-Type":"multipart/form-data",
							"Content-Type": "application/json",
							'Authorization': uni.getStorageSync("token")
						},
						filePath: that.imageList[0],
						name: 'file',
						success: (uploadFileRes) => {
							// uni.hideLoading();
							const arrData = JSON.parse(uploadFileRes.data);
							this.imgurl = arrData.data.realFileName
							http.getSave({
								img: this.imgurl,
								orderId: this.orderId,
								reason: this.txt,
								amount: this.money, //订单金额
								refund: this.money //退款金额
							}).then(res => {
								uni.switchTab({
									url: '/pages/customer/customer'
								});
							})
						},
						fail: () => {
							console.log("上传失败")
						}
					});
				} else {
					http.getSave({
						img: "", //上传图片
						orderId: this.orderId, //订单号
						reason: this.txt, //退款原因
						amount: this.money, //订单金额
						refund: this.money //退款金额
					}).then(res => {
						uni.switchTab({
							url: '/pages/customer/customer'
						});
					})
				}

			},
			//选择图片
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					// #ifdef MP-WEIXIN
					sizeType: sizeType[this.sizeTypeIndex],
					// #endif
					count: this.imageLength - this.imageList.length,
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				})
			},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			//删除图片
			deleteImage: function(e) {
				var index = e.target.dataset.index;
				var that = this;
				var images = that.imageList;
				images.splice(index, 1);
				that.imageList = images;
			},
			changeTxt(e) {
				// console.log(e,"333")
				this.txt = e.detail.value
			},

		},
		onLoad(option) {
			this.money = option.amount
			this.orderId = option.orderId
		},
		onShow() {
			this.getRefund()
		},
		// watch:{
		// 	checkout(val, newval) {
		// 	   console.log(val)
		// 	   console.log(newval)
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.refund {
		width: 100%;
		background-color: #f6f6f6;
		padding-top: 30upx;
		height: 100vh;

		button {
			width: 690upx;
			margin-left: 30upx;
			margin-top: 30rpx;
		}
	}

	.cause {
		width: 710upx;
		margin: 0 20upx;
		padding: 40upx 20upx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
		.cause_top {
			display: flex;
			justify-content: left;
			align-items: center;
			padding-bottom: 20upx;
			text:nth-child(1) {
				font-size: 32upx;
				font-weight: 700;
			}

			text:nth-child(2) {
				font-size: 26upx;
				margin-left: 20upx;
				color: #B4B4B4;
			}
		}
		.list_xz{
			width: 100%;
			.list_box{
				width: 100%;
				height: 60upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 40rpx;
				box-sizing: border-box;
			}
			.list_wz{
				font-size: 30upx;
			}
		}
		.tkyy{
			background-color: #f6f6f6;
			border-radius: 10upx;
			width: 100%;
			margin-top: 20rpx;
			padding: 20rpx;
			box-sizing: border-box;
		}
		.tupian{
			view:nth-child(1){
				font-size: 26upx;
				color: #B4B4B4;
				margin-top: 15rpx;
			}
		.img_box {
			display: flex;
			flex-wrap: wrap;
			width: 100%;

			// height: 100upx;
			view {
				position: relative;
				width: 120upx;
				height: 120upx;
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
				justify-content: space-between;
				align-items: center;

				image {
					width: 50upx;
					height: 50upx;
				}

				text {
					font-size: 20upx;
					color: #777;
				}
			}
		}

		.tkje {
			height: 40upx;
			font-size: 24rpx;
			margin-top: 20rpx;

			.jinge {
				color: red;
				display: inline-block;
				margin-left: 20upx;
			}
		}
		}

	}

	// .evaluation_s {
	// 	width: 690upx;
	// 	// height: 500upx;
	// 	border-radius: 10upx;
	// 	font-size: 28upx;
	// 	background-color: #f6f6f6;
	// 	margin: 0 30upx;
	// 	padding: 30upx 30upx;
	// 	box-sizing: border-box;

		
	// }
</style>
