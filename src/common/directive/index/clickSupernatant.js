/**
 * @Description: 点击外层清楚浮层
 * @author kai
 * @date 2021/4/6 14:50
 */
export default {
  closeLayer: {
    bind(el, binding, vnode) {
      function documentHandler(e) {
        if (el.contains(e.target)) {
          return false
        }
        if (binding.expression) {
          binding.value(e)
        }
      }

      function KeyUp(e) {
        if (e.keyCode == 27) {
          if (binding.expression) {
            binding.value(e)
          }
        }
      }
      function Resize(e){
        if (binding&&binding.expression) {
          binding.value(e)
        }
      }
      el.__vueClickOutSize__ = documentHandler
      el.__vueKeyup__ = KeyUp
      el.__vueResize__ = KeyUp
      window.addEventListener('resize',Resize)
      document.addEventListener('keyup', KeyUp)
      document.addEventListener('click', documentHandler)
    },
    unbind(el, binding) {
      document.removeEventListener('click', el.__vueClickOutSize__)
      delete  el.__vueClickOutSize__
      window.removeEventListener('resize', el.__vueResize__)
      delete  el.__vueResize__
      document.removeEventListener('keyup', el.__vueKeyup__)
      delete  el.__vueKeyup__
    }
  }
}
