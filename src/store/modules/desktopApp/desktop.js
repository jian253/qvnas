// import * as types from '../../mutation-typess'
/**
 * @Description:  保存个人设置初始数据 判断用户有没有修改
 * @author kai
 * @date 2021/2/4 10:23
 */
//常量
const state={
  personalEditInitData:{}
};
const mutations={
  saveUserSetInfo(state,data){
    state.personalEditInitData=data
  }
};
const getters={

}
const actions={};
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
