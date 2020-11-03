import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import 'lib-flexible/flexible'
import "@/common/stylus/transition.styl"
import fastClick from 'fastclick'//300ms 延迟解决方案
import './utils/appback'////解决 webapp手机上按 Home键直接退出程序
import store from './store' //Vuex
import axios from '@/api'
// import './libs/rem.js'

Vue.prototype.axios = axios
Vue.config.productionTip = false
fastClick.attach(document.body)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
