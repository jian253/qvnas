<template>
  <div class="1_child child"
       style="position: relative" v-if="ControlPanels">
    <gl-load-animation :is-load-show="showLoad"></gl-load-animation>
    <div v-if="userDialogType==1" class="edit_container"><!--编辑-->
      <div class="edit_content">
        <el-tabs class="tabs" v-model="editActive" type="card" @tab-click="userEditTabClick">
          <el-tab-pane :label="$t('common.information')" name="userInfo">
            <user-table-info ref="userVerification" :dialogType="userDialogType" :currentEditUser="tableData"
                             @checkError="checkErrors"></user-table-info>
          </el-tab-pane>
          <el-tab-pane :label="$t('title.userGroup')" name="Authority">
            <user-groupinfo ref="userGroupInfoRef" :dialogType="userDialogType"
                            :currentEditUser="tableData"></user-groupinfo>
          </el-tab-pane>
          <el-tab-pane :label="$t('common.authority')" name="userGroup">
            <folder-shared-info ref="folderSharedInfo" :dialogType="userDialogType"
                                :currentEditUser="tableData"></folder-shared-info>
          </el-tab-pane>
          <!--<el-tab-pane label="高级设置" name="second">高级设置</el-tab-pane>-->
        </el-tabs>
      </div>
      <footer class="footer_box footer_shadow">
        <gl-button-style type="blue" size="medium" @click="saveEditUser()">{{$t('common.apply')}}</gl-button-style>
        <gl-button-style size="medium" @click="cancelEvent()">{{$t('common.no')}}</gl-button-style>
      </footer>
    </div>
    <div v-else style="height: 100%;"><!--新增-->
      <gl-carousel-view @Next_click="Next_click_evt" :length='4' :footer_shadow="true"
                        @change="changeView"
                        @cancel="cancelEvent" :title="header_title"
                        ref="carouselView"
                        :currentActive="currentActive"
      >
        <template v-slot:item="{item}">
          <div v-if="item===0">
            <user-table-info v-once ref="userVerification" :dialogType="userDialogType" :currentEditUser="tableData"
                             @checkError="checkErrors"></user-table-info>
          </div>
          <div v-if="item===1" style="padding: 10px 15px;">
            <user-groupinfo ref="userGroupInfoRef" :dialogType="userDialogType"
                            :currentEditUser="tableData"></user-groupinfo>
          </div>
          <div v-if="item===2" style="padding: 10px 15px;">
            <folder-shared-info ref="folderSharedInfo" :dialogType="userDialogType"
                                :currentEditUser="tableData"></folder-shared-info>
          </div>
          <div v-if="item===3" style="padding: 10px 15px;">
            <el-table
              ref="multipleTable"
              :data="doubleConfirm"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                :label="$t('title.project')"
                prop="name"
                show-overflow-tooltip
                width="150px">
              </el-table-column>
              <el-table-column
                prop="value"
                :label="$t('title.value')"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </gl-carousel-view>
    </div>
    <gl-warning-dialog :is-show="showWarning" correctBtn="red" @warningDialogClose="closeWarning">{{errorMessage}}
    </gl-warning-dialog>
    <gl-warning-dialog :is-show="showWarning1" correctBtn="blue" :cancelBtn="true" @warningDialogClose="closeWarning1"
                       @warningDialogCancel="cancelWarning1">{{errorMessage1}}
    </gl-warning-dialog>

  </div>
</template>
<!--this.$refs.controlChildren.InitInfo()-->
<script>
  import userDialog from '@/common/js/ControlPanel/userDialog.js'
  import {userEdit, addUser, modifyPermissions} from '@api/user/userContact'
  // import {userCheck} from "@api/login/loginContact";
  import {assign_compatible, deepClone} from "@common/js/publicMethod/publicMethod"
  import {userObj} from "@common/js/user/userInfo"
  import {mapState} from "vuex"
  import userTableInfo from "@/components/ControlPanel/userTable/userTableInfo";
  import userGroupinfo from "@/components/ControlPanel/userTable/userGroupinfo";
  import folderSharedInfo from "@/components/ControlPanel/userTable/folderSharedInfo";

  export default {
    name: 'ControlPanelChild',
    //props: ['userDialogType','selectedUserTableNets'],//
    components: {
      folderSharedInfo,
      userGroupinfo,
      userTableInfo
    },
    data: function () {
      return {
        currentActive: 0,
        checked: true,
        checked1: false,
        checked2: false,
        text2: '禁止访问',
        radio: 1,
        radios: 2,
        showWarning: false,
        showWarning1: false,//确认离开
        errorMessage1: '',
        errorMessage: '',
        showLoad: false,
        tableData: {},//表格当前选中的行
        needBackgroundIco: true,
        userInfo: this.UserInfo,
        userDialogType: 0,//0 新增 1 编辑
        editActive: "userInfo",//tab当前激活
        //selectedUserTableNets: {},
        trueRefreshUserList: false,//用来刷新兄弟组件的数据  userList
        header_title: {
          text: this.$t('user.userInformation'),
          text1: this.$t('user.infoField')
        },
        doubleConfirm: [
          {
            name: this.$t('user.name'),
            value: ''
          }, {
            name: this.$t('user.description'),
            value: ''
          }, {
            name: this.$t('user.email'),
            value: ''
          }, {
            name: this.$t('title.readAndWrite'),
            value: ''
          }, {
            name: this.$t('title.readOnly'),
            value: ''
          }, {
            name: this.$t('title.noAccess'),
            value: ''
          }
        ]
      }
    },
    created () {
      this.$store.commit('Panel/saveControlChildInfo', this.$data)
      userDialog.$on('trueRefreshUserList', (message) => {
        this.trueRefreshUserList = message;
      })
    },
    computed: {
      ...mapState('Dialog', {
        ControlPanels: state => state.childDialog.control_child_Panel
      })
    },
    watch: {
      trueRefreshUserList: function (val) {
        if (val == true) {//需要刷新
          userDialog.$emit('trueRefreshUserList', true);//传当前行数据
        }
      },
      ControlPanels: function (val) {
      },
      tableData: {
        handler: function (val) {
          this.$nextTick(() => {
            if (this.$refs['userGroupInfoRef'] != undefined) {
              if (this.userDialogType == 1) {//编辑
                //判断是否有权限 否则报错
                this.$refs.userGroupInfoRef.dealEditListData();
                this.$refs.folderSharedInfo.dealEditListData();
              } else {//添加
                this.$refs.userGroupInfoRef.dealAddListData();
                this.$refs.folderSharedInfo.dealAddListData();
              }
            }
          })
        },
        deep: true
      },
      userDialogType: function (val) {
      }

    },
    methods: {
      userEditTabClick (targetName, action) {
        this.editActive = targetName.name;
      },
      saveEditUser (el) {
        this.newUserOrEdit(el);
      },
      Next_click_evt (e) {//下一步
        if (this.$refs.carouselView.current == 0) {
          this.$refs['userVerification'].confirmAddUserInfo().then((res) => {
            if (res) {
              this.$refs.carouselView.currentClick()
            }
          })
        } else if (this.$refs.carouselView.current == 3) {
          this.newUserOrEdit()
        } else {
          this.$refs.carouselView.currentClick()
        }
      },
      Next_step (index, e) {
        if (index == 1) {
          this.doubleConfirm[0].value = this.$refs['userVerification'].addUserInfo.userName
          this.doubleConfirm[1].value = this.$refs['userVerification'].addUserInfo.remark
          this.doubleConfirm[2].value = this.$refs['userVerification'].addUserInfo.email
        } else if (index == 3) {
          let read = '',
            readAndWrite = '',
            noAccess = ''
          this.$refs.folderSharedInfo.sharedFolder.forEach(item => {
            if (item.value == this.$t('title.noAccess')) {
              noAccess += item.name + ','
            } else if (item.value == this.$t('title.readAndWrite')) {
              readAndWrite += item.name + ','
            } else {
              read += item.name + ','
            }
          })
          this.doubleConfirm[3].value = readAndWrite.slice(0, readAndWrite.length - 1)
          this.doubleConfirm[4].value = read.slice(0, read.length - 1)
          this.doubleConfirm[5].value = noAccess.slice(0, noAccess.length - 1)
        }
      },
      cancelEvent () {
        if (this.userDialogType == 1) {//编辑
          let true1 = this.$refs.userGroupInfoRef.checkEditValue();
          let true2 = this.$refs.folderSharedInfo.checkEditValue();
          let true3 = this.$refs['userVerification'].checkEditValue();
          if (true1 && true2 && true3) {
            this.closeDialog();
          } else {
            this.errorMessage1 = this.$t('reminder.changes');
            this.showWarning1 = true;
          }
        } else {
          this.closeDialog();
        }
      },
       closeWarning1 () {
        this.showWarning1 = false;
        this.closeDialog();
      },
      cancelWarning1 () {
        this.showWarning1 = false;
      },
      changeView (key) {
        let title = [{
          text: this.$t('user.userInformation'),
          text1: this.$t('user.infoField')
        }, {
          text1: this.$t('title.addGroup'),
          text: this.$t('reminder.userRoot')
        }, {
          text: this.$t('title.assignPermissions'),
          text1: this.$t('title.setPermissions')
        }, {
          text: this.$t('title.settingsAgain'),
          text1: this.$t('title.settingsAgainInfo')
        }
        ]
        this.header_title = title[key]
        this.Next_step(key)
      },
      closeWarning () {
        this.showWarning = false
      },
      cancelUserInfos: function (event) {
        this.closeDialog();
      },
      closeDialog: async function (el) { //关闭弹框
        await assign_compatible
        Object.assign(this.$data, this.$options.data.call(this))
        const menuId = '.1_child'
        $(`${menuId}`).PopupWindow("close");//关闭弹框
      },
      //修改权限 权限
      async editAuthority (Authority) {
        let currentEditAuthority = ''
        this.tableData.userRoleList.forEach((item) => {
          currentEditAuthority += item.authorityId + ','
        })
        const newArray = currentEditAuthority.slice(0, currentEditAuthority.length - 1)
        if (newArray == Authority) {
          return true
        }
        const {data: res} = await modifyPermissions({
          authorityId: Authority,
          userId: this.tableData.userId
        })
        return res.code == 200;
      },
      async newUserOrEdit (el) {//新增用户编辑
        // if (this.$store.state.currentUserInfo.delFlag!=1){//无权限新增用户
        //   await this.closeDialog(el)
        //   this.showWarning=true
        //   this.errorMessage = this.$t('reminder.authority')//'账号权限不够!'
        //   return
        // }
        // this.addUserInfo.accountStatus?nowStatus=1:nowStatus=0;
        let authorityId = this.$refs.folderSharedInfo.commitValue();//拿到文件管理权限id
        await this.$refs['userVerification'].delFlagEvent(this.$refs.userGroupInfoRef.commitValue())
        let userInfoObj = userObj(this.$refs['userVerification'].addUserInfo)
        if (this.userDialogType == 0) {//新增
          this.showLoad = true
          let {data: res} = await addUser(JSON.stringify(userInfoObj), {
            roleId: 1,
            authorityId: authorityId
          });
          if (res.code != 200) {//新增失败
            this.showLoad = false
            this.errorMessage = this.$t('reminder.newUserError')//'新增用户失败!'
            this.showWarning = true
            return
          } else {
            await this.closeDialog(el)
            this.$emit('getUserList')
          }
          this.showLoad = false
          //触发一个事件让父弹框刷新
        } else {//编辑
          // console.log(userInfoObj)
          // if (userInfoObj.password.trim().length == 0) {
          //   userInfoObj.password = this.tableData.password
          // }
          // else if (JSON.stringify(userInfoObj.password) !== JSON.stringify(this.tableData.password)) {
          this.$refs['userVerification'].confirmAddUserInfo().then(async (res) => {
            if (this.$refs['userVerification'].addUserInfo.password.length == 0) {
              userInfoObj.password = this.$refs['userVerification'].isInputPassword
            }
            if (res != false) {//验证通过
              const editResult = await this.editAuthority(authorityId)
              this.showLoad = true
              userInfoObj.userName=this.tableData.userName//用户编辑的是用户昵称 用户名称是创建后不允许修改
              let {data: res} = await userEdit(JSON.stringify(userInfoObj))
              if (res.code !== 200 || res.code === 401 || editResult === false) {
                this.showLoad = false
                this.errorMessage = this.$t('reminder.edit')//'编辑用户失败!'
                this.showWarning = true
                return
              } else {
                this.closeDialog(el)
                this.$emit('getUserList')
              }
              this.showLoad = false
            }
          })
        }
      },
      //验证用户名接口错误
      checkErrors (message) {
        this.showWarning = true
        this.errorMessage = message
      }
    }
    ,
    filters: {}
    ,
    mounted () {
      //监听编辑选中的时候的数据
      this.$EventBus.$on('tableParams', (data) => {
        this.tableData = data;
      })
      userDialog.$on('dialogType', (message) => {
        this.userDialogType = message;
        if (this.userDialogType == 0) {
          this.tableData = this.$store.state.currentUserInfo;
        }
      })
    }
    ,

  }
</script>

<style lang="less" scoped>
  @deep: ~">>>";
  .edit_container {
    padding: 3px 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;

    .edit_content {
      flex: 1;
    }

  }

  @{deep}.el-table th > .cell {
    font-size: 12px;
    color: #0086E5;
    font-weight: 400;
    border-right: 1px solid #EBEEF5;
    border-top: 1px solid #D7E1EB;
  }

  @{deep}.el-table--border, .el-table--group {
    border: 0;
  }

  @{deep}.el-table .cell {
    font-size: 12px;
  }

  @{deep}.el-table--border td {
    border-right: 0px;
  }

  .child {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  @{deep}.el-checkbox__label {
    font-size: 12px;
    color: #505A64;
  }

  @{deep}.el-input__inner, .td_content @{deep} .el-input__icon {
    height: 28px;
    line-height: 28px;
  }

  @{deep}.el-input__inner {
    border: 1px solid #C8D2DC;
    color: #505A64;
    font-size: 12px;
    padding: 0 8px;
    border-radius: 0px;
    width: 200px;
    box-shadow: inset 0px 1px 0px rgba(80, 90, 100, 0.08);
  }

  @{deep}.el-input__inner:focus {
    border-color: #0086E5;
  }

  /*.user_dialog_containter,.carouselView_box {*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*  box-sizing: border-box;*/
  /*  overflow: hidden;*/
  /*}*/
</style>
