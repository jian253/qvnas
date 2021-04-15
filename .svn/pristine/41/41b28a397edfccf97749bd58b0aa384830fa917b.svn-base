import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)
import * as types from './mutation-typess'//常量
import desktop from './modules/desktopApp/desktop'//桌面
import storage from './modules/desktopApp/storage'//存储空间
import file from './modules/desktopApp/file'//文件管理
import control from './modules/desktopApp/control'//控制面板
import log from './modules/desktopApp/log'//日志
import dialog from './modules/desktopApp/dialog'
import {deepClone} from "@common/js/publicMethod/publicMethod";
import webscoket from './modules/desktopApp/websocket'//webscoket

const store = new Vuex.Store({
  state: {
    socketAddress: null,
    //保存当前登陆用户信息
    currentUserInfo: {},
    //当前用户权限
    currentAuthorityList: [],
    AuthorityId:[],//保存共享文件夹子文件夹所有的id
    AuthorityParentId:'',//保存共享文件夹父id
    //预览样式
    PreviewStyle: {},
    //全局搜索跳转对象
    search_obj: null,
    PreviewWallpaperPath: '',
    storeData:null,
    language:null,

  },
  mutations: {
    storeData(state,Data){
      state.storeData=Data
    },
    setLanguage(state,Language){
      state.language=Language
    },
    AuthorityList (state, Authority) {//权限列表
      state.currentAuthorityList=[]
      Authority.userRoleList.forEach((item) => {
        state.currentAuthorityList.push(item.authorityId)
      })
    },
    AuthorityListId(state,params){//共享文件夹id
      let{AuthorityId,AuthorityParentId}=params
      state.AuthorityId=AuthorityId
      state.AuthorityParentId=AuthorityParentId
    },
    up_user_info (state, userInfo) {//用户信息
      state.currentUserInfo = userInfo
    },
    up_user_infos (state, userInfos) {//用户预览信息，图片预览样式预览
      state.PreviewStyle = userInfos
    },
    RawData (state) {//重置预览用户信息
      state.PreviewWallpaperPath = deepClone(state.currentUserInfo.wallpaperPath)
      state.PreviewStyle = deepClone(state.currentUserInfo)
    },
    edit_back_info (state, desktopInfo) {//修改预览图片
      state.PreviewWallpaperPath = deepClone(desktopInfo)
      state.PreviewStyle.wallpaperPath = deepClone(desktopInfo)
    },
    deleteImg (state, desktopInfo) {
      const path = '/api/image' + desktopInfo
      if (state.PreviewWallpaperPath == path) {//删除图片如果相等就把图片替换成用户原始图片
        state.desktop.personalEditInitData.wallpaperPath = state.currentUserInfo.wallpaperPath
        state.PreviewWallpaperPath = state.currentUserInfo.wallpaperPath
        state.PreviewStyle.wallpaperPath = state.currentUserInfo.wallpaperPath
      }
    },
    up_Preview_FillSelection (state, desktopInfo) {//修改平铺
      state.PreviewStyle.fillSelection = desktopInfo
    },
    deleteUser_boj (state) {
      state.search_obj = null
    },
    glSearch_jump_file (state, item) {
      state.search_obj = item
    },
    webSocketAddress (state, item) {
      state.socketAddress = item
    }
  },
  actions: {},
  getters: {},
  modules: {
    desktop: desktop,
    storage,
    file,
    Panel: control,
    log,
    Dialog: dialog,
    v_scoket: webscoket
  }
})
export default store
