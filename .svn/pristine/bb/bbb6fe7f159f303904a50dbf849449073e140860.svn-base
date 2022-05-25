<template>
	<view class="content b-t">
		<view class="message">输入持卡人信息</view>
		<view class="info">须与您证件上信息一致</view>
	<!-- 	<view class="container">
			<uni-section title="无边212框" subTitle="使用2121 border = false 取消边框121212" type="line">
				<view class="example-body">
					<uni-combox :border="false" :candidates="candidates" placeholder="请选择所在城市2222"></uni-combox>
				</view>
			</uni-section>
		</view> -->
		<view class="gl_list b-t" >
			<view class="gl_child" >
				<text>居民身份证</text>
				<uni-combox :border="false" style='width: 0%;' :candidates="candidates"  @change='changeMsg'></uni-combox>
				<image src="../../static/home/jiantou.png" mode=""></image>
			</view>
			</view>
		<view class="row b-b">
			<input class="uni-input" v-model="Params.name" type="text" placeholder="请输入证件号上姓名" />
		</view>
			<view class="row b-b">
				<input class="uni-input" v-model="Params.idCard" type="number" placeholder="请输入证件号码" />
			</view>
			<view class="row b-b">
				<input class="uni-input" v-model="Params.phone" type="idcard" placeholder="请输入持卡人手机号" />
			</view>
			
			<view class="row b-b">
				<button class="submit" type="primary" @tap='submit'> 确定</button>
			</view>
			<!-- <view class="row b-c">
				已有建卡，一键注册快速关联
			</view> -->
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
			candidates: [],
				Params:{
						name:'',
						idCard:'',
						phone:'',
				}
			}
		},
		methods: {
			changeMsg(e) {
			        console.log("e:", e);
			      },
			submit(){
				uni.showModal({
					content: `${this.Params.name}`,
					showCancel: false,
					success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
				});
			}
			// selectTypeChange(label){
			// 	console.log(label)
			// }
		}
	}
</script>

<style scoped  lang="scss">  
	  .content{
		  display: flex;
		  width: 100%;
		  flex-direction: column;
		  /* margin: 30upx 20upx; */
		  
	  }
	  .message{
		font-size: 1.7rem;
	  }
	  .info{
		  color:#db9354
	  }
	  .uni-input{
		  border-bottom: 1px solid #ddd;
	  }
	  .b-b,.b-c,.message,.info{
		  padding-left: 30rpx;
	  }
	   .b-b{
		  margin: 5% 2%;
	  }
	  .b-c{
		  color: #5ad798;
		   margin: .1% 17%;
	  }
	  .submit{
		  border-radius: 15px;
		  background-color: #5ad798;
		  padding: 5upx 10upx;
	  }
	   .text {
	      font-size: 12px;
	      color: #666;
	      margin-top: 5px;
		  
	    }
	  
	    .uni-px-5 {
	      padding-left: 10px;
	      padding-right: 10px;
	    }
	  
	    .uni-pb-5 {
	      padding-bottom: 10px;
	    }
		
	.example-body {
		padding: 12px;
		background-color: #FFFFFF;
	}
	.gl_child{
		display: flex;
		justify-content: space-between;
		width: 93%;
		margin: 4% 1% 0% 6%;
		border-bottom: 1rpx solid #dddddd;
		text{
			font-size: 42upx;
		}
		image{
			width: 34upx;
			height: 34upx;
		}
	}
</style>
