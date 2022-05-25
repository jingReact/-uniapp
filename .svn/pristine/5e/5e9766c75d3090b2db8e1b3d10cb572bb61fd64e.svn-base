<template>
	<view class="orderdel">
		<view class="orderdel_content">
			<view class="head">
				<image src="../../static/dianjia.png" mode=""></image>
				<text>{{Orderdel.restaurant_name}}</text>
			</view>
			<!--订单详情 -->
			<view class="details">
				<view class="list" v-for="(item,index) in order1" :key='index'>
					<view class="img_l">
						<image :src="Imgout+item.imagePath" mode=""></image>
					</view>
					<view class="wz_c">
						<view >{{item.name}}</view>
						<view >×{{item.quantity}}</view>
					</view>
					<view class="jg_r">
						<text>¥</text><text>{{item.price}}</text>
					</view>
				</view>
				<block v-if="isshow">
					<view class="list"  v-for="(item1,index1) in order2" :key='index1'>
						<view class="img_l">
							<image :src="Imgout+item1.imagePath" mode=""></image>
						</view>
						<view class="wz_c">
							<view >{{item1.name}}</view>
							<view >×{{item1.quantity}}</view>
						</view>
						<view class="jg_r">
							<text>¥</text><text>{{item1.price}}</text>
						</view>
					</view>
				</block>
				<view class="fold" v-if=" Orderdel.basket.group.length > 3 &&!isshow" @click="isshow = true">
					<view class="wenz">
						展开(共{{Orderdel.total_quantity}}件)
					</view>
					<image src="../../static/xjt.png" mode=""></image>
				</view>
			</view>
			<!-- <view class="bzf">
				<view>包装费</view>
				<view class="fy">
					<text>¥</text><text>{{Orderdel.basket.deliveryFee}}</text>
				</view>
			</view> -->
			<view class="peis">
				<view>配送费</view>
				<view class="fy">
					<text>¥</text><text>{{Orderdel.basket.deliveryFee}}</text>
				</view>
			</view>
			<view class="bzf">
				<view>餐次</view>
				<view>
					<text>{{Orderdel.cbName}}({{Orderdel.day}})</text>
					<!-- <text v-if="Orderdel.cbId == '9'">中餐({{Orderdel.day}})</text>
					<text v-if="Orderdel.cbId == '6'">晚餐({{Orderdel.day}})</text> -->
				</view>
			</view>
			<view class="zj">
				<text>总计</text><text>¥</text><text>{{Orderdel.total_amount}}</text>
			</view>
		
			<view class="dd_xx">
				<view class="sh_xx">
					<view class="xx_l">收货信息</view>
					<view class="xx_r">{{Orderdel.address}}{{Orderdel.addr_user_name}}{{Orderdel.addr_user_id}}</view>
				</view>
				<view class="beiz">
					<view class="xx_l">备注</view>
					<view class="xx_r">{{Orderdel.remarks || '空'}}</view>
				</view>
				<view class="dingd">
					<view class="xx_l">订单号码</view>
					<view class="xx_r">{{Orderdel.unique_id}}</view>
				</view>
				<view class="sd_sj">
					<view class="xx_l">送达时间</view>
					<view class="xx_r">{{Orderdel.formatted_deivery_time}}</view>
				</view>
				<view class="dingd">
					<view class="xx_l">配送方式</view>
					<view class="xx_r">配餐员配送</view>
				</view>
				<view class="dingd" v-if="Orderdel.delivery !==''">
					<view class="xx_l">配餐员</view>
					<view class="xx_r">{{Orderdel.delivery.name}}</view>
				</view>
				<!-- <view class="dingd" v-if="Orderdel.delivery !==''">
					<view class="xx_l">配餐员电话</view>
					<view class="xx_r" @tap="playphone()">131123456789</view>
				</view> -->
				<view class="dingd">
					<view class="xx_l">支付方式</view>
					<view class="xx_r">在线支付</view>
				</view>
				<view class="dingd">
					<view class="xx_l">下单时间</view>
					<view class="xx_r"><text>{{Orderdel.formatted_create_at}}</text></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	export default {
		data(){
			return{
				isshow:false,
				id:'',
				Orderdel:null,
				order1:[],
				order2:[],
				Imgout:"https://www.whyys.com.cn/api/file/getImgStream?fileName=",
			}
		},
		methods:{
					// playphone(){
					// 	 	uni.makePhoneCall({
					// 	    phoneNumber: 13123457890, 
					// 		success: (res) => {
					// 			console.log('调用成功!')	
					// 		},
					// 		fail: (res) => {
					// 			console.log('调用失败!')
					// 		}
					// 	  });
					// 	},
			getOrderDel(){
				http.getOrderDel(this.id).then(res =>{
					this.Orderdel = res.data.order;
					this.order1 =this.Orderdel.basket.group.slice(0,4);
					this.order2 =this.Orderdel.basket.group.slice(4)||[];
				})
			}
		},
		onLoad(options) {
			this.id = options.id;
			// console.log(options.id,"+++++++++")
		},
		onShow() {
			this.getOrderDel()
		}
	}
</script>

<style lang="scss" scoped>
	.orderdel{
		width: 100%;
		min-height: 100vh;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #f6f6f6;
	}
	.orderdel_content{
		padding: 0 20upx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20upx;
		.head{
			display: flex;
			justify-content: left;
			align-items: center;
			width: 100%;
			height: 100upx;
			font-size: 28upx;
			image{
				width: 60upx;
				height: 60upx;
				border-radius: 10upx;
				margin-right: 20upx;
			}
		}
		.details{
			font-size: 28upx;
			.list{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				margin-bottom: 30upx;
				.img_l{
					width: 100upx;
					height: 100upx;
					margin-right: 15upx;
					image{
						width: 100%;
						height: 100%;
						border-radius:10upx;
					}
				}
				.wz_c{
					height: 100upx;
					flex:1;
					view:last-child{
						color: #8B8B8D;
						font-size: 24rpx;
					}
				}
				.jg_r{
					font-weight: 700;
					width: 100upx;
					text-align: right;
					text:first-child{
						font-size: 26upx;
					}
					// height: 100upx;
				}
				
			}
			
			.fold{
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24upx;
				color: #bfbfbf;
				image{
					width: 26upx;
					height: 26upx;
				}
			}
		}
		.bzf,.peis{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20upx;
			font-size: 28upx;
			.fy{
				font-size: 28upx;
				font-weight: 700;
				// text:last-child{
					
				// }
				text:first-child{
					font-size: 26upx;
				}
			}
		}
		.zj{
			width: 100%;
			text-align: right;
			padding-bottom: 30upx;
			border-bottom: 1upx solid #f6f6f6;
			font-size: 28upx;
			text:nth-child(2){
				font-size: 26upx;
				font-weight: 700;   
			}
			text:last-child{
				font-weight: 700;
			}
		}
	}
	.dd_xx{
		padding-top: 30upx;
	}
	.dd_xx>view{
		width:100%;
		display: flex;
		justify-content: space-between;
		font-size: 28upx;
		padding-bottom: 30upx;
	}
	.xx_l{
		width: 150upx;
		margin-right: 30upx;
	}
	.xx_r{
		flex:1;
		text-align: right;
		
	}
</style>
