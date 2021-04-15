import Vue from "vue";
//*as取别名
import *as filters from '@common/js/filter/filters'
//自动注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
//自动注册指令
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive;
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key]);
      });
    });
  })(require.context('./directive/index', false, /\.js$/));
});
//require.context('./index', false, /\.js$/)
// require.context函数接收三个参数：
// 1、要搜索的文件夹目录
// 2、是否还应该搜索它的子目录
// 3、以及一个匹配文件的正则表达式
// (function(){}())
