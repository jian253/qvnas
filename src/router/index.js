import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//解决重定向多次弹出消息
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
let router= new Router({
  //部署到nginx时设置为history，部署到后端项目中时设置为hash，解决刷新问题
  mode: 'hash', //默认就是hash，如果不写，打包后项目可能出现空白页情况；写上history模式会消除访问时路径是出现个#的情况
  routes: [
    {
      path: '', //部署到后端项目中时，router中地址需要避免和接口地址冲突
      redirect:'/webLogin'
    },
    {
      path: '/webLogin', //部署到后端项目中时，router中地址需要避免和接口地址冲突
      name: 'Login',
      component: () => import('../components/Login')
    }
    ,
    {
      path: '/index',
      name: 'Homepage',
      component: () => import('../components/Homepage/Homepage')
    }
    , {
      path: '/playVideo',
      name: 'playVideo',
      component: () => import('../components/PlugInBox/playVideo')
    }
    , {
      path: '/playIframe',
      name: 'playIframe',
      component: () => import('../components/PlugInBox/playIframe')
    }, {
      path: '/Page',
      name: 'Page',
      component: () => import('../components/errorPage/500/Page')
    }
  ]
})


/*登路由导航守卫登陆拦截*/
router.beforeEach((to, from, next) => {
  const tokenStr = sessionStorage.getItem('nasToken')
  if (to.path === '/webLogin') {
    return next()
  }
  if (!tokenStr) {
    return next('/webLogin')
  }
  next()
})
export default router
