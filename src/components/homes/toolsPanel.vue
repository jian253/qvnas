<template>
  <div id="toolsDialog_box">
    <div class="dialog" id="dialog" @click="switchDialogZIndex()">
      <div class="dlg_box">
        <div id="dlg_top" class="dlg_top">
          <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-start">
            <span class="el-dropdown-link">
              <span class="dlg_logo"></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="menu_item" v-for="(item,index) in itemParams " :key="index"
                   @click="debounce_dropDown(item,index)">
                <div :class="item.isSelected===true?'menu_Icon':'menu_IconDisable'"></div>
                <span>{{item.siteRightUsername}}</span>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <!--      <label class="dlg_title">弹出窗口</label>-->
          <div class="dlg_btn_ico" @click.stop="showOrHide(true)"></div>
        </div>
        <div class="dlg_content">
          <div class="dlg_prompt" v-if="tools"><!--提示未添加小工具-->
            <div class="dlg_prompt_box">
              <div class="dlg_promptImg"></div>
              <p class="dlg_prompt_title">{{$t('reminder.addGadget')}}</p>
            </div>
          </div>
          <div v-for="(key,index) in itemParams" :key="index" style="margin: 0px 10px 9px 10px;">
            <gl-carousel @closeCarousel="closeCarousel(index,key)" type="item"
                         v-if="key.id==3&&key.isSelected===true"
                         icon="/static/images/smallTools/w_icon_recent_logs.png"
                         :title-name="$t('log.latestLog')"
                         :itemLength="logList.length||0"
                         :is-open="true">
              <template>
                <div class="center_box_item" v-for="(item, index) in logList" :key="index"
                     :ref="`item${index}`">
                  <i class="minIcon"></i> <span class="content_title" :title="item.logEnevt">{{item.logEnevt}}</span>
                </div>
                <gl-load-animation :is-load-show="logLoad" :is-show-mask="false"></gl-load-animation>
              </template>
            </gl-carousel>

            <gl-carousel @closeCarousel="closeCarousel(index,key)" type="customize"
                         v-if="key.id==2&&key.isSelected===true"
                         icon="/static/images/smallTools/w_icon_storage_manager.png"
                         :title-name="$t('storage.storage')">
              <template>
                <div style="height: 100%"><!--v-show="!storageLoad"-->
                  <div class="waterPolo_box">
                    <div class="Hold_box" id="storageCharts"></div>
                    <div class="title_box">
                      <ul>
                        <li><span>{{$t('storage.memorySize')}}:</span><i class="title">
                          {{memory.total|filterStorage}}</i></li>
                        <li><span class="title">Free: {{memory.free|filterStorage}}</span></li>
                        <li><span class="title">Zfs: {{memory.zfs|filterStorage}}</span></li>
                        <li><span class="title">Services: {{memory.Services|filterStorage}}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <gl-load-animation :is-load-show="storageLoad" :is-show-mask="false"></gl-load-animation>
              </template>
            </gl-carousel>

            <gl-carousel @closeCarousel="closeCarousel(index,key)" :is-open="true" type="customize"
                         v-if="key.id==4&&key.isSelected===true"
                         icon="/static/images/smallTools/w_icon_resource_monitor.png"
                         :title-name="$t('title.resourceMonitor')">
              <template>
                <!--v-show="networkDataList.network.x.length>0&&cpu_percent!=0"-->
                <div class="resources_box">
                  <ul class="resources_container">
                    <li>
                      <div class="title_box">CPU</div>
                      <div class="progress_box">
                        <div class="progress" id="progress_cpu" ref="progress_cpu"></div>
                      </div>
                      <span style="font-size: 12px;color: #505A64;">{{cpu_percent}}%</span>
                    </li>
                    <li>
                      <div class="title_box">RAM</div>
                      <div class="progress_box">
                        <div class="progress" id="progress_RAM" ref="progress_RAM"></div>
                      </div>
                      <span style="font-size: 12px;color: #505A64;">{{virtual_memory.percent}}%</span>
                    </li>
                    <li>
                      <div class="title_box">{{$t('common.lan')}}</div>
                      <div class="downloadOr_upload">
                        <div class="Upload"></div>
                        <span class="Upload_title">{{sendSpeeds}}</span>
                        <div class="download"></div>
                        <span class="download_title">{{receivingSpeeds}}</span>
                      </div>
                    </li>
                  </ul>
                  <!--                  <div class="internet" id="internets"></div>-->
                  <div class="network_box">
                    <ul class="network_Scale">
                      <li>100</li>
                      <li>80</li>
                      <li>60</li>
                      <li>40</li>
                      <li>20</li>
                      <li>0</li>
                    </ul>
                    <r_echarts v-if="showNetwork" :color="['#0086e6','green']"
                               :dataList="networkDataList" :isFooterDom="false" types="network" :isYScale="false"
                               @networkData="networkVal" is-event @requestData="GetResource"></r_echarts>
                  </div>
                </div>
                <gl-load-animation :is-load-show="resourceLoad"
                                   :is-show-mask="false"></gl-load-animation>
              </template>
            </gl-carousel>

            <gl-carousel @closeCarousel="closeCarousel(index,key)" type="customize"
                         v-if="key.id==1&&key.isSelected===true"
                         icon="/static/images/global/w_icon_system_info.png"
                         :title-name="$t('systemInfo.systemHealth')">
              <template>
                <ul class="system">
                  <li>
                    <div class="title">{{$t('systemInfo.serverName')}}</div>
                    <div>{{system_info.hostname}}</div>
                  </li>
                  <li>
                    <div class="title">{{$t('common.lan')}}</div>
                    <div>{{$store.state.socketAddress}}</div>
                  </li>
                  <li>
                    <div class="title">{{$t('systemInfo.hours')}}</div>
                    <div>{{system_info.uptime|Minute}}</div>
                  </li>
                </ul>
                <gl-load-animation :is-load-show="systemLoad" :is-show-mask="false"></gl-load-animation>
              </template>
            </gl-carousel>
          </div>

        </div>
        <!--        <div id="dlg_right"></div>-->
        <div id="dlg_right_bottom"></div>
        <div id="dlg_bottom"></div>
      </div>
    </div>
    <div class="dialog1" id="dialog1">
      <div class="dlg_box">
        <div class="dlg_top">
            <span class="el-dropdown-link">
              <span class="dlg_logo"></span>
            </span>
          <!--      <label class="dlg_title">弹出窗口</label>-->
          <div class="dlg_btn_ico"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import {Init, saveDialog, returnDialogCss} from "@/common/js/diaglog"
  import {editToolsList, getCurrentToolsList} from "@api/tools/toolsContact"
  import {logList} from "@api/log/logContact"
  import {debounce} from "@common/common/debounceAndThrottle";
  import {deepClone} from '@common/js/publicMethod/publicMethod'
  import R_echarts from "@components/ResourcesPanel/ResourcesECharts/R_echarts";
  import {filterNetwork} from "@common/js/resources/filterData";
  import {getTimePeriod} from "@common/js/resources";

  let timer2 = null;
  export default {
    name: 'ToolsPanel',
    props: [],
    components: {R_echarts},
    data: function () {
      return {
        showNetwork: false,
        getPostChartDataList: {},
        tools: false,//表示当前没有添加小工具
        logLoad: true,//获取日志动画
        storageLoad: true,//获取存储动画
        systemLoad: true,//系统信息
        resourceLoad: true,//资源监控
        showTools: false,
        width: null,
        heights: '240px',
        top: '41',
        left: "500",
        logParams: {
          pageNum: 1,
          pageSize: 14
        },
        logList: [],
        virtual_memory: {
          percent: [0]
        },
        cpu_percent: 0,
        system_info: {},
        itemParams: [],
        copyList: [],
        getPostChartData: {},//用来存储需要刷新的统计图数据
        copyItemBind: [],
        parasItem: [],
        networkDataList: {//处理network数据的格式
          network: {legend: {}, series: [], x: [], y: [], y2: []}
        },
        memory: {},
        sendSpeed: 0,
        receivingSpeed: 0,
        toolClick: true,
      }
    },
    computed: {
      ...mapState("v_scoket", {
        tool_network: state => state["tool_network"],
        system_params: state => state['system_info'],
        realtime: state => state['reporting_realtime']
      }),
      ...mapState({}),
      sendSpeeds: {
        get: function () {
          if (this.sendSpeed * 1024 > 1000) {
            return this.sendSpeed + ' ' + 'KB/s'
          } else {
            return this.sendSpeed * 1024 + ' ' + 'bytes'
          }
        },
        set: function () {

        }

      },
      receivingSpeeds: {
        get: function () {
          if (this.receivingSpeed * 1024 > 1000) {
            return this.receivingSpeed + ' ' + 'KB/s'
          } else {
            return this.receivingSpeed * 1024 + ' ' + 'bytes'
          }
        },
        set: function () {

        }
      }
    },
    watch: {
      itemParams: {
        handler () {
          this.ShowWidget()
        },
        deep: true
      },
      tool_network (val) {
        if (!val || this.itemParams.length && !this.itemParams[3].isSelected) return
        this.resourceLoad = false
        // if (val.error) return this.$notify.error({
        //   message: this.$t('reminder.networkError'),//'网络数据加载失败!'
        //   title: this.$t('log.error'),
        //   duration: 1400,
        //   offset: 52
        // })
        // console.log('新数据')
        this.getPostChartDataList['reporting-get_data-network'] = val
        filterNetwork(this)
        //为显示状态且不为动画状态
        this.showNetwork = true
      },
      realtime (val) {
        if (!val || val.error || !this.itemParams.length) return
        let {cpu, virtual_memory} = val.fields
        if (!cpu.average) return
        if (this.itemParams[3].isSelected) {
          this.cpu_percent = Math.floor(cpu.average.usage).toFixed(0)
          this.virtual_memory.percent = virtual_memory.percent
          $(this.$refs.progress_cpu).css("width", cpu.average.usage + '%');
          $(this.$refs.progress_RAM).css("width", virtual_memory.percent + '%');
        }
        if (this.itemParams[2].isSelected) {
          this.memory = this.$store.getters['v_scoket/filter_realtime_memory']
          this.$nextTick(() => {
            this.storageLoad = false
            this.s_chartsOption()
          })
        }
      },
      system_params (val) {
        if (!val) return
        this.systemLoad = false
        this.system_info = val.result
      }
    },
    methods: {
      //显示小组件功能
      ShowWidget: function (val) {
        this.eachToolsLength()//显示提示
      },
      //切换弹框层级
      switchDialogZIndex () {
        $("#dialog").PopupWindow("gettopzindex");
        if (parseInt($("#dialog").css("zIndex")) > parseInt(localStorage.getItem("getTopZIdex"))) {
          var dealZIndex = parseInt(localStorage.getItem("getTopZIdex")) + 1;
          $("#dialog").css("zIndex", dealZIndex);
          $("#dialog").PopupWindow("gettopzindex", dealZIndex);
        } else if (parseInt($("#dialog").css("zIndex")) < parseInt(localStorage.getItem("getTopZIdex"))) {
          var dealZIndex = parseInt(localStorage.getItem("getTopZIdex")) + 1;
          $("#dialog").css("zIndex", dealZIndex);
          $("#dialog").PopupWindow("gettopzindex", dealZIndex);
        }
      },
      //关闭小工具
      closeCarousel (index, item) {
        this.itemParams[index].isSelected = false
      },
      s_chartsOption () {
        let storageCharts = document.getElementById('storageCharts')
        if (!storageCharts) return
        let _this = this
        let myChart = this.$echarts.init(storageCharts)
        var getfpkszb = [_this.virtual_memory.percent]; //非贫困生占比
        var getfpkszb1 = [0.01];
        var getfpksrs = [_this.virtual_memory.percent]; //非贫困生人数
//贫困生分布-非贫困生图表
        let option = {
          backgroundColor: 'transparent',
          title: {
            text: getfpkszb + '%',
            textStyle: {
              color: '#559BF4',
              fontSize: 13
            },

            subtextStyle: {
              color: '#B1B1B1',
              fontSize: 14
            },
            itemGap: 0,
            left: 'center',
            top: '35%'
          },
          tooltip: {
            position: ['50%', '50%'],
            formatter: function (params) {
              return '<span style="color: #fff;">内存比率：' + getfpksrs + '%</span>';
            }
          },
          angleAxis: {
            max: 100,
            clockwise: true, // 逆时针
            // 隐藏刻度线
            show: false
          },
          radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,

            },
            axisTick: {
              show: false
            },
          },
          polar: {
            // center: ['50%', '50%'],
            radius: '160%' //图形大小
          },
          series: [{
            stack: '测试',
            type: 'bar',
            data: getfpkszb,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(245, 250, 255, 0.85)',
              borderColor: '#EFF2F5',
              borderWidth: 3
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 7,
            silent: true,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5CBEFF'
                }, {
                  offset: 1,
                  color: '#518FEF'
                }]),
                borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5CBEFF'
                }, {
                  offset: 1,
                  color: '#518FEF'
                }]),
                borderWidth: 3
              }
            },
          }, {
            stack: '测试',
            type: 'bar',
            data: getfpkszb1,
            showBackground: true,
            backgroundStyle: {
              color: '#EFF2F5',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
              shadowOffsetY: 2,

            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 7,
            itemStyle: {
              color: '#90BDFF',
              borderColor: 'rgba(81,143,239, 1)',
              borderWidth: 3
            },
          }]
        };
        myChart.setOption(option)

      },
      async showOrHide (onClick) {  //点击之前获取弹框位置信息
        onClick ==true ? this.toolClick = onClick : this.toolClick = false
        this.showTools = !this.showTools
        this.switchDialogZIndex();
        let dom = document.querySelector('#smallTools')
        let dialog1 = document.querySelector('#dialog1')
        let _this = this
        if (this.showTools) {
          await returnDialogCss(false);
          dom.style.color = '#058BEB'
        } else {
          dom.style.color = 'rgba(0, 0, 0, 0.7)'
        }
        if (_this.showTools) {
          //显示 在这里刷新部分需要刷新的数据
          $("#dialog").addClass("moveDilaog");
          $("#dialog1").addClass("showMoveDialog");
          $('#dialog1').stop().animate({
            top: `${saveDialog.top}`,
            left: `${saveDialog.left}`,
            opacity: '0.5',
            width: '340px',
            height: `${saveDialog.height}`
          }, 360, function () {
            $('#dialog').css({top: `${saveDialog.top}`, left: `${saveDialog.left}`, "visibility": "visible"});
            $("#dialog1").removeClass("showMoveDialog");
            $("#dialog").removeClass("moveDilaog");
            _this.copyItemBind = deepClone(_this.itemParams)
            // console.log(_this.copyItemBind)
          });
        } else {
          dialog1.style.top = saveDialog.top
          dialog1.style.left = saveDialog.left
          dialog1.style.height = saveDialog.height
          $("#dialog").addClass("moveDilaog");
          $('#dialog').css({"visibility": "hidden"});
          $("#dialog1").addClass("showMoveDialog");
          $('#dialog1').stop().animate({
            top: `${dom.offsetTop + 40 + 'px'}`,
            left: `${dom.offsetLeft + 'px'}`,
            opacity: '0',
            width: '0px',
            height: '0px'
          }, 360, () => {
            $("#dialog1").removeClass("showMoveDialog");
            //console.log('eachUserMenu')
            this.editBindUserMenu()
          })
        }
      },
      async dropDown (item, index) {//下拉列表点击事件
        this.itemParams[index].isSelected = !this.itemParams[index].isSelected
        if (index === 0 && item.isSelected) {//系统状态
          this.GetSystem()
        } else if (index === 1 && item.isSelected) {//存储信息
          this.storageLoad = true
        } else if (index == 2 && item.isSelected) {//最新日志
          await this.GetLogList()
        } else {//资源监控
          this.GetResource()
        }
      },
      debounce_dropDown: debounce('dropDown'),
      //获取当前用户绑定
      async currentSelectList () {
        let {data: res} = await getCurrentToolsList()
        if (res.code !== 200 || !res.data) return
        res.data.forEach(item => {
          item.isSelected = item.isSelected == 1
        })
        this.copyList = JSON.parse(JSON.stringify(res.data))
        this.itemParams = res.data
        this.firstSend()
      },
      //修改当前用户绑定菜单
      async editUserMenu (sites) {
        let {data: res} = await editToolsList({
          sites: sites,
          userId: this.$store.state.currentUserInfo.userId
        })
        if (res.code == 200) {
          //console.log(res)
          // await this.currentSelectList()
        }
      },
      //遍历当前绑定的状态 在收起小工具时判断是否有做修改
      editBindUserMenu () {
        if (JSON.stringify(this.copyItemBind) === JSON.stringify(this.itemParams)) {
          return false
        } else {
          // let newArray = this.getArrDifSameValue(this.copyItemBind, this.itemParams)
          //赛选出newArray中的数据
          let newArray = this.itemParams.filter(item => item.isSelected == true)
          let result = ''
          newArray.forEach((item, index) => {
            result += item.id
            if (index == newArray.length - 1) {
            } else {
              result += ','
            }
          })
          // console.log(result)
          this.editUserMenu(result)
        }
      },
      eachCurrentList (id) {//返回要查询的id对象
        return this.itemParams && this.itemParams.filter(item => item.id == id)
      },
      eachToolsLength () {//返回当前小工具长度不为0的对象
        let currentTools = this.itemParams && this.itemParams.filter(item => item.isSelected == true)
        this.tools = currentTools.length === 0
      },
      networkVal (send, rogerThat) {
        this.sendSpeed = send
        this.receivingSpeed = rogerThat
      },
      //系统
      GetSystem () {
        this.systemLoad = true
        this.$store.commit('v_scoket/socketSend', ['system-info'])
      },
      //最新日志
      async GetLogList () {
        this.logLoad = true
        let {data: res} = await logList({
          pageNum: this.logParams.pageNum,
          pageSize: this.logParams.pageSize
        })
        this.logLoad = false
        if (res.code !== 200) return this.$notify.error({
          message: this.$t('reminder.getLogError'),//'日志获取失败!'
          title: this.$t('log.error'),
          duration: 1400,
          offset: 52
        })
        if (!res.data && !res.data.list) return
        this.logList = res.data.list
      },
      //资源监控
      GetResource () {
        this.resourceLoad = true
        let time = getTimePeriod()////当前时间及上一个时间断
        time.id = 'dd496740-19e0-a8bb-f7a2-ecb2f7e950ff'
        this.$store.commit('v_scoket/socketSend', [{
          name: 'reporting-get_data-network',
          params: time
        }])
      },
      firstSend () {//首次发送
        if (this.itemParams[0].isSelected && this.itemParams[0].id == 1) {
          this.GetSystem()
        }
        if (this.itemParams[1].isSelected && this.itemParams[1].id == 2) {
          this.storageLoad = true
        }
        if (this.itemParams[2].isSelected && this.itemParams[2].id == 3) {
          this.GetLogList()
        }
        if (this.itemParams[3].isSelected && this.itemParams[3].id == 4) {
          this.$nextTick(() => {
            this.GetResource()
          })
        }
      }
    },
    filters: {},
    mounted () {
      Init()
    },
    created () {
    },
    beforeDestroy () {
      clearInterval(timer2);
    }
  }
</script>

<style scoped lang="less">
  .left {
    float: left;
  }

  .menu_item {
    font-size: 12px;
    height: 28px;
    width: 136px;
    color: #505A64;
    line-height: 28px;
    display: flex;
    cursor: pointer;

    .menu_Icon {
      width: 28px;
      height: 28px;
      background-image: url("/static/images/global/dropdown_menu_tick.png");
      background-position: 0 0;
      background-repeat: no-repeat;
    }

    .menu_IconDisable {
      width: 28px;
      height: 28px;
      background-image: none
    }
  }

  .menu_item:hover {
    color: #fff;
    background-color: #0086E5;
  }

  .menu_item:hover .menu_Icon {
    background-image: url("/static/images/global/dropdown_menu_tick.png");
    background-position: 0 -28px;
  }

  #toolsDialog_box {
    /*top: 41px;*/
  }

  /* 弹窗 */
  .dialog {
    -moz-user-select: none; /*firefox*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*ie10+*/
    -khtml-user-select: none; /*早期的浏览器*/
    user-select: none; /*文字不能被选中*/
    visibility: hidden;
    width: 340px;
    height: 500px;
    max-width: 340px;
    min-height: 500px;
    min-width: 340px;
    position: fixed;
    top: -10000px;
    left: -10000px;
    z-index: 50;
    background-color: rgba(245, 250, 255, 0.7);
    border-radius: 3px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
    padding-bottom: 10px;
  }

  .dialog1 {
    position: fixed;
    top: 30px;
    left: 30px;
    /*z-index: 50;*/
    width: 0px;
    height: 0px;
    display: none;
    opacity: .5;
    background-color: #fff;
  }

  .dlg_box {
    z-index: 333;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* 弹窗上部 */
  .dlg_top {
    /*background-color: rgba(245,250,255,0.7);*/
    position: relative;
    height: 28px;
    z-index: 3;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    /*border-bottom: 1px solid #eec;*/
    cursor: move;
  }

  /* 弹窗右上角 ico */
  .dlg_btn_ico {
    float: right;
    background: url("/static/images/global/widget_rt_button.png") 0px -384px no-repeat;
    background-size: cover;
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 15px;
    margin-top: 5px;
  }

  /* 弹窗右上角 ico 鼠标浮上去的样式 */
  .dlg_btn_ico:hover {
    background: url("/static/images/global/widget_rt_button.png") 0px -408px no-repeat;
  }

  .dlg_btn_ico:active {
    background: url("/static/images/global/widget_rt_button.png") 0 -432px no-repeat;

  }

  /* 最小化 */
  /* .dlg_btn_min_top {
      background-image: url(../images/ico_min.png);
  } */
  /*!* 最大化 *!*/
  /*.dlg_btn_max_top {*/
  /*  background-image: url(../images/ico_max.png);*/
  /*}*/
  /*!* 还原 *!*/
  /*.dlg_btn_reback_top {*/
  /*  background-image: url(../images/ico_reback.png);*/
  /*}*/
  /*!* 关闭 *!*/
  /*.dlg_btn_close_top {*/
  /*  background-image: url(../images/ico_close.png);*/
  /*}*/
  /* 左上角logo */
  .dlg_logo {
    background: url("/static/images/smallTools/icon_add_widget.png") 0 0 no-repeat;
    margin-left: 11px;
    margin-top: 4px;
    width: 36px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  .dlg_logo:hover {
    background: url("/static/images/smallTools/icon_add_widget.png") 0px -24px no-repeat;
  }

  .dlg_logo:active {
    background: url("/static/images/smallTools/icon_add_widget.png") 0px -48px no-repeat;
  }

  /* 弹窗标题 */
  .dlg_title {
    line-height: 28px;
    margin-left: 5px;
  }

  /* 弹窗内容 */
  .dlg_content {
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 200px;
    /*height: 200px;*/
    overflow: hidden;
    overflow-y: auto;
    /*margin-right: 4px;*/

    .dlg_prompt {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      width: 80%;
      height: 170px;
      margin: auto;

      .dlg_prompt_box {

        .dlg_promptImg {
          height: 120px;
          margin-bottom: 10px;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("/static/images/smallTools/w_empty.png");
        }

        .dlg_prompt_title {
          font-size: 15px;
          text-align: center;
          overflow: hidden;
          color: #96A0AA;
        }
      }

    }
  }

  //存储
  .waterPolo_box {
    /*margin-top: 6px;*/
    display: flex;

    .Hold_box {
      float: left;
      margin-left: 27px;
      width: 64px;
      height: 64px;
      margin-right: 10px;
    }

    .title_box {
      flex: 1;
    }

    .title_box ul li {
      height: 19px;
      line-height: 19px;
      font-size: 12px;
      color: #505A64;
      font-weight: bold;

      .title {
        font-weight: 400;
      }
    }
  }

  //资源监控
  .resources_box {
    height: 100%;

    .resources_container li {
      height: 24px;

      .title_box {
        width: 84px;
        float: left;
        font-weight: bold;
        padding-left: 12px;
        font-size: 12px;
        color: #505A64;
        line-height: 24px;
      }

      .downloadOr_upload {
        .Upload, .download {
          width: 16px;
          height: 16px;
          margin-top: 2px;
          padding: 0;
          float: left;
        }

        .Upload_title {
          color: #0086E5;
          font-size: 12px;
          line-height: 24px;
          font-weight: 400;
          float: left;
        }

        .download_title {
          font-weight: 400;
          color: #1CA600;
          font-size: 12px;
          line-height: 24px;
          float: left;
        }

        .Upload {
          background: url("/static/images/global/widget_icon_up_down.png") 0 0 no-repeat;
        }

        .download {
          background: url("/static/images/global/widget_icon_up_down.png") 0 -15px no-repeat;
          margin-left: 23px;
        }
      }

      .progress_box {
        background-color: #cdd7e1;
        float: left;
        width: 150px;
        height: 16px;
        margin-top: 4px;
        border-radius: 3px;
        overflow: hidden;
        margin-right: 5px;

        .progress {
          width: 0%;
          height: 16px;
          background-color: #0086E5;
          background-image: linear-gradient(to right, #00aaff, #2e7ae5);
          transition-duration: 0.5s;
          transition-timing-function: ease-in;
          transition-property: width;
          background-size: 100%;
          background-image: url("/static/images/global/progress_bg.svg");
        }
      }

    }

    .network_box {
      height: 77px;
      margin-top: 12px;
      width: 250px;
      display: flex;
      margin-left: 56px;

      .network_Scale {
        width: 30px;
        line-height: 1.1;
        padding-right: 4px;
        font-size: var(--textSize);
        color: var(--color);
        text-align: right;
        margin-top: 5px;
      }
    }
  }

  //系统信息
  .system li {
    color: #505A64;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    display: flex;
    align-items: flex-start;

    div {
      flex: 2;
    }

    .title {
      flex: 1;
      padding-left: 12px;
      font-weight: bold;
      /*width: 70px;*/
    }
  }

  .container_box:last-child {
    margin-bottom: 0;
  }

  /* 弹窗底部 */
  .dlg_bottom {
    position: absolute;
    height: 35px;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 3;
    padding-top: 5px;
    background: #f3f3f3;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top: 1px solid #eec;
    text-align: center;
  }

  /* 缩放时右拉块 */
  #dlg_right {
    width: 15px;
    height: 100%;
    float: right;
    position: absolute;
    right: 0;
    top: 0;
    cursor: e-resize;
    overflow: hidden;
    opacity: 0;
    z-index: 3;
  }

  /* 缩放时下拉块 */
  #dlg_bottom {
    width: 100%;
    height: 15px;
    position: absolute;
    left: 0;
    bottom: 0;
    cursor: n-resize;
    overflow: hidden;
    opacity: 0;
    z-index: 3;
  }

  /* 缩放时右下拉块 */
  #dlg_right_bottom {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: nw-resize;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
    line-height: 15px;
    float: right;
    z-index: 4;
  }

  /*调整弹框自适应*/
  div#dialog {
    box-sizing: border-box;
  }
</style>
