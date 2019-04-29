import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 启动云环境
wx.cloud.init()
const app = new Vue(App)
app.$mount()
