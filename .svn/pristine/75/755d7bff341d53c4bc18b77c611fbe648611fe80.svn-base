<template>
  <div class="4 storage-panel" v-cloak v-if="showStorage">
    <div class="storagePanel">
      <gl-load-animation :is-load-show="showLoading"></gl-load-animation>
      <gl-warning-dialog :is-show="showWarning" @warningDialogClose="closeWarning">{{errorMassage}}</gl-warning-dialog>
      <div class="storage-left">
        <div class="storagePanelMenu" v-for="(item,index) in logListMenu" :key="index"
             :class="{classBlue:index==current}"
             @click="storageMenuClick(index,item)" v-cloak>
          <i :class='[`${item.icon}`,`${item.ico}`]'></i>
          {{item.title}}
        </div>
      </div>
      <div class="storage-container" style="width: 100%; position: relative">
        <!--总览-->
        <div class="storage-right" style="height: 100%;" v-show="index==0">
          <div class="storage-Overview-container">
            <!--            &lt;!&ndash;系统状态&ndash;&gt;-->
            <!--            <div class="storage-status">-->
            <!--              <div class="storage-icon"></div>-->
            <!--              <div class="storage-status-text">-->
            <!--                <div class="storage-status-color">良好</div>-->
            <!--                <div class="storage-status-color1">系统良好。</div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--系统信息模块-->
            <div class="systemMessage">{{$t('systemInfo.systemHealth')}}<!--系统信息--></div>
            <div class="storage-status">
              <div style="width: 100px;height: 100px;margin-left: 200px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132.1779 104.4929" fit="" height="100%"
                     width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                  <title>truenas_core-logo-mark-one-color-rgb</title>
                  <g id="black-rgb">
                    <g id="logoMark">
                      <polygon id="logoMark_PathItem_" data-name="logoMark <PathItem>"
                               points="132.178 41.498 132.178 69.662 71.878 104.493 71.878 76.329 132.178 41.498"></polygon>
                      <path id="logoMark_PathItem_2" data-name="logoMark <PathItem>"
                            d="M60.34,76.3288v28.1641L0,69.6619V41.4978L27.266,57.2266a.439.439,0,0,0,.1.06Z"></path>
                      <polygon id="logoMark_PathItem_3" data-name="logoMark <PathItem>"
                               points="90.5 52.256 66.109 66.349 41.697 52.256 66.109 38.164 90.5 52.256"></polygon>
                      <polygon id="logoMark_PathItem_4" data-name="logoMark <PathItem>"
                               points="126.429 31.518 102.018 45.61 71.878 28.184 71.878 0 126.429 31.518"></polygon>
                      <polygon id="logoMark_PathItem_5" data-name="logoMark <PathItem>"
                               points="60.34 0 60.34 28.184 30.16 45.59 5.749 31.518 60.34 0"></polygon>
                    </g>
                  </g>
                </svg>
              </div>
              <div class="rowDiv" v-cloak>{{$t('systemInfo.processor')+':'+systemInfoParams.model}}</div><!--处理器-->
              <div class="rowDiv" v-cloak>{{$t('systemInfo.version')+':'+systemInfoParams.version}}</div><!--版本:-->
              <div class="rowDiv" v-cloak>{{$t('systemInfo.serverName')+':'+systemInfoParams.hostname}}</div><!--主机名:-->
              <div class="rowDiv" v-cloak>{{$t('systemInfo.hours')+':'+systemInfoParams.uptime}}</div><!--运行时间:-->
            </div>
            <!--存储池下拉列表-->
            <div class="Storage-title">
              <el-dropdown placement="bottom-start" trigger="click" @command="dropDownOptionEvent">
                 <span class="el-dropdown-link Storage-title-style">
                 {{selectState}}<i class="Triangle"></i>
                 </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item,index) in drop_downList" :command="item" :key="index">{{item}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!--存储空间状态-->
            <div class="Storage-space-status">
              <div class="Storage-space-text">{{$t('tabs.ram')}}<!--内存状态--></div>
              <div class="Storage-space-container">
                <memory :memory-data="$store.getters['v_scoket/filter_realtime_memory']" size="mini"></memory>
              </div>
            </div>
            <!--存储池-->
            <div class="Storage-pool">
              <div class="Storage-space-text">{{selectState}}</div>
            </div>
            <div v-show="selectState==$t('storage.allPool')"><!--'所有存储池'-->
              <el-table
                :data="processData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  :label="$t('user.name')"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  :label="$t('common.status')">
                </el-table-column>
                <el-table-column
                  prop="avail"
                  :label="$t('storage.available')">
                </el-table-column>
                <el-table-column
                  prop="used"
                  :label="$t('storage.used')">
                </el-table-column>
              </el-table>
            </div>
            <div v-show="selectState!=$t('storage.allPool')"><!--'其他存储池'-->
              <div class="Storage-allocation">
                <div class="Storage-allocation-left">
                  <div><span class="Storage-text-style">{{view_PoolInfo.name}}</span>
                  </div>
                  <el-progress :stroke-width="12" :percentage="view_PoolInfo.percentage"></el-progress>
                  <div>{{$t('storage.available')}}:<span class="avail-style">{{view_PoolInfo.avail}}</span></div>
                  <!--可使用-->
                </div>
              </div>
            </div>
            <!--硬盘信息-->
            <div class="hard-Disk-container">
              <div class="Storage-space-text">{{$t('storage.diskInfo')}}</div><!--硬盘信息-->
              <div class="used-container">
                <div class="used">
                  <div>{{$t('storage.usedHardDrive')}}</div>
                  <!--                  已用硬盘-->
                  <div>{{disk_total}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--存储池-->
        <div class="storage-right" style="overflow: hidden" v-show="index==1">
          <!--tabs-->
          <el-tabs class="tabs" v-model="activeName" type="card" style="height: 100%;">
            <el-tab-pane :label="$t('storage.pool')" name="first"><!--存储池-->
              <div class="storage-pool-container">
                <!--按钮-->
                <div class="storage-btn">
                  <div>
                    <gl-button-style @click="addArrayEvent">{{$t('user.add')}}</gl-button-style>
                    <gl-button-style @click="getArrayRelated" :disable="isDisable">{{$t('user.delete')}}
                    </gl-button-style>
                  </div>
                  <gl-switch-btn @changes="tabsSwitch"></gl-switch-btn>
                </div>
                <div v-if="PoolTableBtn==0" class="collapse-container">
                  <!--可折叠组件-->
                  <el-collapse @change="collapseChange" v-model="collapseActive" accordion>
                    <!--手风琴-->
                    <el-collapse-item v-for="(item,index) in processData" :key="index" :name="index">
                      <template slot="title">
                        <i class="storage-fold-icon Storage-pool"></i>
                        <div class="storage-fold-content">
                          <div class="fold-text-style-left">
                            <div>{{item.name}} - <span>{{item.status}}</span></div>
                          </div>
                          <div class="fold-text-style-right">
                            <div class="progress-Bar">
                              <span class="Bar-text-style">{{$t('storage.usageRate')}}({{item.percentage}}%)</span>
                              /
                              {{item.avail}}
                            </div><!--使用率-->
                            <el-progress class="memory-space" :percentage="item.percentage"
                                         :color="progressBar.customColor" :show-text="false">
                            </el-progress>
                          </div>
                        </div>
                      </template>
                      <!--下拉内容-->
                      <div class="drop-Down-Container">
                        <swiper ref="poolSwiper">
                          <template slot-scope="scope">
                            <div v-show="scope.info==1" class="Pool_basicInfo">
                              <div>
                                <el-row>
                                  <el-col :span="12" class="row-text">{{$t('common.status')}}</el-col><!--状态-->
                                  <el-col :span="12"
                                          :class="item.status=='ONLINE'?'iconfont icon-querenyuanzhengqueduigoutijiaochenggongwancheng green row-data row-data-status':'iconfont icon-cuowu1 red row-data row-data-status' ">
                                    {{item.status}}
                                  </el-col>
                                </el-row>
                                <el-row>
                                  <el-col :span="12" class="row-text">{{$t('storage.used')}}</el-col><!--已使用-->
                                  <el-col :span="12" class="row-data">{{item.used}}</el-col>
                                </el-row>
                                <el-row>
                                  <el-col :span="12" class="row-text">{{$t('storage.path')}}</el-col><!--路径-->
                                  <el-col :span="12" class="row-data">{{item.path}}</el-col>
                                </el-row>
                                <el-row>
                                  <el-col :span="12" class="row-text">{{$t('storage.cache')}}</el-col><!--缓存-->
                                  <el-col :span="12" class="row-data">{{item.topology.log.length}}</el-col>
                                </el-row>
                                <el-row>
                                  <el-col :span="12" class="row-text">{{$t('storage.spare')}}</el-col><!--备用-->
                                  <el-col :span="12" class="row-data">{{item.topology.cache.length}}</el-col>
                                </el-row>
                                <el-row>
                                  <el-col :span="12" class="row-text">{{$t('storage.log')}}</el-col><!--日志-->
                                  <el-col :span="12" class="row-data">{{item.topology.spare.length}}</el-col>
                                </el-row>
                                <el-row class="row-table-text">
                                  <el-col :span="24" class="row-text">{{$t('storage.diskInfo')}}</el-col><!--硬盘信息-->
                                </el-row>
                              </div>
                              <div>
                                <el-table
                                  :data="item.topology.data[0].children.length==0?[item.topology.data[0]]:item.topology.data[0].children"
                                  style="width: 100%">
                                  <el-table-column
                                    prop="disk"
                                    width="100"
                                    :label="$t('user.name')">
                                  </el-table-column>
                                  <el-table-column
                                    prop="status"
                                    width="100"
                                    :label="$t('common.status')">
                                  </el-table-column>
                                  <el-table-column
                                    :label="$t('storage.details')"
                                    align="right">
                                    <template slot-scope="scope">
                                      <i class="iconfont icon-you MoreInfos" @click="MoreInfos(scope.row)"></i>
                                    </template>
                                  </el-table-column>
                                </el-table>
                              </div>
                            </div>
                            <div v-show="scope.info==2">
                              <div class="Details">
                                <div class="font_weight Details_title">
                                  <i class="iconfont icon-8_qianjinhoutui1 MoreInfo" @click="returnInfos"></i>
                                  <span>{{$t('storage.diskDetails')}}</span>
                                </div>
                                <div class="DetailsInfo">
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('user.name')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.name}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">GUID</el-col>
                                    <el-col :span="12">{{poolDiskInfo.zfs_guid}}</el-col>
                                  </el-row>
                                </div>
                              </div>
                              <div class="Advanced">
                                <div class="font_weight Advanced_title"><span style="margin-left: 15px">{{$t('storage.advancedDetails')}}</span>
                                </div>
                                <div class="AdvancedInfo">
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.subsystem')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.subsystem}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.number')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.number}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.serialNumber')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.serial}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.transmissionMode')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.transfermode}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.standbyMode')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.hddstandby}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.noiseLevel')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.acousticlevel}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.advpowermgmt')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.advpowermgmt}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.model')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.model}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.rotatingSpeed')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.rotationrate}}</el-col>
                                  </el-row>
                                  <el-row>
                                    <el-col :span="12" class="font_weight text_color">{{$t('storage.type')}}</el-col>
                                    <el-col :span="12">{{poolDiskInfo.type}}</el-col>
                                  </el-row>
                                </div>
                              </div>
                            </div>
                          </template>
                        </swiper>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <div v-if="PoolTableBtn==1" class="collapse-container table_view">
                  <el-table
                    :data="processData"
                    style="width: 100%;margin-bottom: 20px;"
                    height="100%"
                    row-key="name"
                    border
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                      prop="name"
                      :label="$t('user.name')"
                      sortable
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      :label="$t('storage.type')"
                      sortable
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="used"
                      :label="$t('storage.used')"
                      sortable
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="avail"
                      :label="$t('storage.available')"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="compressRatio"
                      :label="$t('storage.compressionRatio')"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      prop="Readonly"
                      :label="$t('storage.readonly')"
                      show-overflow-tooltip
                      width="50px">
                      <template slot-scope="scope">
                        {{scope.row.Readonly}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="compression"
                      :label="$t('storage.compression')"
                      width="50px"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!--硬盘-->
        <div class="storage-right" style="overflow: hidden" v-show="index==2">
          <!--tabs-->
          <el-tabs class="tabs" v-model="activeName" type="card" style="height: 100%;">
            <el-tab-pane label="HDD/SDD" name="first">
              <div class="storage-SDD-container">
                <!--按钮和按钮下拉-->
                <div class="storage-btn">
                  <div class="PoolPlate-test">
                    {{$t('storage.disk')}}<!--磁盘-->
                    <!--                    <button class="storage-btn-style">状况信息</button>-->
                    <!--                    <button class="storage-btn-style">定位硬盘</button>-->
                  </div>
                  <!--                <el-dropdown trigger="click" placement="bottom-start">-->
                  <!--                <span class="el-dropdown-link">-->
                  <!--                  动作<i class="iconfont icon-xiala2"></i>-->
                  <!--                </span>-->
                  <!--                  <el-dropdown-menu slot="dropdown">-->
                  <!--                    <el-dropdown-item class="iconfont icon-shangchuan">停用</el-dropdown-item>-->
                  <!--                    <el-dropdown-item class="iconfont icon-shangchuan">配置</el-dropdown-item>-->
                  <!--                  </el-dropdown-menu>-->
                  <!--                </el-dropdown>-->
                  <gl-switch-btn @changes="diskBtnSwitch"></gl-switch-btn>
                </div>
                <!--点击切换按钮切换-->
                <div class="toggleView" v-show="diskTableBtn==0" v-cloak>
                  <el-table
                    :data="diskQuery"
                    style="width: 100% ;border-top: 1px solid #D7E1EB"
                    :show-header="false"
                    highlight-current-row>
                    <el-table-column>
                      <template slot-scope="props">
                        <div class="diskContent">
                          <div class="diskImages"></div>
                          <div class="diskText">
                            <div>{{props.row.name}}</div>
                            <div>{{props.row.description}}</div>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <div class="disk-dropDown-Container">
                          <el-row>
                            <el-col :span="12" class="row-text">{{$t('storage.type')}}</el-col>
                            <el-col :span="12" class="row-data row-data-status">{{ props.row.type}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" class="row-text">{{$t('storage.diskSize')}}</el-col>
                            <el-col :span="12" class="row-data row-data-status">{{ props.row.size|filterSize}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" class="row-text">{{$t('storage.serialNumber')}}</el-col>
                            <el-col :span="12" class="row-data row-data-status">{{ props.row.serial}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" class="row-text">{{$t('storage.transmissionMode')}}</el-col>
                            <el-col :span="12" class="row-data row-data-status">{{ props.row.model}}
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" class="row-text">{{$t('storage.standbyMode')}}</el-col>
                            <el-col :span="12" class="row-data row-data-status">{{ props.row.hddstandby}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" class="row-text">Enable S.M.A.R.T.</el-col>
                            <el-col :span="12" class="row-data row-data-status">{{ props.row.togglesmart
                              ==''?'N/A':props.row.togglesmart }}
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12" class="row-text">S.M.A.R.T. extra option</el-col>
                            <el-col :span="12" class="row-data row-data-status">{{
                              props.row.smartoptions==''?'N/A':props.row.smartoptions}}
                            </el-col>
                          </el-row>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="toggleView" v-show="diskTableBtn==1" v-cloak>
                  <el-table :data="diskQuery" border style="width: 100%" height="100%">
                    <el-table-column
                      prop="name"
                      :label="$t('user.name')"
                      :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      :label="$t('storage.type')"
                      :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                      prop="size"
                      :label="$t('storage.diskSize')"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">{{scope.row.size|filterSize}}</template>
                    </el-table-column>
                    <el-table-column
                      prop="serial"
                      :label="$t('storage.serialNumber')"
                      :show-overflow-tooltip="true">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <!--          <el-tab-pane label="日志" name="second">日志</el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Swiper from "@components/storagePanel/swiper/swiper";
  import memory from "@components/storagePanel/memoryCharts/memory";
  // import {diskList, arrayList} from '@api/Array/ArrayContact'
  import {mapState} from 'vuex'
  import {assign_compatible} from "@common/js/publicMethod/publicMethod";
  // import {Percentage} from "@common/common/debounceAndThrottle";
  // import {poolData} from "@common/js/storage";

  let timeout = null
  export default {
    name: 'ResourcesMenu',
    props: {},
    components: {
      memory,
      Swiper
    },

    data: function () {
      return {
        poolChildrenActive: [],
        collapseActive: [0],
        addErrorMassage: '',
        addWarning: false,
        showWarning: false,
        errorMassage: '',
        isShowMemory: false,
        //内存条的颜色及进度
        progressBar: {
          percentage: 20,
          customColor: '#00aaff',
        },
        progressBars: {
          percentage: 100,
          customColor: '#2e7ae5',
        },
        //切换存储池要展示的状态
        selectState: this.$t('storage.allPool'),/* '所有存储池'*/
        /* {
         title: '存储空间',
         icon: 'icon-kongjian',
         ico: 'iconfont'
         }, */
        logListMenu: [{
          title: this.$t('title.overview'),/*'总览'*/
          icon: 'icon-zonglan',
          ico: 'iconfont'
        }, {
          title: this.$t('storage.pool'),/*'存储池'*/
          icon: 'icon-cunchuchi',
          ico: 'iconfont'
        }, {
          title: 'HDD/SSD',
          icon: 'icon-yingpan',
          ico: 'iconfont'
        }],
        index: 0,
        current: 0,
        //存储池 表格按钮切换
        PoolTableBtn: 0,
        //硬盘按钮切换
        diskTableBtn: 0,
        activeName: 'first',
        // 阵列数据列表
        arrayList: [{name: '', avail: '', used: ''}],
        //硬盘数据列表
        diskList: [],
        showLoading: true,
        memoryLoading: true,
        timeout5: null,
        //是否禁用阵列新增按钮
        isNewBtn: false,
        //未使用的池盘
        diskUse: null,

        getWebsockeParams: {},
        //系统信息
        systemInfoParams: {},
        //内存信息
        memoryParams: {},
        memory: {
          percent: 0
        },
        memoryStatus: {
          total: null,
          percent: null,
          available: null,
          used: null
        },
        //池状态
        poolsStatus: 'ONLINE',
        flag: 1,
        system_info: {},//系统信息
        system_health: {},//系统状态
        poolArray: [],
        diskQuery: [],//所有硬盘
        disk_get_unusedS: 0,//未使用的硬盘数量
        poolDiskInfo: {},//存储池硬盘详细信息
        isStorageMenu: false,
        processData: [],//处理过的池数据
        poolName: [],
        drop_downList: [],//总览下拉
        view_PoolInfo: {},//下拉详细信息
        viewIndex: 0,//当前展开的折叠卡索引
        isDisable: true
      }
    },
    mounted () {
    },
    created () {
    },
    destroyed () {
      // this.$EventBus.$off('disk_get_unused')
    },
    computed: {
      ...mapState('Dialog', {
        showStorage: state => state.dialogShow.storage_Panel
      }),
      ...mapState('v_scoket', {
        pool_dataset_query: state => state["pool_dataset_query"],
        pool_query: state => state["pool_query"],
        disk_query: state => state['disk_query'],
        disk_get_unused: state => state['disk_get_unused'],
        disk_One_query: state => state['disk_One_query']
      }),
      ...mapState('storage', {
        isReset: state => state.isReset
      }),
      disk_total () {//硬盘使用个数
        return this.diskQuery.length - this.disk_get_unusedS.length
      },
    },
    watch: {
      showStorage (val) {
        if (val) {
          this.DataProcessing()
        } else {
          assign_compatible()
          Object.assign(this.$data, this.$options.data.call(this))
        }
      },
      "$store.state.v_scoket.system_info" (val) {
        // console.log(val)
        // this.system_infos()
      },
      disk_query (val) { //获取所有硬盘
        if (!val) return
        val.result.forEach((item, index) => {//去除第一个硬盘信息
          if (index == 0) val.result.splice(index, 1)
        })
        this.diskQuery = val.result
      },
      disk_get_unused (val) {//未使用的硬盘
        if (!val) return
        this.disk_get_unusedS = val.result
      },
      pool_dataset_query (val) {//获取数据集
        if (!val) return
        this.queryPools()
      },
      disk_One_query (val) {//查询某一个硬盘的详细数据
        if (!val) return
        if (val.error) {
          this.errorMassage = this.$t('reminder.getDiskError')//'获取池数据失败!'
          this.showWarning = true
          return
        }
        this.poolDiskInfo = val.result[0]
      },
      isReset () {
        this.showLoading = true
        this.$nextTick(()=>{
          this.viewIndex = 0//当前展开的折叠卡索引
          this.isDisable = true
          this.collapseActive=[0]
        })
      },
    },
    methods: {
      //新增池
      addArrayEvent () {
        this.$parent.$parent.refreshWebsocketData("disk-get_unused");//获取所有池
        //创建弹框
        this.$emit('newPopup', '4', '4_child', this.$t('storage.newDisk'))/*'新增存储池'*/
      },
      returnInfos () {//返回基本信息
        this.$refs['poolSwiper'][this.viewIndex].reduce()
      },
      MoreInfos (row) {//查看硬盘详细信息
        this.$refs['poolSwiper'][this.viewIndex].add()
        this.$store.commit('v_scoket/socketSend', [{
          name: 'disk_One_query',
          params: [[["name", "=", row.disk]]]
        }])
      },
      queryPools () {//获取池和硬盘信息
        this.$store.getters['v_scoket/filter_pool_query'].then((res) => {
          this.showLoading = false
          let {processData, OverviewDropDownList} = res
          this.drop_downList = OverviewDropDownList
          this.drop_downList.splice(0, 0, this.$t('storage.allPool'))
          this.processData = processData
          this.isDisable = processData.length == 0 ? true : false
        }).catch(err => {
          this.showLoading = false
          this.showWarning = true
          this.errorMassage = this.$t('reminder.getDiskError')//'获取池数据失败!'
        })
      },
      system_infos () {
        if (this.$store.state.v_scoket.system_info != null) {
          this.system_info["system-info"] = this.$store.state.v_scoket.system_info
          this.systemInfoParams = this.system_info["system-info"].result
        }
      },
      //弹框初始化发送指令
      DataProcessing () {
        //获取所有池 获取所有硬盘 获取未使用的硬盘 获取数据集
        const clock = ['pool-query', 'disk-query', 'disk-get_unused', 'pool-dataset_query']
        this.$store.commit('v_scoket/socketSend', clock)
        this.system_infos()
      },
      collapseChange (index) {//池盘折叠卡切换选中
        this.viewIndex = index
        this.isDisable = typeof index != 'number';
      },
      //删除池
      getArrayRelated () {//发送指令获取池相关的依赖
        if (!this.processData.length) return
        let {id, name} = this.processData[this.viewIndex]
        const clock = ['system_advanced', {name: 'pool_attachments', params: [id]}, {
          name: 'pool_processes',
          params: [id]
        }]
        this.$store.commit('storage/pooName', name)
        this.$store.commit('v_scoket/socketSend', clock)
        this.$emit('newPopup', '4', '4_child', this.$t('storage.deleteDisk'))/*'新增存储池'*/
        this.$EventBus.$emit('deleteId', id)
      },
      //切换视图 存储池
      tabsSwitch (index) {
        index == 0 ? this.PoolTableBtn = 0 : this.PoolTableBtn = 1
      },
      //切换视图 硬盘
      diskBtnSwitch (index) {
        index == 0 ? this.diskTableBtn = 0 : this.diskTableBtn = 1
      },
      closeWarning (flag) {
        this.showWarning = false
        this.addWarning = false
      },
      //存储菜单点击事件
      storageMenuClick (index, item) {
        if (index == this.current) {
          return
        }
        this.current = index
        this.index = index
      },
      //存储状态下拉事件
      dropDownOptionEvent (value) {
        this.selectState = value
        if (value !== this.$t('storage.allPool')) {
          let result = this.processData.filter(item => item.name === value)
          if (result.length == 0) return
          this.view_PoolInfo = result[0]
        }
      },
      resetData () {

      }
    },
    filters: {},
  }

</script>

<style lang="less" scoped>
  @deep: ~'>>>';

  //element按钮的样式穿透
  @{deep}.el-dropdown-menu__item:hover {
    background-color: #3196de !important;
    color: #fff;
    border-radius: 4px;
  }

  .storagePanelMenu @{deep}.iconfont {
    font-size: 25px !important;
  }

  .storage-btn @{deep} .el-dropdown {
    border: 1px solid #C8D2DC !important;
    background-color: #F5FAFF;
    border-radius: 4px;
    padding: 5px 17px;
    font-size: 12px;
    cursor: pointer;
  }

  .storage-btn @{deep} .el-dropdown:hover {
    border: 1px solid #B4BEC8 !important;
  }

  .storage-btn @{deep} .iconfont {
    font-size: 12px !important;
  }

  .el-dropdown-menu @{deep} .el-dropdown-menu__item {
    font-size: 14px !important;
  }

  .el-dropdown-menu @{deep} .el-dropdown-menu__item:hover {
    background-color: #0086E5 !important;
    color: #fff;
  }

  .el-popper @{deep} {
    padding: 5px !important;
  }

  /*表格的padding值 及样式*/

  .table_view @{deep}.el-table td, .el-table th {
    /*padding: 3px 0 !important;*/
  }

  .drop-Down-Container @{deep} .el-table td, .el-table th {
    padding: 0 !important;
  }

  .drop-Down-Container @{deep} .el-table th > .cell {
    background-color: #8FB3CC;
    color: #fff;
  }


  .drop-Down-Container@{deep}.el-table--fit {
    border: 1px solid #8FB3CC;
  }

  @{deep}.el-table td {
    border: 0 !important;
    border-bottom: 1px solid #EBEEF5 !important;
  }

  @{deep}.el-table th > .cell {
    /*text-align: left;*/
    color: #0086E5;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /*  <!--@{deep}.el-table .cell {-->
    <!--  text-align: left;-->
    <!--  font-size: 12px;-->
    <!--}-->*/

  @{deep}.el-table--border {
    border: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto !important;
  }

  @{deep}.el-table__body-wrapper {
    flex: 1;
    box-sizing: border-box;
    overflow-y: auto !important;
  }

  @{deep}.el-table--border::after {
    width: 0;
    background-color: #fff;
  }

  @{deep}.el-table::before {
    background-color: #fff;
  }

  .storage-panel {
    height: 100%;
  }

  .storagePanel {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    /*菜单导航样式*/

    .storage-left {
      width: 223px;
      min-width: 223px;
      height: 100%;
      box-sizing: border-box;
      margin-right: 10px;
      /*margin-top: 10px;*/

      .storagePanelMenu {
        border-radius: 5px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 10px 0 10px;
        box-sizing: border-box;
        font-size: 14px;
      }

      .storagePanelMenu i {
        padding-right: 10px;

      }

      .storagePanelMenu:hover {
        cursor: pointer;
        background-color: #c2ddf5;
        color: #222222;
      }
    }

    .storage-container {
      flex: 1;
      overflow-y: auto;
    }
  }

  //右侧样式
  .storage-right {
    flex: 1;
    width: 100%;
    height: 100%;
    border-left: 1px solid #E4E5E5;
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;
    padding: 5px 5px 0 10px;
    //总览
    .storage-Overview-container {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 5px;

      .systemMessage {
        font-size: 14px;
        margin-bottom: 5px;
        color: #0086E5;
        font-weight: bold;
      }

      .storage-status {
        /*background-color: #E6F5FF;*/
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        /*height: 108px;*/
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        /*padding: 20px 50px 20px 50px;*/
        /*line-height: 160px;*/
        font-size: 14px;
        margin-bottom: 10px;

        .rowDiv {
          padding: 5px 10px;
        }

        .storage-icon {
          width: 64px;
          height: 64px;
          background: url("/static/images/storage/icon_health_m.png") no-repeat;
        }

        .storage-status-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 24px;

          .storage-status-color {
            color: #1CA600;
            line-height: 22px;
            font-size: 20px;
            padding-bottom: 10px;
          }

          .storage-status-color1 {
            font-size: 12px;
            line-height: 18px;
            color: #505A64;
          }
        }
      }

      .Storage-space-status {
        margin-top: 10px;
        /*height: 200px;*/
        overflow: hidden;
        /*存储空间状态容器*/

        .Storage-space-container {
          width: 100%;
          height: 170px;
          padding: 10px 0;
          box-sizing: border-box;
        }
      }

      .Storage-space-text {
        background-color: #F3F6F8;
        padding: 7px 5px 7px 5px;
        color: #505A64;
        font-size: 13px;
      }

      /*存储池下拉菜单样式*/

      .Storage-title-style {
        font-size: 13px;
        font-weight: bold;
        color: #0086E5;
        cursor: pointer;

        .Triangle {
          position: absolute;
          top: 7px;
          right: -15px;
          width: 0;
          height: 0;
          border-width: 6px 6px 0px 6px; /*可设置方向*/
          border-color: #0086E5 transparent;
          border-style: solid;
          border-radius: 2px;
        }
      }

      .Storage-title-style:hover {
        color: #0095ff;
      }

      /*硬盘信息样式*/

      .hard-Disk-container {

        .used-container {
          padding-top: 10px;
          width: 100%;
          height: 100px;
          margin-top: 10px;
          /*margin-left: 10px;*/
          box-sizing: border-box;
          padding-left: 10px;

          .used {
            width: 222px;
            height: 54px;
            border: 1px solid #ccc;
            border-top: 4px solid #3D85CC;
            font-size: 13px;
            text-align: center;

            div:nth-child(1) {
              padding-top: 5px;
              color: #505A64;
              font-size: 11px;
              padding-bottom: 1px;
            }

            div:nth-child(2) {
              color: #3D85CC;
              font-size: 15px;
              font-weight: bold;
            }

          }
        }
      }

      /*存储分配样式*/

      .Storage-allocation {
        height: 100px;
        display: flex;
        padding: 10px 5px;
        box-sizing: border-box;

        .Storage-allocation-left {
          padding-top: 20px;
          flex: 7;
          padding-left: 20px;
          box-sizing: border-box;
          float: left;
          font-size: 14px;

          .Storage-text-style {
            font-weight: bold;
          }

          .avail-style {
            color: #0086E5
          }
        }

        @{deep}.Storage-allocation-left .el-progress-bar {
          width: 100%
        }

        @{deep}.el-progress {
          display: flex;
        }
      }
    }

    //存储空间 存储池 按钮样式
    .storage-space-container, .storage-pool-container, .storage-SDD-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow-y: auto;
      height: 100%;

      .storage-btn {
        display: flex;
        justify-content: space-between;
        /*margin-bottom: 7px;*/
        height: 28px;
        padding: 5px 0;
        /*按钮通用样式 */

        .PoolPlate-test {
          font-size: 16px;
          color: #0086E5;
        }

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

      .collapse-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
      }

      .toggleView {
        height: 100%;
      }

      /*下拉样式*/

      .disk-dropDown-Container {
        padding: 10px 71px;

        .el-row {
          padding-top: 7px;

          .row-text {
            font-weight: bold;
            font-size: 12px;
          }

          .row-data-status {
            color: #505A64;
            font-size: 12px;
          }
        }
      }
    }
    .storage-SDD-container{
      overflow: hidden;
      .toggleView{
        overflow: auto;
      }
    }
  }

  .classBlue {
    background-color: #0086E5;
    color: #fff;
  }

  //手风琴样式-------------------------------------
  /*element手风琴样式穿透*/

  @{deep}.tabs .el-tabs__content .el-tab-pane {
    overflow: hidden;
  }

  @{deep}.el-collapse {
    height: 100%;
  }


  .drop-Down-Container@{deep} .el-collapse-item__header {
    background-color: #8FB3CC !important;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #FFF;
    color: #fff;
  }

  .drop-Down-Container@{deep} .el-collapse-item:last-child .el-collapse-item__header {
    border-bottom: 1px solid #8FB3CC !important;
  }

  .drop-Down-Container@{deep} .el-collapse {
    border: 1px solid #8FB3CC;
  }

  .drop-Down-Container@{deep}.el-collapse-item:last-child {
    margin-bottom: 0px !important;
  }

  .drop-Down-Container@{deep}.el-collapse-item__content {
    padding-bottom: 0;
  }


  @{deep}.el-collapse-item__header.is-active {
    background-color: #E6F5FF;
  }

  @{deep} .el-collapse-item__wrap {
    border-bottom: 0;
    overflow: auto;
  }

  @{deep}.el-collapse-item.is-active .el-collapse-item__wrap {
    /*border-bottom: 0;*/
    background-color: #E6F5FF !important;
    /*padding: 0 83px;*/
    /*max-height: 300px;*/
    /*height: 100%;*/
    /*overflow: auto;*/
  }


  /*进度条长度*/
  @{deep}.el-progress-bar {
    width: 200px;
    margin-top: 4px;
    border-radius: 0;
  }

  @{deep}.el-progress-bar__outer {
    height: 8px !important;
    background-color: #ccc;
    border-radius: 0;
  }

  @{deep}.el-progress-bar__inner {
    border-radius: 0;
  }

  /*
  tab切换滑动
  */
  /*  @{deep}.is-top{
      transform: translateX(0px);
    }*/
  //手风琴菜单样式
  .storage-fold-icon {
    height: 32px;
    width: 37px;
    margin-left: 20px;
  }

  .storage {
    background: url("/static/images/storage/g_icon_storage.png") 0 -480px;
  }

  .Storage-pool {
    background: url("/static/images/storage/g_icon_storage.png") 0px -192px;
  }

  .Storage-disk {
    background: url("/static/images/storage/g_icon_storage.png") 0px -224px;
  }

  .storage-fold-content {
    position: relative;
    height: 48px;
    width: 100%;
    margin-left: 10px;

    .fold-text-style-left {
      position: absolute;
      left: 0;

      div {
        font-size: 14px;
        font-weight: bold;

        span {
          font-weight: 400;
          color: #1CA600;
        }
      }
    }

    .fold-text-style-right {
      position: absolute;
      right: 20px;
      top: 0;
      height: 48px;
      width: 200px;
      display: flex;
      flex-direction: column;

      .progress-Bar {
        height: 25px;
        line-height: 35px;
        color: #505A64;
        font-size: 12px;

        .Bar-text-style {
          color: #00A4EF
        }
      }
    }
  }

  .drop-Down-Container {
    /*padding: 40px 71px;*/
    overflow: hidden;

    .Pool_basicInfo {
      padding: 0 83px;
    }

    .el-row {
      .row-text {
        font-weight: bold;
        font-size: 12px;
      }

      .row-data-status {
        color: #1CA600;
        font-size: 12px;
      }
    }

    .row-table-text {
      padding-top: 7px;
    }

    .MoreInfo, .MoreInfos {
      cursor: pointer;
    }

    .MoreInfo {
      font-size: 12px;
    }

    .DetailsInfo, .AdvancedInfo {
      padding-left: 83px;
    }

    .Details_title, .Advanced_title {
      margin-left: 30px;
    }
  }

  //磁盘折叠table样式
  .diskContent {
    display: flex;

    .diskImages {
      left: 0;
      margin: 7px;
      width: 32px;
      height: 32px;
      background: url("/static/images/storage/disk.png") 0px -224px no-repeat;
    }

    .diskText {
      display: flex;
      flex-direction: column;
      text-align: left;
      justify-content: center;
      align-content: center;
      margin-left: 10px;
      color: #505A64;
    }

    .diskText div:nth-child(1) {
      font-size: 14px;
      font-weight: bold;
    }

    .diskText div:nth-child(1) {
      font-size: 12px;
    }
  }

  .statusIcoBox {
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;

    .statusIcoSuccess {
      background: url("/static/images/global/icon_success.png");
    }

    .statusIcoError {
      background: url("/static/images/global/icon_error.png");
    }

    .statusIcoSuccess, .statusIcoError {
      display: inline-block;
      vertical-align: middle;
      width: 14px;
      height: 14px;
      background-size: cover;
    }

  }

  [v-cloak] {
    display: none !important;
  }
</style>
