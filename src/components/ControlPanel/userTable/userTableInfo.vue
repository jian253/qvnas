<template>
  <div class="childPanelContent">
    <table class="dialogTable">
      <tr>
        <td claSS="td_title">
          <label>
            <span class="label_title" v-if="dialogType==0">{{$t('user.name')}}</span><!--名称-->
            <span class="label_title" v-if="dialogType==1">{{$t('user.nickName')}}</span><!--昵称-->
            <span class="requiredTip">*</span>
            <span class="label_quotation_marks">:</span>
          </label>
        </td>
        <td class="td_content">
          <el-input @input="name_debounce"
                    :class="{ 'errorInput': !addUserInfo.verifyUserInfo.userNameVerify}"
                    v-model="addUserInfo.userName">
          </el-input>
          <span class="error" v-show="!addUserInfo.verifyUserInfo.userNameVerify">{{addUserInfo.verifyUserInfo.userNameVerifyTip}}</span>
        </td>
      </tr>
      <tr>
        <td class="td_title">
          <label>
            <span class="label_title">{{$t('user.description')}}</span><!--描述-->
            <span class="label_quotation_marks">:</span>
          </label>
        </td>
        <td class="td_content">
          <el-input v-model="addUserInfo.remark"></el-input>
        </td>
      </tr>
      <tr>
        <td class="td_title">
          <label>
            <span class="label_title">{{$t('user.email')}}</span><!--电子邮箱-->
            <span class="label_quotation_marks">:</span>
          </label>
        </td>
        <td class="td_content">
          <el-input max-length="12" :class="{ 'errorInput':!addUserInfo.verifyUserInfo.userEmailVerify}"
                    @input="email_debounce" v-model="addUserInfo.email">
          </el-input>
          <span class="error" v-show="!addUserInfo.verifyUserInfo.userEmailVerify">{{addUserInfo.verifyUserInfo.userEmailVerifyTip}}</span>
        </td>
      </tr>
      <tr>
        <td class="td_title">
          <label>
            <span class="label_title">{{$t('user.password')}}</span><!--密码-->
            <span class="requiredTip">*</span>
            <span class="label_quotation_marks">:</span>
          </label>
        </td>
        <td class="td_content">
          <el-input type="password" max-length="12"
                    :class="{ 'errorInput':!addUserInfo.verifyUserInfo.passwordVerify}"
                    @input="password_debounce" v-model="addUserInfo.password">

          </el-input>
          <span class="error" v-show="!addUserInfo.verifyUserInfo.passwordVerify">{{addUserInfo.verifyUserInfo.passwordVerifyTip}}</span>
        </td>
      </tr>
      <tr>
        <td class="td_title"></td>
        <td class="td_content">
          <div class="input_span" v-if="addUserInfo.addUserPasswordLevel==3">
            <span class="one" style="background:#5EB85A;"></span>
            <span class="two" style="background:#5EB85A"></span>
            <span class="three" style="background:#5EB85A"></span>
            <label style="color:#5EB85A;">{{$t('user.strong')}}</label><!--强-->
          </div>
          <div class="input_span" v-else-if="addUserInfo.addUserPasswordLevel==2">
            <span class="one" style="background:#F4A622;"></span>
            <span class="two" style="background:#F4A622"></span>
            <span class="three" style="background:rgba(198,212,224,0.4)"></span>
            <label style="color:#F4A622;">{{$t('user.in')}}</label><!--中-->
          </div>
          <div class="input_span" v-else-if="addUserInfo.addUserPasswordLevel==1">
            <span class="one" style="background:#E64040;"></span>
            <span class="two" style="background:rgba(198,212,224,0.4)"></span>
            <span class="three" style="background:rgba(198,212,224,0.4)"></span>
            <label style="color:#E64040;">{{$t('user.weak')}}</label><!--弱-->
          </div>
        </td>
      </tr>
      <tr>
        <td class="td_title">
          <label>
            <span class="label_title">{{$t('user.confirmPassword')}}</span><!--确认密码-->
            <span class="requiredTip">*</span>
            <span class="label_quotation_marks">:</span>
          </label>
        </td>
        <td class="td_content">
          <el-input max-length="12" type="password"
                    @input="dialogType==0?Confirm_Password_debounce():Password_edit()"
                    :class="{ 'errorInput': (addUserInfo.verifyUserInfo.passwordVerify==true&&addUserInfo.verifyUserInfo.confirmVerify==false)}"
                    v-model="addUserInfo.confirmPassword"></el-input>
          <span class="error" v-show="!addUserInfo.verifyUserInfo.confirmVerify==true">{{addUserInfo.verifyUserInfo.confirmVerifyTip}}</span>
        </td>
      </tr>
      <tr>
        <td class="td_title">
          <label>
            <el-checkbox v-model="addUserInfo.accountStatus">{{$t('user.whetherToDisable')}}</el-checkbox>
            <!--是否停用账户-->
          </label>
        </td>
        <td class="td_content"></td>
      </tr>
      <tr>
        <td class="td_title">
          <label>
            <span class="requiredTip">*</span>
            <span class="label_title">{{$t('reminder.NoBlanksAllowed')}}</span><!--字段不允许空白-->
          </label>
        </td>
        <td class="td_content"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {KeepName} from "@common/js/authority/Authority";

  import {userCheck} from "@api/login/loginContact";
  import {debounce} from "@common/common/debounceAndThrottle";

  export default {
    name: "userTableInfo",
    props: {
      dialogType: {
        default: 0,
        type: Number,
        required: true
      },
      currentEditUser: {
        default: [],
        required: true
      },
    },
    watch: {
      currentEditUser: {
        handler: function (val) {
        },
        deep: true
      }
    },
    data () {
      return {
        addUserInfo: {//用户信息
          addUserPasswordLevel: 0,
          userName: '',
          remark: '',
          email: '',
          delFlag: 0,//权限为1时才有权限修改
          password: '',
          userId: null,
          confirmPassword: '',//1 弱 2 中 3 强
          accountStatus: 0,//0 正常 1 停用
          verifyUserInfo: {
            userEmailVerify: true,
            userNameVerify: true,
            passwordVerify: true,
            confirmVerify: true,
            userNameVerifyTip: this.$t('reminder.username'),//'您没有输入用户名称'
            passwordVerifyTip: this.$t('reminder.passwordStrength'), /*'最低强度要求：最短密码长度为6'*/
            confirmVerifyTip: this.$t('reminder.passwordDifferent'),/*'密码不一致,请重新输入'*/
            userEmailVerifyTip: this.$t('reminder.legalMailbox'),//'请输入合法的邮箱格式'
          },
        },
        saveOldUserInfo: {},//用于保存信息 作比较的
        isInputPassword: '',//用来判断用户有没有修改密码
        isInputEmail: '',//用来判断是否修改过邮箱
      }
    },
    methods: {
      delFlagEvent (value) {
        this.addUserInfo.delFlag = value;
        //value == 10 ? this.addUserInfo.delFlag = 1 : this.addUserInfo.delFlag = 0
      },
      //再次验证所有用户信息
      confirmAddUserInfo: async function (event) {
        if (this.dialogType == 1) {//当前编辑用户 注意，后台给的是加密的密码 如果客户没有输入密码 就把加密的密码传递给后台，编辑用户不做密码校验 用户名也不用校验
          if (this.addUserInfo.password.trim().length != 0) {
            let VerifyResult2 = this.user_Confirm_Password_Verify();//验证密码
            if (!VerifyResult2) {//验证没有通过
              return false
            }
          }
        } else {
          let VerifyResult = this.user_Name_Verify();//验证用户名
          let VerifyResulte=this.user_Password_addOrEdit_Verify()//验证密码长度
          let VerifyResult2=null
          if(VerifyResulte){
            VerifyResult2= this.user_Confirm_Password_Verify();//验证密码
          }
          if (!VerifyResult || !VerifyResult2||!VerifyResulte) {//验证没有通过
            return false
          }
        }
        return this.trueRepeatUserName()
      },
      //调用接口校验是否存在用户
      trueRepeatUserName: async function () {
        if (this.dialogType == 1) {//编辑
          // console.log(this.uncertainInput())
          return this.uncertainInput()
        } else if (this.dialogType == 0) {//新增
          //用户名称校验
          const {data: res} = await userCheck({
            userName: this.addUserInfo.userName
          })
          if (res.code == 200) {//说明不存在发起请求
            if (KeepName.includes(this.addUserInfo.userName)) {
              //提示该字段已被系统保留请重新输入
              this.addUserInfo.verifyUserInfo.userNameVerify = false;
              this.addUserInfo.verifyUserInfo.userNameVerifyTip = this.$t('reminder.existed');
              return false
            }else {
              return true
            }
          } else if (res.code == 1) {//用户名存在
            //提示用户已经存在
            this.addUserInfo.verifyUserInfo.userNameVerify = false;
            this.addUserInfo.verifyUserInfo.userNameVerifyTip = this.$t('reminder.existed')//'用户名存在或被系统保留，请输入另一个名称';
            return false
          } else if (res.code == 4001) {
            this.$emit('checkError', this.$t('reminder.deleteFrequency'))//超出访问次数
            return false
          } else {
            this.$emit('checkError', this.$t('reminder.userNameError'))//用户名校验错误
            return false
          }
        }
      },
      //校验用户编辑的时候是否输入过邮箱以及密码
      uncertainInput () {
        //如果是编辑用户密码 用户没有输入密码 则以加密的密码 否则就是输入的密码长度大于6校验
        let beforePass = this.addUserInfo.password.trim()
        if (beforePass.length == 0) {//用户没有修改密码不做操作 将原来密码返回
          // this.addUserInfo.password=this.isInputPassword
        } else {//用户输入了密码进行校验
          let result = this.user_Password_addOrEdit_Verify()
          let result1 = this.user_Password_edit_doubleV()
          return !(result == false || result1 == false);
        }
        let currentEmail = JSON.stringify(this.isInputEmail)
        let beforeEmail = JSON.stringify(this.addUserInfo.email)
        if (currentEmail !== beforeEmail) {//用户输入过邮箱就校验 没输入就不校验
          if (!this.user_email_Verify()) {
            return false
          }
        }
      },
      name_debounce: debounce('user_Name_Verify', 400, false),
      user_Name_Verify: function () {//用户名验证
        // if (this.addUserInfo.userName == sharedParent || sharedFolderName.includes(this.addUserInfo.userName)) {
        //   //提示该字段已被系统保留请重新输入
        //   this.addUserInfo.verifyUserInfo.userNameVerify = false;
        //   this.addUserInfo.verifyUserInfo.userNameVerifyTip = this.$t('reminder.existed');
        //   return false
        // }
        const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;//判断是否包含汉字
        if (reg.test(this.addUserInfo.userName)) {
          this.addUserInfo.verifyUserInfo.userNameVerify = false;
          this.addUserInfo.verifyUserInfo.userNameVerifyTip = this.$t('reminder.userNameRex');//'不允许出现中文'
          return false
        }
        let sValue = this.addUserInfo.userName;//用户名
        if (sValue.trim().length < 1) {
          // this.$set(this.addUserInfo.verifyUserInfo,'userNameVerify',false)
          this.addUserInfo.verifyUserInfo.userNameVerify = false;
          this.addUserInfo.verifyUserInfo.userNameVerifyTip = this.$t('reminder.username');//'请输入用户名称'
          return false
        } else {
          this.addUserInfo.verifyUserInfo.userNameVerify = true;
          return true
        }
      },
      password_debounce: debounce('user_Password_addOrEdit_Verify', 400, false),
      //密码强度验证
      user_Password_addOrEdit_Verify: function () {
        this.addUserInfo.verifyUserInfo.confirmVerify = true;
        var sValue = this.addUserInfo.password;
        var modes = 0;
        //正则表达式验证符合要求的
        if (sValue.trim().length < 6) {
          //并且提示错误提示
          this.addUserInfo.addUserPasswordLevel = 0;
          this.addUserInfo.verifyUserInfo.passwordVerify = false;
          this.addUserInfo.verifyUserInfo.passwordVerifyTip = this.$t('reminder.passwordStrength');
          //'最低强度要求：最短密码长度为6'
          return false;
        } else {
          this.addUserInfo.verifyUserInfo.passwordVerify = true;
          return true
        }
        //用来验证数字 大小写字母  特殊字符共存的正则表达式
        // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[0-9A-Za-z@$!%*?&]{8,18}$
        //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.,!%*?&])[A-Za-z\d@$!%*?&]{8,18}$
        if (/\d/.test(sValue)) modes++; //数字
        if (/[a-z]/.test(sValue)) modes++; //小写
        if (/[A-Z]/.test(sValue)) modes++; //大写
        if (/\W/.test(sValue)) modes++; //特殊字符
        if (modes > 1 || modes == 1) {
          this.addUserInfo.addUserPasswordLevel = 1;
        }
        if (modes > 2 || modes == 2) {
          this.addUserInfo.addUserPasswordLevel = 2;
        }
        if (modes == 4) {
          this.addUserInfo.addUserPasswordLevel = 3;
        }
      },
      Confirm_Password_debounce: debounce('user_Confirm_Password_Verify', 400, false),
      //校验确认密码
      user_Confirm_Password_Verify: function () {
        var sValue1 = this.addUserInfo.password;
        var sValue2 = this.addUserInfo.confirmPassword;
        if (sValue1.trim().length < 1) {//说明没有输入密码
          this.addUserInfo.verifyUserInfo.passwordVerify = false
          this.addUserInfo.verifyUserInfo.confirmVerify = true;
          this.addUserInfo.verifyUserInfo.passwordVerifyTip = this.$t('reminder.pleaseEnterPassword')//'请输入密码';
          return false
        } else if (sValue1 != sValue2) {
          this.addUserInfo.verifyUserInfo.passwordVerify = true;
          this.addUserInfo.verifyUserInfo.confirmVerify = false;
          this.addUserInfo.verifyUserInfo.confirmVerifyTip = this.$t('reminder.passwordDifferent')//'密码及确认密码不一致,请重新输入';
          return false
        } else {
          this.addUserInfo.verifyUserInfo.confirmVerify = true;
          this.addUserInfo.verifyUserInfo.passwordVerify = true;
          return true
        }
      },
      email_debounce: debounce('user_email_Verify', 400, false),
      //验证邮箱
      user_email_Verify: function () {
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (reg.test(this.addUserInfo.email)) {
          this.addUserInfo.verifyUserInfo.userEmailVerify = true;
          return true
        } else {
          this.addUserInfo.verifyUserInfo.userEmailVerify = false;
          this.addUserInfo.verifyUserInfo.userEmailVerifyTip = this.$t('reminder.legalMailbox') //'请输入合法的邮箱格式';
          return false
        }
      },
      Password_edit: debounce('user_Password_edit_doubleV', 400, false),
      //编辑密码验证双校验
      user_Password_edit_doubleV () {
        const sValue1 = this.addUserInfo.password;
        const sValue2 = this.addUserInfo.confirmPassword;
        if (sValue1 != sValue2) {
          this.addUserInfo.verifyUserInfo.passwordVerify = true;
          this.addUserInfo.verifyUserInfo.confirmVerify = false;
          this.addUserInfo.verifyUserInfo.confirmVerifyTip = this.$t('reminder.passwordDifferent'); //'密码不一致,请重新输入'
          return false
        } else {
          this.addUserInfo.verifyUserInfo.confirmVerify = true;
          return true
        }
      },
      checkEditValue () {//验证修改了值
        return JSON.stringify(this.saveOldUserInfo) == JSON.stringify(this.addUserInfo);
      }
    },
    beforeDestroy () {
    },
    created () {
      if (this.dialogType == 1) {//编辑 保存编辑之前的密码
        this.isInputPassword = this.currentEditUser.password
        this.isInputEmail = this.currentEditUser.email
        const addUserInfo = {//用户信息
          userName: this.currentEditUser.nickName,
          remark: this.currentEditUser.remark,
          email: this.currentEditUser.email,
          accountStatus: this.currentEditUser.status != 0,//0正常 1 停用
          userId: this.currentEditUser.userId
        }
        Object.assign(this.addUserInfo, addUserInfo);
        this.saveOldUserInfo = JSON.parse(JSON.stringify(this.addUserInfo));
      }

    }
  }
</script>

<style lang="less" scoped>
  @deep: ~">>>";
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

  /*表格input 高度调整*/
  .dialogTable @{deep} .td_content @{deep} .el-input__inner {
    height: 30px;
    line-height: 30px;
  }

  .dialogTable @{deep} .el-input @{deep} .el-input__icon {
    line-height: 30px;
  }

  .dialogTable @{deep} .errorInput @{deep} input.el-input__inner {
    background: #FFF0F0;
    border-color: #FF8C8C;
  }

  .dialogTable @{deep} label.el-checkbox {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .dialogTable {
    width: 100%;
  }

  .errorInput {
    width: 200px !important;
  }

  .childPanelContent @{deep} .errorInput .el-input__inner {
    border-color: #FF8C8C;
    background-color: #FFF0F0;
    background-image: none;
  }

  .dialogTable @{deep} .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #505A64;
    font-size: 12px;
  }

  .dialogTable @{deep} .el-checkbox {
    color: #505A64;
    font-size: 12px;
  }

  .childPanelContent {
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 10px;
    overflow: auto;

    .input_span {
      span {
        display: inline-block;
        width: 26px;
        height: 4px;
        background: #eee;
        float: left;
        margin-top: 6px;
        margin-right: 4px;
      }

      label {
        margin-left: 6px;
        font-size: 12px;
        float: left;
      }
    }

    .dialogTable {
      padding: 10px 0px 0 10px;

      .td_content {
        label {
          width: 250px;
          display: inline-block;
        }
      }

      .error {
        font-size: 12px;
        color: #FA4B4B;
      }

      .td_title {
        font-size: 12px;
        color: #505A64;
        width: 250px;

        span.label_quotation_marks {
          font-weight: 600;
        }
      }
    }
  }
</style>
