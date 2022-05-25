 
var config = require('./config.js')
 
// 微信授权接口
var getlogout = function(e){
	return config.postRequest("account/oauth",e);
}
var getOpenid = function(e){
	return config.getRequest("account/openid",e);
}
//用户登录接口
 var getlogin = function(e){
 	return config.postRequest("account/v2/login",e);
 }
 //获取用户信息
 var getuserinfo =function(e){
	 return config.getRequestLogin("account/info",e);
 }
 //获取商家食品菜单种类
 var getcategory =function(e){
 	 return config.postRequest("shopping/v3/getcategory",e);
 }
 //获取商家食品列表
 var getfoods =function(e){
	  return config.postRequest("shopping/v3/foods",e);
 }

 var getcheckout = function(e){
	 return config.postRequest("v2/carts/checkout",e);
 }

 var getorders =function(e){
	 return config.postRequest("v1/users/carts/orders",e);
 }
 //订单备注
 var getremarks =function(e){
	 return config.getRequestLogin("v2/carts/remarks",e);
 }
 //查询订单列表
 var getorderslist =function(e){
 	 return config.postRequest("bos/v2/users/orders",e);
 }
 //订单评价
 var getratings =function(e){
 	 return config.postRequest("ugc/v2/restaurants/ratings",e);
 }
 //评价列表
 var getratinglist =function(e){
 	 return config.postRequest("ugc/v2/ratings/list",e);
 }
 //获取配送地址列表
 var getaddr =function(e){
 	 return config.getRequest("v2/addr",e);
 }
 //添加编辑地址
 var getaddress =function(e){
 	 return config.postRequest("v2/users/addr",e);
 }
 //配送员订单列表
 var getRiderorders =function(e){
 	 return config.postRequest("bos/v2/delivery/orders",e);
 }
 //配送员接单
 var getDeliveryorder=function(e){
 	 return config.postRequest("v1/delivery/order",e);
 }
 //配送员取货
 var getPickgoods =function(e){
 	 return config.postRequest("v1/delivery/food",e);
 }
 //配送员确认送达
 var getDelConfirm =function(e){
 	 return config.postRequest("v1/delivery/confirm",e);
 }
 //获取订单当前时间
 var getPaytime =function(e){
 	 return config.getRequest("bos/v1/order/paytime",e);
 }
 //预支付请求
 var getPay =function(e){
 	 return config.postRequest("pay/wechat/js",e);
 }
 //溯源信息
 var getSyinfo =function(e){
 	 return config.getRequest("foodtrace/list",e);
 }
 //获取默认配送地址
 var getDefaul =function(e){
 	 return config.getRequest("v2/addr/defaul",e);
 }
 //退款
 var getSave =function(e){
 	 return config.postRequest("v1/refundOrder/save",e);
 }
 //获取排班信息
 var getWeek =function(e){
 	 return config.postRequest("menu/week/v2",e);
 }
 //首页轮播图数据
 var getfoodCbV =function(e){
 	 return config.postRequest("shopping/v2/foodCbV/list",e);
 }
 //退款原因列表
 var getRefund =function(e){
 	 return config.getRequestLogin("dict/v1/list/refund",e);
 }
 //菜品详情
 var getfoodXq =function(e){
 	 return config.postRequest("shopping/v3/food/detail",e);
 }
 //扫猫登录
 var getScan =function(e){
 	 return config.getRequest("account/qrcode/scan",e);
 }
 //获取医院列表
 var getRestaurant =function(e){
 	 return config.getRequest("shopping/restaurant/list",e);
 }
 //获取科室列表
 var getDepts =function(e){
 	 return config.getRequest("shopping/restaurant/depts",e);
 }
 //获取配送时间
 var getDelivery=function(e){
 	 return config.getRequest("dict/v1/list/delivery",e);
 }
 //获取医院信息
 var getHos=function(e){
 	 return config.getRequest("shopping/hos",e);
 }
 //取消订单
 var getCancel=function(e){
 	 return config.postRequest("bos/v2/user/order/cancel",e);
 }
//一键退款
 var getQuick=function(e){
 	 return config.postRequest("pay/wechat/user/refund/quick",e);
 }
 //下单消息推送
 var getSend=function(e){
 	 return config.postRequest("wechat/msg/send",e);
 }
 
 //支付消息推送
 var getSendOk=function(e){
 	 return config.postRequest("wechat/msg/sendOk",e);
 }
 
 //订单详情
var getOrderDel=function(e){
 	 return config.getRequest("bos/getOrder",e);
 }
 
 // 获取配餐员列表
 var getDeliveryList=function(e){
  	 return config.postRequest("v1/delivery/deliveryList",e);
  }
  //分单
  var getRematch=function(e){
   	 return config.postRequest("v1/delivery/rematch",e);
   }
  

 
module.exports = {
    getlogout,
	getlogin,
	getuserinfo,
	getcategory,
	getfoods,
	getcheckout,
	getorders,
	getremarks,
	getorderslist,
	getratings,
	getratinglist,
	getaddr,
	getaddress,
	getRiderorders,
	getDeliveryorder,
	getPickgoods,
	getDelConfirm,
	getPaytime,
	getPay,
	getSyinfo,
	getDefaul,
	getSave,
	getWeek,
	getfoodCbV,
	getRefund,
	getfoodXq,
	getScan,
	getRestaurant,
	getDepts,
	getDelivery,
	getHos,
	getCancel,
	getQuick,
	getSend,
	getOrderDel,
	getOpenid,
	getSendOk,
	getDeliveryList,
	getRematch
}