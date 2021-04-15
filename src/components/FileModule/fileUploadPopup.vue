<template>  <!--文件上传弹框-->
  <div class="68 fileUploadPopup" style="display: none;">
    <div class="Close" @click="CloseEvents">
      <i class="guanbi" title="close"></i>
    </div>
    <div class="btn_box">
      <gl-button :disabled="false" class="optionBtn" @click="ClearDisable">{{$t('title.clearAllItem')}}
        <!--清除已完成项目--></gl-button>
      <gl-button :disabled="deleteDisable" class="optionBtn" @click="deleteTask()">{{$t('user.delete')}}
        <!--删除--></gl-button>
      <gl-button :disabled="!source||(source.status==2||source.status==3)" class="optionBtn" @click="CancelUpload()">
        {{$t('file.cancelUpload')}}<!--取消上传--></gl-button>
    </div>
    <div class="table_box">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        fixed
        highlight-current-row
        @row-click="currentChange">
        <el-table-column
          :label="$t('file.file')"
          show-overflow-tooltip>
          <template slot-scope="name">
            <span>{{name.row.file.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('file.schedule')"
          min-width="160"
        >
          <template slot-scope="data">
            <el-progress v-if="data.row.persent!=-1" :text-inside="false" type="line" :percentage="data.row.persent"
                         :stroke-width="16"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.size')">
          <template slot-scope="size">
            <span>{{size.row.file.size |filterSize}}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="操作">-->
        <!--          <template slot-scope="data">-->
        <!--            <gl-button-style type="red" @click="CancelUpload">取消本次上传</gl-button-style>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column
          :label="$t('common.status')">
          <template slot-scope="status">
            <span v-if="status.row.status==2" style="color: red">{{$t('file.uploadFailed')}}<!--上传失败--></span>
            <span v-else-if="status.row.status==3" style="color: green">{{$t('file.uploadSuccess')}}<!--上传成功--></span>
            <span v-else>{{$t('file.uploading')}}<!--上传中--></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data: function () {
      return {
        tableData: [],
        schedule: 0,
        deleteDisable: true,
        data: null,
        source: null
      }
    },
    computed: {},
    watch: {
      tableData: function (value) {
        if (value.length == 0) {
          this.$emit('TaskClose', 0)//为0隐藏图标按钮
        }
      }
    },
    methods: {
      //删除当前选中的上传文件列表
      currentChange (data) {
        this.source = data
        //console.log(data)
        this.data = data
        this.deleteDisable = false
      },
      //取消本次上传
      CancelUpload () {
        if (this.source == null) {
          return false;
        }
        this.source.source.cancel('取消');
        var getIndex = -1;
        this.tableData.find((v, index) => {
          if (v.index == this.source.index) {
            getIndex = index;
          }
        });
        if (getIndex != -1) {
          this.$set(this.tableData[getIndex], 'status', 2);
          this.trueStopAnimated();
        }
      },
      trueStopAnimated () {//判断是否停止上传动画
        let trueStop = true;
        this.tableData.forEach((item, index) => {
          if (item.status == 0 || item.status == 1) {
            trueStop = false;
          }
        });
        if (trueStop) {
          this.$parent.$parent.UploadLogo = 0
        }
      },
      closeFileManage () {
        this.tableData.forEach((item, index) => {
          if (item.status == 3 || item.status == 2) {
          } else {
            item.source.cancel('取消');
            this.$set(this.tableData[index], 'status', 2);
          }
        });
        this.$parent.$parent.UploadLogo = 0;
      },
      //清除单个任务
      deleteTask () {
        this.tableData.forEach((item, index) => {
          try {
            if (item.index == this.data['index']) {
              this.tableData.splice(index, 1)
              this.$EventBus.$emit('deleteItem', index, null,)
              this.data = null;
              this.deleteDisable = true
            }
          } catch (e) {
          }
        })
      },
      //清空已完成任务
      ClearDisable () {
        var getArr = [];
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].persent < 100) {
            getArr.push(this.tableData[i]);
          }
        }
        this.tableData = getArr;
        this.$EventBus.$emit('deleteItem', getArr, 1)//为1清空列表
      },
      //判断关闭上传文件弹框 如果弹框内还有任务 则不隐藏弹框不清除图标隐藏弹框 否则清除图标和隐藏弹框
      CloseEvents () {
        if (this.tableData.length == 0) { //没有任务
          this.$emit('TaskClose', 0)//为0隐藏图标按钮
          $('#68_dialog').hide()
        } else {
          this.$emit('TaskClose', 1)//为1显示图标按钮
          $('#68_dialog').hide()
        }
      }
    },
    filters: {},
    mounted () {
    },
    beforeCreate () {
      this.$EventBus.$on('fileListChange', (fileList) => {
        let dealList = this.tableData;
        fileList.forEach((item) => {
          var getIndex = -1;
          dealList.find((v, index) => {
            if (v.index == item.index) {
              getIndex = index;
            }
          });
          if (getIndex != -1) {//找到相同的就修改
            this.$set(this.tableData, getIndex, item);
          } else {//没有找到就添加
            this.tableData.push(item);
          }
        });
      })
    },
    created () {
    }
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  .fileUploadPopup {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;

    .btn_box {
      display: flex;
      height: 38px;

      .optionBtn {
        margin-right: 10px;
      }
    }

    .table_box {
      display: flex;
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
  }

  .Close {
    position: absolute;
    top: 8px;
    right: 0;
    cursor: pointer;
    width: 30px;
  }

  /*.Close:hover{*/
  /*  color: red;*/
  /*}*/
  @{deep}.el-table td, .el-table th {
    font-size: 12px;
    padding: 0 !important;
  }

  @{deep}th.is-leaf {
    padding: 0;
  }

  @{deep}th {
    font-size: 12px;
    color: #0086E5;
    border: 1px solid #EBEEF5;
  }

  @{deep}.el-progress-bar__inner {
    /*background: url("/static/images/Progress.jpg");*/
    /*height: 16px;*/
    background-color: #0086E5;
    background-image: -webkit-gradient(linear, left top, right top, from(#00aaff), to(#2e7ae5));
    /* background-image: linear-gradient(to right, #00aaff, #2e7ae5); */
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
    -webkit-transition-property: width;
    transition-property: width;
    background-size: 100%;
    border-radius: 0;
  }

  @{deep}.el-progress-bar__outer {
    border-radius: 0;
  }

  @{deep}.el-progress__text {
    font-size: 12px !important;
    line-height: 15px !important;
  }

  @{deep}.el-progress.el-progress--line {
    display: flex !important;
  }
</style>
