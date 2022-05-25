import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false


import {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date,
	unique
} from '@/common/js/util'

Vue.prototype.$store = store
Vue.prototype.$util = {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date,
	unique
}

import tabbar from '@/components/tabBar.vue'
Vue.component('tab-bar', tabbar)
import loadMore from './components/uni-load-more/uni-load-more.vue'
Vue.component('uni-load-more', loadMore)

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
