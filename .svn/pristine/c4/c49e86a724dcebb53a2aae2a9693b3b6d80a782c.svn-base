<template>
  <div class="5" style="height: 100%;" v-if="log_Panel">
    <div class="logPanel">
      <gl-dialog :is-show="showDialog" @determine="determineEvent" @cancel="cancelEvent"
                 @dialogClose="closeEvent"></gl-dialog>
      <gl-warning-dialog :is-show="showError" @warningDialogClose="warningDialogClose">{{errorMessage}}
      </gl-warning-dialog>
      <div class="left">
        <div class="logMenu" v-for="(item,index) in logListMenu" :key="index" :class="{classBlue:index==current}"
             @click="logMenuClick(index,item)">
          <i :class="[`${item.icon}`,`${item.ico}`,'iconPositionStyle']"></i>
          {{item.title}}
        </div>
      </div>
      <div class="right">
        <gl-load-animation :is-load-show="loadAnimation"></gl-load-animation>
        <div class="right_box" v-show="index==0">
          <el-collapse v-model="sectionActiveName" class="logDescription">
            <el-collapse-item :title="$t('log.numberOfLogs')" name="logNum" class="logNum"><!--日志数量-->
              <div class="logCount">
                <div id="log_echarts" ref="log_echarts"></div>
                <div class="log_title_Content">
                  <div><span class="statistics">{{$t('log.statistics')}}</span></div><!--统计-->
                  <el-row>
                    <el-col :span="24">
                      <div class="colourSize">
                        <div class="Cube" style="background-color: green"></div>
                        <span style="color:green ">{{$t('log.by')+": "+logCount.byCount}}</span><!--通过-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="colourSize">
                        <div class="Cube" style="background-color: orange"></div>
                        <span style="color: orange">{{$t('log.caveat')+": "+logCount.caveatCount}}</span><!--警告:-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="colourSize">
                        <div class="Cube" style="background-color: #fdb36a"></div>
                        <span style="color:#fdb36a ">{{$t('log.prevent')+": "+logCount.preventCount}}</span><!--阻止:-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="colourSize">
                        <div class="Cube" style="background-color: #fa4b4b"></div>
                        <span style="color: #fa4b4b">{{$t('log.error')+": "+logCount.errorCount}}</span><!--错误: -->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="colourSize">
                        <div class="Cube"></div>
                        <span style="color: #37a2da">{{$t('log.total')+": "+logCount.count}}</span><!--总计: -->
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="$t('log.lastLogs')" name="top50" class="top50"><!--上50个日志-->
              <!--table表格-->
              <el-table
                fixed
                :data="logSectionDataList"
                style="width: 100%;margin-top: 10px"
                height="100%"
                border
              >
                <el-table-column
                  prop="action"
                  :label="$t('log.operatingStatus')"
                  :show-overflow-tooltip="true">
                  <template slot-scope="logDataList">
                    <span :style="{color:logDataList.row .action==1?'green':'Orange'}">{{logDataList.row.action==1?$t('log.by'):$t('log.by')}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="logType"
                  :label="$t('log.logType')"
                  :show-overflow-tooltip="true">
                  <template slot-scope="logDataList">
                    {{logDataList.row.logType==1?$t('log.systemLog'):''||logDataList.row.logType==3?$t('log.onlineUserLog'):''||logDataList.row.logType==2?$t('log.userLog'):''}}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('title.time')"
                  prop="logDate"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="logDataList">
                    {{logDataList.row.logDate|filterDate('yyyy-MM-dd hh:mm:ss')}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="userId"
                  :label="$t('controlMenu.user')"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  prop="logEnevt"
                  :label="$t('log.event')"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  prop="logDetails"
                  :label="$t('log.eventDetails')"
                  :show-overflow-tooltip="true">
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
          <!--        &lt;!&ndash;加载动画&ndash;&gt;-->
        </div>
        <div class="right_box" v-show="index==1">
          <el-tabs class="tabs" v-model="activeName" type="card" style="height: 100%;">
            <el-tab-pane :label="$t('tabs.current')" name="first">
              <!--按钮组-->
              <header class="current_log_btn">
                <div class="control-first-btn">
                  <gl-button-style type="white" :disable="buttonStatus" @click="logDelete">
                    <span>{{$t('user.delete')}}</span><!--删除-->
                  </gl-button-style>
                  <el-dropdown split-button size="mini" trigger="click" @click="handleClick2('b')"
                               @command="handleClick2" class="menuBtn" >
                    {{$t('title.exports')}}<!--导出-->
                    <el-dropdown-menu slot="dropdown"  class="logExport">
                      <!--                      <el-dropdown-item command="a">HTML</el-dropdown-item>-->
                      <el-dropdown-item command="b">CSV</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <!--                <el-col :span="12"></el-col>-->
              </header>
              <section class="current_log_table">
                <!--table表格-->
                <el-table
                  fixed
                  :data="logDataList"
                  style="width: 100%"
                  height="100%"
                  border
                  highlight-current-row
                  @row-click="currentLogIds"
                >
                  <el-table-column
                    prop="action"
                    :label="$t('log.operatingStatus')"
                    :show-overflow-tooltip="true">
                    <template slot-scope="logDataList">
                      <span :style="{color:logDataList.row .action==1?'green':'Orange'}">{{logDataList.row.action==1?$t('log.by'):$t('log.prevent')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="logType"
                    :label="$t('log.logType')"
                    :show-overflow-tooltip="true">
                    <template slot-scope="logDataList">
                      {{logDataList.row.logType==1?$t('log.systemLog'):''||logDataList.row.logType==3?$t('log.onlineUserLog'):''||logDataList.row.logType==2?$t('log.userLog'):''}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('title.time')"
                    prop="logDate"
                    :show-overflow-tooltip="true"
                  >
                    <template slot-scope="logDataList">
                      {{logDataList.row.logDate|filterDate('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="userId"
                    :label="$t('controlMenu.user')"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                    prop="logEnevt"
                    :label="$t('log.event')"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                    prop="logDetails"
                    :label="$t('log.eventDetails')"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                </el-table>
              </section>
              <!--分页器-->
              <footer class="current_log_pagination">
                <div class="Pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="logList.pageNum"
                    :page-sizes="[20, 50, 100, 200]"
                    :page-size="logList.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="logData.total"
                    background>
                  </el-pagination>
                  <span :title="$t('common.refresh')" class="Refresh iconfont icon-shuaxin" @click="Refresh"></span>
                  <!--刷新-->
                </div>
              </footer>
            </el-tab-pane>
            <el-tab-pane :label="$t('tabs.archived')" name="second" :disabled="true">{{$t('tabs.archived')}}
            </el-tab-pane><!--已存档-->
          </el-tabs>
          <!--        <gl-load-animation  :is-load-show="loadAnimation1"></gl-load-animation>-->
        </div>
        <!--        <div class="right" v-show="index==2">-->
        <!--          <div class="Notice-container">-->
        <!--            <div class="Notice-header"><span>{{$t('log.notificationRules')}}</span></div>&lt;!&ndash;通知规则&ndash;&gt;-->
        <!--            <div class="Notice-content">-->
        <!--              <ul>-->
        <!--                <li class="Notice-content-first">-->
        <!--                  {{$t('log.noticeText')}}-->
        <!--                </li>-->
        <!--                <li class="Notice-content-second">-->
        <!--                <span class="Notice-content-checked">-->
        <!--                  <el-checkbox v-model="checked_one" :label="$t('log.LogsSecond')"></el-checkbox>&lt;!&ndash;每秒日志数超出&ndash;&gt;-->
        <!--                </span>-->
        <!--                  <span class="Notice-content-input">-->
        <!--                  <el-input v-model="inputValue" size="mini"></el-input>-->
        <!--                </span>-->
        <!--                </li>-->
        <!--                <li class="Notice-content-third">-->
        <!--                <span class="Notice-content-checked1">-->
        <!--                  <el-checkbox v-model="checked_two" :label="$t('log.severityIs')"></el-checkbox>&lt;!&ndash;严重性为&ndash;&gt;-->
        <!--                </span>-->
        <!--                  <span>-->
        <!--                  <el-select v-model="value" clearable :placeholder="$t('common.pleaseChoose')" style="width: 178px;"-->
        <!--                             size="mini">-->
        <!--                    <el-option-->
        <!--                      v-for="item in options"-->
        <!--                      :key="item.value"-->
        <!--                      :label="item.label"-->
        <!--                      :value="item.value">-->
        <!--                    </el-option>-->
        <!--                    </el-select>-->
        <!--                </span>-->
        <!--                </li>-->
        <!--                <li class="Notice-content-fourth">-->
        <!--                 <span class="Notice-content-checked2">-->
        <!--                  <el-checkbox v-model="checked_three" :label="$t('log.keywordsInclude')"></el-checkbox>-->
        <!--                </span>-->
        <!--                  <span>-->
        <!--                  <el-input v-model="inputValue_one" :placeholder="$t('log.PleaseEnterAKeyword')"-->
        <!--                            size="mini"></el-input>-->
        <!--                </span>-->
        <!--                </li>-->
        <!--                <li class="Notice-content-fifth">-->
        <!--                  <div class="Notice-content-input1">-->
        <!--                    <el-input v-model="inputValue_two" :placeholder="$t('log.PleaseEnterAKeyword')"-->
        <!--                              size="mini"></el-input>-->
        <!--                  </div>-->
        <!--                </li>-->
        <!--                <li>-->
        <!--                  <div class="Notice-content-input1">-->
        <!--                    <el-input v-model="inputValue_three" :placeholder="$t('log.PleaseEnterAKeyword')"-->
        <!--                              size="mini"></el-input>-->
        <!--                  </div>-->
        <!--                </li>-->
        <!--              </ul>-->
        <!--            </div>-->
        <!--            <div class="tabFooter">-->
        <!--              <div class="tabFooterBorder">-->
        <!--                <div class="btnGroup">-->
        <!--                  <gl-button-style size="medium" type="blue">{{$t('common.apply')}}</gl-button-style>&lt;!&ndash;应用&ndash;&gt;-->
        <!--                  <gl-button-style size="medium">{{$t('common.reset')}}</gl-button-style>&lt;!&ndash;重置&ndash;&gt;-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="right" v-show="index==3">-->
        <!--          <div class="Archive-container">-->
        <!--            <div class="Archive-content">-->
        <!--              <div class="Archive-header-title">-->
        <!--                <div class="Archive-header-purpose"><span>{{$t('log.fileStorageDes')}}</span></div>&lt;!&ndash;档案的存储目的地&ndash;&gt;-->
        <!--                <div class="Archive-purpose-content">-->
        <!--                  <div class="Archive-purpose-first">-->
        <!--                    <span>{{$t('title.aims')}}</span>&lt;!&ndash;目标&ndash;&gt;-->
        <!--                    <el-input size="mini" :placeholder="$t('log.pleaseSelect')"></el-input>&lt;!&ndash;请选择一个共享文件夹&ndash;&gt;-->
        <!--                    <gl-button-style>{{$t('log.selectedLocation')}}</gl-button-style>&lt;!&ndash;选择位置&ndash;&gt;-->
        <!--                  </div>-->
        <!--                  <div class="Archive-purpose-second">-->
        <!--                    <el-checkbox :label="$t('log.archiveDirectory')"></el-checkbox>&lt;!&ndash;将本地日志归档到之前指定的存储位置&ndash;&gt;-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="Archive-header-title">-->
        <!--                <div class="Archive-header-rules"><span>{{$t('log.archivingRules')}}</span></div>&lt;!&ndash;归档规则&ndash;&gt;-->
        <!--                <div class="Archive-rules-content">-->
        <!--                  <div class="Archive-rules-text">{{$t('log.archiveError')}}</div>&lt;!&ndash;出现以下事件时，将当前日志数据库归档:&ndash;&gt;-->
        <!--                  <div class="Archive-rules-select">-->
        <!--                    <div ><span>{{$t('log.databaseSize')}}</span></div>&lt;!&ndash;数据库大小超过&ndash;&gt;-->
        <!--                    <el-select v-model="value" clearable :placeholder="$t('common.pleaseChoose')" style="width: 178px;"-->
        <!--                               size="mini">-->
        <!--                      <el-option-->
        <!--                        v-for="item in options"-->
        <!--                        :key="item.value"-->
        <!--                        :label="item.label"-->
        <!--                        :value="item.value">-->
        <!--                      </el-option>-->
        <!--                    </el-select>-->
        <!--                  </div>-->
        <!--                  <div class="Archive-rules-select">-->
        <!--                    <el-checkbox size="mini" :label="$t('log.logQuantityBig')"></el-checkbox>&lt;!&ndash;日志数量大于&ndash;&gt;-->
        <!--                    <el-select v-model="value" clearable :placeholder="$t('common.pleaseChoose')" style="width: 178px;"-->
        <!--                               size="mini">-->
        <!--                      <el-option-->
        <!--                        v-for="item in options"-->
        <!--                        :key="item.value"-->
        <!--                        :label="item.label"-->
        <!--                        :value="item.value">-->
        <!--                      </el-option>-->
        <!--                    </el-select>-->
        <!--                  </div>-->
        <!--                  <div class="Archive-rules-select">-->
        <!--                    <el-checkbox size="mini" :label="$t('log.logQuantityLess')"></el-checkbox>-->
        <!--                    <el-select v-model="value" clearable :placeholder="$t('common.pleaseChoose')" style="width: 178px;"-->
        <!--                               size="mini">-->
        <!--                      <el-option-->
        <!--                        v-for="item in options"-->
        <!--                        :key="item.value"-->
        <!--                        :label="item.label"-->
        <!--                        :value="item.value">-->
        <!--                      </el-option>-->
        <!--                    </el-select>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="Archive-header-title">-->
        <!--                <div class="Archive-header-format"><span>{{$t('log.archiveFormat')}}</span></div>&lt;!&ndash;归档格式&ndash;&gt;-->
        <!--                <div class="Archive-format-content">-->
        <!--                  <ul class="Archive-format-box">-->
        <!--                    <li>{{$t('log.otherArchive')}}。</li>&lt;!&ndash;为其他归档设置启用以下选项&ndash;&gt;-->
        <!--                    <li>-->
        <!--                      <el-checkbox size="mini" :label="$t('log.defaultFormat')"></el-checkbox>&lt;!&ndash;除默认格式外，将日志以文本格式归档&ndash;&gt;-->
        <!--                    </li>-->
        <!--                    <li>-->
        <!--                      <el-checkbox size="mini" :label="$t('log.compressLogFiles')"></el-checkbox>&lt;!&ndash;压缩日志档案&ndash;&gt;-->
        <!--                    </li>-->
        <!--                    <li>-->
        <!--                      <el-checkbox size="mini" :label="$t('log.separateArchive')"></el-checkbox>&lt;!&ndash;根据设备分开归档日志&ndash;&gt;-->
        <!--                    </li>-->
        <!--                  </ul>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div class="tabFooter">-->
        <!--              <div class="tabFooterBorder">-->
        <!--                <div class="btnGroup">-->
        <!--                  <gl-button-style size="medium" type="blue">{{$t('common.apply')}}</gl-button-style>&lt;!&ndash;应用&ndash;&gt;-->
        <!--                  <gl-button-style size="medium">{{$t('common.reset')}}</gl-button-style>&lt;!&ndash;重置&ndash;&gt;-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="right" v-show="index==4">-->
        <!--          <div class="logstyle">-->
        <!--            <el-tabs class="tabs" v-model="position_activeName" type="card" style="height: 100%;flex: 1">-->
        <!--              <el-tab-pane :label="$t('log.position')" name="position-first">-->
        <!--                <div class="log-send-container">-->
        <!--                  <div class="position-content">-->
        <!--                    <el-checkbox :label="$t('log.sendLog')" style="margin-bottom: 5px ;"></el-checkbox>-->
        <!--                    &lt;!&ndash;将日志发送至 syslog 服务器&ndash;&gt;-->
        <!--                    <div>-->
        <!--                      <span class="text-style">{{$t('log.server')}}:</span>&lt;!&ndash;服务器&ndash;&gt;-->
        <!--                      <el-input style="width: 193px" size="mini" type="text"-->
        <!--                                :placeholder="$t('log.serverNameOrIp')"></el-input>&lt;!&ndash;服务器名称或 IP 地址&ndash;&gt;-->
        <!--                    </div>-->
        <!--                    <div>-->
        <!--                      <span class="text-style1">{{$t('netWork.port')}}:</span>&lt;!&ndash;端口&ndash;&gt;-->
        <!--                      <el-input style="width: 193px" size="mini" type="text" placeholder="514"></el-input>-->
        <!--                    </div>-->
        <!--                    <div>-->
        <!--                      <span>{{$t('log.transferProtocol')}}:</span>&lt;!&ndash;传输协议&ndash;&gt;-->
        <!--                      <el-select v-model="value" :placeholder="$t('common.pleaseChoose')" size="mini">-->
        <!--                        <el-option-->
        <!--                          v-for="item in options"-->
        <!--                          :key="item.value"-->
        <!--                          :label="item.label"-->
        <!--                          :value="item.value">-->
        <!--                        </el-option>-->
        <!--                      </el-select>-->
        <!--                    </div>-->
        <!--                    <div>-->
        <!--                      <span>{{$t('log.logFormat')}}:</span>&lt;!&ndash;日志格式&ndash;&gt;-->
        <!--                      <el-select v-model="value" :placeholder="$t('common.pleaseChoose')" size="mini">-->
        <!--                        <el-option-->
        <!--                          v-for="item in options"-->
        <!--                          :key="item.value"-->
        <!--                          :label="item.label"-->
        <!--                          :value="item.value">-->
        <!--                        </el-option>-->
        <!--                      </el-select>-->
        <!--                    </div>-->
        <!--                    <div>-->
        <!--                      <el-checkbox :label="$t('log.enableSecurity')"></el-checkbox>&lt;!&ndash;启用安全连接(SSL)&ndash;&gt;-->
        <!--                    </div>-->
        <!--                    <div class="Send-btn-container">-->
        <!--                      <button class="btn-style Send-btn" disabled>{{$t('log.importCertificate')}}</button>&lt;!&ndash;导入证书&ndash;&gt;-->
        <!--                    </div>-->
        <!--                    <div class="Send-btn-container">-->
        <!--                      <button class="Send-btn" disabled>{{$t('log.sendTestLog')}}</button>&lt;!&ndash;发送测试日志&ndash;&gt;-->
        <!--                    </div>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </el-tab-pane>-->
        <!--              <el-tab-pane :label="$t('log.logFilter')" name="position-second" :disabled="true">{{$t('log.archived')}}-->
        <!--              </el-tab-pane>&lt;!&ndash;已存档&ndash;&gt;-->
        <!--            </el-tabs>-->
        <!--            <div class="tabFooter btnFooter">-->
        <!--              <div class="tabFooterBorder" style="padding-top: 6px;">-->
        <!--                <div class="btnGroup" style="margin-top: 10px;">-->
        <!--                  <gl-button-style size="medium" type="blue">{{$t('common.apply')}}</gl-button-style>&lt;!&ndash;应用&ndash;&gt;-->
        <!--                  <gl-button-style size="medium">{{$t('common.reset')}}</gl-button-style>&lt;!&ndash;重置&ndash;&gt;-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="right" v-show="index==5">-->
        <!--          <div class="receive-btn-container">-->
        <!--            <button class="receive-btn">{{$t('user.add')}}</button>&lt;!&ndash;新增&ndash;&gt;-->
        <!--            <button class="receive-btn" disabled>{{$t('user.edit')}}</button>&lt;!&ndash;编辑&ndash;&gt;-->
        <!--            <button class="receive-btn" disabled>{{$t('user.delete')}}</button>&lt;!&ndash;删除&ndash;&gt;-->
        <!--            <button class="receive-btn" disabled>{{$t('common.enable')}}</button>&lt;!&ndash;启用&ndash;&gt;-->
        <!--            <button class="receive-btn" disabled>{{$t('common.disable')}}</button>&lt;!&ndash;禁用&ndash;&gt;-->
        <!--            <button class="receive-btn">{{$t('log.exportCertificate')}}</button>&lt;!&ndash;输出证书&ndash;&gt;-->
        <!--          </div>-->
        <!--          &lt;!&ndash;table表格&ndash;&gt;-->
        <!--          <el-table-->
        <!--            fixed-->
        <!--            :data="receiveLogDataList"-->
        <!--            style="width: 100%"-->
        <!--            border-->
        <!--            highlight-current-row-->
        <!--            @row-click="currentLogIds"-->
        <!--          >-->
        <!--            <el-table-column-->
        <!--              prop="Enable"-->
        <!--              :label="$t('common.enable')"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop="name"-->
        <!--              :label="$t('user.name')"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop=" logFormat"-->
        <!--              :label="$t('log.logFormat')"-->
        <!--              :show-overflow-tooltip="true"-->
        <!--            >-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop="protocol"-->
        <!--              :label="$t('log.transferProtocol')"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop="port"-->
        <!--              :label="$t('netWork.port')"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop="status"-->
        <!--              label="SSl"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--            </el-table-column>-->
        <!--          </el-table>-->
        <!--        </div>-->
        <!--        <div class="right" v-show="index==6">-->
        <!--          <div class="recording-btn-container">-->
        <!--            <button class="recording-btn">{{$t('common.clear')}}</button>&lt;!&ndash;清除&ndash;&gt;-->
        <!--            <button class="recording-btn">{{$t('title.exports')}}</button>&lt;!&ndash;导出&ndash;&gt;-->
        <!--            <button class="recording-btn">{{$t('common.refresh')}}</button>&lt;!&ndash;刷新&ndash;&gt;-->
        <!--          </div>-->
        <!--          &lt;!&ndash;table表格&ndash;&gt;-->
        <!--          <el-table-->
        <!--            fixed-->
        <!--            :data="recordingLogDataList"-->
        <!--            style="width: 100%"-->
        <!--            border-->
        <!--            highlight-current-row-->
        <!--            @row-click="currentLogIds"-->
        <!--          >-->
        <!--            <el-table-column-->
        <!--              prop="Level"-->
        <!--              :label="$t('log.priorityLevel')"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--              <template slot-scope="data">-->
        <!--                <span :style="{color:data.row.Level==$t('common.information')?'green':''}">{{data.row.Level}}</span>-->
        <!--              </template>-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop="date"-->
        <!--              :label="$t('log.date_time')"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop="userName"-->
        <!--              :label="$t('user.name')"-->
        <!--              :show-overflow-tooltip="true"-->
        <!--            >-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--              prop="Event"-->
        <!--              :label="$t('log.event')"-->
        <!--              :show-overflow-tooltip="true">-->
        <!--            </el-table-column>-->
        <!--          </el-table>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {logList, logCount, logDelete} from '@api/log/logContact'
  import {mapState} from 'vuex'
  import {assign_compatible} from "@common/js/publicMethod/publicMethod";

  let timeout = null
  export default {
    name: 'LogPanel',
    props: {},
    // components: {LoadAnimation},
    data: function () {
      return {
        showError: false,
        errorMessage: '',//错误信息
        loadAnimation: false,
        logListMenu: [{
          title: this.$t('title.logOverview'),/*'概述'*/
          icon: 'icon-gaishu',
          ico: 'iconfont'
        }, {
          title: this.$t('storage.log'),/*'日志'*/
          icon: 'icon-rizhi1',
          ico: 'iconfont'
        }],
        /*{
         title: '通知',
         icon: 'icon-tongzhi',
         ico: 'iconfont'
         }, {
         title: '归档设置',
         icon: 'icon-guidangshezhi',
         ico: 'iconfont'
         }, {
         title: '日志发送',
         icon: 'icon-fasong1',
         ico: 'iconfont'
         }, {
         title: '接收日志',
         icon: 'icon-yijiedan',
         ico: 'iconfont'
         }, {
         title: '设置历史记录',
         icon: 'icon-lishijilu',
         ico: 'iconfont'
         }*/
        current: 0,
        index: 0,
        activeName: 'first',
        position_activeName: 'position-first',
        logList: {
          pageNum: 1,
          pageSize: 20
        },
        logSectionList: {
          pageNum: 1,
          pageSize: 50
        },
        logData: {},
        logDataList: [],
        //前50个日志
        logSectionDataList: [],
        sectionActiveName: ['top50', 'logNum'],
        /*输入框默认值*/
        inputValue: '10',
        inputValue_one: "",
        inputValue_two: '',
        inputValue_three: '',
        /*复选框是否初始选中*/
        checked_one: false,
        checked_two: false,
        checked_three: false,
        checked_four: false,
        //下拉选项绑定数据--通知规则
        options: [{
          value: '选项1',
          label: 'Emergency'
        }, {
          value: '选项2',
          label: 'Alert,Emergency'
        }, {
          value: '选项3',
          label: 'Critical,Alert,Emergency'
        }, {
          value: '选项4',
          label: 'Error,Critical,Alert,Emergency'
        }],
        value: 'Emergency',
        //保存当前点击log的id
        currentLogId: [],
        //清除 按钮的状态
        buttonStatus: true,
        //是否显示对话框
        showDialog: false,
        //接收日志表格数据
        receiveLogDataList: [{
          Enable: '已启动',
          name: '21214',
          logFormat: 'BSD',
          protocol: 'UDP',
          port: '514',
          status: '已停用'
        }],
        //记录日志数据列表
        recordingLogDataList: [{
          Level: '信息',
          date: '2020-09-05 10:54:38',
          userName: 'SYSTEM',
          Event: 'system was cleared by collor'
        }, {
          Level: '信息',
          date: '2020-09-05 10:54:38',
          userName: 'SYSTEM',
          Event: 'netbkplog was cleared by collor'
        }],
        //日志数量统计
        logCount: {
          byCount: 2511,//通过
          caveatCount: 42,//警告
          count: 24144,//总计
          errorCount: 124,//错误
          preventCount: 76//阻止
        }
      }
    },
    computed: {
      ...mapState('Dialog', {
        log_Panel: state => state.dialogShow.log_Panel
      })
    },
    watch: {
      log_Panel (val) {
        if (val) {
          this.$nextTick(() => {
            this.initLoadFun();//初始加载方法
          });
        } else {
          assign_compatible()
          Object.assign(this.$data, this.$options.data.call(this))
        }
      },
      index: function (value) {
        this.buttonStatus = value != 1
      }
    },
    created () {

    },
    mounted () {
    },
    methods: {
      initLoadFun () {
        this.getSectionLogList()
        this.getLogCount()
      },
      //关闭错误弹框
      warningDialogClose () {
        this.showError = false
      },
      //获取日志数量
      async getLogCount () {
        let {data: res} = await logCount()
        if (res.code == 200) {
          this.logCount = {
            byCount: res.data.bycount,
            caveatCount: res.data.caveatcount,
            count: res.data.count,
            errorCount: res.data.errorcount,
            preventCount: res.data.preventcount
          }
          this.getLogEcharts()
        } else {
          this.errorMessage = this.$t('reminder.getLogQuantityError')//'获取日志数量失败!'
          this.showError = true
        }
      },
      //获取日志
      async getLogList () {
        this.loadAnimation = true
        let {data: res} = await logList({
          pageNum: this.logList.pageNum,
          pageSize: this.logList.pageSize
        })
        if (res.code != 200 || res.code == 401) {
          this.loadAnimation = false
          this.errorMessage = this.$t('reminder.getLogError')//'获取日志失败!'
          this.showError = true
          return
        }
        if (res.code == 200) {
          this.logData = res.data
          this.logDataList = this.logData.list
          this.loadAnimation = false
        }
      },
      //获取前50条日志 部分
      async getSectionLogList () {
        this.loadAnimation = true
        let {data: res} = await logList({
          pageNum: this.logSectionList.pageNum,
          pageSize: this.logSectionList.pageSize
        })
        if (res.code != 200 || res.code == 401) {
          this.loadAnimation = false
          this.errorMessage = this.$t('reminder.getLogError')//'获取日志失败!'
          this.showError = true
          return
        }
        if (res.code == 200) {
          this.logSectionDataList = res.data.list
          this.loadAnimation = false
        }
      },
      getLogEcharts () {
        let my_echarts = this.$echarts.init(document.querySelector('#log_echarts'))
        const colorList = ['#2a850e', '#FCBD00', '#FDB36A', '#c75146']
        let option = {
          tooltip: {
            trigger: 'item'
          },
          series: [{
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['25%', '50%'],
            minAngle: 20,
            avoidLabelOverlap: true,
            hoverOffset: 0,
            itemStyle: {
              color: (params) => {
                return colorList[params.dataIndex]
              }
            },
            label: {
              show: true,
              position: 'outer',
              alignTo: 'labelLine',
              // ·圆点
              backgroundColor: 'auto',//圆点颜色，auto：映射的系列色
              height: 0,
              width: 0,
              lineHeight: 0,
              // height,width.lineHeight必须为0
              distanceToLabelLine: 0,//圆点到labelline距离
              borderRadius: 10,
              padding: [2.5, -2.5, 2.5, -2.5],
              /*radius和padding为圆点大小，圆点半径为几radius和padding各项数值就为几
               如：圆点半径为1
               borderRadius: 1,
               padding: [1, -1, 1, -1]
               */
              formatter: '{a|{b}：}{b|{d}%}',
              rich: {
                a: {
                  padding: [0, 0, 0, 10]
                },
                b: {
                  padding: [0, 10, 0, 0]
                }
              }
            },
            data: [
              {
                name: this.$t('log.by'),//'通过'
                value: this.logCount.byCount
              }, {
                name: this.$t('log.caveat'),//'警告'
                value: this.logCount.caveatCount
              }, {
                name: this.$t('log.prevent'),//'阻止'
                value: this.logCount.preventCount
              }, {
                name: this.$t('log.error'),//'错误'
                value: this.logCount.errorCount
              }]
          }]
        };

        my_echarts.clear()//清空
        my_echarts.setOption(option);
        $('#log_echarts').resize(function () {
          my_echarts.resize();    //若有多个图表变动，可多写
        });
      },
      //切换tab
      logMenuClick: function (index, item) {
        if (this.current == index) {
          return
        }
        if (index == 1) {
          this.getLogList()
        }
        this.current = index
        this.index = index
      },
      //导出功能
      handleClick2 (command) {
        this.logDataList.forEach(item => {
          item.action == 1 ? item.actions = this.$t('log.by') : item.actions = this.$t('log.caveat')
          if (item.logType == 1) {
            item.logTypes = this.$t('log.systemLog')/*系统日志*/
          } else if (item.logType == 2) {
            item.logTypes = this.$t('log.userLog') //'使用者日志'
          } else if (item.logType == 3) {
            item.logTypes = this.$t('log.onlineUserLog') //'线上使用者日志'
          }
          item.Dates = this.$options.filters['filterDate'](item.logDate, 'yyyy-MM-dd hh:mm:ss')
        })
        if (command == 'b') {
          const _self = this
          let jsonData = {
            trade: {
              //tHeader: ["操作状态", "日志类型", "时间", "用户", "事件", "事件详情"],
              tHeader: [_self.$t('log.operatingStatus'), _self.$t('log.logType'), _self.$t('title.time'), _self.$t('controlMenu.user'), _self.$t('log.event'), _self.$t('log.eventDetails')],
              filterVal: ["actions", "logTypes", "Dates", "userId", "logEnevt", "logDetails"],
              list: _self.logDataList
            }
          }
          _self.exportPathMethod(jsonData)// 调用exportPathMethod对数据进行处理导出
          _self.exportShow = false
        }

      },
      //导出vsc文件
      exportPathMethod (data) {
        /*
         *注：csv文件：","逗号换列，\n换行，\t防止excel将长数字变科学计算法等样式
         */
        //要导出的json数据
        let mainLists = data.trade   //主表
        let _self = this
        //## 数据处理
        //一级表
        let mainTitle = mainLists.tHeader;//一级标题
        let mainTitleForKey = mainLists.filterVal;//一级过滤
        let mainList = mainLists.list;//一级数据
        let mainStr = [];
        mainStr.push(mainTitle.join("\t,") + "\n");   //标题添加上换列转成字符串并存进数组
        for (let i = 0; i < mainList.length; i++) {
          let temp = [];
          for (let j = 0; j < mainTitleForKey.length; j++) {
            temp.push(mainList[i][mainTitleForKey[j]]); //根据过滤器拿出对应的值
          }
          mainStr.push(temp.join("\t,") + "\n");    //取出来的值加上逗号换列转字符串存数组
        }
        // console.log(JSON.stringify(mainStr.join("")));//打印文本

        //两个表数组转成字符串合并
        let merged = mainStr.join("")
        //console.log(JSON.stringify(merged));//打印结果

        //## 导出操作
        // encodeURIComponent解决中文乱码
        const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(merged)
        // 通过创建a标签实现
        let link = document.createElement('a')
        link.href = uri
        var myDate = new Date();
        // 对下载的文件命名
        link.download = `syslog${myDate.toLocaleString()}.csv`
        document.body.appendChild(link)
        link.click()
      },
      //显示数量
      handleSizeChange (value) {
        this.buttonStatus = true
        this.logList.pageSize = value
        this.getLogList()
      },
      //当前页
      handleCurrentChange (value) {
        this.buttonStatus = true
        this.logList.pageNum = value
        this.getLogList()
      },
      //刷新按钮
      Refresh () {
        this.buttonStatus = true
        this.logList.pageNum = 1
        this.logList.pageSize = 20
        this.getLogList()
        this.logDataList = this.logData.list
      },
      //表格点击事件 点击当前获取日志id
      currentLogIds (row) {
        this.currentLogId = row.logId
        this.buttonStatus = false
      },
      //点击删除，显示对话框
      logDelete () {
        this.showDialog = true
        // this.buttonStatus = true
      },
      handleClose () {
      },
      closeEvent () {
        this.showDialog = false
      },
      //点击确定删除发起请求
      async determineEvent () {
        let currentId = [this.currentLogId]
        let {data: res} = await logDelete(currentId)
        if (res.code == 200) {
          this.buttonStatus = true
          this.showDialog = false
          await this.getLogList()
        }
        if (res.code != 200 || res.code == 401) {
          this.showDialog = false
          this.showError = true
          this.errorMessage = this.$t('reminder.failedToDelete') //'删除失败!'
        }
      },
      //点击取消隐藏删除对话框
      cancelEvent () {
        this.showDialog = false
      },
    },
    filters: {},
    beforeDestroy () {

    }
  }
</script>

<style lang="less" scoped>
  @deep: ~">>>";
  /*  <!--@{deep}.tabs .el-tabs__content .el-tab-pane {-->
    <!--  padding-top: 42px !important;-->
    <!--  margin-top: -42px !important;-->
    <!--}-->*/

  /*log日志前50条面板样式*/
  @{deep} .el-collapse-item__header {
    color: #0086E5;
    padding-left: 36px;
    position: relative;
    border-bottom: 1px dashed #EBEEF5;
    font-size: 15px;
  }

  @{deep} i.el-collapse-item__arrow {
    /*float: left;*/
    font-weight: 900;
    font-size: 16px;
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 50%;*/
    /*margin-top: -25px;*/
    /*transform: translateY(-50%);*/
    /*left: 13px;*/
    /*line-height: normal!important;*/
    color: #0086E5;
  }

  @{deep} .el-collapse {
    border-top: 0;
    border-bottom: 0;
  }

  @{deep} .el-collapse-item__wrap {
    border-bottom: 0;
  }

  @{deep} .el-collapse-item__content {
    padding-bottom: 10px;
  }

  @{deep}.el-table_1_column_6 {
    border-right: 0 !important;
  }

  @{deep}.left .iconfont {
    font-size: 25px !important;
    /*color: #77818B;*/
  }

  /*表格的padding值 及样式*/
  @{deep}.el-table td, .el-table th {
    padding: 3px !important;
  }

  @{deep}.el-table td {
    border: 0 !important;
    border-bottom: 1px solid #EBEEF5 !important;
  }

  @{deep}.el-table th > .cell {
    text-align: center;
    color: #0086E5;
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @{deep}.el-table--border th {
    padding: 2px 0 !important;
  }

  @{deep}.el-table .cell {
    text-align: center;
    font-size: 12px;
  }

  @{deep}.el-table--border {
    border: 0;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*overflow-y: auto !important;*/
  }

  @{deep}.el-table__body-wrapper {
    flex: 1;
    box-sizing: border-box;
    overflow-y: auto !important;
    overflow-x: hidden;
  }

  @{deep}.el-table--border::after {
    width: 0;
    background-color: #fff;
  }

  @{deep}.el-table::before {
    background-color: transparent;
  }

  .logPanel {
    width: 100%;
    height: 100%;
  }

  .left {
    width: 223px;
    height: 100%;
    box-sizing: border-box;
    /*margin-right: 10px;*/
    /*margin-top: 10px;*/
    float: left;

    .logMenu {
      border-radius: 5px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 10px 0 10px;
      box-sizing: border-box;
      font-size: 14px;
    }

    .logMenu i {
      padding-right: 10px;

    }

    .logMenu:hover {
      background-color: #c2ddf5;
      color: #222222;
      cursor: pointer;
    }
  }

  .right {
    position: relative;
    margin-left: 230px;
    /*width: 100%;*/
    height: 100%;
    border-left: 1px solid #E4E5E5;
    box-sizing: border-box;
    /*overflow-y: auto;*/
    overflow-x: hidden;
    overflow-y: hidden;
    padding-left: 10px;
    padding-top: 5px;

    .right_box {
      width: 100%;
      height: 100%;
    }

    .current_log_btn {
      position: relative;
      height: 44px;

      .control-first-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        /*display: flex;*/
      }
    }

    .current_log_table {
      position: absolute;
      top: 44px;
      width: 100%;
      bottom: 48px;
    }

    .current_log_pagination {
      position: absolute;
      height: 48px;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .Pagination {
        /*height: 48px;*/
        /*width: 100%;*/
        display: flex;
        justify-content: center;
        align-items: center;
        //刷新按钮样式
        .Refresh {
          color: #0086E6;
          line-height: 34px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }

    .logCount {
      width: 650px;
      max-width: 99%;
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
      margin-top: 10px;
      font-size: 12px;

      #log_echarts {
        width: 400px;
        height: 200px;
        background-color: #F5F5F5;
        border: 1px solid #B4BEC8;
        max-width: 55%;
      }

      .log_title_Content {
        /*width: 100%;*/
        /*height: 200px;*/
        background-color: #F5F5F5;
        border: 1px solid #B4BEC8;
        padding: 22px 0 0 40px;
        box-sizing: border-box;
        font-size: 12px;
        width: 200px;
        height: 202px;

        .statistics {
          font-size: 14px;
          font-weight: bold;
        }

        .colourSize {
          margin-bottom: 5px;
          padding: 4px;
          line-height: 14px;

          .Cube {
            float: left;
            width: 14px;
            height: 14px;
            padding-right: 10px;
            margin-right: 10px;
          }
        }
      }
    }

  }

  /*通知模块样式--Start*/
  .Notice-container {
    display: flex;
    height: 100%;
    flex-direction: column;

    .Notice-content {
      flex: 1;
      padding: 8px;

      ul li {
        padding: 3px 0;
        align-items: center;
        margin: 0;
        line-height: 0;
        float: left;
        display: inline-flex;

        span {
          &:first-child {
            line-height: 28px;
            padding-right: 0;
            width: 307px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .Notice-content-first {
        font-weight: normal;
        font-size: 12px;
        margin-bottom: 4px;
        color: #505A64;
      }

      .Notice-content-second {
        display: flex;

        .Notice-content-checked {
          line-height: 28px;
          //padding-right: 200px;
        }
      }

      .Notice-content-checked1 {
        line-height: 28px;
        padding-right: 230px;
      }

      .Notice-content-checked2 {
        line-height: 28px;
        padding-right: 224px;
      }

      .Notice-content-fourth {
        display: flex;
      }

      .Notice-content-input1 {
        width: 178px;
        padding-left: 308px;
      }
    }

    .Notice-content @{deep}.el-checkbox__label {
      font-size: 12px;
    }
  }

  /*通知模块样式--end*/

  /*公有title-box样式-start*/
  .Notice-header, .Archive-header-purpose, .Archive-header-rules, .Archive-header-format {
    height: 28px;
    line-height: 28px;
    border-bottom: 1px dashed #D7E1EB;
    color: #0086E5;

    span {
      font-size: 15px;
      font-weight: normal;
      padding-left: 8px;
    }
  }

  /*公有title-box样式-end*/

  /*归档设置--Start*/
  .Archive-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .Archive-content {
      flex: 1;
    }
  }

  .Archive-purpose-content {
    margin-top: 10px;

    .Archive-purpose-first {
      display: flex;
      font-size: 12px;
      margin-left: 10px;
      margin-bottom: 10px;
      align-items: center;
      color: #505A64;

      .el-input {
        width: 178px;
        padding: 0 10px 0 175px;
      }
    }

    .Archive-purpose-second {
      .el-checkbox {
        margin-left: 10px;
        margin-bottom: 30px;
        font-size: 12px;

        @{deep}.el-checkbox__input {
          vertical-align: bottom;
        }

        @{deep}.el-checkbox__label {
          font-size: 12px;
        }
      }
    }
  }

  .Archive-rules-content {
    margin-top: 10px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    color: #505A64;
    margin-bottom: 30px;

    .Archive-rules-text {
      margin-left: 10px;
      font-size: 12px;
    }

    .Archive-rules-select {
      display: flex;
      margin-top: 10px;
      align-items: center;
      margin-left: 10px;
      font-size: 12px;

      @{deep}.el-checkbox__label {
        font-size: 12px;
      }

      label, div {
        &:first-child {
          display: inline-block;
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .Archive-format-content {
    /*margin-left: 10px;*/
    margin-top: 10px;
    font-size: 12px;
    color: #505A64;

    .Archive-format-box li {
      margin: 10px 10px;
    }

    @{deep}.el-checkbox__label {
      font-size: 12px;
      color: #505A64;
    }
  }

  /*归档设置--end*/
  /*日志发送*/
  .log-send-container {
    overflow: hidden;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 10px;

    .position-content {
      div {
        display: flex;
        margin-bottom: 2px;

        span {
          line-height: 28px;
          font-size: 12px;
          color: #505A64;
          display: inline-block;
          width: 150px;
        }

        .btn-style {
          margin: 9px 0 5px 23px;
        }
      }
    }


    @{deep}.el-checkbox__label {
      font-size: 12px;
      color: #505A64;
    }
  }

  .logstyle {
    height: 100%;
    width: 100%;

    .btnFooter {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 25px;
      right: 0;
      height: 48px;
      margin-bottom: 0 !important;
    }
  }

  .logstyle @{deep}.tabs .el-tabs__content .el-tab-pane {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  /*接收日志和历史记录的样式 发送按钮样式*/
  .receive-btn-container, .recording-btn-container, .Send-btn-container {
    .receive-btn, .Send-btn, .recording-btn {
      height: 28px;
      line-height: 2px;
      font-size: 12px;
      padding: 0 15px;
      background-image: linear-gradient(#f5faff, #f0f5fa);
      background-color: #F0F5FA;
      outline: none;
      border: 1px solid #C8D2DC;
      border-radius: 4px;
      cursor: pointer;
      color: #505A64;
      margin-bottom: 10px;
    }

    .receive-btn[disabled], .Send-btn[disabled], .recording-btn[disabled] {
      height: 28px;
      line-height: 2px;
      font-size: 12px;
      padding: 0 15px;
      outline: none;
      border-radius: 3px;
      cursor: default;
      color: #96A0AA !important;
    }

    .receive-btn:hover, .recording-btn:hover, .Send-btn:hover {
      border: solid 1px #B4BEC8;
      background-image: linear-gradient(#f5faff, #ebf0f5);
      background-color: #EBF0F5;
    }

    .receive-btn[disabled]:hover, .recording-btn[disabled]:hover, .Send-btn[disabled]:hover {
      border: solid 1px #C8D2DC;
      background-color: #F3F8FD;
      background-image: linear-gradient(#F3F8FD, #F3F8FD);
    }
  }

  .classBlue {
    background-color: #0086E5;
    color: #fff;
  }


  //后面表格的样式
  .right .el-collapse.logDescription {
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  @{deep}.right .el-collapse.logDescription .el-collapse-item.top50 {
    flex: 1;
    display: flex;
    flex-flow: column;
    overflow: hidden;
  }

  @{deep}.right .el-collapse.logDescription .el-collapse-item.top50 .el-collapse-item__wrap {
    flex: 1;
    display: flex;
  }

  @{deep}.right .el-collapse.logDescription .el-collapse-item__content {
    display: flex;
    flex-flow: column;
    flex: 1;
    width: 100%;
  }

  //按钮样式
  .control-first-btn@{deep}.el-button {
    border-color: #C8D2DC;
    color: #505A64;
    background-image: linear-gradient(#f5faff, #f0f5fa);
    background-color: #F0F5FA;
  }

  .control-first-btn@{deep}.el-button:hover {
    color: #505A64;
    border-color: #B4BEC8;
    /*outline: 0;*/
    background-image: linear-gradient(#f5faff, #ebf0f5);
    background-color: #EBF0F5;
  }

  .control-first-btn@{deep}.el-button:active {
    color: #505A64;
    border-color: #B4BEC8;
    /*outline: 0;*/
    background-image: linear-gradient(#ebf0f5, #e6ebf0);
    background-color: #E6EBF0;
  }


  @{deep}.tabs .el-tabs__content .el-tab-pane {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  .logExport {
    min-width: 71px;
    text-align: center;
    width: 70px;
  }
</style>
