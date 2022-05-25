<template>
	<view class="content">
		<!-- <hx-navbar title="收货地址" backTabbarUrl="/pages/user/user" :backgroundColor="[241,241,241]"></hx-navbar> -->
		<!-- <view class="bb15">

		</view> -->
		<view class="list-box">
			<view class="row b-b">
				<text class="tit">联系人</text>
				<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">手机号</text>
				<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b" @click="show = true">
				<text class="tit">医院名称</text>
				<text class="input">{{addressData.address}}</text>
				<text class="hxicon-locationfill"></text>
			</view>
			<view v-if="addressData.address" class="row b-b" @click="department= true">
				<text class="tit">所属科室</text>
				<text class="input">{{addressData.area}}</text>
			</view>
			<view v-if="addressData.address" class="row b-b">
				<text class="tit">楼栋楼层</text>
				<text class="input">{{addressData.floor}}</text>
			</view>
			<view class="row b-b">
				<text class="tit">床位</text>
				<input class="input" type="text" v-model="addressData.bed" placeholder="床号" placeholder-class="placeholder" />
			</view>

			<view class="row default-row">
				<text class="tit">设为默认</text>
				<switch :checked="addressData.defaul" color="#ffc107" @change="switchChange" />
			</view>
		</view>
		<view class="add-btn" @click="confirm">
			<text>提交</text>
		</view>
		<van-popup :show="show" :z-index="666" round position="bottom" style="position: relative;">
			<view class="anniu">
				<view @click="show = false">取消</view>
				<view @click="checkout">确认</view>
			</view>
			<van-picker :columns="columns" @change="onChange" title="标题"/>
		</van-popup>
		<van-popup :show="department" :z-index="666" round position="bottom" style="position: relative;">
			<view class="anniu">
				<view @click="department = false">取消</view>
				<view @click="checkout1">确认</view>
			</view>
			<van-picker :columns="departmentlist" @change="onChange1" title="标题"/>
		</van-popup>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	import {
		checkStr
	} from '@/common/js/util'
	export default {
		data() {
			return {
				addressData: {
					name: '',
					mobile: '',
					addressId:null,
					// addressName: '在地图选择',
					address: '',
					bed: '',
					defaul: 0,
					loginPhone:'',
					area:"",
					floor:"",
					areaCode:null,
					pid:""
					
				},
				columns:[],
				arrData:[],
				departmentData:[],
				departmentlist:[],
				num:0,
				num1:0,
				show: false,
				department:false
				
			}
		},
		onLoad(option) {
			this.addressData.loginPhone = uni.getStorageSync('user').phone
			this.addressData.pid = uni.getStorageSync('user').pid
			let title = '新增收货地址';
			if (option.type === 'edit') {
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			getRestaurant(){
				http.getRestaurant('').then(res =>{
					this.arrData = res.data
					this.arrData.forEach((item,index) =>{
						this.columns.push(item.name)
					})
					
				})
			},
			
			//校验床位
			isAddBed(str){
				return str.indexOf("床")==-1 && str.indexOf("护士")==-1&& str.indexOf("医生")==-1;
			},
			getDepts(id){
				this.departmentlist = []
				http.getDepts(id).then(res =>{
					this.departmentData = res.data
					this.departmentData.forEach((item,index) =>{
						this.departmentlist.push(item.name)
					})
				})
			},
			checkout(){
				this.addressData.address = this.columns[this.num]
				this.addressData.addressId = Number(this.arrData[this.num].code)
				this.getDepts(this.arrData[this.num].code)
				this.show = false
			},
			checkout1(){
				this.addressData.area = this.departmentlist[this.num1]
				// console.log( this.departmentlist,this.num1,'5555')
				this.addressData.areaCode = this.departmentData[this.num1].code
				this.addressData.floor = this.departmentData[this.num1].addr
				this.department = false
			},
			//获取医院地址
			switchChange(e) {
				// this.addressData.default = e.detail;
				if (e.detail.value) {
					this.addressData.defaul = 1
				} else {
					this.addressData.defaul = 0
				}
			},
			onChange(picker) {
				this.num = picker.detail.index
			},
			onChange1(picker) {
				this.num1 = picker.detail.index
			},
			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},

			//提交
			confirm() {
				let data = this.addressData;
				if (!data.name) {
					// this.$api.msg('请填写收货人姓名');
					this.$util.msg('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
					this.$util.msg('请正确填写手机号');
					return;
				}
				if (!data.address) {
					this.$util.msg('请选择所属医院');
					return;
				}
				if (!data.area) {
					this.$util.msg('请选择所属科室');
					return;
				}
				if (!data.floor) {
					this.$util.msg('请选择所属楼层');
					return;
				}
				if (!data.bed) {
					this.$util.msg('请填写病区床位信息');
					return;
				}
				if(this.isAddBed(this.addressData.bed)){
					data.bed = data.bed+'床'
				}
				
				http.getaddress(data).then(res => {
					this.$util.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					var pages = getCurrentPages(); //当前页
					var beforePage = pages[pages.length - 2]; //上个页面
					 beforePage.$vm.refreshList(data, this.manageType)
				})
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				setTimeout(()=>{
					uni.navigateBack()
				}, 800)
			},
		},
		onShow() {
			this.getRestaurant();
			if(this.addressData.addressId){
			this.getDepts(this.addressData.addressId);
			}
			
		},
		// watch:{
		// 	 addressId(val, newval) {
		// 	        this.getDepts(val)
		// 	    }
		// }
	}
</script>

<style lang="scss">
	.anniu{
		position: absolute;
		top: 20upx;
		left: 0;
		width: 690upx;
		height: 60upx;
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		z-index: 668;
		view{
			font-size: 32upx;
			line-height: 60upx;
		}
		
	}
	.bb15 {
		background: #f1f1f1;
		padding-top: 40upx;
	}

	.list-box {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		margin: 0 15px;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: #303133;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: #303133;
			margin-left: 10upx;
		}

		.icon-locationfill {
			font-size: 36upx;
			color: #909399;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
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
