<template>
  <el-container id="Homepage" class="defaultConfig"
                :style="dynamicStyle"
                v-if="showHome"
                v-cloak
  >
    <el-header>
      <!--左侧按钮-->
      <div class="header-box-left">
        <div class="showAll">
          <button @click="isShowDesktop" :title="$t('title.showDesktop')"></button>
        </div>
        <div class="mainMenu" id="mainMenu" :title="$t('title.mainMenu')">
          <button @click.stop="mainMenu($event)">
          </button>
        </div>
      </div>
      <!-- tab栏-->
      <div class="header-tab">
        <transition-group tag="ul" class="tabsWidth" id="getTabsWidth">
          <li v-for="(item) in tabList" :key="item.menuId"
          >
            <button class=" tab-button" :style="{'backgroundImage':'url('+item.url+')'}"
                    @click.prevent.stop="switchDialog(item,$event)" :menuid="item.menuId"
                    @mousedown.stop.right="rightMenuEvent($event,item)">
            </button>
            <!--@mouseout="tabViewLeave($event,item)"-->
            <!--            @mouseover="tabView($event,item)"-->
          </li>
        </transition-group>
        <!--        &lt;!&ndash;tabs视图&ndash;&gt;-->
        <!--        <div class="view fadeIn">-->
        <!--          <div class="viewTriangle"></div>-->
        <!--          <div style=" color: #28323C;font-size: 13px;font-weight: bold;padding: 6px 0px; text-align: center;">-->
        <!--            {{viewTitle}}-->
        <!--          </div>-->
        <!--          <div class="views">-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="showClick">
          <el-dropdown trigger="click" placement="bottom-start" ref="showClicks" class="Overflow_dropdown_box">
            <div id="Overflow_Button" class="Overflow_Button"></div>
            <el-dropdown-menu slot="dropdown">
              <div class="Overflow_dropdown_item" v-for="(items,index) in copyTabList " :key="index"
                   @click="debounce_Dialog($event,items,items.menuId)">
                <div class="Overflow_dropdown_item_box">
                  <img :src="items.url" class="Overflow_dropdown_img"><span class="Overflow_dropdown_title">{{items.menuName}}</span>
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div v-if="isShowUpload==true"><!--下载图标 taskTabs-->
        <button class="tab-button Upload"
                :style="{backgroundImage:'url('+(this.UploadLogo==0?this.Static_src:this.src)+')'}"
                @click="showOrHide"></button>
      </div>
      <!--右侧按钮-->
      <div class="header-box-right">
        <!--右侧分割线-->
        <div class="header-box-ico">
          <div class="ico"></div>
        </div>
        <div class="header-box-button">
          <el-badge is-dot class="badge" :hidden="showBadge">
            <el-button class="btn" ref="btn_glMessage" icon=" iconfont icon-xinxi" :title="$t('title.news')"
                       @click="MessagesBoxEvent($event)">
            </el-button>
          </el-badge>
        </div>
        <div class="header-box-button">        <!--选项下拉菜单 -->
          <el-dropdown trigger="click"
                       placement="bottom-start"
                       @command="OptionConfig"
                       @visible-change="visibleDropdown"
          >
            <el-button class="btn" ref="userInfo" icon="iconfont icon-gerenyonghutouxiang"
                       :title="$t('title.options')"></el-button>
            <el-dropdown-menu slot="dropdown" class="OptionStyle">
              <el-dropdown-item>{{$store.state.currentUserInfo.userName}}</el-dropdown-item>
              <el-dropdown-item icon="iconfont icon-gerenshezhi2" command="a">{{$t('common.personalSet')}}
              </el-dropdown-item>
              <el-dropdown-item icon="iconfont icon-zhongxinqidong" command="b">{{$t('common.restart')}}
              </el-dropdown-item>
              <el-dropdown-item icon="iconfont icon-guanji" command="c">{{$t('common.shutdown')}}</el-dropdown-item>
              <el-dropdown-item icon="iconfont icon-zhuxiaocopy" command="d">{{$t('common.logout')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="header-box-button">
          <el-button id="btn" ref="btn_glSearch" class="btn" icon="iconfont icon-sousuo"
                     @click="showSearch=!showSearch"
                     :title="$t('title.search')"
          ></el-button>
        </div>
        <div class="header-box-button">
          <el-button icon="iconfont icon-xiaogongju" ref="smallTools" id="smallTools"
                     :title="$t('title.tool')"
                     @click.stop="debounce_ToolsPanel($event)"></el-button>
        </div>
      </div>
    </el-header>
    <div class="header-shadow"></div>
    <!--主体部分-->
    <el-main id="menuPannel" ref="menuPannel">
      <!-- <div class="Menu-icon" id="Menu-icon"  >-->
      <div class="main_box">
        <!--为对象时-->
        <transition-group tag="div" name="flip-list" class="Menu-icon" ref="Menu-icon" id="Menu-icon" @dragover.prevent>
          <div
            :title="item.menuName"
            v-if="item.isParent===false"
            :class="{homeScreenIcon,initialAnimation}"
            v-for="(item) in images" :key="item.menuId"
            draggable="true"
            @dragstart="handleDragStart($event,item)"
            @dragover.prevent="handleDragOver($event,item)"
            @dragend="handleDragEnd($event,item)"
            @dragenter="handleDragEnter($event,item)"
            @click.stop="debounce_Dialog($event,item,item.menuId)"
          >
            <button :key="item.menuId" :id="`${item.menuId+'id'}`" class="image" :title="item.text"
                    :style="{'backgroundImage':'url('+item.url+')'}">
            </button>
            <div class="text menuTextMargin-top" :style="{color:$store.state.PreviewStyle.textColor}">
              {{textMenu(item)}}
            </div>
          </div>
        </transition-group>
        <!--</div>-->
        <!--主菜单遮盖层 -->
        <el-dialog
          :visible.sync="innerVisible"
          :show-close="false"
          :modal-append-to-body="false"
          width="65%"
          @close="closeDialogCallback"
          class="mainMenuDialog"
          v-cloak>
          <transition-group class="Menu-float mainMenuAnimation">
            <li v-cloak class="items " v-for="(item) in images" :key="item.menuId" draggable="true"
                @dragstart="mainHandleStart($event,item)"
                @dragover.prevent="handleDragOver($event,item)"
                @dragend="mainHandleEnd($event,item)"
                @dragenter="mainRepeatEvent($event,item)"
                @click.stop="debounce_Dialog($event,item,item.menuId)"
            >
              <div>
                <img class="img" :src="item.url" alt="">
              </div>
              <div class="mainTextMargin-top">
                {{textMenu(item)}}
              </div>
            </li>
          </transition-group>
        </el-dialog>
        <!--消息折叠菜单-->
        <el-drawer
          :visible.sync="messageBox"
          :with-header="false"
          :modal="false"
          size="340px"
          :show-close="false"
          :append-to-body="false"
          :modal-append-to-body="false"
        >
          <!--        @close="messageBoxClose"-->
          <div class="news_box">
            <div class="messageBoxHeader">
              <div class="shadow_bar"></div>
              <span>{{$t('title.news')}}</span><!--消息-->
              <div>
                <el-button icon="el-icon-setting"></el-button>
              </div>
            </div>
            <article class="messageBoxArticle">
              <div v-if="showNewsError" class="News_cError">{{$t('reminder.messageGettingError')}} <!--消息获取错误--><img
                src="/static/images/warning/icon_error.png"
                alt=""></div>
              <el-collapse v-model="MessageActiveNames">
                <p class="no_data_tip" v-if="newsList.length==0">
                  <img src="/static/images/global/icon_information_mini.png" alt="">{{$t('title.ThereAreNoAlters')}}</p>
                <!--没有消息-->
                <el-collapse-item v-else v-for="(item,index) in newsList" :key="index" :name="index"
                                  :disabled="item.dismissed">
                  <template slot="title">
                    <div class="title_box">
                      <div class="title_icon">
                        <span :style="newColor(item.level)">{{item.level}}</span>
                        <i :class="newsLevel(item.level)"></i>
                      </div>
                      <div class="title_time">
                        <span>{{$t('title.time')}}:{{item.datetime.$date|filterDate('yyyy-MM-dd hh:mm:ss')}}</span>
                        <!--时间-->
                        <!--                        <i class="Dismiss"></i>-->
                      </div>
                      <div class="optionBtnGroup">
                      <span class="addBottomBorder" v-if="item.dismissed!=true"
                            @click.stop="dealAlertDismiss(0,[item.id])">Dismiss</span>
                        <span :class="{'addBottomBorder':true,'addDismissedClass':item.dismissed==true}" v-else
                              @click="dealAlertRestore(0,[item.id])">Re-Open</span>
                      </div>
                    </div>
                  </template>
                  <p :class="{'addDismissedClass':item.dismissed==true}">{{item.formatted}}</p>
                </el-collapse-item>
              </el-collapse>
            </article>
            <footer class="messageBoxFooter">
              <div class="shadow_bar"></div>
              <gl-button-style size="medium" :disable="newsDismissedList.length==0||newsList.length==0" type="blue"
                               @click="dealAlertDismiss(1,newsDismissedList)">{{$t('title.dismissAllAlter')}}
              </gl-button-style><!--取消所有更改-->
              <gl-button-style size="medium" :disable="newsRestoreList.length==0||newsList.length==0"
                               @click="dealAlertRestore(1,newsRestoreList)">{{$t('title.reOpenAllAlter')}}
              </gl-button-style><!--重新打开所有更改-->
            </footer>
          </div>
        </el-drawer>
        <!--右击tabs显示菜单-->
        <div v-show="desktopTabsRightMenu" class="tabRight-menu" v-closeLayer="closeRightMenu">
          <ul v-show="RightClickObject.isFixed==1">
            <li class="desktopIconSize iconfont icon-quxiaoguding" @click="tabsRightItemClick1(0)">
              {{$t('rightMenu.unPin')}}
            </li><!--取消固定-->
          </ul>
          <ul v-show="RightClickObject.isFixed==0">
            <li class="desktopIconSize iconfont icon-fixed90" @click="tabsRightItemClick1(1,$event)">
              {{$t('rightMenu.fixedTaskbar')}}
            </li><!--固定到任务栏-->
            <li :class="[`${maximizeMenu==false?'disableMenu':''} desktopIconSize iconfont icon-zuidahua`] "
                @click="maximizeMenu && maximizeEvent()"> {{$t('rightMenu.maximize')}}<!--最大化-->
            </li>
            <li
              :class="[`${minimizeMenu==false?'disableMenu':''} desktopIconSize iconfont icon-zuixiaohua-copy-copy-copy-copy`]"
              @click="minimizeMenu && minimizeEvent()"> {{$t('rightMenu.minimize')}}<!--最小化-->
            </li>
            <li :class=" [`${reductionMenu==false?'disableMenu':''} desktopIconSize iconfont icon-shuaxin`]"
                @click="reductionMenu && uminimizeEvent()"> {{$t('rightMenu.reduction')}}<!--还原-->
            </li>
            <li class="desktopIconSize iconfont icon-guanbi1" @click="closeDialogEvent"> {{$t('rightMenu.shutDown')}}
            </li><!--关闭-->
          </ul>
        </div>
        <!--小工具-->
        <tools-panel ref="toolsRef"></tools-panel>
      </div>
    </el-main>
    <!--全局搜索-->
    <search-box :isShow="showSearch"></search-box>
    <!--个人设置面板-->
    <user-set ref="userSets"
              @user_RedirectLogin="user_RedirectLogin"></user-set>
    <!--控制面板-->
    <control-panel @clicks="handClicks"
                   :control-panel-data="controlPanel" ref="controlPanel"></control-panel>
    <control-panel-child :user-info="saveUserInfo"
                         @getUserList="refreshUser"></control-panel-child>
    <!--文件管理-->
    <file-menu ref="fileRef" @progressChange="progressChange" @newFolderOrNewName="newFolderOrNewName"
               @OpenMusic="OpenMusicDialog"
               @OpenPreview="OpenPreviewDialog" @NewUploadDialog="NewUploadDialog"
               :isShowUploads="isShowUpload" @refreshVideoplay="refreshVideoplay"></file-menu>
    <file-new-folder-child ref="newFolderRef" @RenameEvents="RenameEvents"
                           :folderParams="newFolderParams"></file-new-folder-child>
    <file-upload-popup ref="uploadRef" @TaskClose="TaskClose"></file-upload-popup>
    <!--资源管理-->
    <resources-menu ref="resources_getDom"></resources-menu>
    <!--日志-->
    <log-panel ref="getSectionLogList"></log-panel>
    <!--存储空间-->
    <storage-menu ref="storage_getEcharts" @newPopup="addArrayPopup">
    </storage-menu>
    <storage-pool-child ref="poolRef" :delete-or-add="deleteOrAdds"
    ></storage-pool-child>

    <!--插件类的弹框-->
    <music></music><!--音乐-->
    <photo-viewer ref="viewerRES"></photo-viewer><!--图片预览-->
    <!--webSocket-->
    <!--<gl-web-socket ref="socket" @getSockData="getSockData" @successWeb="successWeb"></gl-web-socket>-->
    <webscoket-tool style="display: none" ref="websocketRef" @webSoketSuccess="webSoketSuccess"></webscoket-tool>
    <video-tool ref="videoTool" :videourl="playVideoUrl"></video-tool>
    <back-img-select ref="backImgSelect" @backImgSelectFun="backImgSelectDialog"
                     :trueRefreshBackImgDialog="trueRefreshBackImgDialog"></back-img-select>
    <div class="copyAnimatedDialog"></div>
    <!--    <resize></resize>-->
    <div class="6" style="width:100%;height:100%" v-if="showCollection">
      <!--allow="payment"-->
      <!--referrerpolicy="unsafe-url"-->
      <!--sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation  allow-downloads allow-presentation"-->
      <iframe :src="stationUrl"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation  allow-downloads allow-presentation"
              name="iframePage" id="iframePage" frameborder="0" width="100%"
              height="100%"></iframe>
    </div>
  </el-container>
</template>

<script>
  import '@js/css/popupwindow.css';
  import '@js/js/popupwindow.js';
  import {components} from '@/utils/homePageComponents'
  import {getDeskTopMenuList, deskTopMenuMove} from '@api/menu/menuContact'
  import {getUser} from '@api/login/loginContact'
  import {debounce} from '@common/common/debounceAndThrottle'
  import {initDialogConfig} from '@common/js/dialogConfig/dialogConfig'
  import {mapState} from 'vuex'
  import {assign_compatible, deepClone} from "@common/js/publicMethod/publicMethod";
  import {deskTopIcon, mainMenuIcon, controlPanelIcon} from "@components/Homepage/index"
  import {filterObj} from "@common/common/filterData";

  let timeout2 = null;
  let clear = 0
  export default {
    name: 'Homepage',
    data () {
      return {
        storeData: null,//保存vuex数据
        showHome: false,//用来清除Homepage页面重至数据
        stationUrl: this.$stationUrl,//采集站地址
        saveUserInfo: {},
        desktopFlog: 1,
        //socket请求参数
        socketParams: {
          "method": '',
          "params": []
        },
        httpUrl: this.$httpUrl,
        sourceImages: [[], [], []],
        deleteOrAdds: '',
        showNewsError: false,//是否显示获取消息错误信息
        showBadge: true,//是否显示新消息标志 false 为显示
        //将选项设置为隐藏
        showOption: false,
        //消息弹框显示与隐藏
        messageBox: false,
        MessageActiveNames: [],//消息的折叠卡默认展开
        //消息
        newsList: [],
        newsDismissedList: [],
        newsRestoreList: [],
        //控制主菜单遮盖层的显示与隐藏
        innerVisible: false,
        //控制主菜单按钮的状态
        mainMenuButton: true,
        //保存主菜单按钮dom
        saveMainButton: '',
        //控制修改文件夹的禁用与启用
        disabled: false,
        //初始动画
        initialAnimation: true,
        images: [],
        //控制面板中的数据
        controlPanel: [],
        //拖动的对象
        dragging: null,
        homeScreenIcon: true,
        desktopMoveParams: [],//桌面图标位置的信息
        //tab栏中绑定的数据
        tabList: [],
        copyTabList: [],
        //保存拖动的对象数组对象
        dragObj: {},
        //保存重叠的对象
        repeatObj: {},
        //保存点击数组后获取数组对象
        saveArrayObj: [],
        //获取可视高度
        fullHeight: document.documentElement.clientHeight,
        fullWidth: document.documentElement.clientWidth,
        OverlapBox: null,
        //存储鼠标按下时的坐标
        PressPositionX: null,
        PressPositionY: null,
        //保存拉取重叠对象
        repeat: {},
        pull: null,
        //保存盒子点击的对象
        ArrayBox: null,
        timeout: null,
        //全局搜索控制显示与隐藏
        showSearch: false,
        //控制选项的显示与隐藏
        optionShow: false,
        //桌面显示与隐藏
        deskTopShow: false,
        //flag标志节流阀
        flag: true,
        //保存tabs视图的名字
        viewTitle: null,
        desktopTabsRightMenu: false,//是否显示右击菜单
        RightClickObject: [],
        //弹框的层级性
        dialogZindex: 222,
        mainMenuIcons: [],//主菜单列表 模拟数据 暂时没有用到
        newFolderParams: {}, //传递参数 创建文件夹
        taskTabs: [],//右侧上传图标数据
        isShowUpload: false, //是否显示文件监控弹框
        controlUpload: 1,
        src: '/static/images/desktop/tray_icon_upload.gif', //上传动图
        Static_src: "/static/images/desktop/tray_icon_upload.png",
        UploadLogo: 0,//用来控制上传图标
        reductionMenu: true,//弹框还原 是否禁止
        minimizeMenu: true,//最小化菜单是否禁止
        maximizeMenu: true,//最大化菜单是否禁止
        // dialogArray: [],
        playVideoUrl: '',//存放文件管理播放视频的地址
        trueRefreshBackImgDialog: false,
        SaveNowHaveHideDialog: []//显示桌面需要隐藏的的窗口
      }
    },
    components,
    directives: {},
    methods: {
      newColor (level) {
        if (level == 'CRITICAL') {//危险的
          return "color:#FA4B4B;font-weight: 700;"
        } else if (level == 'WARNING') {//警告
          return "color:#FF7F00;font-weight: 700;"
        } else if (level == 'INFO') {//信息
          return "color:#0086E6;font-weight: 700;"
        }
      },
      newsLevel (level) {//消息
        if (level == 'CRITICAL') {//危险的
          return "danger News_level"
        } else if (level == 'WARNING') {//警告
          return "warning News_level"
        } else if (level == 'INFO') {//信息
          return "Info News_level"
        }
      },
      //打开采集站
      playStation (e) {
        try {
          document.getElementById('iframePage').contentWindow.postMessage(this.$router.path, '*');
        } catch (e) {
        }
      },
      //打开小工具
      openToolsPanel (e) {
        this.messageBox = false;
        this.$refs.toolsRef.showOrHide(e)
        // this.$refs.toolsRef.toolClick==''
      },
      debounce_ToolsPanel: debounce('openToolsPanel'),
      //显示或隐藏桌面
      isShowDesktop () {
        let nowHaveHideDialog = [];//当前需要隐藏的弹框集合
        let trueResetDesktop = true;//是否取消最小化
        let domArray = $(`.el-container .el-header .tab-button`)
        $(".popupwindow_container").each((index, nowEle) => {
          let dialogSettings = $(nowEle).find(".popupwindow").data();
          let tabDom = $(`.tab-button[menuid=${dialogSettings.settings.dialogId}]`)
          if (tabDom.length == 1) {
            if (!dialogSettings.minimized) {//不是最小化才进行操作
              trueResetDesktop = false;
              nowHaveHideDialog.push(dialogSettings.settings.dialogId);//用来取消最小化
              $("." + dialogSettings.settings.dialogId).PopupWindow("minimize");
              // tabDom.parent().removeClass('header-tabStyle');
              // tabDom.parent().addClass('header-tabStyle1');
            }
          }
        });
        if (trueResetDesktop && domArray.length > 0) {//取消最小化
          this.SaveNowHaveHideDialog.forEach((item, index) => {
            $("." + item).PopupWindow("unminimize");
            // $(`.tab-button[menuid=${item}]`).parent().addClass('header-tabStyle');
            // $(`.tab-button[menuid=${item}]`).parent().removeClass('header-tabStyle1');
            //$("#"+item+"_dialog").removeClass("hasMin");
          });
        } else {
          if (domArray.length > 0) {
            this.SaveNowHaveHideDialog = nowHaveHideDialog;
          }
        }
        //隐藏工具窗口 判断窗口有没有打开 小工具 信息 搜索
        if (this.showSearch) {//打开了
          this.showSearch = false
        }
        //侧边栏隐藏
        if (this.messageBox) {
          this.messageBox = false;
        }
        if (this.$refs.toolsRef.showTools == true || this.$refs.toolsRef.toolClick != true) {
          this.$refs.toolsRef.showOrHide()
        }
      },
      //soket认证成功
      webSoketSuccess () {
        this.$refs.toolsRef.currentSelectList()//获取当前用户小工具
      },
      refreshWebsocketData (name, params) {
        try {
          this.$refs.websocketRef.postSendData(name, params)
          // console.log(name)
        } catch (e) {
        }
      },
      //获取菜单树数据
      async getMenu () {
        const {data: res} = await getDeskTopMenuList()
        // const {data: res} = await this.$http.post('/menuTree/list')
        if (res.code !== 200) return this.$notify.error({
          message: this.$t('reminder.desktopMenuError'),
          title: this.$t('log.error'),
          duration: 1400,
          offset: 56
        })
        //给后台返回的数据添加属性值
        res.data.forEach(item => {
          this.$set(item, 'isParent', false)
          this.$set(item, 'inputText', 'New Group')
          deskTopIcon.forEach(items => {
            //给后台返回的数据添加图片路径
            if (item.menuId === items.id) {
              this.$set(item, 'url', items.url)
              this.$set(item, 'isStyle', items.isStyle)
            }
            if (item.menuId == 1) {
              this.controlPanel = item.children
            }
          })
          let str1 = this.tabList.some(items => items.menuId == item.menuId)
          if (item.isFixed == 1 && !str1) {//说明是固定的且没有就添加
            this.tabList.push(item)
          }
        })
        this.controlPanel.forEach((item) => {
          controlPanelIcon.forEach((items) => {
            if (item.menuId === items.menuId) {
              this.$set(item, 'url', items.path)
              this.$set(item, 'type', items.category)
              this.$set(item, 'show', items.show)
              this.$set(item, 'title', items.menuName)
            }
          })
        })
        //根据显示顺序进行排序
        res.data.sort(this.compare('orderNum'))
        this.images = res.data
        this.getInitFixed()
        //获取元素
        this.DesktopResponse()
      },
      //移动桌面图标接口  传1代表移动操作 0代表固定菜单或取消固定
      async moveDesktopApi (ArrayParams, type) {
        let {data: res} = await deskTopMenuMove(JSON.stringify(ArrayParams))
        if (res.code !== 200) return this.$notify.error({
          message: type == 0 ? this.$t('reminder.moveError') : this.$t('reminder.fixedMenu'),
          title: this.$t('log.error'),
          duration: 1400,
          offset: 56
        })
        this.desktopMoveParams = ArrayParams//移动完图标将位置信息保存
      },
      //页面一加载获取图标位置信息
      getInitFixed () {
        let arrays = []
        this.images.forEach((item) => {
          arrays.push(filterObj(item, ['isFixed', 'menuId', 'orderNum']))
        })
        this.desktopMoveParams = arrays
      },
      //排序函数
      compare (property) {
        return function (a, b) {
          let value1 = a[property]
          let value2 = b[property]
          return value1 - value2
        }
      },
      //拖动触发该事件
      handleDragStart (e, item) {
        //修改拖动元素的透明度
        e.target.style.opacity = "0.4";
        this.initialAnimation = false
        // e.dataTransfer.setDragImage(imagele, 25, 25)
        //拖动的对象
        this.dragObj = item;
        // console.log(this.dragObj)
        this.dragging = item;
      },
      //拖动结束触发该事件 调用接口实现位置交换
      handleDragEnd (e, item) {
        //重置拖拽元素的透明度
        e.target.style.opacity = "1";
        //如果移动的目标对象等于空或者等于自己 则阻止程序运行
        if (this.repeatObj === this.dragging) {
          return
        }
        //1.菜单id  2.当前在桌面图标的排序
        // {"2":1,"3":2,"1":4,"5":3,"4":5}
        let index = this.images.findIndex(item => item.menuId == this.dragObj.menuId)
        let index1 = this.images.findIndex(item => item.menuId == this.repeatObj.menuId)
        this.images[index] = this.images.splice(index1, 1, this.images[index])[0];//交换位置
        let arr = []
        this.images.forEach(item => {
          arr.push(filterObj(item, ['isFixed', 'menuId', 'orderNum']))
        })
        this.moveDesktopApi(arr, 1)
        // let _this = this
        // let ArrayParams = [];
        // _this.images.forEach((item) => {
        //   let singelArrayParams = {};
        //   // singelArrayParams.isFixed = _this.dragObj.isFixed;
        //   if (item.menuId === _this.dragObj.menuId) {//拖拽的对象
        //     singelArrayParams.isFixed = _this.dragObj.isFixed;
        //     singelArrayParams.menuId = _this.dragObj.menuId;
        //     singelArrayParams.orderNum = _this.repeatObj.orderNum;
        //   } else if (item.menuId === _this.repeatObj.menuId) {//交换位置的对象
        //     singelArrayParams.isFixed = _this.repeatObj.isFixed;
        //     singelArrayParams.menuId = _this.repeatObj.menuId;
        //     singelArrayParams.orderNum = _this.dragObj.orderNum;
        //   } else {
        //     singelArrayParams.isFixed = item.isFixed;
        //     singelArrayParams.menuId = item.menuId;
        //     singelArrayParams.orderNum = item.orderNum;
        //   }
        //   ArrayParams.push(singelArrayParams);
        // })
        //如果移动的目标对象等于空 则阻止程序运行
        // if (this.repeatObj === this.dragging) {
        //   return
        // }
        // //拿到数组对象
        // let getList = JSON.parse(JSON.stringify(this.images))
        // let addListArr = [];
        // //判断拖动重叠对象,如果数组长度大于1说明是div 在div上添加
        // if (this.repeatObj.saveArray.length >= 1) {
        //   let addListArr = JSON.parse(JSON.stringify(this.repeatObj));
        //   this.OverlapBox.classList.add('merge-animation')
        //   //将拖拽的这个对象添加到这个数组对象  //获取拖拽的这个对象  //删除原来的位置图标
        //   addListArr.saveArray.push(this.dragObj)
        //   //获取原来的拖动的位置
        //   let index = this.getOriginalPst()
        //   //获取要覆盖的位置
        //   let index2 = this.getRepeatObjPst()
        //   getList[index2] = addListArr
        //   getList.splice(index, 1)
        //   this.images = getList
        // } else {
        //   //合并拖动的对象及重叠的对象
        //   addListArr.push(JSON.parse(JSON.stringify(this.repeatObj)))
        //   addListArr.push(JSON.parse(JSON.stringify(this.dragObj)))
        //   //调用方法拿到重叠图标在数组对象中的位置
        //   let index = this.getRepeatObjPst()
        //   //将合并的对象给重叠对象
        //   getList[index].saveArray = addListArr
        //   getList[index].isParent = true
        //   //查找合并后的数组在原数组的位置
        //   //将原先的拖动的对象位置删除  查找原先拖动的图标在数组对象的位置
        //   let index2 = this.getOriginalPst()
        //   //删除
        //   getList.splice(index2, 1);
        //   this.images = getList
        // }
        // addListArr = []
        // this.repeatObj = []
        // this.dragging = null
        // this.dragObj = {}
      },
      //首先把div变成可以放置的元素，即重写dragenter/dragover
      handleDragOver (e) {
        e.dataTransfer.dropEffect = 'move'
      },
      //两个图标重叠了触发该事件
      handleDragEnter (e, item) {
        //重叠对象的盒子
        this.OverlapBox = e.currentTarget
        this.OverlapBox.classList.remove('merge-animation')
        this.repeatObj = item
        e.dataTransfer.effectAllowed = "move"//为需要移动的元素设置dragstart事件
      },
      //查找重叠图标的位置
      getRepeatObjPst () {
        return this.images.findIndex((value, index) => value === this.repeatObj)
      },
      //查找原先拖动图标在数组中的位置
      getOriginalPst () {
        return this.images.findIndex((value, index) => value === this.dragObj)
      },
      //获取点击数组的列表对象
      clickArray (e, item) {
        this.ArrayBox = e.currentTarget
        this.saveArrayObj = item
      },
      //拉取拖动处理函数
      handlePullStart (e, item) {
        //修改拖动元素的透明度
        e.target.style.opacity = "0.4";
        //防止拖动的时候触发输入框bug
        this.disabled = true
        clearTimeout(this.timeout)
        this.pull = item
        this.PressPositionX = e.clientX
        this.PressPositionY = e.clientY
      },
      //拉取图标结束处理
      pullEndProcessing (e, item) {
        //重置拖动元素的透明度
        e.target.style.opacity = "1";
        //防止拖动的时候触发输入框bug
        this.disabled = false
        // //鼠标移动的距离
        let x = e.clientX - this.PressPositionX
        let y = e.clientY - this.PressPositionY
        // //获取盒子的高度及宽度
        let Width = e.currentTarget.parentNode.parentNode.offsetWidth
        let Height = e.currentTarget.parentNode.parentNode.offsetHeight
        const that = this
        //1.查找拖拽对象在数组中的位置
        let index = that.saveArrayObj.saveArray.findIndex((value, index) => value === item)
        //如果移动的距离小于盒子的宽度或高度则不做操作
        if (x > Width || y > Height) {
          //3.将原图标删除
          that.saveArrayObj.saveArray.splice(index, 1)
          //图标添加动画 获取拉取图标的元素
          //2.将图标添加桌面
          that.images.push({
            id: item.id,
            url: item.url,
            text: item.text,
            inputText: item.inputText,
            isParent: false,
            saveArray: []
          })
          //3重新渲染桌面
          if (that.saveArrayObj.saveArray.length === 0) {
            that.ArrayBox.classList.add('bounceOut')
            //查找拖拽的对象在数组中的位置
            let index = that.images.findIndex((value, index) => value === that.saveArrayObj)
            that.timeout = setTimeout(function () {
              that.ArrayBox.classList.remove('bounceOut')
              that.images.splice(index, 1)
            }, 1000)
            //自动点击一下隐藏弹出框
            document.documentElement.click()
          }
        } else {//做交换位置操作
          if (this.repeat === this.pull) {
            return
          }
          //查找点击的div在images的位置
          let index3 = this.images.findIndex((value, index) => value === this.saveArrayObj)
          //移动替换操作
          const newItems = [...this.saveArrayObj.saveArray]
          //拖拽的对象的索引值
          const src = newItems.indexOf(item)
          //重叠后的对象索引值
          const dst = newItems.indexOf(this.repeat)
          newItems.splice(dst, 0, ...newItems.splice(src, 1))
          this.saveArrayObj.saveArray = newItems
          //更新原来在images中的位置
          this.images[index3].saveArray = this.saveArrayObj.saveArray
          // return
          this.pull = null
        }
      },
      //拉取图标重复时触发
      pullRepeatEvent (e, item) {
        e.dataTransfer.effectAllowed = "move"
        this.repeat = item
      },
      //点击主菜单按钮显示主菜单
      mainMenu (e) {
        this.saveMainButton = e.currentTarget.parentNode
        if (this.mainMenuButton) {
          e.currentTarget.parentNode.classList.add('mainMenuShowButton')
          e.currentTarget.parentNode.classList.remove('mainMenu')
          this.mainMenuButton = false
          this.innerVisible = true
        } else {
          e.currentTarget.parentNode.classList.remove('mainMenuShowButton')
          e.currentTarget.parentNode.classList.add('mainMenu')
          this.mainMenuButton = true
          this.innerVisible = false
        }
      },
      //主菜单对话框关闭时的回调
      closeDialogCallback () {
        //获取id
        const btn = document.querySelector('#mainMenu')
        btn.classList.add('mainMenu')
        btn.classList.remove('mainMenuShowButton')
        this.mainMenuButton = true
        this.innerVisible = false
      },
      //主菜单拖动触发事件
      mainHandleStart (e, item) {
        //修改拖动元素的透明度
        e.target.style.opacity = "0.4";
        //取消document禁用状态
        e.currentTarget.parentNode.parentNode.parentNode.parentNode.ondragover = function (e) {
          e.preventDefault();
        }
        //获取body距离左侧的宽度
        const bodyLeft = document.querySelector('.el-dialog').offsetLeft
        //获取body-box的宽度
        const box_Width = document.querySelector('.el-dialog').clientWidth
        const box_Height = document.querySelector('.el-dialog').clientHeight
        //计算body的右侧宽度
        const rightWidth = bodyLeft + box_Width

        e.target.addEventListener("drag", (e) => {
          if (e.clientX < bodyLeft || e.clientX > rightWidth || e.clientY > box_Height) {
            // this.innerVisible = false
            // console.log(bodyLeft)
            // console.log(e.clientX)
            //console.log(rightWidth)
            // console.log(e.clientX)
          }
        });
        this.dragging = item
      },
      //主菜单拖拽结束处理函数
      mainHandleEnd (e, item) {
        //重置拖拽透明度
        e.target.style.opacity = "1";
        //如果拖动的对象等于重复的对象说明没有拖动不执行下面代码
        if (this.repeatObj === this.dragging) {
          return
        }
        const newItems = [...mainMenuIcon]
        const src = newItems.indexOf(this.dragging)
        const dst = newItems.indexOf(this.repeatObj)
        newItems.splice(dst, 0, ...newItems.splice(src, 1))
        this.mainMenuIcons = newItems
      },
      //主菜单拖拽图标重复时触发
      mainRepeatEvent (e, item) {
        e.dataTransfer.effectAllowed = "move"
        //保存重复的对象
        this.repeatObj = item
      },
      //消息弹框js样式
      MessagesBoxEvent (e) {
        this.messageBox = !this.messageBox
      },
      //个人那块下拉显示或隐藏触发
      visibleDropdown (value) {
        if (value) {
          this.$refs['userInfo'].$el.style.color = '#058BEB'
        } else {
          this.$refs['userInfo'].$el.style.color = 'rgba(0, 0, 0, 0.7)'
        }
      },
      //获取token 登陆信息
      async getByToken () {
        const {data: res} = await getUser()
        if (res.code !== 200) return this.$notify.error({
          message: this.$t('reminder.userInfoError'),//'用户信息获取失败请重新登陆!'
          title: this.$t('log.error'),
          duration: 1400,
          offset: 52
        })
        let user = deepClone(res.data.user)
        user.customColor = user.customColor == 0;
        user.customWallpaper = user.customWallpaper == 0;
        user.delFlag = user.delFlag == 1;
        user.status = user.status == 0;
        this.$store.commit('up_user_info', deepClone(user))  //这里注意一定要拷贝数据进去不然会出现数据双向绑定
        this.$store.commit('up_user_infos', deepClone(user))
        this.$store.commit('AuthorityList', deepClone(res.data))
        this.saveUserInfo = res.data
      },
      //选项的各类点击事件
      async OptionConfig (command) {
        //个人设置
        if (command === 'a') {
          this.openPersonalSet(initDialogConfig['userSet'], '69');
          //this.$EventBus.$emit('UserInfo', this.saveUserInfo)
        }
        //重新启动
        if (command === 'b') {
          // let data= await this.$http.post('/system/reboot?lang='+'zh_CN')
          //   console.log(data)
        }
        //关机
        if (command === 'c') {
          let data = await this.$http.post('/system/shutdown')
          // console.log(data)
        }
        //实现注销退出功能
        if (command === 'd') {
          this.RedirectLogin(false)
        }
      },
      //点击头部右侧按钮添加样式
      getHeaderButton () {
        let btn = document.getElementsByClassName('btn')
        let main = document.querySelector('.el-main')
        for (let i = 0; i < btn.length - 1; i++) {
          btn[i].onclick = function () {
            for (let i = 0; i < btn.length - 1; i++) {
              btn[i].classList.remove('buttonClickColor')
            }
            this.classList.add('buttonClickColor')
            //点击dom清除样式
            main.onclick = function () {
              for (let i = 0; i < btn.length - 1; i++) {
                btn[i].classList.remove('buttonClickColor')
              }
            }
          }
        }
      },
      //右tabs键菜单事件
      rightMenuEvent (e, item) {
        if (item.parentId == '') {
          return
        }
        this.RightClickObject = item
        this.DialogStatus()
        // console.log(this.saveTabsRightObj)
        let menu = document.querySelector('.tabRight-menu')
        menu.style.left = e.toElement.offsetLeft + 'px'
        this.desktopTabsRightMenu = true
        // $(document).click(() => {
        //   this.desktopTabsRightMenu = false
        // })
      },
      //判断右击的菜单弹框状态  最大化最小化
      DialogStatus () {
        //console.log(this.RightClickObject)
        //如果等于true说明弹框当前是打开状态  还原禁止
        try {
          $("." + this.RightClickObject.menuId).PopupWindow("getconfig");
          let getNowDialogInfo = JSON.parse(localStorage.getItem("nowDialogInfo"));
          if (getNowDialogInfo.opened == true) {
            //没有最大化也没有最小化
            if (!getNowDialogInfo.minimized && !getNowDialogInfo.maximized) {
              this.reductionMenu = false
              this.minimizeMenu = true
              this.maximizeMenu = true
            } else {
              if (getNowDialogInfo.minimized) {//最小化
                this.reductionMenu = true
                this.minimizeMenu = false
                this.maximizeMenu = false
              } else {
                if (getNowDialogInfo.maximized) {
                  this.reductionMenu = true
                  this.minimizeMenu = true
                  this.maximizeMenu = false
                }
              }
            }
          } else {
            this.reductionMenu = true
            this.minimizeMenu = false
            this.maximizeMenu = false
          }
        } catch (e) {//弹框不存在*/
          this.reductionMenu = false
          this.minimizeMenu = false
          this.maximizeMenu = false
        }
      },
      //右击tabs,子项点击事件 flag==0取消固定 否则固定
      tabsRightItemClick1 (flag) {
        let {menuId: rightTabId} = this.RightClickObject
        let desktopMoveParams = this.desktopMoveParams
        let tabIndex = desktopMoveParams.findIndex(item => item.menuId == rightTabId)
        desktopMoveParams[tabIndex].isFixed = flag //要请求的参数置为0
        this.images[tabIndex].isFixed = flag //桌面的图标置为0
        let tabListIndex = this.tabList.findIndex(item => item.menuId == rightTabId)
        this.tabList[tabListIndex].isFixed = flag //tab 图标置为0
        if (flag == 0) {//取消固定 同时将桌面的菜单的图标置为0
          let tabDom = $(`.tab-button[menuid=${rightTabId}]`).parent()
          //取消固定还要判断是否打开了弹框 或者最小化 如果是则不移除图标
          if (!tabDom.is('.header-tabStyle') && !tabDom.is('.header-tabStyle1')) {//说明不包含
            this.tabList.splice(tabListIndex, 1)
          }
        }
        this.moveDesktopApi(desktopMoveParams, 0)
      },
      closeRightMenu () {
        this.desktopTabsRightMenu = false
      },
      //点击桌面图标打开弹框
      openDialog (e, item, menuId, dialogParams, flag) {
        this.$store.commit('Dialog/dialog_parent_open', menuId)
        this.$nextTick(function () {
          //是否将图标push到tabs 1是不添加 说明固定的菜单
          if (flag == 1) {
          } else {
            try {
              this.saveMainButton.classList.remove('mainMenuShowButton')
              this.saveMainButton.classList.add('mainMenu')
              this.mainMenuButton = true
              this.innerVisible = false
            } catch (e) {
            }
            let str1 = this.tabList.some(items => items.menuId == item.menuId)
            if (!str1) this.tabList.push(item)//不存在
          }
          let dialogName = this.currentUserStyle['userLanguage'] == 'en' ? item.remark : item.menuName
          let defaultSetting = {
            title: `${dialogName}`,
            icon: '<span style="background: url(' + item.url + ');background-size: 24px 24px; height:24px ;width: 24px; display: inline-block"></span>',
            close: true,
            maximize: true,
            minimize: true,
            resizable: true,
            minHeight: 500,
            minWidth: 700
          };
          if (dialogParams && Object.keys(initDialogConfig).includes(menuId)) {//有参数切有值
            $.extend(defaultSetting, initDialogConfig[menuId]);
            $.extend(defaultSetting, dialogParams);
          } else if (Object.keys(initDialogConfig).includes(menuId)) {//存在 就使用配置文件的配置
            $.extend(defaultSetting, initDialogConfig[menuId]);
          }//其他情况默认配置
          try {//创建过
            $("." + menuId).PopupWindow("getconfig");
            if (localStorage.getItem("nowDialogInfo") == undefined) {
            } else {
              let getNowDialogInfo = JSON.parse(localStorage.getItem("nowDialogInfo"));
              if (getNowDialogInfo.minimized) {
                $("." + menuId).PopupWindow("unminimize");
                this.$nextTick(() => {
                  $(`button[menuid=${menuId}]`).parent().removeClass('header-tabStyle1')
                })
              } else if (!getNowDialogInfo.opened) {
                $("." + menuId).PopupWindow("open");
              }
              $("." + menuId).PopupWindow("outerwitchzindex", null);
            }
          } catch (e) {//未创建过
            let dialogOPtion = {
              //parentsElementId: "#app",
              parentsElementId: "#menuPannel",
              title: defaultSetting.title,
              dialogId: menuId,
              isParent: true,//是否是父弹框
              tabElementAll: '.tabsWidth li button',
              tabElement: '.tabsWidth  li button[menuid="' + menuId + '"]',
              icon: defaultSetting.icon,//头部左侧的图标 html拼接
              height: defaultSetting.height,
              width: defaultSetting.width,
              resizable: defaultSetting.resizable,//是否允许拉伸
              minHeight: defaultSetting.minHeight,
              minWidth: defaultSetting.minWidth,
              buttons: {
                close: defaultSetting.close,
                maximize: defaultSetting.maximize,
                collapse: false,
                minimize: defaultSetting.minimize
              },
            };
            $.extend(dialogOPtion, defaultSetting)
            $.extend(dialogOPtion, dialogParams);
            $("." + menuId).PopupWindow(dialogOPtion);
            $("." + menuId).PopupWindow("open");
            this.$nextTick(function () {
              $(`button[menuid=${menuId}]`).parent().addClass('header-tabStyle')
            })
            this.dialogClose(menuId, item)
            if (menuId == '68') {
              document.getElementById('68_dialog').style.display = 'none'
            }
          }
        })
        // this.maxDialogs()
        // this.unmaxDialogs()
      },
      debounce_Dialog: debounce('openDialog'),
      //销毁弹框 监听弹框关闭事件
      dialogClose (menuId, item) {
        let _this = this
        $(`div[menuid=${menuId}]`).on("close.popupwindow", () => {
          if ($("#" + menuId + "_dialog").length > 0) {
            $("." + menuId).PopupWindow("destroy");
            $("#" + menuId + "_dialog").remove();
          }
          if (item.isFixed == 1) {  //如果是固定的话 不移除tab栏中的数据
            $(`.tab-button[menuid=${item.menuId}]`).parent().removeClass('header-tabStyle header-tabStyle1')
            //获取tabls当前的样式移除
          } else {
            let getTabList = JSON.parse(JSON.stringify(this.tabList))
            let getTabList1 = JSON.parse(JSON.stringify(this.tabList))
            getTabList1.forEach((item, index) => {
              if (item.menuId == menuId) {
                getTabList.splice(index, 1);
              }
            });
            this.tabList = JSON.parse(JSON.stringify(getTabList));
          }
          _this.$store.commit('Dialog/dialog_parent_close', menuId)
        })
      },
      //子弹框销毁
      dialogChildClose (menuId) {
        $(`div[menuid=${menuId}]`).on("close.popupwindow", () => {
          if ($("#" + menuId + "_dialog").length > 0) {
            $("." + menuId).PopupWindow("destroy");
            $("#" + menuId + "_dialog").remove();
          }
          this.$store.commit('Dialog/dialog_child_close', menuId)
        })
      },
      //最小化
      minimizeEvent () {
        $("." + this.RightClickObject.menuId).PopupWindow("minimize")
      },
      //最大化
      maximizeEvent () {
        $("." + this.RightClickObject.menuId).PopupWindow("maximize");
      },
      //关闭弹框事件
      closeDialogEvent () {
        $("." + this.RightClickObject.menuId).PopupWindow("close");
      },
      //判断是否是最大化或最小化然后还原
      uminimizeEvent () {
        try {//有当前弹框
          $("." + this.RightClickObject.menuId).PopupWindow("getconfig");
          let getNowDialogInfo = JSON.parse(localStorage.getItem("nowDialogInfo"));
          if (this.minimizeMenu == false && this.maximizeMenu == false) {
            if (getNowDialogInfo.minimized) {//最小化
              $("." + this.RightClickObject.menuId).PopupWindow("unminimize");
              $(`.tab-button[menuid=${this.RightClickObject.menuId}]`).parent().addClass('header-tabStyle')
              $(`.tab-button[menuid=${this.RightClickObject.menuId}]`).parent().removeClass('header-tabStyle1')
            } else if (getNowDialogInfo.maximized) {
              $("." + this.RightClickObject.menuId).PopupWindow("unmaximized");
            }
          } else {
            if (this.minimizeMenu == true && !getNowDialogInfo.minimized) {//没有最小化
              this.minimizeEvent();
            }
            if (this.maximizeMenu == true && !getNowDialogInfo.maximized) {//没有最大化
              this.maximizeEvent();
            }
          }
        } catch (e) {
        }
      },
      //显示桌面
      backImgSelectDialog (parentId, selfId, parameter) {
        this.trueRefreshBackImgDialog = true;
        this.openChildDialog(parentId, selfId, parameter);
      },
      //子弹框
      openChildDialog (parentId, selfId, parameter) {//相关传值 后面的处理方法
        this.$store.commit('Dialog/dialog_child_open', selfId)
        let defaultSetting = {
          height: 500,
          width: 800,
          title: 'title',
          close: false,
          resizable: false,
        }
        if (parameter && Object.keys(initDialogConfig).includes(selfId)) {//有参数切有值
          $.extend(defaultSetting, initDialogConfig[selfId]);
          $.extend(defaultSetting, parameter);
        } else if (Object.keys(initDialogConfig).includes(selfId)) {//存在 就使用配置文件的配置
          $.extend(defaultSetting, initDialogConfig[selfId]);
        }//其他情况默认配置
        this.$nextTick(() => {
          try {//创建过
            $("." + selfId).PopupWindow("getconfig");
            if (localStorage.getItem("nowDialogInfo") == undefined) {
            } else {
              let getNowDialogInfo = JSON.parse(localStorage.getItem("nowDialogInfo"));
              if (getNowDialogInfo.minimized) {
                $("." + selfId).PopupWindow("unminimize");
              } else if (!getNowDialogInfo.opened) {
                if (defaultSetting.title) {
                  $("." + selfId).PopupWindow("settitle", defaultSetting.title);
                }
                $("." + selfId).PopupWindow("open");
              }
            }
          } catch (e) {
            let dialogConfig = {
              //parentsElementId: "#app",
              parentsElementId: "#menuPannel",
              title: defaultSetting.title,
              dialogId: selfId,
              isParent: false,//是否是父弹框
              parentDialog: parentId,//父弹框的menuid
              modal: false,
              autoOpen: false,
              height: defaultSetting.height,
              width: defaultSetting.width,
              resizable: defaultSetting.resizable,//是否允许拉伸
              buttons: {
                close: defaultSetting.close,
                maximize: false,
                collapse: false,
                minimize: false
              },
            };
            $.extend(defaultSetting, dialogConfig)
            $.extend(defaultSetting, parameter);
            $("." + selfId).PopupWindow(defaultSetting);
            $("." + selfId).PopupWindow("open");
            this.dialogChildClose(selfId)
          }
        })
      },
      //点击tabs触发弹框事件
      unMinimizeDialog (item, e) {
        // clearTimeout(timeout2);
        // clearTimeout(tiem3);
        // $('.view').hide();
        if ($("#" + item.menuId + "_dialog").length < 1) {
          this.debounce_Dialog(e, item, item.menuId, null, 1)
          $(`.tab-button[menuid=${item.menuId}]`).parent().addClass('header-tabStyle')
          $(`.tab-button[menuid=${item.menuId}]`).parent().removeClass('header-tabStyle1')
        } else {
          // let current = e.currentTarget
          // $(current).attr("disabled", true)
          //防止连续点击按钮事件
          // tiem3 = setTimeout(() => {
          //   $(current).attr("disabled", false)
          //   clearTimeout(tiem3);
          // }, 400);
          if ($("#" + item.menuId + "_dialog").length > 0) {
            var getNowDialogInfo = $("#" + item.menuId + "_dialog").find(".popupwindow").data();
            if (getNowDialogInfo.minimized) {//放大
              //最顶层 或者只剩一个最小化 或者一个
              $("." + item.menuId).PopupWindow("switchzindex", $("#" + item.menuId + "_dialog"));
              $("." + item.menuId).PopupWindow("unminimize");
              e.currentTarget.parentNode.classList.add('header-tabStyle')
              e.currentTarget.parentNode.classList.remove('header-tabStyle1')
            } else {//缩小
              e.currentTarget.parentNode.classList.remove('header-tabStyle');
              e.currentTarget.parentNode.classList.add('header-tabStyle1');
              if ($(".parentDialog").length - $(".hasMin").length <= 1) {////只剩一个没有最小化
                $("." + item.menuId).PopupWindow("minimize");
              } else {//多个
                var maxZindex = 0;
                $(".parentDialog").each(function (index, element) {
                  if (!$(element).hasClass("hasMin")) {
                    if (maxZindex < parseFloat($(element).css("zIndex"))) {
                      maxZindex = parseFloat($(element).css("zIndex"));
                    }
                  }
                });
                if (parseFloat($("#" + item.menuId + "_dialog").css("zIndex")) >= maxZindex) {//最顶层
                  $("." + item.menuId).PopupWindow("minimize");
                } else {
                  $("." + item.menuId).PopupWindow("outerwitchzindex", null);
                }
              }
            }
          }
        }
        return false;
      },
      switchDialog: debounce('unMinimizeDialog'),
      //tabs鼠标移入预览效果
      tabView (e, item) {
        try {
          $("." + item.menuId).PopupWindow("getconfig");
          var getNowDialogInfo = JSON.parse(localStorage.getItem("nowDialogInfo"));
          this.viewTitle = item.menuName
          let toElement1 = e.toElement.offsetLeft
          let toElement2 = e.toElement.offsetTop
          clearTimeout(timeout2)
          timeout2 = setTimeout(() => {
            $("." + item.menuId).PopupWindow("getcanvasimg");
            $('.view').css('left', toElement1 - 90)
            $('.view').css('top', toElement2 + 50).show();
            clearTimeout(timeout2)
          }, 560);
        } catch (e) {
        }

      },
      //鼠标移出
      tabViewLeave (e, item) {
        //未创建弹框时
        try {
          clearTimeout(timeout2)
        } catch (e) {
        }
        try {
          $("." + item.menuId).PopupWindow("getconfig");
          var getNowDialogInfo = JSON.parse(localStorage.getItem("nowDialogInfo"));
          $('.view').hide()
          this.viewTitle = null;
        } catch (e) {
        }

      },
      //子组件暴露父组件监听实现子弹框功能
      handClicks (parameter1, parameter2, dialogConfig) {
        this.openChildDialog(parameter1, parameter2, dialogConfig)
      },
      //refreshUser刷新用户信息
      refreshUser () {
        this.$refs.controlPanel.getUserList()
      },
      //创建阵列弹框
      addArrayPopup (parent, selfId, text) {
        this.openChildDialog(parent, selfId, {
          title: text
        })
        this.deleteOrAdds = text
      },
      progressChange () {
        this.$refs.uploadRef.currentPersent = true
      },
      //新建文件夹弹框 flag判断是当前文件夹下新建文件夹还是当前目录
      async newFolderOrNewName (parent, selfId, uploadedFolder, newNameOrNewFolder, node, flag) {
        let params = ''
        if (newNameOrNewFolder == 'NewFolder') {//新建文件夹
          this.newFolderParams = {flag, uploadedFolder, node, newNameOrNewFolder}
          params = this.$t('file.createFolder')
        } else {
          this.newFolderParams = {uploadedFolder, newNameOrNewFolder}
          params = this.$t('file.rename')
        }
        await this.openChildDialog(parent, selfId, {title: params})
        // this.$refs.newFolderRef.selectText()
      },
      //打开music弹框
      OpenMusicDialog (menuId, item) {
        this.debounce_Dialog(null, item, menuId)
      },
      //打开照片预览器
      async OpenPreviewDialog (menuId, item, getFileListObj) {//paramss
        this.sourceImages = [];
        getFileListObj.list.forEach((obj, index) => {
          let img = `${this.httpUrl}${obj.logicDir}/${obj.fileName}`
          let ICo = {
            thumbnail: img,
            source: img,
            fileId: obj.fileId,
            fileObj: obj
          }
          this.sourceImages.push(ICo)
        });
        await this.$EventBus.$emit('PreviewParams', getFileListObj.index)
        this.show(getFileListObj.index, this.sourceImages)
        await this.debounce_Dialog(null, item, menuId);
        //$("."+item.menuId).PopupWindow("outerwitchzindex",parseInt($("div#2_dialog").css("zIndex"))+3);
        $("." + item.menuId).PopupWindow("outerwitchzindex", null);
      },
      show (index, images) {
        //this.$refs.viewerRES.show(images[index], index);
        this.$refs.viewerRES.show(images, index);
      },
      refreshVideoplay (getUrl) {//用于控制播放文件管理的视频
        if (getUrl == "" || getUrl == undefined || getUrl == null) {
          this.playVideoUrl = '';//存放文件管理播放视频的地址
        } else {
          this.$nextTick(() => {
            this.playVideoUrl = '';//存放文件管理播放视频的地址
            var _this = this;
            if ($("#playVideoContainer_dialog").length > 0) {
            } else {
              var dialogOPtion = {};
              if (initDialogConfig['playVideoContainer'] != undefined) {
                $.extend(dialogOPtion, initDialogConfig['playVideoContainer']);
              }
              $(".playVideoContainer").PopupWindow(dialogOPtion);
              $("div#playVideoContainer_dialog").css("visibility", "hidden");
            }
            _this.playVideoUrl = getUrl + '?t=' + Date.parse(new Date());//存放文件管理播放视频的地址
            $(".playVideoContainer").PopupWindow("open");
            $("div#playVideoContainer_dialog .popupwindow_titlebar_button_close").click(function () {
              _this.playVideoUrl = 'clear';//存放文件管理播放视频的地址
            });
            var playVideoTimer = setTimeout(function () {
              $('.playVideoContainer').PopupWindow("outerwitchzindex", null);
              $("div#playVideoContainer_dialog").css("visibility", "visible");
              clearTimeout(playVideoTimer);
            }, 200);
          });
        }
      },
      //重名命名操作  flag 0为重命名文件名 1为文件夹名
      RenameEvents (data, flag) {
        this.$refs.fileRef.fileOrFolderRename(data, flag)
      },
      //显示上传弹框按钮
      NewUploadDialog (flag) {
        this.UploadLogo = flag//上传完成
        this.isShowUpload = true
      },
      //创建文件上传弹框
      openDialog1 () {
        let params = {
          title: this.$t('title.monitor'),/*'文件管理监控'*/
        }
        this.debounce_Dialog(null, initDialogConfig['uploadDialog'], '68', params, 1)
        this.isShowUpload = false
        // $('#68_dialog').hide()
      },
      //创建个人设置弹框
      openPersonalSet (item, menuId) {
        let params = {
          title: this.$t('common.personalSet'),
        }
        this.debounce_Dialog(null, item, menuId, params)
      },
      //个人设置信息更改成功返回登陆页面
      user_RedirectLogin () {
        this.RedirectLogin(true)//说明 用户修改了密码 为true直接返回到登陆页面 并且提示密码修改成功
      },
      //显示或隐藏任务监控
      showOrHide () {
        this.isShowUpload = true
        if (this.controlUpload == 1) {
          $('#68_dialog').css('z-index', '99')
          $('#68_dialog').show()
          this.controlUpload = 2
        } else {
          $('#68_dialog').hide()
          this.controlUpload = 1
        }
      },
      //隐藏任务监控图标
      TaskClose (value) {
        this.controlUpload = 1
        if (value == 0) {//为0隐藏
          this.isShowUpload = false
        } else {
          this.isShowUpload = true
        }
      },
      //注销返回主页面
      RedirectLogin (flag) {
        let loading = null
        let time = null
        if (!flag) {
          loading = this.$loading({
            lock: true,
            text: this.$t('common.loggingOut'),//注销中
            spinner: 'el-icon-loading',
            background: 'rgba(0,0,0,0.7)',
            fullscreen: true
          });
        }
        clearTimeout(time)
        time = setTimeout(() => {
          !flag && loading.close()//关闭注销动画
          //跳转到登陆页
          this.$router.replace('/webLogin')
          clear = 0
          if (flag) {//用户修改了账号密码，重新登陆跳转到登陆页面
            this.$message({
              message: this.$t('reminder.reLogin'),//用户密码或语言更改成功，请重新登录
              type: 'success',
              duration: 3000,
              offset: 45
            })
          }
        }, 1000)
        window.sessionStorage.clear()
      },
      dealHeaderTabWidthFun () {
        try {
          var singleChildrenEle = $("#getTabsWidth>li").eq(0).width() ? $("#getTabsWidth>li").eq(0).width() : 62;
          var getContainer = $("#getTabsWidth").width();
          if (this.tabList.length * singleChildrenEle >= getContainer) {
            $("#Overflow_Button").get(0).classList.add('Overflow_icon')
          } else {
            $("#Overflow_Button").get(0).classList.remove('Overflow_icon')
            if (this.$refs.showClicks && this.$refs.showClicks.visible) {
              this.$refs.showClicks.visible = false
            }
          }
          var sum = parseInt(getContainer / singleChildrenEle);
          var getList = this.tabList.slice(sum)
          this.copyTabList = getList;
        } catch (e) {

        }
      },
      //桌面响应式
      DesktopResponse () {
        // let Menu = document.getElementById('#Menu-icon')
        this.fullHeight = document.documentElement.clientHeight
        this.fullWidth = document.documentElement.clientWidth
        //获取可视高度及
        if (this.$refs['Menu-icon'] && this.$refs['Menu-icon'].$el) {
          this.$refs['Menu-icon'].$el.style.height = this.fullHeight + 'px'
        }
        this.dealHeaderTabWidthFun();  //监听头部导航长度变化
      },
      dealAlertDismiss (flag, id) {
        //console.log("Dismiss");
        if (flag == 0) {
          this.refreshWebsocketData('alert-dismiss', id);
        } else {
          var idArr = [];
          id.forEach((item, index) => {
            idArr.push(item.id);
          });
          this.refreshWebsocketData('alert-dismiss', idArr);
        }
        this.refreshWebsocketData('alert-list');
      },
      dealAlertRestore (flag, id) {
        //console.log("Restore");
        if (flag == 0) {
          this.refreshWebsocketData('alert-restore', id);
        } else {
          var idArr = [];
          id.forEach((item, index) => {
            idArr.push(item.id);
          });
          this.refreshWebsocketData('alert-restore', idArr);
        }
        this.refreshWebsocketData('alert-list');
      },
      //监听缓被清事件 节流
      Listener: function () {
        if (clear === 0) {
          clear = 1
          this.$store.dispatch('Dialog/clearDialog').then(() => {
            localStorage.setItem("qvnas_language", this.$store.state.language)
            //保存语言
            this.$router.replace('/webLogin')
            this.$message({
              message: this.$t('reminder.loginTimeout'),/*登陆超时,请重新登陆!*/
              type: 'warning',
              duration: 3000,
              offset: 45
            });
          })
        }
      }
    },
    //页面初始化时调用函数
    mounted () {
      this.getByToken();
      this.getMenu()
      //屏蔽右键菜单
      document.oncontextmenu = function (ev) {
        return false;
      }
      let menuPannel = document.querySelector('#menuPannel')
      menuPannel.addEventListener('click', (e) => {
        this.showSearch = false
        // this.desktopTabsRightMenu = false
        // e.stopPropagation()
        // return false
      })
      this.openDialog1()
      //监听窗口高度的变化
      window.addEventListener('resize', debounce(this.DesktopResponse, 400, false, true));
    },
    created () {
      this.showHome = true
      let _this = this
      _this.$nextTick(() => {
        _this.storeData = _this.$store.state.storeData
        clear = 0
        if (window.navigator.userAgent.indexOf('Trident') > 0) {
        } else {
          window.addEventListener('storage', this.Listener)
        }
      })
    },
    computed: {
      ...mapState('Dialog', {
        showCollection: state => state.dialogShow.station_Panel
      }),
      ...mapState({
        previewStyle: state => state.PreviewStyle,
        currentUserStyle: state => state.currentUserInfo
      }),
      listen_glSearch () {
        return this.$store.state.search_obj
      },
      textMenu () {
        return function (items) {
          return this.$store.state.currentUserInfo.userLanguage == 'zh-CN' ? items.menuName : items.remark
        }
      },
      //动态样式
      dynamicStyle () {
        let {backgroundColor, wallpaperPath, customWallpaper, customColor, fillSelection} = this.previewStyle
        let backSize = ["cover", "auto", "contain", "100% 100%", "initial"]
        let backdropSize = backSize[fillSelection]
        if (!customWallpaper && !customColor) {//都没选中 使用当前用户默认的
          return {
            'backgroundColor': backgroundColor,
            'backgroundImage': `url(${this.currentUserStyle.wallpaperPath})`,
            'backgroundSize': backdropSize,
            'backgroundRepeat': fillSelection == 4 ? 'repeat' : 'no-repeat'
          }
        }
        if (!customWallpaper) {//自定义墙纸没勾选 默认以则以背景颜色为壁纸
          return {
            'backgroundColor': backgroundColor,
            'backgroundImage': '',
            'backgroundSize': backdropSize,
            'backgroundRepeat': fillSelection == 4 ? 'repeat' : 'no-repeat'
          }
        } else if (customWallpaper) {//选中了墙纸
          return {
            'backgroundColor': backgroundColor,
            'backgroundImage': `url(${wallpaperPath})`,
            'backgroundSize': backdropSize,
            'backgroundRepeat': fillSelection == 4 ? 'repeat' : 'no-repeat'
          }
        }
      },
    },
    watch: {
      "$store.state.v_scoket.alert_list" () {
        if (this.$store.state.v_scoket.alert_list != null) {
          if (this.$store.state.v_scoket.alert_list.result.length > 0) {
            this.newsList = this.$store.state.v_scoket.alert_list.result;
            let arr1 = [], arr2 = [];
            this.newsList.forEach((item, index) => {
              if (item.dismissed == true) {
                arr2.push(item);
              } else {
                arr1.push(item);
              }
            });
            this.newsDismissedList = arr1;
            this.newsRestoreList = arr2;
            this.showNewsError = false
          } else {
            this.showNewsError = true;
            this.newsList = [];
            this.newsDismissedList = [];
            this.newsRestoreList = [];
          }

        }
      },
      showCollection (val) {
        if (val) {
          //打开采集站
          this.$nextTick(() => {
            this.playStation();
          })
        }
      },
      newsList: function (value) {//监听new数据 是否显示news标志
        value.length == 0 ? this.showBadge = true : this.showBadge = false
      },
      'tabList':
        function (value) {
          //当tabLIst数据发生变化 等数据渲染完毕再获取dom
          this.$nextTick(function () {
            this.tabList = value;
            this.dealHeaderTabWidthFun();//开始处理列表
          });
        },
      showSearch: function (value) {
        this.$refs['btn_glSearch'].$el.style.color = value ? '#058BEB' : 'rgba(0, 0, 0, 0.7)'
      },
      messageBox: function (value) {
        this.$refs['btn_glMessage'].$el.style.color = value ? '#058BEB' : 'rgba(0, 0, 0, 0.7)'
      },
      listen_glSearch () {//根据搜索打开对应的搜索内容弹框
        // this.showSearch = false
        let result = this.images.filter(item => item.menuId == '2')
        this.debounce_Dialog(null, result[0], 2)
      },
    },
    filters: {},
    beforeDestroy () {
      this.$store.dispatch('Dialog/clearDialog').then((res) => {//销毁弹框
        console.log(res)
        console.log('销毁')
        this.showHome = false
        clear = 0
        if (window.navigator.userAgent.indexOf('Trident') > 0) {
        } else {
          window.removeEventListener('storage', this.Listener)
        }
        assign_compatible()
        Object.assign(this.$data, this.$options.data.call(this))
      })
    }
  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  @menuTextColor: #fff;
  @BackImg: url('/static/images/desktop_bg/entry.jpg'); // 不自定背景图片时 unset
  @BackColor: transparent;
  @backImgSize: cover;
  @backImgRepeat: no-repeat;
  //配合js 修改 主题样式
  #Homepage.defaultConfig {
    /*background-color:@BackColor;
    background-image: @BackImg;
    background-repeat: @backImgRepeat;
    background-size: @backImgSize;*/
    background-position: center center;
  }

  /*弹框最大最小话*/
  .header-tabStyle {
    background: url("/static/images/global/sprite-s4fb19ac255.png") -124px -213px;
  }

  .header-tabStyle1 {
    background: url("/static/images/global/sprite-s4fb19ac255.png") 0 -213px;
  }

  /*穿透的样式*/
  @{deep} .iconfont {
    font-size: 22px;
    /*display: inline-block;*/
  }

  .el-container {
    width: 100% !important;
    height: 100%;

    .el-header, .el-main {
      padding: 0;
    }

    .el-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      z-index: 5;
      justify-content: space-between;
      height: 39px !important;
      background: transparent url("/static/images/desktop_bg/taskbar_bg.png") repeat-x scroll 0 0;
      /*z-index: 999;*/

      .tab-button {
        background-size: 32px 32px;
        background-position: center;
        background-repeat: no-repeat;
        border: none;
        width: 100%;
        display: block;
        height: 100%;
        cursor: pointer;
        background-color: transparent;
        /*padding: 0 !important;*/
      }

      .tab-button:focus {
        outline: none;
      }

      .Upload {
        width: 25px;
      }

      .header-tab ul {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        height: 39px;
        flex-wrap: wrap;
        overflow: hidden;
      }

      .header-tab ul li {
        width: 62px;
        height: 39px;
        //background:url("/static/images/sprite-s4fb19ac255.png") 0 -213px;
        img {
          margin-top: 4px;
          width: 40px;
          height: 30px;
        }
      }

      .header-tab ul li:hover {
        background: url("/static/images/global/sprite-s4fb19ac255.png") -62px -213px;
      }

      .header-box-left {
        width: 110px;
        display: flex;
        justify-content: flex-start;
        padding-right: 10px;

        .showAll {
          width: 22px;
          height: 39px;

          button {
            /*display: block;*/
            width: 100%;
            height: 100%;
            cursor: pointer;
            outline: none;
            border: 0;
            background: url("/static/images/desktop/hearder-sprite.png") 0 -96px;
            /*background-size: 100%;*/
          }

          button:hover {
            background: url("/static/images/desktop/hearder-sprite.png") 0 -135px;
          }
        }

        .mainMenu {
          width: 89px;
          height: 39px;

          button {
            /*display: block;*/
            width: 100%;
            height: 100%;
            cursor: pointer;
            outline: none;
            border: 0;
            box-shadow: 4px 0 7px rgba(0, 0, 0, .4);
            background: url("/static/images/desktop/hearder-sprite.png") 0 -252px;
            /*background-size: 100%;*/
          }

          button:hover {
            background: url("/static/images/desktop/hearder-sprite.png") 0 -291px;
          }
        }

        .mainMenuShowButton {
          width: 89px;
          height: 39px;

          button {
            /*display: block;*/
            width: 100%;
            height: 100%;
            cursor: pointer;
            outline: none;
            border: 0;
            /*box-shadow: 4px 0 7px rgba(0, 0, 0, .4);*/
            background: url("/static/images/desktop/hearder-sprite.png") 0 -331px;
          }
        }
      }

      .header-tab {
        flex: 1;
        display: flex;
        margin-right: 5px;
        justify-content: space-between;

        .tabsWidth {
          overflow: hidden;
        }


        .viewTriangle {
          position: absolute;
          top: -5px;
          left: 114px;
          width: 0px;
          height: 0px;
          border-width: 0px 5px 5px 5px;
          border-color: rgba(255, 255, 255, .8) transparent;
          border-style: solid;
        }
      }

      .header-box-right {
        width: 200px;
        height: 100%;
        display: flex;
        /*justify-content: space-between;*/
        align-items: center;
        overflow: hidden;

        .header-box-button {
          width: 43px;
          height: 32px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;

          .badge {

          }

          .el-button {
            color: rgba(0, 0, 0, 0.7);
            background-color: transparent !important;
            border: 0 !important;
            padding: 0;
            /*margin-left: 0 !important;*/
            /*padding: 10px 12px !important;*/
          }
        }

        .header-box-ico {
          width: 20px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          .ico {
            height: 30px;
            width: 3px;
            background: url("/static/images/desktop/hearder-sprite.png") 0 -603px;
          }
        }
      }
    }

    .header-shadow {
      z-index: 4;
      position: absolute;
      top: 0px;
      left: 0;
      right: 0;
      height: 44px;
      background: repeat-x scroll 0 39px transparent;
      background-image: url("/static/images/desktop_bg/taskbar_shadow.png");
    }

    .el-main {
      position: absolute;
      top: 39px;
      left: 0;
      right: 0;
      bottom: 0;

      .main_box {
        position: relative;
        /*右击tabs菜单样式*/

        .tabRight-menu {
          border: 1px solid #eee;
          box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, .1);
          border-radius: 1px;
          /*display: block;*/
          font-family: Microsoft Yahei, Avenir, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-align: center;
          color: #2c3e50;
          position: fixed;
          top: 43px;
          left: 0;
          background: rgba(255, 255, 255, 255);
          border: 1px solid rgba(0, 0, 0, .2);
          border-radius: 3px;
          z-index: 99999;
        }

        .desktopIconSize {
          font-size: 14px !important;
        }

        .tabRight-menu ul li {
          padding: 5px 10px;
          font-size: 14px !important;
          text-align: left;
          cursor: pointer;
        }

        .tabRight-menu ul li:hover {
          background-color: #0086E5;
          color: #fff;
        }

        .disableMenu {
          color: #96A0AA !important;
        }

        .disableMenu:hover {
          background-color: #fff !important;
          cursor: default !important;
        }

        .Menu-icon {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-content: flex-start;
          /*padding: 5px;*/
          //装数组盒子的图标
          .Array_box {
            width: 64px;
            height: 64px;
            margin: 2px auto 4px;
            background-color: rgba(0, 0, 0, .2);
            border-radius: 7px;
            overflow: hidden;

            //盒子里的小图标
            div {
              float: left;
              margin: 5px 2px 0 4px;
              /*position: relative;*/

              img {
                /*display: block;*/
                width: 24px;
                height: 24px;
              }
            }
          }

          .homeScreenIcon {
            width: 136px;
            height: 100px;
            padding-top: 16px;
            margin-bottom: 10px;
            /*margin-left: 20px;*/
            cursor: pointer;
            transition: all linear .6s;

            .image {
              outline: none;
              display: block;
              border: 0;
              /*position: relative;*/
              background-position: center center;
              background-repeat: no-repeat;
              margin: 0 auto 4px;
              width: 55px;
              height: 55px;
              background-size: 55px 55px;
              background-color: transparent;
              cursor: pointer;
            }

            .text {
              //color: #fff;
              font-size: 14px;
              text-align: center;
              color: @menuTextColor;
            }
          }
        }

        //主菜单样式
        .Menu-float {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .items {
          width: 100px;
          height: 100px;
          color: #eee;
          cursor: pointer;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          div img {
            width: 72px;
            height: 72px;
          }

        }

        img {
          width: 24px;
          height: 24px;
        }

        .show_box {
          width: 64px;
          height: 64px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .4);
          background-color: rgba(0, 0, 0, .4);
        }
      }
    }

    /*消息弹框样式*/

    .news_box {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;

      .messageBoxHeader {
        font-size: 13px;
        color: #505A64;
        font-weight: bold;
        text-align: center;
        margin-left: 10px;
        height: 44px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        box-sizing: border-box;

        .shadow_bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: url("/static/images/desktop_bg/taskbar_shadow.png") repeat-x;
        }

        span {
          position: relative;
          top: 0;
          left: 24px;
          height: 43px;
          line-height: 43px;
        }

        div {
          float: right;

          .el-button {
            font-size: 18px;
            grid-column-start: 3;
            grid-column-end: 3;
            border: 0 !important;
            background-color: transparent !important;
          }
        }

      }

      .messageBoxArticle {
        flex: 1;
        overflow-y: auto;
        position: relative;
        padding: 10px;

        p.no_data_tip {
          text-align: center;
          line-height: 24px;

          img {
            vertical-align: bottom;
          }
        }

        .News_cError {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 14px;
          color: red;

          img {
            vertical-align: bottom;
          }
        }

        /*.Dismiss {*/
        /*  position: absolute;*/
        /*  top: 8px;*/
        /*  right: 15px;*/
        /*  width: 24px;*/
        /*  height: 24px;*/
        /*  background: url("/static/images/global/widget_rt_button.png") 0 0;*/
        /*}*/

        /*
                .Dismiss:hover {
                  background: url("/static/images/global/widget_rt_button.png") 0 -24px;
                }
        */

        .title_box {
          display: flex;
          flex-direction: column;
          padding-left: 10px;
          height: 100%;
          width: 100%;

          .title_time {
            display: flex;
            align-items: center;
            flex: 1;

          }

          .title_icon {
            display: flex;
            align-items: center;
            flex: 1;
            font-size: 12px;

            .News_level {
              display: inline-block;
              vertical-align: middle;
              width: 24px;
              height: 24px;
            }

            .danger {
              background: url('/static/images/desktopInfo/Critical.png') no-repeat center;
              background-size: 16px;
            }

            .warning {
              background: url('/static/images/desktopInfo/waring.png') no-repeat center;
              background-size: 16px;
            }

            .Info {
              background: url('/static/images/global/w_icon_system_info.png') no-repeat;
              background-size: 24px;
            }
          }
        }
      }

      .messageBoxArticle@{deep}.el-collapse {
        border: 0px !important;
        width: 316px;
      }

      .messageBoxArticle@{deep}.el-collapse-item__wrap {
        border-bottom: 0px;
      }

      .messageBoxArticle@{deep}.el-collapse-item__header {
        background-color: #E6F5FF;
        border-radius: 7px;
        height: 80px;
        line-height: unset;
        margin-bottom: 5px;
      }

      .messageBoxFooter {
        position: relative;
        box-sizing: border-box;
        padding: 5px 5px 0px 10px;

        .shadow_bar {
          position: absolute;
          top: 0;
          left: 2px;
          right: 2px;
          height: 4px;
          background: url("/static/images/global/shadow_footbar.png") repeat-x;
        }

        justify-content: space-between;
        height: 48px;
        display: flex;
        align-items: center;
      }
    }
  }

  /*选项弹出框样式*/
  .OptionStyle {
    padding: 5px;
    width: 160px !important;
    box-shadow: -2px 5px 8px rgba(0, 0, 0, 0.5) !important;
  }

  .OptionStyle li:nth-child(1) {
    border-bottom: 1px solid #eee;
    font-weight: bold;
    color: #505A64;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    padding-bottom: 5px;
    text-align: center;
    cursor: inherit;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .OptionStyle li:nth-child(1):hover {
    color: #000;
    background-color: transparent !important;
  }

  @media screen and (min-height: 785px) {
    .el-main {
      overflow: hidden;
    }
  }

  //为信息通知 切换样式
  .messageBoxArticle .addDismissedClass {
    color: #cccccc;
  }

  .messageBoxArticle .addBottomBorder {
    border-bottom: 1px solid #1f9af0;
    cursor: pointer !important;
  }

  .messageBoxArticle .addDismissedClass.addBottomBorder {
    border-bottom: 1px solid #ccc;
  }

  .messageBoxArticle .optionBtnGroup {
    padding: 5px 0;
    color: #1f9af0;
  }

</style>
