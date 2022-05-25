 import {
 	loginOut,
	getToken
 } from './util'
	// const commonUrl ="https://www.whyys.com.cn/api/"
	const commonUrl ="https://www.whyys.com.cn/apitest/"
	// const commonUrl ="http://123.60.41.225:8082/"  //公共路径
	// const commonUrl ="http://192.168.16.147:8082/"
	// post请求封装
function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		const token = getToken()
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: 'POST',
			header: {
				// 'content-type': 'application/x-www-form-urlencoded',
				"Content-Type":"application/json",
				'Authorization':token
			},
			success: function(res) {
				// 此处的code=0，只是个举例，有的可能是1等其他的，具体的看后台决定；
                //res.data.data也根据自己的后台返回层级决定，
                //有的可能是res.data.data.data等其他形式。
                //返回什么就相应的做调整
				// console.log(res.data.code,"hahha")
				if (res.data.code == 20000) {
					resolve(res.data);
				}else if(res.data.code == 401 || res.data.code == 403){
					loginOut('登录失效，请重新登录!')
				}else {
					// 请求服务器成功，但是由于服务器没有数据返回，
                     //此时无code。会导致这个空数据 
					// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                    //不会被阻断在那里执行不下去！
					resolve(res.data);
				}
			},
			fail: function(res) {
				reject('网络出错'+ res.errMsg);
			}
		})
	});
	return promise;
}
 
// get请求封装
function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		const token = getToken()
		var postData = data;
		uni.request({
			url: commonUrl + url+'/'+data,
			// data: postData,
			method: 'GET',
			header: {
				'content-type': 'application/json',
				'Authorization': token
			},
			success: function(res) {
				if (res.data.code == 20000) {
					resolve(res.data);
				}else if(res.data.code == 401 || res.data.code == 403){
					loginOut('登录失效，请重新登录!')
				} else {
						resolve(res.data);
				}
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
//登录请求
function getRequestLogin(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		const token = getToken()
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: 'GET',
			header: {
				'content-type': 'application/json',
				'Authorization': token
			},
			success: function(res) {
				if (res.data.code == 20000) {
					resolve(res.data);
				}else if(res.data.code == 401 || res.data.code == 403){
					loginOut('登录失效，请重新登录!')
				}else {
						resolve(res.data);
				}
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
 
 
module.exports = {
	postRequest,
	getRequest,
	getRequestLogin
}


