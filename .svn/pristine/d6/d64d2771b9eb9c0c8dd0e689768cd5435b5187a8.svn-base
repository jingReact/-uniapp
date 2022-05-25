import Vue from 'vue'
import Vuex from 'vuex'
// import {loginAjax} from '@/common/api/login'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		userType: '', //0为游客
		// userId: '',
		// uuid: '',
		navHeight: 0,
		// userInfo: {}
	},
	getters: {
		// hasLogin(state){
		// 	return !!state.token;
		// }
	},
	mutations: {
		//更新state数据
		setStateAttr(state){
			state.token = uni.getStorageSync('token');
			state.userType = uni.getStorageSync('userType');
			// state.uuid = uni.getStorageSync('uuid');
		},
		// getStateAttr(state){
		// 	// state.token = uni.getStorageSync('token');
		// 	// state.userType = uni.getStorageSync('userType');
		// 	// state.uuid = uni.getStorageSync('uuid');
		// 	// if(uni.getStorageSync('userInfo')){
		// 	// 	state.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		// 	// }
		// },
		setNavHeight(state,height){
			state.navHeight = height
		},		
	},
	actions: {
		//更新用户信息
		// getUserInfo({state, commit}){
		// 	commit('getStateAttr')
		// },
		setUserInfo({state, commit}){
			commit('setStateAttr')
		},
		setNavHeight({state, commit},height){
			commit('setNavHeight',height)
		},
		// //首次进入页面登录
		// getLogin({state, commit}){
		// 	uni.login({
		// 	  provider: 'weixin',
		// 	  success: function (loginRes) {
		// 	    loginAjax({
		// 			code: loginRes.code
		// 		}).then()
		// 	  }
		// 	})
		// }
	}
}) 


export default store
