<template>
  <div class="69_child backImgSelect" v-if="$store.state['Dialog'].childDialog.userSets_child_Panel">
    <gl-warning-dialog :is-show="showErrorWarning" icon="prompt" :cancelBtn="true"
                       @warningDialogClose="warningDialogClose"
                       @warningDialogCancel="warningDialogCancel">
      {{errorMessage}}
    </gl-warning-dialog>
    <gl-warning-dialog :is-show="showConfirmWarning" icon="prompt" :cancelBtn="true"
                       @warningDialogClose="confirmDialogClose"
                       @warningDialogCancel="confirmDialogCancel">
      {{confirmMessage}}
    </gl-warning-dialog>
    <div class="file-content">
      <div class="file-content-left">
        <ul>
          <li :class="{tabActive:item.index==switchTabType}" v-for="(item,index) in tabList"
              @click="switchTab(item.index)" :key="`tabList${index}`">
            <span class="icon"
                  :style="{backgroundImage:'url('+(item.icon)+')',backgroundPosition:item.backgrounPosition}"></span>
            <span class="text">{{item.text}}</span>
          </li>
        </ul>
      </div>
      <div class="borderRight" v-Drag>
      </div>
      <div class="file-content-right" id="file-content-right">
        <div class="file-content-right-container file-content-right-container-0" v-show="switchTabType==0">
          <div class="top-container">
            <div class="container-0-title container-0-top-title">
              <p>{{$t('desktop.useMyImage')}}</p><!--使用我的图像-->
            </div>
            <div class="container-0-content container-0-top-content">
              <div class="option-btn-group">

                <el-upload
                  action="#"
                  class="upload-demo menuEnable"
                  style="width: 100%"
                  :http-request="uploadFile"
                  :on-success="handleUploaded"
                  :before-upload="handlebefore"
                  ref="uploadFileBtn"
                  :show-file-list="false"
                >
                  <gl-button-style>{{$t('file.upload')}}</gl-button-style>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="bottom_container">
            <div class="container-0-title container-0-bottom-title">
              <p>{{$t('desktop.myPreviousImage')}}</p><!--我以前的图像-->
            </div>
            <div class="container-0-content container-0-bottom-content">
              <div class="option-btn-group">
                <gl-button-style @click=" showDeleteDialog()" :disable="getHistoryList.length==0">
                  {{$t('desktop.deleteSelected')}}
                </gl-button-style><!--删除选中图片-->
              </div>
              <div class="file-content-container-0-list">
                <p class="noDataTip historyListNoData" v-if="getHistoryList.length==0">
                  {{$t('reminder.noUploadedImages')}}</p><!--暂无已上传图像-->
                <ul class="container-list" v-if="getHistoryList.length>0">
                  <li :class="{'listItem':true,'active':nowIndex==index}" v-for="(item,index) in getHistoryList"
                      :key="`historyList${index}`" @click="getRow(item,index,0)" @dblclick="setBackImg(item,0)">
                    <div class="items">
                      <div class="img"><img :src="$httpUrl+item.mapperBackdropImg"></div>
                      <div class="text">{{item.fileName}}</div>
                    </div>
                  </li>
                  <li v-for="(item,index) in emptyDivList0" :key="index" class="emptyDivClass">{{item.key}}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        <div class="file-content-right-container file-content-right-container-1" v-show="switchTabType==1">
          <ul class="container-list">
            <li :class="{'listItem':true,'active':defaultNowIndex==index}" v-for="(item,index) in deafaultBackImgList"
                :key="`defaultList${index}`" @click="getRow(item,index,1)" @dblclick="setBackImg(item,1)">
              <div class="items">
                <div class="img"><img :src="$httpUrl+item.mapperBackdropImg"></div>
                <div class="text">{{item.fileName}}</div>
              </div>
            </li>
            <li v-for="(item,index) in emptyDivList1" :key="index" class="emptyDivClass">{{item.key}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="childPanelFooter">
      <div class="dialogFooterBorder">
        <div class="dialogFooterBtnGroups">
          <gl-button-style type="blue" size="medium" @click="confirmDialog()">{{$t('common.yes')}}</gl-button-style>
          <gl-button-style size="medium" @click="closeDialog()">{{$t('common.no')}}</gl-button-style>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {deafaultBackImgListData, leftImgTabData} from '@components/homes/backgroundDialog/index'
  import {historyImgListFun, updateFileFun, historyImgDeleteFun} from '@api/deskTopBackground/backContact'
  import {assign_compatible, deepClone} from "@common/js/publicMethod/publicMethod";

  export default {
    name: "backImgSelect",
    props: {
      trueRefreshBackImgDialog: false
    },
    data () {
      return {
        switchTabType: 0,//右侧切换
        tabList: leftImgTabData(this),
        deafaultBackImgList: deafaultBackImgListData,
        emptyDivList1: [],//默认列表的填充div
        emptyDivList0: [],//历史列表的填充div
        getHistoryList: [],//历史列表
        userInfo: {},
        wallpaperPath: '/static/images/desktop_bg/backImg_03.jpg',//展示用
        nowRow: null,
        nowIndex: -1,
        defaultNowRow: null,
        defaultNowIndex: -1,
        showErrorWarning: false,
        errorMessage: '',
        showConfirmWarning: false,
        confirmMessage: ''
      }
    },
    watch: {
      "$store.state.Dialog.childDialog.userSets_child_Panel" (val) {
        if (val) {
          this.$nextTick(() => {
            let _this = this;
            //监听自适应
            $(".file-content-right-container-0").resize(function () {
              _this.addEmptyDiv(".file-content-right-container-0", 'getHistoryList', 'emptyDivList0', true);
            });
            $(".file-content-right-container-1").resize(function () {
              _this.addEmptyDiv(".file-content-right-container-1", 'deafaultBackImgList', 'emptyDivList1', true);
            });
            //调用查询历史列表数据
            this.getHistoryListFun(1);
          })
        } else {
          assign_compatible()
          Object.assign(this.$data, this.$options.data.call(this))
        }
      }
    },
    methods: {
      showDeleteDialog () {
        this.confirmMessage = this.$t('reminder.confirmDeleteImg');//确认删除该图像
        this.showConfirmWarning = true;
      },
      warningDialogClose () {
        this.showErrorWarning = false;
      },
      warningDialogCancel () {
        this.showErrorWarning = false;
      },
      confirmDialogClose () {
        this.deleteHistoryList();
        this.showConfirmWarning = false;
      },
      confirmDialogCancel (flag) {
        this.showConfirmWarning = false;
      },
      closeDialog () {
        //关闭弹框
        var menuId = 69;
        $("." + menuId + "_child").PopupWindow("close");
      },
      confirmDialog () {
        if ((this.switchTabType == 0 && this.nowRow != null) || (this.switchTabType == 1 && this.defaultNowRow != null)) {
          if (this.switchTabType == 0) {
            this.setBackImg(this.nowRow, 0);
          } else {
            this.setBackImg(this.defaultNowRow, 1);
          }
        } else {
          this.errorMessage = this.$t('reminder.pleaseSelectAnImage');/*请选择一个图像*/
          this.showErrorWarning = true;
        }
      },
      initDeafutValue () {
        this.nowRow = null;
        this.nowIndex = -1;
        this.defaultNowRow = null;
        this.defaultNowIndex = -1;
      },
      getRow (row, index, flag) {
        if (flag == 0) {
          this.nowIndex = index;
          this.nowRow = row;
        } else {
          this.defaultNowRow = row;
          this.defaultNowIndex = index;
        }
      },

      setBackImg (item, flag) {
        if (flag == 0) {//上传历史图片
          this.$store.commit('edit_back_info', this.$httpUrl + item.mapperBackdropImg)
        } else {//默认图片
          this.$store.commit('edit_back_info', item.mapperBackdropImg)
        }
        this.closeDialog();
      },
      switchTab (index) {
        this.switchTabType = index;
        this.initDeafutValue();
        if (index == 0) {
          this.getHistoryListFun(1);
        }
      },
      addEmptyDiv (bigContainer, dataListKey, emptyDivKey, truePASS = true) {//truePASS可以加条件判断
        $(bigContainer).find(".container-list").addClass("startAlign");
        this.$nextTick(() => {
          let bigWidth = $(bigContainer).width();
          let emptyNumArr = [];
          if (bigWidth != undefined && bigWidth != 0 && $(bigContainer).length != 0) {
            //bigWidth = $(bigContainer).width()-20-20;
            bigWidth = $(bigContainer).width();
            if (truePASS) {//额外传参的附加条件
              let small = 122 + 15 + 15;//120*106
              let rowNum = parseInt(bigWidth / small);//每行个数
              let colNum = Math.ceil(this[dataListKey].length / rowNum);//多少行
              let emptyNum = (colNum * rowNum) - this[dataListKey].length;
              if (emptyNum > 0) {
                //根据数组长度创建
                //let emptyNumArr = [...Array(emptyNum).keys()];
                emptyNumArr = Array.from({length: emptyNum}, (v, k) => k);
                //let emptyNumArr = Object.keys(Array.from({length:emptyNum}));
              }
            }
          }
          this[emptyDivKey] = emptyNumArr;
          this.$nextTick(() => {
            $(bigContainer).find(".container-list").removeClass("startAlign");
          })
        });
      },
      async uploadFile (params) {//上传文件
        if (params.file.type.indexOf('png') == -1 && params.file.type.indexOf('jpg') == -1 && params.file.type.indexOf('jpeg') == -1) {
          this.errorMessage = this.$t('reminder.fileFormatError');//'文件格式不正确，请重新上传'
          this.showErrorWarning = true
          this.showErrorWarning = true;
          this.$refs.uploadFileBtn.clearFiles();
          return false;
        }
        let {data: res} = await updateFileFun(params, this);
        if (res.code == 200 && res.msg == "Success") {
          this.setBackImg({
            mapperBackdropImg: '/image' + res.data,
            backdropImg: res.data,
          }, 0);
          this.getHistoryListFun(1);
        } else {
          this.errorMessage = this.$t('reminder.uploadFailed');//'上传失败!'
          this.showErrorWarning = true;
        }
      },
      handlebefore () {//
        this.$refs.uploadFileBtn.clearFiles();
      },
      handleUploaded () {
        this.$refs.uploadFileBtn.clearFiles();
      },
      async getHistoryListFun (flag) {//获取历史文件列表
        this.initDeafutValue();
        if (flag == 1) {
          let {data: res} = await historyImgListFun({type: flag});
          if (res.code == 200 && res.msg == "Success" && res.data != undefined) {
            let result = res.data.filter((item) => {
              if (item.userId != 0) {
                let pathArr = item.backdropImg.split('/');
                item.fileName = pathArr[pathArr.length - 1];
                return item;
              }
            });
            this.getHistoryList = result;
          } else {
            this.getHistoryList = [];
          }
          this.addEmptyDiv(".file-content-right-container-0", 'getHistoryList', 'emptyDivList0', true);
        }

      },
      async deleteHistoryList () {//删除历史文件列表
        if (this.nowRow != null) {
          let path = this.nowRow.backdropImg;
          let params = {path: path};
          let {data: res} = await historyImgDeleteFun(params, this);
          if (res.code == 200 && res.msg == "Success") {
            this.getHistoryListFun(1);//刷新列表
            this.$store.commit('deleteImg', path)
          } else {
            this.errorMessage = this.$t('reminder.failedToDelete');//'删除失败!'
            this.showErrorWarning = true;
          }
        } else {
          this.errorMessage = this.$t('reminder.chooseToDeleteImg');//'请选择要删除的图片!'
          this.showErrorWarning = true;
        }

      },

    },
    directives: {
      Drag: {
        bind: function (el) {
          el.addEventListener('mousedown', function (e) {
            var borderRight = document.querySelector('.borderRight')
            var file_content_left = document.querySelector('.file-content-left')
            //鼠标按下将样式条的位置给鼠标
            var x = e.pageX - borderRight.offsetLeft
            //获取在弹框内的鼠标位置
            document.addEventListener('mousemove', move)

            function move (e) {
              // console.log(e.pageX-x)
              let movePosition = e.pageX - x
              borderRight.style.left = (e.pageX - x) + 'px'
              // console.log( borderRight.style.left)
              file_content_left.style.width = borderRight.offsetLeft - 4 + 'px'
              if (movePosition <= 200) {
                borderRight.style.left = 205 + 'px'
              } else if (movePosition >= 400) {
                borderRight.style.left = 405 + 'px'
              } else {
                borderRight.style.left = borderRight.style.left
              }
            }

            document.addEventListener('mouseup', mouseup)

            function mouseup (e) {
              // console.log(e.pageX + '鼠标弹起的坐标')
              document.removeEventListener('mousemove', move)
              document.removeEventListener('mouseup', mouseup)
            }
          })
        }
      }
    },
    mounted () {
    }
    , beforeDestroy () {
    },
    created () {
    }
  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  .backImgSelect {
    height: 100%;
    padding-bottom: 65px;
    box-sizing: border-box;
  }

  .file-content {
    padding-top: 0;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    /*background-color: deepskyblue;*/
    position: relative;
    overflow: hidden;

    .file-content-left {
      position: relative;
      width: 200px;
      /* background-color: pink; */
      overflow-y: auto;
      height: 100%;
      /*margin-bottom: -264px;*/
      box-sizing: border-box;
      min-width: 200px;
      max-width: 400px;
      text-align: center;

      ul {
        width: 80%;
        min-width: auto;
        display: inline-block;
        text-align: left;

        li {
          display: inline-flex;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          padding: 6px 5px;
          align-items: center;
          box-sizing: border-box;

          .icon {
            width: 16px;
            height: 16px;
            display: inline-block;
          }

          .text {
            font-size: 12px;
            margin-left: 8px;
          }
        }

        .tabActive {
          background: #0086e5;
          color: #fff;
          border-radius: 3px;
        }
      }
    }

    .borderRight {
      position: absolute;
      left: 200px;
      width: 4px;
      box-sizing: border-box;
      cursor: col-resize;
      height: 100%;
      z-index: 2;
      background: url('/static/images/fileManager/shadow_category.png') repeat-y center;
    }

    .file-content-right {
      flex-direction: column;
      display: flex;
      flex: 1;
      /*background-color: pink;*/
      position: relative;
      padding-left: 0;
      margin-left: 0;
      overflow: hidden;
      box-sizing: border-box;
      margin-left: 10px;

      .file-list-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 29px;
        height: 100%;
        box-sizing: border-box;
      }

      .file-content-right-container {
        height: 100%;

        .container-list {
          box-sizing: border-box;
          padding-left: 20px;
          padding-right: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          overflow-y: auto;
          max-height: 100%;

          li {
            display: inline-flex;
            text-align: center;
            margin-right: 15px;
            margin-left: 15px;
            border: 1px solid transparent;
            box-sizing: border-box;

            .items {
              padding-bottom: 29px;
              box-sizing: border-box;
              width: 120px;
              height: 120px;
              padding-left: 5px;
              padding-right: 5px;
              padding-top: 5px;

              .img {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                display: flex;
                align-items: flex-end;
                justify-content: center;

                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }

              .text {
                display: block;
                overflow: hidden;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
              }

            }
          }

          li.listItem:hover {
            border: solid 1px #C8D2DC;
            background-color: #F0F5FA;
          }

          li.listItem.active {
            background: #E6F5FF;
            border: 1px solid #A6DAFF;
          }

          .emptyDivClass {
            width: 120px;
            height: 120px;
            display: inline-flex;
            box-sizing: border-box;
          }
        }

        .startAlign {
          justify-content: flex-start;
        }
      }

      .file-content-right-container-0 {
        //padding-left: 15px;
        //padding-right: 15px;
        padding-top: 80px;
        box-sizing: border-box;

        .container-0-title {
          height: 29px;
          border-bottom: 1px dashed #d7e1eb;
          line-height: 29px;

          p {
            color: #0086e5;
            font-size: 15px;
            margin: 0;
            padding: 0;
          }
        }

        .option-btn-group {
          margin-top: 6px;
        }

        .top-container {
          margin-top: -64px;
          padding-left: 15px;
          padding-right: 15px;
          box-sizing: border-box;
        }

        .bottom_container {
          height: 100%;
          padding-top: 30px;
          box-sizing: border-box;

          .container-0-bottom-title {
            margin-top: -30px;
            padding-left: 15px;
            padding-right: 15px;
            box-sizing: border-box;
          }

          .container-0-bottom-content {
            height: 100%;
            padding-top: 38px;
            box-sizing: border-box;

            .option-btn-group {
              margin-top: -28px;
              padding-left: 15px;
              padding-right: 15px;
              box-sizing: border-box;
            }

            .file-content-container-0-list {
              height: 100%;
              padding-top: 10px;
              box-sizing: border-box;
            }
          }
        }

        .historyListNoData {
          float: left;
          margin-top: 4px;
          font-size: 12px;
          margin-left: 10px;
        }

        .container-list {
          padding-left: 0;
          padding-right: 0;

          li {
            margin-top: 0px;
          }
        }
      }

      .file-content-right-container-1 {
        .container-list {
          padding-left: 0;
          padding-right: 0;

          li {
            margin-top: 26px;
          }
        }
      }
    }
  }

  .childPanelFooter {
    height: 65px;
    padding: 0 20px;

    .dialogFooterBorder {
      background-image: url(/static/images/global/shadow_footbar.png);
      background-repeat: repeat-x;
      background-color: transparent;
      border: 0px;
      padding-top: 12px;
      padding-bottom: 7px;

      .dialogFooterBtnGroups {
        position: absolute;
        right: 11px;
        bottom: 15px;
      }
    }
  }


</style>
