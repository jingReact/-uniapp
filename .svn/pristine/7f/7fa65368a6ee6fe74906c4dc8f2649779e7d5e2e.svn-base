<template>
	<view class="evaluation">
		<view class="shangjia">

			<view class="head_box">
				<view class="head_l">
					<view>
						<image src="../../static/dianjia.png" mode=""></image>
					</view><text>{{merchant}}</text>
				</view>
				<!-- <view class="head_r">
					<view></view><text>匿名评价</text>
				</view> -->
			</view>
			<view class="score">
				<view class="score_top">
					<text>总体</text>
					<uni-rate v-model="value1" @change="onChange1" :margin="15" />
				</view>
				<view class="score_top">
					<text>包装</text>
					<uni-rate v-model="value2" @change="onChange2" :margin="15" />
				</view>
				<view class="score_top">
					<text>味道</text>
					<uni-rate v-model="value3" @change="onChange3" :margin="15" />
				</view>
			</view>
			<view class="evaluation_s">
				<textarea placeholder-style="color:#C3C3C3" placeholder="满意你就夸一夸" v-model="txt" style="height: 200upx;" @input="changeTxt"
				 maxlength="50" />
				<view class="img_box" >
					<view v-for="(image,index) in imageList" :key="index">
						<image class="img_con" :src="image" :data-src="image" @tap="previewImage"></image>
						<view class="jb" @tap='deleteImage'>
							<image src="../../static/evaluation/guanbi.png" mode="" ></image>
						</view>
					</view>
					<view class="upload" @tap="chooseImage" v-if="imageList.length < imageLength">
						<image src="../../static/evaluation/xiangji.png" mode=""></image>
						<text>添加图片</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="qs">
			<view class="head_box">
				<view class="head_l">
					<view></view><text>李四</text>
				</view>
				<view class="head_r">
					已对骑士匿名
				</view>
			</view>
			<view class="xiaolian">
				<view @click="selectEval(index)" v-for="(item,index) in list">
					<image :src="index===currentIndex?item.img2:item.img1" mode=""></image>
					<text :class="{'act':index===currentIndex}">{{item.text}}</text>
				</view>
			</view>
			<view class="tag">
				<view :class="{ action: checkedArrey.indexOf(time.commCode) != -1 }" v-for="time in timesList"
				 :key="time.commCode" @click="appointment(time.commCode)">
					{{ time.commName}}
				</view>
				<view class="pj"  :class="isShow ? 'action' : ''" @click="estimate"><image src="../../static/evaluation/miaoshu.png" mode=""></image>写评价</view>
			</view>
			<view class="evaluation_s" v-if="isShow">
				<textarea placeholder-style="color:#C3C3C3" placeholder="请对配送服务进行评价~" />
			</view>
		</view> -->
		<button type="primary" style="background-color: #3875F7;" @click="submitImg">提交评价</button>
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
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	import http from '@/common/js/http.js';
	export default {
		components: {uniRate},
		data(){
			return{
				merchant:"",
				txt:"",
				imgurl:"",
				order_id:null,
				imageList: [], //保存图片路径集合
				imageLength: 1, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2,
				value1:5,
				value2:5,
				value3:5,
				isflag:false,
				isShow:false,
				currentIndex:null,
				checkedArrey:[],
				list:[
				{ img1:"../../static/evaluation/cp.png",
				img2:"../../static/evaluation/cp1.png",
				text:"非常差"
				},
				{ img1:"../../static/evaluation/yb.png",
				img2:"../../static/evaluation/yb1.png",
				text:"一般"
				},
				{ img1:"../../static/evaluation/hp.png",
				img2:"../../static/evaluation/hp1.png",
				text:"超赞"
				},
				],
				timesList:[
					{
						commName:"送餐快",
						commCode:"1"
					},
					{
						commName:"商品完整",
						commCode:"2"
					},
					{
						commName:"服务态度好",
						commCode:"3"
					},
					{
						commName:"准时到达",
						commCode:"4"
					},
					{
						commName:"穿着专业",
						commCode:"5"
					},
					{
						commName:"衣着整洁",
						commCode:"6"
					}
				]
				
			}
		},
		methods:{
			//上传图片
			submitImg(){
				let that = this;
				if(this.imageList.length){
					uni.uploadFile({
						url:'https://www.whyys.com.cn/api/file',
						header: {
							"Content-Type":"application/json",
							'Authorization': uni.getStorageSync("token")
							},
						filePath:that.imageList[0],
						name: 'file',
						success: (uploadFileRes) => {
						// uni.hideLoading();
						const arrData = JSON.parse(uploadFileRes.data);
						this.imgurl =arrData.data.realFileName
						http.getratings({
							image:"https://www.whyys.com.cn/api/file/getImgStream?fileName="+this.imgurl,
							order_id:this.order_id,
							overall_rating:this.value1,
							package_rating:this.value2,
							taste_rating:this.value3,
							restaurant_id:uni.getStorageSync("user").hospilId,
							content:this.txt,
							use_id:uni.getStorageSync("user").phone
							}).then(res =>{
							uni.switchTab({
							    url: '/pages/customer/customer'
								});
						})
						},
						fail:() =>{
							// uni.hideLoading();
							// that.showToast("图片上传失败，请联系开发！")
							console.log("上传失败")
						}
					});
				}
				else{
					http.getratings({
						image:"",
						order_id:this.order_id,
						overall_rating:this.value1,
						package_rating:this.value2,
						taste_rating:this.value3,
						restaurant_id:uni.getStorageSync("user").hospilId,
						content:this.txt,
						use_id:uni.getStorageSync("user").phone
						}).then(res =>{
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
						// console.log(this.imageList)
						// console.log(res,"123")
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
				console.log('已执行')
				var index = e.target.dataset.index;
				var that = this;
				var images = that.imageList;
				images.splice(index, 1);
				that.imageList = images;
			},
			
			onChange1(e){
				this.value1 =e.value
			},
			onChange2(e){
				this.value2 =e.value
			},
			onChange3(e){
				this.value3 =e.value
			},
			changeTxt(e){
				// console.log(e,"333")
				this.txt = e.detail.value
			},
			selectProp(){
				if(this.isflag){
					this.isflag =false
				}else{
					this.isflag =true
				}
			},
			estimate(){
				if(this.isShow){
					this.isShow =false
				}else{
					this.isShow =true
				}
			},
			appointment(index) {
				let that = this;
				if (that.checkedArrey.indexOf(index) == -1) {
					// console.log(index); //打印下标
					that.checkedArrey.push(index); //选中添加到数组里
				} else {
					that.checkedArrey.splice(that.checkedArrey.indexOf(index), 1); //取消
				}
			},
			selectEval(index){
				this.currentIndex =index
			}
		},
		onLoad(option){
			console.log(option.order_id,option.merchant,'============')
			this.order_id = option.order_id
			this.merchant =option.merchant
		}
	}
</script>

<style lang="scss" scoped>
	.evaluation{
		width: 100%;
		// height: 100vh;
		background-color: #f6f6f6;
		padding: 10upx 20upx 0;
		box-sizing: border-box;
		.shangjia{
			width: 100%;
			// height: 600upx;
			background-color: #fff;
			border-radius: 15upx;
			padding: 30upx 20upx;
			box-sizing: border-box;
			margin-bottom: 30upx;
				.head_box{
					width: 100%;
					height: 100upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.head_l{
						display: flex;
						align-items: center;
						width: 65%;
						font-weight: 700;
						view{
							width: 80upx;
							height: 80upx;
							// background-color: deeppink;
							border-radius: 10upx;
							margin-right: 20upx;
							overflow: hidden;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
					.head_r{
						display: flex;
						align-items: center;
						justify-content: right;
						width: 30%;
						color: #C3C3C3;
						font-size: 28upx;
						view{
							width: 30upx;
							height: 30upx;
							// background-color: deeppink;
							// border-radius: 10upx;
							margin-right: 20upx;
							
						}
					}
				}
				
				.score{
					width: 100%;
					.score_top{
						width: 100%;
						height: 70upx;
						display: flex;
						justify-content: center;
						align-items: center;
						// vertical-align: bottom;
						text{
							margin-bottom: 15upx;
							margin-right: 20upx;
						}
					}
				}
				.evaluation_s{
					width: 100%;
					// height: 500upx;
					border-radius: 10upx;
					font-size: 28upx;
					background-color: #f6f6f6;
					padding: 30upx 30upx;
					box-sizing: border-box;
					.img_box{
						display: flex;
						flex-wrap: wrap;
						width: 100%;
						// height: 100upx;
					  view{
						position: relative;
						width: 120upx;
						height: 120upx;
						border: 1upx solid #ccc;
						border-radius: 15upx;
						margin-right: 20upx;
						overflow: hidden;
						.jb{
							position: absolute;
							top: 0;
							right: 0;
							width: 30upx;
							height: 30upx;
							background-color: #c3c3c3;
							border-radius: 15upx;
							margin-right: 0;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.img_con{
							width: 100%;
							height: 100%;
						}
						
					  }
					.upload{
						padding: 15upx 0;
						box-sizing: border-box;
						display: flex;
						border: 1upx solid #ccc;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						image{
							width: 50upx;
							height: 50upx;
						}
						text{
							font-size: 20upx;
							color: #777;
						}
					 }
					}
				}
			}
		
		.qs{
			width: 100%;
			// height: 600upx;
			background-color: #fff;
			border-radius: 15upx;
			padding: 30upx 20upx;
			box-sizing: border-box;
			margin-bottom: 30upx;
			.head_box{
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.head_l{
					display: flex;
					align-items: center;
					width: 65%;
					font-weight: 700;
					view{
						width: 80upx;
						height: 80upx;
						background-color: deeppink;
						border-radius: 10upx;
						margin-right: 20upx;
					}
				}
				.head_r{
					font-size: 28upx;
					color: #c3c3c3;
				}
			}
			.xiaolian{
				width: 100%;
				display: flex;
				justify-content: center;
				margin-bottom: 20upx;
				view{
					width: 130upx;
					height: 150upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					margin: 0 20upx;
					image{
						width: 80upx;
						height: 80upx;
					}
					text{
						color: #c3c3c3;
						font-size: 28upx;
					}
					.act{
						color: #EE7737;
					}
				}
			}
			.tag{
				width: 100%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				view{
					padding: 10upx 20upx;
					color: #c3c3c3;
					font-size: 24upx;
					border: 1upx solid #f6f6f6;
					margin: 0 10upx 20upx;
					border-radius: 10upx;
					image{
						width: 24upx;
						height: 24upx;
					}
				}
				
				.action{
					color: #3875F7;
					border: 1upx solid #3875F7;
					
				}
				.pj{
					display: flex;
					align-items: center;
				}
			}
			.evaluation_s{
				width: 100%;
				height: 300upx;
				border-radius: 10upx;
				font-size: 28upx;
				background-color: #f6f6f6;
				padding: 30upx 30upx;
				box-sizing: border-box;
			}
		}
		button{
			margin-bottom: 30upx;
		}
	}

</style>
