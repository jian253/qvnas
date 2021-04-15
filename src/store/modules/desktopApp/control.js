const state = {
  sharedFolder: {},
  doubleConfirm: {},
  addUserInfo:{},
  datas:''
};
let mutations = {
  saveControlChildInfo: (state, data) => {
    state.datas=data
    // let {sharedFolder,doubleConfirm,addUserInfo}=data
    // state.sharedFolder = sharedFolder
    // state.doubleConfirm = doubleConfirm
    // state.addUserInfo = addUserInfo
    // console.log(sharedFolder)
  }
};
const actions = {};
export default {
  namespaced: true,//开启命名空间,模块内部的 state 是局部的，只属于模块本身所有。
  state,
  mutations,
  actions
}
