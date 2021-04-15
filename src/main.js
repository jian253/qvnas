// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import {Language} from '@api/i18n'
//导入兼容ie11的es6
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './main.config'
import i18n from './i18n/index'
import "./mock/index";
Vue.use(ElementUI,{
  i18n:(key,value)=>i18n.t(key,value)
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: {App},
  template: '<App/>'
})
// }
