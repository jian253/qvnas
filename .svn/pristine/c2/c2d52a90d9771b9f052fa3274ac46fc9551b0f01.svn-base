<template>
  <div class="delPoolContainer"> <!--删除池-->
    <div v-if="deleteQueryInfo" class="delete_content" v-cloak>
      <div class="deletePrompt">
        <img src="/static/images/controlPanel/wizard_bkg_h.png" alt="" class="header_img">
        <div class="delete_pool_prompt">
          <div>{{$t('storage.exportPool')}}:'{{poolName}}'</div>
          <div class="pool_title" v-if="deleteQueryInfo[0].name.length">
            {{$t('reminder.exportPoolPrompt1')}} {{poolName}} {{$t('reminder.exportPoolPrompt2')}}
            <!--These services depend on the pool {{pool Name}} If the pool is separated, it will be destroyed-->
          </div>
        </div>
      </div>
      <div v-if="deleteQueryInfo[0].name.length" v-cloak>
        <el-table
          :data="deleteQueryInfo"
          border
          style="width: 100%"
          v-if="deleteQueryInfo.length>0">
          <el-table-column
            prop="name"
            :label="$t('title.serviceName')">
          </el-table-column>
          <el-table-column
            prop="service"
            :label="$t('title.rely')">
            <template slot-scope="scope">
              {{scope.row.service}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="note_title text_color" v-else v-cloak>
        {{$t('reminder.poolExportPrompt')}}{{poolName}}{{$t('reminder.poolExportPrompt1')}}
        <!--Note: Export/disconnect pool error. {{poolName}}. After exporting, the data in the pool will be unavailable. You can destroy the data on the pool disk by setting the destroy data option. Back up critical data before exporting/disconnecting the connection pool.-->
      </div>
      <div class="checkbox">
        <div>
          <input id="custom"
                 type="checkbox"
                 class="radio-custom" name="radio1"
                 v-model="checkedValue">
          <label for="custom" class="radio-custom-label"> {{$t('reminder.destroyPoolData')}}</label>
        </div>
        <div>
          <input id="custom1"
                 type="checkbox"
                 class="radio-custom" name="radio2"
                 v-model="checkedValue1">
          <label for="custom1" class="radio-custom-label"> {{$t('reminder.deletePoolConfig')}}</label>
        </div>
        <div>
          <input id="custom2"
                 type="checkbox"
                 class="radio-custom" name="radio3"
                 v-model="checkedValue2">
          <label for="custom2" class="radio-custom-label"> {{$t('reminder.configExport')}} <i class="important">*</i></label></div>
      </div>
    </div>
    <div class="delete_footer">
      <div class="footer_shadow footer_box">
        <div>
          <gl-button-style type="red" size="medium" @click="determineEvent" :disable="!checkedValue2">
            {{$t('common.yes')}}
          </gl-button-style>
          <gl-button-style size="medium" @click="closeDialog">{{$t('common.no')}}</gl-button-style>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {assign_compatible} from "@common/js/publicMethod/publicMethod";

  export default {
    name: "deletePool",
    props: {
      type: Number,
      pool_id: null
    },
    computed: {
      ...mapState('v_scoket', {
        pool_processes: state => state.pool_processes,
        pool_attachments: state => state.pool_attachments,
        system_advanced: state => state.system_advanced,
        systemdataset_config: state => state.systemdataset_config,
        pool_export: state => state.pool_export,
        poolDelete_progress: state => state.poolDelete_progress
      }),
      ...mapState('storage', {
        poolName: state => state.poolName
      })
    },
    watch: {
      pool_processes (val) {  //返回使用此池的正在运行的进程的列表。
        if (!val) return
        this.mergePoolService_data.push(val)
      },
      pool_attachments (val) {//返回池的服务
        if (!val) return
        this.mergePoolService_data.push(val)
      },
      system_advanced (val) {//返回依赖于池的服务列表 是否有共享
        if (!val) return
        this.mergePoolService_data.push(val)
      },
      mergePoolService_data (val) {//合并池服务数据
        if (val.length != 3) return
        //数据都拿到了
        this.getPool_InfoRely()
      },
      systemdataset_config (val) {//暂时还不知道干啥的接口
        if (!val) return
        if (val.error) return console.log('systemdataset_config获取失败')
      },
      poolDelete_progress (val) {
        if (!val) return
        if (val.fields.state === "FAILED") {//删除池失败!
          this.$emit('showLoad', false)
          return this.$emit('error', val.fields.error)
        }
        this.$emit('schedule', val.fields.progress)
      },
      pool_export (val) {
        if (!val) return
        if (val.error) {
          this.$emit('error', this.$t('reminder.failedToDelete'))
        } else {
          this.$store.commit('storage/pool_delete_id', val.result)
        }
      },
    },
    data () {
      return {
        checkedValue: false,
        checkedValue1: true,
        checkedValue2: false,
        deleteQueryInfo: null,
        mergePoolService_data: []
      }
    },
    methods: {
      //确定删除
      determineEvent () {
        this.$emit('showLoad', true)
        if (!this.pool_id) return this.$emit('error', this.$t('reminder.dataError'))
        let params = [this.pool_id, {
          "destroy": this.checkedValue,
          "cascade": this.checkedValue1,
          "restart_services": false
        }]
        this.$store.commit('v_scoket/socketSend', [{
          name: 'pool_export',
          params: params
        }])
      },
      //获取池相关的服务信息
      getPool_InfoRely () {
        this.$store.commit('v_scoket/socketSend', ["systemdataset_config"])
        this.$emit('loading', false)
        this.$store.getters["v_scoket/merge_pool_deleteQuery"].then(res => {
          this.deleteQueryInfo = res
        }).catch(err => {
          return this.$emit('error', this.$t('reminder.dataError'))
        })
      },
      closeDialog () {
        this.$emit('closeDialog')
      }
    },
    created () {
    },
    mounted () {
    },
    beforeDestroy () {
      assign_compatible()
      Object.assign(this.$data, this.$options.data.call(this))
    }
  }
</script>

<style scoped lang="less">
  .delPoolContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    position: relative;

    .delete_content, .header_img {
      height: 100px;
      width: 100%;

      .deletePrompt {
        position: relative;
        height: 100%;

        .delete_pool_prompt {
          color: #fff;
          font-weight: bold;
          font-size: 18px;
          position: absolute;
          left: 20px;
          top: 30px;

          .pool_title {
            margin-top: 5px;
            font-size: 14px;
          }
        }
      }

      .note_title {
        font-size: 13px;
        padding: 0 5px;
      }
    }

    .delete_footer {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }

  .checkbox {
    font-size: 12px;
    color: #505A64;
    margin-top: 16px;
    margin-left: 3px;

    div {
      margin: 3px;
      padding: 2px 0 2px 10px;
    }
  }
</style>
