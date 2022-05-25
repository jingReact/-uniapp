<template>
	<view class="content b-t">
		
		<view class="bb15">
			
		</view>
		<view class="list-box">
			<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
				<view class="wrapper">
					<view class="address-box">
						<text v-if="item.defaul === 1" class="tag">默认</text>
						<text class="address">{{item.address}} {{item.area}} {{item.floor}} {{item.bed}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.name}}</text>
						<text class="mobile">{{item.mobile}}</text>
					</view>
				</view>
				<text class="hxicon-edit" @click.stop="addAddress('edit', item)" style="font-size: 36upx;"></text>
			</view>
		</view>
		<view class="add-btn" @click="addAddress('add')">
			<text>新增地址</text>
		</view>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	export default {
		data() {
			return {
				source: 0,
				addressList: [
					
				]
			}
		},
		onLoad(option){
			
			this.source = option.source;
			http.getaddr(uni.getStorageSync("user").phone).then(res =>{
				this.addressList = res.data
			})
			
		},
		methods: {
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					var pages = getCurrentPages(); //当前页
					var beforePage = pages[pages.length - 2]; //上个页面
					 beforePage.$vm.addressData = item
					// this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
				// console.log("点击了")
			},
			//校验床位
			isAddBed(str){
				return str.indexOf("床")==-1 && str.indexOf("护士")==-1&& str.indexOf("医生")==-1;
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				// this.addressList.unshift(data);
				// console.log(data, type);
				http.getaddr(uni.getStorageSync("user").phone).then(res =>{
					this.addressList = res.data
					
				})
			}
		}
		
		,
		// onShow() {
		// 	let that = this;
		// 	// if(that.isAddBed(that.addressList[0].bed)){
		// 	// 	that.addressList[0].bed = that.addressList[0].bed+'床'
		// 	// }
		// 	console.log(that.addressList[0].bed,"9999")
		// }
		// watch:{
		// 	addressList(nal,)
		// }
	}
</script>

<style lang='scss'>
	.bb15{
		padding-bottom: 30upx;
	}
	.content{
		position: relative;
	}
	.list-box{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		margin: 0 15px;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 14px 15px;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: #ffc107;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffc107;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
			width: 50rpx;
			text-align: center;
		}
		.address{
			width: 500upx;
			overflow:hidden;
			text-overflow:ellipsis;
			display:-webkit-box;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2; 
			font-size: 30upx;
			color: #303133;
		}
	}
	.u-box{
		font-size: 28upx;
		color: #909399;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-edit{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: #909399;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		overflow: hidden;
		bottom: 15px;
		left: 15px;
		right: 15px;
		height: 45px;
		font-size: 16px;
		font-weight: bold;
		color: #333;
		background: linear-gradient(45deg, #ffd900, #ffc107);		
	}
</style>
