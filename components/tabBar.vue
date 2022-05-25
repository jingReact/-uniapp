<template>
    <view class="uni-tabbar" :style="'height: '+navH+'px;'" v-if="showPage">
        <view class="uni-tabbar__item" v-for="(item,index) in tabbar" :key="index" @tap="changeTab(item)">
			<view class="uni-tabbar__icon">
				<image v-if="item.pagePath == pagePath" mode="aspectFit" :src="item.selectedIconPath"></image>
				<image v-else mode="aspectFit" :src="item.iconPath"></image>
			</view>
            <view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
                {{item.text}}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            pagePath: null
        },
        data() {
            return {
                // page: '',
				navH:"0",
                showPage: false,
                containerHeight: 400,
                tabbar: [
					{
						"pagePath": "/pages/home/home",
						"iconPath": "/static/home1.png",
						"selectedIconPath": "/static/home.png",
						"text": "首页"
					},
　　　　　　　　　　　　// 这里是要动态切换的栏目，先隐藏，动态追加
					// {
					// 	"pagePath": "/pages/order/order",
					// 	"iconPath": "/static/order1.png",
					// 	"selectedIconPath": "/static/order.png",
					// 	"text": "订单"
					// },
					//用户
					{
						"pagePath": "/pages/customer/customer",
						"iconPath": "/static/order1.png",
						"selectedIconPath": "/static/order.png",
						"text": "订单"
					},
					//配餐员
					{
						"pagePath": "/pages/caballero/caballero",
						"iconPath": "/static/order1.png",
						"selectedIconPath": "/static/order.png",
						"text": "订单"
					},
					{
						"pagePath": "/pages/user/user",
						"iconPath": "/static/user1.png",
						"selectedIconPath": "/static/user.png",
						"text": "我的"
					}
				]
            };
        },
        created() {
            // true为判断条件，根据实际的需求替换即可
			// console.log('我显示了',this.tabbar);
			this.navH = this.$store.state.navHeight;
			var userType = uni.getStorageSync('usertype')
			// var userType = uni.getStorageSync('userType')
			if(userType === '3' ||userType === '5'){
                this.tabbar.splice(2,1)			
			}else if(userType === '4' ){
				this.tabbar.splice(0,2)
			}
			this.showPage = true
        },
        methods: {
            changeTab(item) {
				if(this.pagePath === item.pagePath){
					return
				}
                // this.page = item.pagePath;
　　　　　　　　　　// 这里使用reLaunch关闭所有的页面，打开新的栏目页面
                uni.switchTab({
                    url: item.pagePath
                });
				 // this.$forceUpdate();
            },
        }
    }
</script>

<style lang="scss" scoped>

    [nvue] uni-scroll-view, [nvue] uni-swiper-item, [nvue] uni-view {
        flex-direction: unset;
    }
    [nvue-dir-column] uni-swiper-item, [nvue-dir-column] uni-view {
        flex-direction: unset;
    }
    .uni-tabbar {
        position: fixed;
        bottom: 0;
		left: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: space-around;
        // height: 98upx;
        padding: 8upx 0;
        box-sizing: border-box;
        border-top: solid 2upx #eeeeee;
        background-color: #fff;
        box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);
        .uni-tabbar__item {
            display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
            height: 100%;
			width: 33%;
            font-size: 20upx;
			.uni-tabbar__icon{
				image{
					display: block;
					width: 50upx;
					height: 50upx;
				}
				margin-bottom: 2upx;
			}
			.uni-tabbar__label {
			    line-height: 24upx;
			    font-size: 20upx;
			    color: rgba(43,36,31,0.4);
			    &.active {
			        color: #3875F7;
			    }
			}
        }
    }
</style>
