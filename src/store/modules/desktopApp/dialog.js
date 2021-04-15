import {isEmpty} from "element-ui/src/utils/util";

const state = {
  menuIdList: {
    '1': 'control_Panel',//控制面板
    '2': 'fileManage_Panel',//文件管理
    '3': 'resources_Panel',//资源管理
    '4': 'storage_Panel',//存储空间
    '5': 'log_Panel',//日志信息
    '6': 'station_Panel',//采集站管理平台
    '66': 'music_Panel',//音乐播放
    '67': 'photo_Viewer',//图片展示
    '69': 'userSets_Panel',//用户设置
    // 'playVideoContainer':'play_Panel',//视频播放
  },
  dialogShow: {
    control_Panel: false,
    fileManage_Panel: false,
    resources_Panel: false,
    storage_Panel: false,
    log_Panel: false,
    station_Panel: false,
    music_Panel: false,
    photo_Viewer: false,
    userSets_Panel: false,
  },
  childMenuIdList: {
    '2_child': 'fileManage_child_Panel',
    '1_child': 'control_child_Panel',
    '4_child': 'storage_child_Panel',
    '69_child': 'userSets_child_Panel'
  },
  childDialog: {
    fileManage_child_Panel: false,
    control_child_Panel: false,
    storage_child_Panel: false,
    userSets_child_Panel: false
  },
};
const mutations = {
  dialog_child_open (state, selfId) {
    state.childDialog[state.childMenuIdList[selfId]] = true
  },
  dialog_child_close (state, selfId) {
    state.childDialog[state.childMenuIdList[selfId]] = false
  },
  dialog_parent_open (state, menuId) {
    state.dialogShow[state.menuIdList[menuId]] = true;
  },
  dialog_parent_close (state, menuId) {  //1面板 2文件管理  3资源面板   4存储中心 5日志中心
    state.dialogShow[state.menuIdList[menuId]] = false;
  },
  clear(state){
    Object.keys(state.childDialog).forEach(item => {
      state.childDialog[item] = false
    })
    Object.keys(state.dialogShow).forEach(item => {
      state.dialogShow[item] = false
    })
  },
};
const getters = {

};
const actions = {
  clearDialog (context) {//关闭所有弹框
    console.log(context)
    return new Promise((resolve) => {
      context.commit('clear')
      resolve(context.state)
    })
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
