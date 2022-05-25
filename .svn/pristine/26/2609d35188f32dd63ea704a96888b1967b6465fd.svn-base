<template>
	<view class="note">
		<view class="text">
			<textarea class="textarea" v-model="txt" :maxlength="num1" @input="dataNum"></textarea>
			<view class="num">
				{{num}}/50
			</view>
		</view>
		<view class="tag_box">
			<view class="title">快捷标签</view>
			<view class="taglist">
				<text v-for="(item,index) in taglist" :key="index" @click="dataChange(item)">
					{{item}}
				</text>
			</view>
			<view class="btn" @click="onChange">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	export default {
		data() {
			return {
				num1:50,
				txt: "",
				num: "0",
				taglist: ["对骑手", "对商家", "请电话联系我"]
			}
		},
		methods: {
			dataChange(e) {
				console.log(this.txt.length,this.num1)
				if(this.txt.length >= this.num1){
					uni.showToast({
					  title: '备注限制50个字以内',
					  icon: 'none',
					  duration: 1500
					})
					return;
				}
				this.txt = (this.txt.concat(e + ",")).substring(0,50);
				this.num = this.txt.length
			},
			dataNum() {
				this.num = this.txt.length
			},
			onChange() {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.setData({
					sh: this.txt,
				})
				prevPage.$vm.sh = this.txt,
				uni.navigateBack({//返回
				delta: 1
				})

			}
		},
		onLoad() {
			// console.log("1211")
			http.getremarks({}).then(res => {
				// console.log(res.data.remarks,"111")
				this.taglist = res.data.remarks
			})
		}
	}
</script>

<style lang="scss" scoped>
	.note {
		width: 100%;
		padding: 20upx 20upx 0;
		box-sizing: border-box;

		.text {
			position: relative;
			width: 100%;
			height: 240upx;
			box-sizing: border-box;
			padding: 20upx;
			background-color: #f6f6f6;
			border-radius: 20upx;

			.textarea {
				width: 100%;
				height: 120upx;
			}

			.num {
				position: absolute;
				bottom: 0;
				right: 20upx;
				color: #c3c3c3;
				font-size: 24upx;
				height: 80upx;
				line-height: 80upx;
			}
		}

		.tag_box {
			.title {
				color: #c3c3c3;
				font-size: 24upx;
				height: 80upx;
				line-height: 80upx;
			}

			.taglist {
				margin-bottom: 40upx;
				display: flex;
				flex-wrap: wrap;

				text {
					font-size: 24upx;
					border: 1upx solid #c3c3c3;
					padding: 10upx 20upx;
					margin-left: 10upx;
					border-radius: 15upx;
					margin-bottom: 10upx;
					color: #555555;
				}
			}
		}

		.btn {
			color: #fff;
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			border-radius: 40upx;
			background-color: #1989FA;
		}
	}
</style>
