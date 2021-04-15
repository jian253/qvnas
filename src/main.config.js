import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
/*引入字体图标*/
import '../static/font/iconfont.css'
// //引入Echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$stationUrl ="http://"+window.location.hostname+':8580/';//采集站地址
//event bus 事件
Vue.prototype.$EventBus = new Vue()
//自动化
import '@/common/export'
//全局组件
import globalComponent from '../src/utils/globalComponent'
Vue.use(globalComponent)
//获取监听元素大小变化
import '@/utils/resize/index'
//右键菜单
import VueContextMenu from '@xunlei/vue-context-menu'
Vue.use(VueContextMenu)

