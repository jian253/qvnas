<template>
  <div class="3" style="height: 100%;" v-if="resources_Panel">
    <div class="ResourcesPanel">
      <gl-load-animation :is-load-show="showLoading" :opacitys="1"></gl-load-animation>
      <gl-warning-dialog :is-show="showWraning" @warningDialogClose="closeEvent">
        {{$t('reminder.dataError')}}
      </gl-warning-dialog>
      <div class="Resources-left">
        <div class="ResourcesPanelMenu" v-for="(item,index) in logListMenu" :key="index"
             :class="{classBlue:index==current}"
             @click="ResourcesMenuClick(index,item)">
          <i :class="[`${item.icon}`,`${item.ico}`,'iconPositionStyle']"></i>
          {{item.title}}
        </div>
      </div>
      <!--导航菜单对应的box-->
      <div class="Resources-right" v-show="index==0">
        <el-tabs class="tabs" v-model="abilityActivationName"
                 @tab-click="tabClick" type="card">
          <gl-loading :show="ShowLoad" is-show-mask :opacitys="0.5"></gl-loading>
          <el-tab-pane :label="$t('title.overview')" name="all"><!--总览-->
            <div class="Overview-container">
              <!-- <div style="height: 33px;"></div>-->
              <el-row class="charts-row">
                <r_echarts :data-list="cpuDataList"
                           v-if="cpuDataList.cpu.x.length!==0"
                           types="cpu" @requestData="sendCommand" :color="['#40BAA4']">
                  <span slot="title">cpu</span>
                </r_echarts>
                <r_echarts :data-list="memoryDataList"
                           v-if="memoryDataList.memory.x.length!==0" types="memory" :color="['#fbd266']"
                           @requestData="sendCommand">
                  <span slot="title">{{$t('tabs.ram')}}</span>
                </r_echarts>
                <r_echarts :data-list="networkDataList"
                           v-if="networkDataList.network.x.length!==0"
                           types="network" @requestData="sendCommand"
                           :color="['#0086e6','green']">
                  <span slot="title">{{$t('controlMenu.network')}}</span>
                </r_echarts>
              </el-row>
              <!--标题头部分-->
              <el-row class="charts-row">
                <r_echarts :data-list="partitionDataList"
                           v-if="partitionDataList.partition.x.length!==0" types="partition"
                           @requestData="sendCommand"
                           :color="['#f37399']">
                  <span slot="title">{{$t('storage.disk')}}</span>
                </r_echarts>
                <r_echarts :data-list="iscsiDataList"
                           v-if="iscsiDataList.target.x.length!==0" types="target" @requestData="sendCommand"
                           :color="['#856CB6']">
                  <span slot="title">iscsi</span>
                </r_echarts>
                <r_echarts :data-list="zfsDataList"
                           v-if="zfsDataList.zfs.x.length!==0" types="zfs" @requestData="sendCommand"
                           :color="['#CF96E0']">
                  <span slot="title">zfs</span>
                  <span slot="unit">bytes/s</span>
                </r_echarts>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="CPU" name="cpu">
            <div class="el-tab-page" v-cloak>
              <div class="next_cpu">
                <next-pre-data @getTimestamp="TurnPage" ref="cpu_TurnPage"></next-pre-data>
              </div>
              <div id="page_cpu" ref="page_cpu" class="chartDiv">
              </div>
              <resources-time v-if="page.data.legend.length>0"
                              :dataList="page.data"></resources-time>
              <footer-container v-if="page.data.legend.length>0"
                                :dataList="page.data"
                                :colorList="getPageChartColor"
                                :filterType="filter_type"></footer-container>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('tabs.ram')" name="memory"><!--内存-->
            <div class="el-tab-page" v-cloak>
              <div class="next_memory">
                <next-pre-data @getTimestamp="TurnPage" ref="memory_TurnPage"></next-pre-data>
              </div>
              <div id="page_memory" ref="page_memory" class="chartDiv">
                <gl-loading :show="true"></gl-loading>
              </div>
              <resources-time v-if="page.data.legend.length>0"
                              :dataList="page.data"></resources-time>
              <footer-container v-if="page.data.legend.length>0"
                                :dataList="page.data"
                                :colorList="getPageChartColor"
                                :filterType="filter_type"></footer-container>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('controlMenu.network')" name="network">
            <div class="el-tab-page">
              <div id="page_network" ref="page_network" class="chartDiv"></div>
              <div class="next_cpu">
                <next-pre-data @getTimestamp="TurnPage" ref="network_TurnPage"></next-pre-data>
              </div>
              <resources-time v-if="page.data.legend.length>0"
                              :dataList="page.data"></resources-time>
              <footer-container v-if="page.data.legend.length>0"
                                :dataList="page.data"
                                :colorList="getPageChartColor"
                                :filterType="filter_type"></footer-container>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('storage.disk')" name="partition">
            <div class="el-tab-page">
              <div id="page_partition" ref="page_partition" class="chartDiv"></div>
              <div class="next_cpu">
                <next-pre-data @getTimestamp="TurnPage" ref="partition_TurnPage"></next-pre-data>
              </div>
              <resources-time v-if="page.data.legend.length>0"
                              :dataList="page.data"></resources-time>
              <footer-container v-if="page.data.legend.length>0"
                                :dataList="page.data"
                                :colorList="getPageChartColor"
                                :filterType="filter_type"></footer-container>
            </div>
          </el-tab-pane>
          <el-tab-pane label="iSCSI" name="target">
            <div class="el-tab-page">
              <div id="page_target" ref="page_target" class="chartDiv"></div>
              <div class="next_cpu">
                <next-pre-data @getTimestamp="TurnPage" ref="target_TurnPage"></next-pre-data>
              </div>
              <resources-time v-if="page.data.legend.length>0"
                              :dataList="page.data"></resources-time>
              <footer-container v-if="page.data.legend.length>0"
                                :dataList="page.data"
                                :colorList="getPageChartColor"
                                :filterType="filter_type"></footer-container>
            </div>
          </el-tab-pane>
          <el-tab-pane label="ZFS" name="zfs">
            <div class="el-tab-page">
              <div id="page_zfs" ref="page_zfs" class="chartDiv"></div>
              <div class="next_cpu">
                <next-pre-data @getTimestamp="TurnPage" ref="zfs_TurnPage"></next-pre-data>
              </div>
              <resources-time v-if="page.data.legend.length>0"
                              :dataList="page.data"></resources-time>
              <footer-container v-if="page.data.legend.length>0"
                                :dataList="page.data"
                                :colorList="getPageChartColor"
                                :filterType="filter_type"></footer-container>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="Resources-right" v-show="index==1">
        <el-tabs class="tabs" v-model="taskActivationName" style="height: 100%;">
          <el-tab-pane label="服务" name="first1">
            <el-table
              :data="tableData"
              style="width: 100%"
              highlight-current-row
              border
              height="100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table :data="props.row.detailList" :show-header="false" highlight-current-row>
                    <el-table-column width="48px"></el-table-column>
                    <el-table-column prop="name" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cpu" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cpuTime" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="RAM" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="Read" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="write" show-overflow-tooltip></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                label="服务名称"
                prop="name"
                align="left"
                show-overflow-tooltip
                sortable>
                <template slot-scope="rowData">
                  <img
                    style="display: inline-block;width:21px ;height: 18px;vertical-align: middle;padding-right: 5px;box-sizing: border-box"
                    :src="rowData.row.iconUrl" alt="">
                  {{rowData.row.name}}
                </template>
              </el-table-column>
              <el-table-column
                label="CPU(%)"
                prop="cpu"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="CPU Time"
                prop="cpuTime"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="内存"
                prop="RAM"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="读取（秒）"
                prop="Read"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="写入（秒）"
                prop="write"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="进程" name="third2">内存</el-tab-pane>
        </el-tabs>
      </div>
      <!--目前连接用户模块-->
      <div class="Resources-right" v-show="index==2">
        <div class="currentUser">
          <button>保存</button>
          <button>刷新</button>
          <button disabled>终止连接</button>
          <button disabled>禁止用户</button>
        </div>
        <!--表格-->
        <el-table
          :data="currentTableData"
          style="width: 100%"
          border
          height="100%"
          highlight-current-row>
          <el-table-column
            prop="date"
            label="时间"
            width="180"
            align="center"
            show-overflow-tooltip
            sortable>
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户"
            width="180"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="客户端名称与IP地址"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="type"
            label="连接类型"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="resources"
            label="访问资源"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <!--速度限制模块-->
      <div class="Resources-right" v-show="index==3">
        <div class="speed">
          <button>刷新</button>
          <button disabled>终止连接</button>
        </div>
        <!--表格-->
        <el-table
          :data="speedTableData"
          style="width: 100%"
          border
          height="100%"

          highlight-current-row>
          <el-table-column
            prop="service"
            label="服务"
            width="180"
            align="center"
            show-overflow-tooltip
            sortable>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="speed"
            label="速度（KB/s）"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="limit"
            label="限制"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="resources"
            label="Account Type"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="文件名"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="schedule"
            label="进度(%)"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <div class="Resources-right" v-if="index==4">
        <el-tabs class="tabs" v-model="setActivationName" style="height: 100%;">
          <el-tab-pane label="设置" name="first11">
            <div class="setContainer">
              <div class="setModule">
                <div class="setModule-title">实际持续时间:</div>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="setChecked">
                <div>
                  <el-checkbox v-model="checked">启用使用历史记录</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="enableChecked">启用性能警报</el-checkbox>
                  <img title="建议您启用使用历史记录，以在性能警报事件发生时帮助您检查和分析使用情况" style="vertical-align: middle;"
                       src="/static/images/global/icon_information_mini.png" alt="">
                </div>
              </div>
            </div>
            <div class="tabFooter">
              <div class="tabFooterBorder">
                <div class="btnGroup">
                  <el-button type="primary" size="small">应用</el-button>
                  <el-button size="small">重置</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="性能警报规则" name="second22">
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="Resources-right" v-show="index==5">
        <div class="alarm-container">
          <div class="alarm-btn">
            <el-button class="menuBtnEdit" size="mini">清除</el-button>
            <el-dropdown split-button size="mini" trigger="click" @command="exportEvent" class="menuBtn">
              导出
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">HTML</el-dropdown-item>
                <el-dropdown-item command="b">CSV</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="alarm-table">
            <el-table
              :data="performanceTableData"
              style="width: 100%"
              border
              height="100%"
              highlight-current-row>
              <el-table-column
                prop="service"
                label="时间"
                width="180"
                align="left"
                show-overflow-tooltip
                sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="优先层级"
                width="100"
                align="left"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="speed"
                label="事件"
                align="left"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <div class="alarm-footer">
            <div class="alarm-footer-right">
              <span class="alarm-footer-right-text">没有任何资料</span><span
              style="width: 1px;height: 23px;border-left: 1px solid #ccc;margin-top: 2px"></span><span
              class="alarm-footer-right-icon iconfont icon-shuaxin" title="刷新"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shell-socket style="display:none;"></shell-socket>
  </div>
</template>

<script>
  import shellSocket from "./shellSocket";
  import Button from "@components/customComponent/Button";
  import nextPreData from "@components/ResourcesPanel/nextPreData";
  import ResourcesTime from "@components/ResourcesPanel/ResourcesTime/ResourcesTime";
  import {assign_compatible} from "@common/js/publicMethod/publicMethod";
  import footerContainer from "@components/ResourcesPanel/ResourcesFooterData/footerContainer";
  import R_echarts from "@components/ResourcesPanel/ResourcesECharts/R_echarts";
  import {getTimePeriod, initInfoArr, PageId} from "@common/js/resources";
  import {mapState} from "vuex"
  import {filterNetwork, publicDealDataFun} from "@common/js/resources/filterData";

  let initMemoryTotal = 1;//初始化内存总量值
  export default {
    name: 'ResourcesMenu',
    props: {},
    components: {
      Button,
      shellSocket: shellSocket,
      nextPreData,
      footerContainer,
      ResourcesTime,
      R_echarts
    },
    data: function () {
      return {
        showWraning: false,
        filter_type: 'cpu',
        showLoading: true,
        trueFirst: 0,//第一次标志
        getPostChartData: {},
        getPostChartDataList: {},
        getPageChartColor: ["#0086e6", "#fbd266", "#62bdff", "#f37399", "#62e7e1", "#645282"],
        getPageChartColorOgb: ["0,134,230", "251,210,102", "114,171,76", "243,115,153", "98,231,225", "100,82,130"],
        cpuDataList: {
          cpu: {x: [], y: []}
        },
        memoryDataList: {
          memory: {x: [], y: []}
        },
        partitionDataList: {
          partition: {x: [], y: []}
        },
        networkDataList: {
          network: {legend: {}, series: [], x: [], y: [], y2: []}
        },
        iscsiDataList: {
          target: {legend: [], x: [], y: []},
        },
        zfsDataList: {
          zfs: {x: [], y: []}
        },
        page: {
          data: {
            tooltipParams: [],
            max: [0, 0, 0, 0, 0],
            min: [0, 0, 0, 0, 0],
            avg: [0, 0, 0, 0, 0],
            start: '00:00:00',
            end: '00:00:00',
            legend: []
          }
        },
        move_data: ['', '', '', '', '', '', '', ''],
        memoryTotal: 1,
        //任务管理器tabs默认显示第一个
        taskActivationName: 'first1',
        //性能管理器tabs默认显示第一个
        abilityActivationName: 'all',
        //用来节流，点击重复一个div不触发事件
        targetNameActive: null,
        //设置模块 tabs默认显示第一个
        setActivationName: 'first11',
        //导航菜单数据
        logListMenu: [{
          title: this.$t('netWork.performance'),
          icon: 'icon-xingneng',
          ico: 'iconfont'
        },
          /* {
           title: '任务管理器',
           icon: 'icon-renwuguanli',
           ico: 'iconfont'
           }, {
           title: '目前连接用户',
           title: '目前连接用户',
           icon: 'icon-dangqianzaixian',
           ico: 'iconfont'
           }, {
           title: '速度限制',
           icon: 'icon-eventType_suduxianzhi',
           ico: 'iconfont'
           }, {
           title: '设置',
           icon: 'icon-shezhi',
           ico: 'iconfont'
           }, {
           title: '性能警报',
           icon: 'icon-xingnengbaogao',
           ico: 'iconfont'
           }*/
        ],
        index: 0,
        current: 0,
        tableData: [{
          name: 'Storage Service',
          cpu: '6.7',
          cpuTime: '00:22:41',
          RAM: '3',
          Read: '0 ',
          write: '3',
          iconUrl: '/static/images/desktop/quick_start_icon_mediaserver-050.png',
          detailList: [
            {
              name: 'hane',
              cpu: '34.3',
              cpuTime: '00:12:41',
              RAM: '4.2',
              Read: '3.6 ',
              write: '21.2',
            }, {
              name: 'mon',
              cpu: '6.23',
              cpuTime: '00:22:41',
              RAM: '2.3',
              Read: '10 ',
              write: '2.3',
            }, {
              name: 'qwr',
              cpu: '6.5',
              cpuTime: '00:10:41',
              RAM: '0.3',
              Read: '51',
              write: '22',
            }]
        }, {
          name: 'Storage Service6',
          cpu: '6.7',
          cpuTime: '00:22:41',
          RAM: '3',
          Read: '0 ',
          write: '3',
          iconUrl: '/static/images/desktop/quick_start_icon_mediaserver-050.png',
          detailList: [
            {
              name: 'hane',
              cpu: '34.3',
              cpuTime: '00:12:41',
              RAM: '4.2',
              Read: '3.6 ',
              write: '21.2',
            }, {
              name: 'mon',
              cpu: '6.23',
              cpuTime: '00:22:41',
              RAM: '2.3',
              Read: '10 ',
              write: '2.3',
            }, {
              name: 'qwr',
              cpu: '6.5',
              cpuTime: '00:10:41',
              RAM: '0.3',
              Read: '51',
              write: '22',
            }]
        },
          {
            name: 'Storage Service7',
            cpu: '6.7',
            cpuTime: '00:22:41',
            RAM: '3',
            Read: '0 ',
            write: '3',
            iconUrl: '/static/images/desktop/quick_start_icon_mediaserver-050.png',
            detailList: [
              {
                name: 'hane',
                cpu: '34.3',
                cpuTime: '00:12:41',
                RAM: '4.2',
                Read: '3.6 ',
                write: '21.2',
              }, {
                name: 'mon',
                cpu: '6.23',
                cpuTime: '00:22:41',
                RAM: '2.3',
                Read: '10 ',
                write: '2.3',
              }, {
                name: 'qwr',
                cpu: '6.5',
                cpuTime: '00:10:41',
                RAM: '0.3',
                Read: '51',
                write: '22',
              }]
          },
          {
            name: 'Storage Service8',
            cpu: '6.7',
            cpuTime: '00:22:41',
            RAM: '3',
            Read: '0 ',
            write: '3',
            iconUrl: '/static/images/desktop/quick_start_icon_mediaserver-050.png',
            detailList: [
              {
                name: 'hane',
                cpu: '34.3',
                cpuTime: '00:12:41',
                RAM: '4.2',
                Read: '3.6 ',
                write: '21.2',
              }, {
                name: 'mon',
                cpu: '6.23',
                cpuTime: '00:22:41',
                RAM: '2.3',
                Read: '10 ',
                write: '2.3',
              }, {
                name: 'qwr',
                cpu: '6.5',
                cpuTime: '00:10:41',
                RAM: '0.3',
                Read: '51',
                write: '22',
              }]
          },
          {
            name: 'Storage Service9',
            cpu: '6.7',
            cpuTime: '00:22:41',
            RAM: '3',
            Read: '0 ',
            write: '3',
            iconUrl: '/static/images/desktop/quick_start_icon_mediaserver-050.png',
            detailList: [
              {
                name: 'hane',
                cpu: '34.3',
                cpuTime: '00:12:41',
                RAM: '4.2',
                Read: '3.6 ',
                write: '21.2',
              }, {
                name: 'mon',
                cpu: '6.23',
                cpuTime: '00:22:41',
                RAM: '2.3',
                Read: '10 ',
                write: '2.3',
              }, {
                name: 'qwr',
                cpu: '6.5',
                cpuTime: '00:10:41',
                RAM: '0.3',
                Read: '51',
                write: '22',
              }]
          },
          {
            name: 'Storage Service1',
            cpu: '6.7',
            cpuTime: '00:22:41',
            RAM: '3',
            Read: '02',
            write: '3.2',
            iconUrl: '/static/images/desktop/quick_start_icon_surveillancesta.png',
            detailList: [
              {
                name: 'sdsff',
                cpu: '34.3',
                cpuTime: '00:12:41',
                RAM: '63',
                Read: '32 ',
                write: '65',
              }, {
                name: 'atewsf',
                cpu: '6.23',
                cpuTime: '00:22:41',
                RAM: '32',
                Read: '10 ',
                write: '5.5',
              }, {
                name: 'afsa',
                cpu: '6.5',
                cpuTime: '00:10:41',
                RAM: '2',
                Read: '5 ',
                write: '24',
              }]
          }, {
            name: 'Storage Service2',
            cpu: '6.7',
            cpuTime: '00:22:41',
            RAM: '34',
            Read: '20 ',
            write: '32.5',
            iconUrl: '/static/images/desktop/storage_manager_64.png',
          }, {
            name: 'Storage Service3',
            cpu: '6.7',
            cpuTime: '00:22:41',
            RAM: '3',
            Read: '10 ',
            write: '12.1',
            iconUrl: '/static/images/desktop/package_center_64.png',
          }],
        //当前连接用户的表格数据
        currentTableData: [{
          date: '2020-05-02 11:16:27',
          name: 'collor',
          type: 'CIFS',
          address: '192.168.3.172',
          resources: 'video'
        }, {
          date: '2020-05-02 01:14:27',
          name: 'collor',
          type: 'HTTP/HTTPS',
          address: '192.168.3.82',
          resources: 'DisStation Manager'
        }, {
          date: '2020-05-02 12:16:21',
          name: 'collor',
          type: 'HTTP/HTTPS',
          address: '192.168.3.180',
          resources: 'DisStation Manager'
        }],
        //速度限制模块表格数据
        speedTableData: [],
        //复选框初始状态
        checked: true,
        enableChecked: false,
        //下拉菜单的数据
        options: [{
          value: '选项1',
          label: '15 分钟'
        }, {
          value: '选项2',
          label: '30 分钟'
        }, {
          value: '选项3',
          label: '60分钟'
        }, {
          value: '选项4',
          label: '120分钟'
        }],
        //性能警报数据
        performanceTableData: [],
        value: '',
        tooltipParams: [],
        isShowtest: false,
        PageInfo: {},
        memoryPageInfo: ['reporting-get_page_data-cpu'],
        ShowLoad: false,
      }
    },
    computed: {
      ...mapState('v_scoket', {
        reporting_realtime: state => state.reporting_realtime,
        HomeCpu: state => state.reporting_get_data_cpu,
        HomeMemory: state => state.reporting_get_data_memory,
        HomeNetwork: state => state.reporting_get_data_network,
        HomePartition: state => state.reporting_get_data_partition,
        HomeTarget: state => state.reporting_get_data_target,
        HomeZfs: state => state.reporting_get_data_zfs,
        pageCpu: state => state.Page_cpu,
        pageMemory: state => state.Page_memory,
        pageNetwork: state => state.Page_network,
        pagePartition: state => state.Page_partition,
        pageTarget: state => state.Page_target,
        pageZfs: state => state.Page_zfs
      }),
      ...mapState('Dialog', {
        resources_Panel: state => state.dialogShow.resources_Panel
      })
    },
    watch: {
      resources_Panel (val) {//刷新弹框
        if (val) {
          //获取当前时间戳
          this.initLoadFun();
        } else {
          this.clearTimerAndEcharts();
        }
      },
      reporting_realtime (val) {
        if (!val) return
        this.getPostChartDataList["reporting-realtime"] = val;
      },
      HomeCpu (val) {//cpu
        if (!val) return
        this.HomeRefresh(val, 'cpu')
        this.filterCpu()
      },
      HomeMemory (val) {//总内存
        if (!val) return
        // console.log(val)
        this.HomeRefresh(val, 'memory')
        this.filterMemory()
      },
      HomeNetwork (val) {//网络
        if (!val) return
        this.HomeRefresh(val, 'network')
        filterNetwork(this)
      },
      HomePartition (val) {//磁盘
        if (!val) return
        this.HomeRefresh(val, 'partition')
        this.filterDisk()
      },
      HomeTarget (val) {//Iscsi
        if (!val) return
        this.HomeRefresh(val, 'target')
        this.filterIscsi()
      },
      HomeZfs (val) {//zfs
        if (!val) return
        this.HomeRefresh(val, 'zfs')
        this.filterZfs()
      },
      pageCpu (val) {
        this.refreshCurrentPageData(val)
      },
      pageMemory (val) {
        this.refreshCurrentPageData(val)
      },
      pageNetwork (val) {
        this.refreshCurrentPageData(val)
      },
      pagePartition (val) {
        this.refreshCurrentPageData(val)
      },
      pageTarget (val) {
        this.refreshCurrentPageData(val)
      },
      pageZfs (val) {
        this.refreshCurrentPageData(val)
      },
    },
    mounted () {
    },
    created () {
    },
    methods: {
      closeEvent () {
        this.showWraning = false
      },
      //刷新数据
      refreshCurrentPageData (val) {
        // console.log(val)
        if (!val) return
        if (val.error) {
          this.ShowLoad=false
          this.showWraning = true
          return;
        }
        const {Name, sendTypes} = this.filterPageName()
        this.PageInfo[sendTypes] = val
        this.refreshTurnPageData(Name, sendTypes)//刷新数据
      },
      filterPageName () {//过滤page统计图名称以及要发送的名字
        let index = initInfoArr.findIndex((item) => item.indexOf(this.abilityActivationName) != -1)//返回index值
        if (index == -1) return console.log('filterPageName 索引值没拿到')
        let sendName = initInfoArr[index]//全称
        if (!sendName) return
        const sendTypes = sendName.replace(/-/g, "_")//替换斜杠
        let Name = sendTypes.split('_')[3]//分割字符串成数组
        return {
          Name,
          sendTypes,
          index,
          sendName
        }
      },
      sendCommand (type) {//主页自动发送指令
        let sendType = initInfoArr.filter(item => item.indexOf(type) != -1)//返回当前选中要发送的名称
        if (sendType.length == 0) return
        let time = getTimePeriod()
        this.$parent.$parent.refreshWebsocketData(sendType[0], time)//当前时间及上一个时间断
      },
      TurnPage (startTime, endTime) {//请求上一个小时的数据或者下一个小时数据
        const {index, sendName} = this.filterPageName()
        let Timestamp = {
          start: startTime,
          end: endTime,
          id: PageId[index]
        }
        this.$parent.$parent.refreshWebsocketData(sendName, Timestamp);
      },
      //sleep代码睡眠 每隔一秒发送信息
      sleeps (delay, index) {
        // let time = null
        // clearTimeout(time)
        return new Promise((resolve)=> {
          setTimeout(() => {
            this.$parent.$parent.refreshWebsocketData(initInfoArr[index]);
            resolve(index)
          }, delay)
        })
      },
      async initLoadFun () {//打开资源管理把vuex数据清空 这一步没啥必要，直接把数据给替换掉会好点
        for (let i = 0; i <= initInfoArr.length - 1; i++) {
          await this.sleeps(300, i).then(res => {
            res == 5 ? this.showLoading = false : ''
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      //主页数据发送完赋值，触发数据响应
      HomeRefresh (val, type) {
        let newArray = initInfoArr.filter((item) => item.indexOf(type) !== -1)
        if (newArray.length == 0 || val.error || val.result.error) return console.log('HomeRefresh' + newArray)
        // console.log(newArray)
        this.getPostChartDataList[newArray[0]] = val
      },
      clearTimerAndEcharts () {//清除定时器和统计图
        assign_compatible()
        Object.assign(this.$data, this.$options.data.call(this))
        // //销毁统计图
        // this.$echarts.dispose(this.$refs.cpu);
      },
      async tabClick (targetName, action) {//tab点击切换
        this.page=this.$options.data.call(this).page
        this.filter_type = targetName.name
        if (this.targetNameActive == targetName.name) {//节流
          return
        } else {
          this.targetNameActive = targetName.name
        }
        let arrays = [...targetName.$el.parentNode.children]
        arrays.splice(0, 1)
        arrays.forEach(item => {
          item.classList.remove('addshow')
          item.classList.add('addhide')
        })
        targetName.$el.classList.remove('addhide')
        targetName.$el.classList.add('addshow')
        if (targetName.name != 'all') {
          this.ShowLoad = true
        }
        if (targetName.name == 'all') {
          this.ShowLoad = false
        } else {
          let name = targetName.name + '_TurnPage'
          // console.log(name)
          this.$refs[name].num()
        }
      },
      clearHoveData (dom) {//鼠标离开统计图
        dom.on('globalout', (params) => {
          this.page.data.tooltipParams = []
        })
      },
      async refreshTurnPageData (sendType, sendTypes) {
        var cpuObj = await publicDealDataFun(this.PageInfo[sendTypes]);//全称
        var cpuY = cpuObj.colData;
        var dealSeries = [];
        var dealLegend = {
          "data": cpuObj.legend,
          "left": "left",
          "itemWidth": 10,
          "itemHeight": 10,
          "itemGap": 10,
          "textStyle": {
            "color": "#898989",
            "lineHeight": 15
          },
          "type": "scroll"
        };
        cpuY.forEach((item, index) => {
          var dealItemData = [];
          item.forEach((item1) => {
            // console.log(item1)
            if (sendType == 'cpu') {
              dealItemData.push(JSON.parse((item1 / 100 * 100).toFixed(2)));//百分比
            } else {
              if (sendType=='memory'){
                dealItemData.push((JSON.parse(item1)/1073741824).toFixed(2));//g
              }else if (sendType=='network') {
                dealItemData.push((JSON.parse(item1)/1048576).toFixed(2));//m
              }else {
                let filterSize = this.$options.filters['filterSize'](item1, true)
                let Letter = this.$options.filters['Letter'](JSON.stringify(filterSize))
                dealItemData.push(JSON.parse(Letter));
              }

            }
          });
          dealSeries.push(
            {
              "name": dealLegend.data[index].name,
              "type": "line",
              "smooth": true, //是否平滑
              "smoothMonotone": 'x',
              // "showAllSymbol": false,
              "symbol": "circle",//小圆圈
              "symbolSize": 2,    //小圆圈大小标记大小  默认是4
              "data": dealItemData,
              "lineStyle": {
                "normal": {
                  "color": this.getPageChartColor[index],
                  //this.getPageChartColor[index]
                },
              },
              "itemStyle": {
                "color": this.getPageChartColor[index],
                emphasis: { // 鼠标经过时：小圆圈鼠标经过
                  color: '#E21918',
                  borderColor: 'yellow',
                  borderWidth:4
                }
              },
              "areaStyle": {
                "normal": {
                  "color": new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    "offset": 0,
                    "color": "rgba(" + this.getPageChartColorOgb[index] + ",0.5)"
                  },
                    {
                      "offset": 1,
                      "color": "rgba(" + this.getPageChartColorOgb[index] + ",0.6)"
                    }
                  ], false),
                  // "shadowColor": "rgba(" + this.getPageChartColorOgb[index] + ",1)",
                  // "shadowBlur": 20
                }
              }
            }
          );
          this.ShowLoad = false
        });
        console.log(dealSeries)
        var myChart = this.$echarts.init(document.getElementById(`page_${sendType}`));
        this.clearHoveData(myChart)
        var option0 = this.getInitPageOption(cpuObj.timeArr, sendType);
        option0.series = dealSeries;
        option0.legend = dealLegend;
        if (sendType == 'target' || sendType == 'cpu') {
          option0.yAxis.min = 1;
        } else {
          option0.yAxis.min = 0;
        }
        myChart.setOption(option0);
        assign_compatible()
        Object.assign(this.page.data, cpuObj)
        $(`#page_${sendType}`).resize(function () {
          myChart.resize();    //若有多个图表变动，可多写
        });
      },
      filterMemory () {
        initMemoryTotal = parseFloat(this.getPostChartDataList["reporting-realtime"].fields.virtual_memory.total);//内存总和
        if (!initMemoryTotal) return console.log('initMemoryTotal 为空!')
        this.memoryTotal = initMemoryTotal;
        //memory
        var memoryObj = publicDealDataFun(this.getPostChartDataList["reporting-get_data-memory"]);
        if (!memoryObj) throw 'memoryObj 为空!'
        let index=memoryObj.legend.findIndex(item=>item.name=='Free')
        if (index==-1)return
        var memoryY = memoryObj.colData[index];
        var memoryX = memoryObj.timeArr;
        var memoryY1 = [];
        memoryY.forEach((item, index) => {
          if (item == 0) {
            memoryY1.push(0);
          } else {
            this.memoryTotal = this.memoryTotal == 1 ? initMemoryTotal : this.memoryTotal;
            var sum = parseFloat(((Math.round((this.memoryTotal - item) / (this.memoryTotal) * 10000) / 10000) * 100));
            if ((sum + "").length > 5) {
              memoryY1.push(sum.toFixed(2));
            } else {
              memoryY1.push(sum);
            }
          }
        });
        this.memoryDataList = {
          memory: {x: memoryX.concat(['']), y: memoryY1.concat([100])}
        }
      },
      async filterCpu () {
        //cpu
        var cpuObj = await publicDealDataFun(this.getPostChartDataList["reporting-get_data-cpu"]);
        if (!cpuObj) return console.log('cpuObj 为空!')
        // console.log('会执行吗')
        var cpuY = cpuObj.colData[1];
        var cpuX = cpuObj.timeArr;
        var cpuY1 = [];
        cpuY.forEach((item, index) => {
          if (item > 100) {
            cpuY1.push(100);
          } else {
            if (item == 0) {
              cpuY1.push(0);
            } else {
              cpuY1.push(parseFloat((Math.round(item * 100) / 100)));
            }
          }
        });
        // console.log(cpuX.concat(['']))
        // console.log(cpuY1.concat([100]))
        this.cpuDataList = {
          cpu: {
            x: cpuX.concat(['']),
            y: cpuY1.concat([100])
          }
        }
        // this.cpuDataList.cpu.x =cpuX.concat([''])
        // this.cpuDataList.cpu.y =cpuY1.concat([100])
        // console.log(this.cpuDataList)
        // ,
        //   this.dealPostChartData.index = {
        //     cpu: {
        //       x: cpuX.concat(['']),
        //       y: cpuY1.concat([100])
        //     }
        //   }
        // this.dealPostChartData.index.cpu.x = ;
        // this.dealPostChartData.index.cpu.y = ;
      },
      filterDisk () {
        //disk
        var partitionObj = publicDealDataFun(this.getPostChartDataList["reporting-get_data-partition"]);
        if (!partitionObj) return console.log('partitionObj 为空!')
        var partitionY = partitionObj.rowData;
        var partitionX = partitionObj.timeArr;
        var partitionY1 = [];
        partitionY.forEach((item, index) => {
          if (item[2] == 0 || item[1] == 0) {
            partitionY1.push(0);
          } else {
            var sum = Math.round((item[1] / item[2]) * 10000) / 100;
            partitionY1.push(parseFloat(sum.toFixed(2)));
          }
        });
        this.partitionDataList = {
          partition: {x: partitionX.concat(['']), y: partitionY1.concat([100])}
        }
      },
      filterIscsi () {
        //iscsi
        var iscsiObj = publicDealDataFun(this.getPostChartDataList["reporting-get_data-target"]);
        if (!iscsiObj) return console.log('iscsiObj 为空!')
        if (iscsiObj.rowData.length > 0) {
          var iscsiY = iscsiObj.colData[0];
          var iscsiX = iscsiObj.timeArr;
          var iscsiY1 = [];
          iscsiY.forEach((item, index) => {
            iscsiY1.push(item);
          });
          // this.iscsiDataList.iscsi.x = iscsiX;
          // readData1 = iscsiY1;
        } else {
          iscsiX = [];
          iscsiY = []
        }
        // var iscsiSeriresObj = [];
        // iscsiSeriresObj[0].name = 'read';
        // iscsiSeriresObj[0].data = readData1;
        // this.dealPostChartData.index.iscsi.series = iscsiSeriresObj;
        this.iscsiDataList = {
          target: {
            y: iscsiY1, x: iscsiX, legend: {
              data: iscsiObj.legend,
              show: false
            }
          }
        }
      },
      filterZfs () {
        //zfs
        var memoryTotalGb = parseFloat(Math.round((((this.memoryTotal / 1024) / 1024) / 1024) * 100) / 100);
        var zfsObj = publicDealDataFun(this.getPostChartDataList["reporting-get_data-zfs"]);
        if (!zfsObj) return console.log('zfsObj 为空!')
        var zfsY = zfsObj.colData[0];
        // var zfsX = zfsObj.timeArr;
        var zfsY1 = [];
        zfsY.forEach((item, index) => {
          if (item == 0) {
            zfsY1.push(0);
          } else {
            zfsY1.push(parseFloat((Math.round(((((item / 1024) / 1024) / 1024) * 100)) / 100)));
          }
        });
        this.zfsDataList = {
          zfs: {x: zfsY.concat(['']), y: zfsY1.concat(memoryTotalGb)}
        }
      },
      //点击导航菜单事件
      ResourcesMenuClick: function (index, item) {
        this.current = index
        this.index = index
      },
      //处理性能导出点击事件
      exportEvent: function () {

      },
      //tabs配置项
      getInitPageOption (dealx, key) {
        let option = null;
        let _this = this
        return option = {
          "textStyle": {
            "fontFamily": "Din-Light"
          },
          "color": _this.getPageChartColor,
          "title": {
            "text": "",
            "left": "47%",
            "textStyle": {
              "fontSize": 24
            }
          },
          "animation": false,
          "legend": {
            "data": [{}]
          },
          "tooltip": {
            "backgroundColor": "#fff",
            "trigger": "axis",
            // "axisPointer": {
            //   type: 'line',
            //   lineStyle: {
            //     width: 2,
            //     color: '#FA4444'
            //   }
            // },
            "axisPointer": {
              type: 'none',
              // lineStyle: {
              //   width: 2,
              //   color: '#FA4444'
              // }
            },
            "textStyle": {
              "color": "#565656",
              "lineHeight": 28
            },
            "confine": true,
            "padding": 12,
            "extraCssText": "box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity:1;max-height: 100%;",
            formatter (params) {
              _this.filter_type = key
              let arrays = []
              params.forEach(item => {
                arrays.push(item)
              })
              _this.page.data.tooltipParams = arrays
            }
          },
          "grid": {
            "show": true,
            "left": 30,
            "right": 20,
            "top": 50,
            "bottom": 20,
            "backgroundColor": "#f5faff",
            "borderColor": '#B4BEC8'
          },
          "xAxis": {
            "show": true,
            "type": "category",
            "boundaryGap": false,
            "data": dealx,
            "axisLabel": {
              "color": "#a0a9bc"
            },
            "axisLine": {
              show:false
            },
            // "splitLine": {
            //   show:true,
            //   "lineStyle": {
            //     "type": "solid",
            //     "color": "#DDDDDD",
            //     "width": 1
            //   },
            // },
            "axisTick": {
              "show": false
            }
          },
          "yAxis": {
            "name": "",
            "nameTextStyle": {
              "color": "gray"
            },
            "type": "value",
            "axisLabel": {
              "color": "#505a64",
              "inside": false,
              "margin": 4,
              "verticalAlign": "bottom"
            },
            "splitLine": {
              "lineStyle": {
                "type": "solid",
                "color": "#DDDDDD",
                "width": 1
              }
            },
            "minInterval": 1,
            "axisLine": {
              "show": true,
              "lineStyle": {
                "color": "#B4BEC8",
                "width": 1
              }
            },
            "axisTick": {
              "show": false
            }
          },

        };
      },
    },
    filters: {},
    beforeDestroy () {
    },
  }

</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  /*表格样式穿透*/
  @{deep}.el-table th > .cell {
    /*text-align: left;*/
    color: #0086E5;
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0px !important;
  }

  @{deep}.el-table--border th {
    border-right: 1px solid #eee;
    border-top: 1px solid #eee;
    padding: 0px !important;
  }

  @{deep}.has-gutter tr > th {
    padding: 0px !important;
  }

  @{deep}.el-table__row td {
    padding: 0px !important;

  }

  @{deep} .el-table__expanded-cell {
    padding: 0px !important;
    border-bottom: 0px !important;
  }

  @{deep}.el-table .cell {
    /*text-align: left;*/
    font-size: 12px;
    padding: 2px;
    padding-left: 0px !important;
  }

  @{deep}.cell img {
    vertical-align: top;
  }

  @{deep}.Resources-left .iconfont {
    font-size: 25px;
  }

  @{deep}.el-table--border td {
    border-right: 0;
  }

  @{deep} .el-table--border th {
    border-top: 0;
  }

  @{deep}th.el-table_1_column_1.undefined.el-table__expand-column.is-leaf {
    border-right: 0px !important;
  }

  @{deep}.el-table--border {
    border: 0;
  }

  @{deep}.el-table--border::after {
    width: 0;
  }


  @{deep}th.el-table_1_column_7.is-left.is-leaf {
    border-right: 0px;
  }

  @{deep}.el-table__header {
    border-top: 1px solid #ccc;
  }

  /*tabs样式穿透*/
  .Resources-right @{deep} .el-tab-pane {
    padding-top: 0px !important;
    margin-top: 0px !important;
  }

  .Resources-right @{deep} .el-tabs__content {
    /*height: 100% !important;*/
    /*box-sizing: border-box;*/
    /*padding-top: 40px;*/
    /*margin-top: -40px;*/
    /*position: relative;*/

    div#pane-all, div#pane-cpu, div#pane-memory, div#pane-network, div#pane-disk, div#pane-iscsi, div#pane-zfs {
      display: block !important;
    }

    /*div#pane-all.addhide ,div#pane-cpu.addhide{*/
    /*  position: absolute;*/
    /*  width: 100%;*/
    /*  z-index: -1;*/
    /*  opacity: 0;*/
    /*  height: 100%;*/
    /*}*/

    .addshow {
      position: absolute;
      top: 0;
      width: 100%;
      /*z-index: -1;*/
      /*opacity: 0;*/
      height: 100%;
      visibility: visible;
    }

    .addhide {
      position: absolute;
      width: 100%;
      /*z-index: -1;*/
      opacity: 0;
      height: 100%;
      visibility: hidden;
    }

    .el-tab-page {
      position: relative;
      width: 100%;
      height: 100%;

      .chartDiv {
        height: 70%;
        margin: 0 auto;
        padding: 10px;
        box-sizing: border-box;
      }

      .next_cpu, .next_memory {
        position: absolute;
        right: 32px;
        top: 11px;
        z-index: 1;
      }
    }
  }

  .SmallCircle {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }

  .ResourcesPanel {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }

  .Resources-left {
    min-width: 223px;
    height: 100%;
    box-sizing: border-box;
    margin-right: 10px;
    /*margin-top: 10px;*/

    .ResourcesPanelMenu {
      border-radius: 5px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 10px 0 10px;
      box-sizing: border-box;
      font-size: 14px;
    }

    .ResourcesPanelMenu i {
      padding-right: 10px;

    }

    .ResourcesPanelMenu:hover {
      cursor: pointer;
      background-color: #c2ddf5;
      color: #222222;
    }
  }

  .Resources-right {
    flex: 1;
    width: 100%;
    height: 100%;
    border-left: 1px solid #E4E5E5;
    box-sizing: border-box;
    /*overflow-y: auto;*/
    position: relative;
    overflow: hidden;
    padding-top: 6px;
    /*padding-left: 14px;*/

    .tabs {
      padding: 0 10px;
      height: 100%;
      position: relative
    }
  }

  /*总览盒子内容样式*/
  .Overview-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 0;

    .charts-row {
      display: flex;
      /*justify-content: space-around;*/
      height: 50%;
      width: 100%;
      padding: 0 30px;
      .charts_container{
        margin-right: 3.33%;
      }
      .charts_container:last-child {
        margin-right: 0;
      }
    }
    /*.charts-row .r_echarts:last-child {*/
    /*  margin-right: 0;*/
    /*}*/
  }

  /*目前连接用户模块,速度限制模块*/
  .currentUser, .speed {
    margin-bottom: 7px;
    /*按钮通用样式 */

    button {
      cursor: pointer;
      padding: 5px 15px;
      outline: none;
      border: 1px solid #C8D2DC !important;
      background-color: #F5FAFF;
      border-radius: 4px;
      color: #606266;
      font-size: 12px;
    }

    button:hover {
      border: 1px solid #B4BEC8 !important;
    }

    /*属性选则器选中被禁用的按钮*/

    button[disabled] {
      cursor: default;
      border: 1px solid #C8D2DC !important;
      color: #96A0AA;
    }

    button {
      cursor: pointer;
      padding: 5px 15px;
      border: 1px solid #ccc;
    }
  }

  @{deep}th.el-table_2_column_12.is-center.is-leaf {
    border-right: 0;
  }

  /*设置模块样式*/
  .setContainer {
    display: flex;
    flex-direction: column;
    flex: 1;

    .setModule {
      display: flex;
      height: 28px;
      line-height: 28px;
      margin-bottom: 15px;
      flex: 0;

      .setModule-title {
        width: 120px;
        font-size: 12px;
        color: #505A64;
      }
    }

    .setChecked {
      flex: 1;
    }
  }

  .setChecked div:nth-child(1) {
    margin-bottom: 7px;
  }

  @{deep}.el-input__inner {
    height: 28px;
    line-height: 28px;
    border-radius: 0px;
  }

  @{deep}.el-input__icon {
    height: 28px;
    line-height: 28px;
  }

  @{deep}.el-checkbox__label {
    color: #505A64;
    font-size: 12px;
  }

  @{deep}.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #505A64;
  }

  /*性能警报模块样式*/
  .alarm-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;

    .alarm-btn {
      height: 36px;
    }

    .alarm-table {
      display: flex;
      flex: 1;
    }

    .alarm-footer {
      height: 29px;
      line-height: 29px;
      border-top: 1px solid #EBF0F5;
      border-bottom: 1px solid #D7E1EB;
      box-sizing: border-box;

      .alarm-footer-right {
        display: flex;
        flex: 1;
        height: 100%;
        justify-content: flex-end;
        vertical-align: middle;
        padding-right: 5px;
        line-height: 29px;

        .alarm-footer-right-text {
          color: #0086E5;
          padding: 2px 8px 2px 2px;
          font-size: 12px;
          line-height: 25px;
        }

        .alarm-footer-right-icon {
          color: #0086E6;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
  }

  .classBlue {
    background-color: #0086E5;
    color: #fff;
  }

  @{deep}.el-col {
    font-size: 12px;
  }

  @{deep}.el-row {
    margin-bottom: 4px;
  }

  .legend-footer .el-col-12 {
    width: 100%;
  }

  .legend-footer .el-row {
    margin-bottom: 0;
  }

  .legend-footer .el-col.el-col-6 {
    padding: 3px 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .legend-wrapper .el-row {
    margin-bottom: 0;
    padding: 3px 0;
    margin-top: -1px;
  }

  .legend-wrapper {
    padding: 0 76px;
    margin-bottom: 10px;
  }

  .legend-wrapper .el-row .el-col-4 {
    width: 33.3%;
  }

  .legend-footer {
    padding-left: 30px;
  }


</style>
