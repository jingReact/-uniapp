<template>
	<view class="aptitude">
		<view class="contet">
			<view class="top">
				武汉第一医院全派餐饮
			</view>
			<view class="bottom">
				<view class="yymc">
					武汉第一医院食堂
				</view>
				<view class="xkz_img">
					<image :src="imglist" mode="" @tap="previewOpen()"></image>
				</view>
				<view class="xkz_wz">
					1.食品经营许可证
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imglist: [],
				Imgout:"https://www.whyys.com.cn/api/file/getImgStream?fileName=",
			}
		},
		methods: {
			//打开预览e
			previewOpen() {

				// this.$refs.previewImage.open(this.Imgout+this.imglist[0]); // 传入当前选中的图片地址或序号
				// return; //如需测试和uni原生预览差别可注释这两行
				//以下是效果对比相关
				var _this = this;
				uni.previewImage({
					current: _this.Imgout+_this.imglist[0],
					urls: _this.imglist
				});
						
			
			},
		
		
		},
		onLoad(option) {
			let imglist =this.Imgout+uni.getStorageSync("user").shop.catering_service_license_image
			this.imglist=imglist.split(',')
		}
	}
</script>

<style scoped lang="scss">
	.aptitude {
		width: 100%;
		height: 100vh;
		background-color: #f6f6f6;

		.contet {
			width: 100%;
			height: 540upx;
			background-color: #fff;
			padding: 50upx 30upx 0;
			box-sizing: border-box;

			.top {
				font-size: 28upx;
				margin-bottom: 20upx;
			}

			.bottom {
				.yymc {
					width: 100%;
					padding-left: 50upx;
					font-size: 24upx;
					box-sizing: border-box;
				}

				.xkz_wz {
					width: 100%;
					font-size: 26upx;
					text-align: center;
				}

				.xkz_img {
					width: 100%;
					text-align: center;

					image {
						width: 500upx;
						height: 320upx;
					}
				}
			}
		}
	}
</style>
