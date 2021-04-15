<template>
  <div class="4_child" style="height: 100%;position: relative"
       v-if="storage_child_Panel">
    <new-pool v-if="dialogType" @error="ErrorWarning" @loading="ShowOrHideDialog" @showLoad="showLoad"
              @schedule="progressEvent"
              @closeDialog="cancelEvent"></new-pool>
    <delete-pool v-else @error="ErrorWarning" @loading="ShowOrHideDialog" @showLoad="showLoad" :pool_id="delete_id"
                 @schedule="progressEvent" @closeDialog="cancelEvent"></delete-pool>
    <gl-load-animation :is-load-show="isShowLoad"></gl-load-animation>
    <gl-warning-dialog :is-show="showWarning" @warningDialogClose="closeWarning">{{errorMessage}}</gl-warning-dialog>
    <div :class="[isLoading?'message-box-Mask':'']">
    </div>
    <div v-show="isLoading" class="loding">
      <div class="loadImgBox">
        <img src="/static/images/global/loadGif.gif" alt="">
        <span>{{deleteProgress}}%</span>
      </div>
      <div>{{description}}</div>
    </div>
  </div>
</template>
<script>
  import deletePool from "@components/storagePanel/storageChild/deletePool";
  import newPool from "@components/storagePanel/storageChild/newPool";
  import {assign_compatible} from "@common/js/publicMethod/publicMethod";
  import {mapState} from "vuex"

  export default {
    props: ['deleteOrAdd'],
    components: {
      newPool,
      deletePool
    },
    data: function () {
      return {
        showWarning: false,//显示提示
        isShowLoad: true,//加载动画
        errorMessage: '',//错误信息
        delete_id: '',//删除池 要的id
        isLoading: false,//删除动画
        deleteProgress: 0,//删除进度
        description: ''//描述
      }
    },
    computed: {
      ...mapState('Dialog', {
        storage_child_Panel: state => state.childDialog.storage_child_Panel
      })
      ,
      dialogType () {
        return this.deleteOrAdd == this.$t('storage.newDisk')
      }
    },
    mounted () {
      this.$EventBus.$on('deleteId', (res) => {
        this.delete_id = res
      })
    },
    created () {
    },
    beforeDestroy () {
    },
    watch: {
      storage_child_Panel (val) {
        val == true ? this.InitInfo() : this.resetData()
      },
    },
    methods: {
      InitInfo () {//如果为删除池获取池相关的服务依赖
        // this.dialogType?this.newPool():
      },
      closeWarning () {
        this.showWarning = false
      },
      ErrorWarning (msg) {
        this.errorMessage = msg
        this.showWarning = true
      },
      ShowOrHideDialog (bl) {//显示或隐藏加载动画
        this.isShowLoad = bl
      },
      showLoad (val) {//显示删除或加载进度动画
        this.isLoading = val
      },
      progressEvent (val) {//进度 及描述
        let {description, percent} = val && val
        this.deleteProgress = percent
        this.description = description
        if (percent == 100) {
          //重新获取所有池 获取所有硬盘 获取未使用的硬盘 获取数据集
          const clock = ['pool-query', 'disk-query', 'disk-get_unused', 'pool-dataset_query']
          this.$store.commit('v_scoket/socketSend', clock)
          this.$emit('showLoad', false)
          this.cancelEvent()
          this.$store.commit('storage/ResetStorage')
        }
      },
      //取消 关闭弹框
      cancelEvent () {
        const menuId = '.4_child'
        $(`${menuId}`).PopupWindow("close");//关闭弹框
      },
      resetData () {
        assign_compatible()
        Object.assign(this.$data, this.$options.data.call(this))
      }
    },
    filters: {}
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  .message-box-Mask {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0.6;
  }

  .loding {
    width: auto;
    height: 50px;
    line-height: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: #0086E5;
    .loadImgBox{
      text-align: center;
      img {
        vertical-align: middle;
        padding-right: 5px;
      }
    }
  }
</style>
