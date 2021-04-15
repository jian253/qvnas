<template>
  <div class="69 child" v-if="userSets" style="height: 100%;position: relative;">
    <gl-load-animation :is-load-show="showLoad"></gl-load-animation>
    <gl-warning-dialog :is-show="showWarning" icon="prompt" :cancelBtn="true" @warningDialogClose="warningDialogClose"
                       @warningDialogCancel="warningDialogCancel">
      {{errorMessage}}
    </gl-warning-dialog>
    <gl-warning-dialog :is-show="showConfirmTip" icon="prompt" :cancelBtn="true"
                       @warningDialogClose="ConfirmDialogClose"
                       @warningDialogCancel="ConfirmDialogCancel">
      <!--      变更尚未保存，您确定要离开吗?-->
      {{$t('reminder.changes')}}
    </gl-warning-dialog>
    <div class="SetContainer">
      <el-tabs class="tabs userSetTab" v-model="setTabType" type="card">
        <el-tab-pane :label="$t('common.account')" name="userSet" class="userSetTabPanel">
          <div class="childPanelContent">
            <table class="dialogTable">
              <tr>
                <td claSS="td_title">
                  <label>
                    <!--名称-->
                    <span class="label_title">{{$t('user.name')}}</span>
                    <span class="label_quotation_marks">:</span>
                  </label>
                </td>
                <td class="td_content">
                  <span style="font-size: 12px; color: #505A64;">{{addUserInfo.userName}}</span>
                </td>
              </tr>
              <tr>
                <td class="td_title">
                  <label>
                    <!--描述-->
                    <span class="label_title">{{$t('user.description')}}</span>
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
                    <!--电子邮件-->
                    <span class="label_title">{{$t('user.email')}}</span>
                    <span class="label_quotation_marks">:</span>
                  </label>
                </td>
                <td class="td_content">
                  <el-input :disabled="addUserInfo.userId=='root'" max-length="12"
                            :class="{ 'errorInput':!verifyUserInfo.userEmailVerify}"
                            @input="user_email_Verify" v-model="addUserInfo.email"></el-input>
                  <span class="error"
                        v-if="!verifyUserInfo.userEmailVerify">{{verifyUserInfo.userEmailVerifyTip}}</span>
                </td>
              </tr>
              <tr>
                <td class="td_title">
                  <label>
                    <!--密码-->
                    <span class="label_title">
                    {{$t('user.password')}}</span>
                    <span class="label_quotation_marks">:</span>
                  </label>
                </td>
                <td class="td_content">
                  <el-input :disabled="addUserInfo.userId=='root'" type="password" max-length="12"
                            :class="{ 'errorInput':!verifyUserInfo.passwordVerify}"
                            @input="user_Password_edit_Verify" v-model="addUserInfo.password"></el-input>
                  <span class="error" v-if="!verifyUserInfo.passwordVerify">{{verifyUserInfo.passwordVerifyTip}}</span>
                </td>
              </tr>
              <tr>
                <td class="td_title"></td>
                <td class="td_content">
                  <div class="input_span" v-if="addUserInfo.addUserPasswordLevel==3">
                    <span class="one" style="background:#5EB85A;"></span>
                    <span class="two" style="background:#5EB85A"></span>
                    <span class="three" style="background:#5EB85A"></span>
                    <!--强-->
                    <label style="color:#5EB85A;"> {{$t('user.strong')}}</label>
                  </div>
                  <div class="input_span" v-else-if="addUserInfo.addUserPasswordLevel==2">
                    <span class="one" style="background:#F4A622;"></span>
                    <span class="two" style="background:#F4A622"></span>
                    <span class="three" style="background:rgba(198,212,224,0.4)"></span>
                    <!--中-->
                    <label style="color:#F4A622;">{{$t('user.in')}}</label>
                  </div>
                  <div class="input_span" v-else-if="addUserInfo.addUserPasswordLevel==1">
                    <span class="one" style="background:#E64040;"></span>
                    <span class="two" style="background:rgba(198,212,224,0.4)"></span>
                    <span class="three" style="background:rgba(198,212,224,0.4)"></span>
                    <!--弱-->
                    <label style="color:#E64040;">{{$t('user.weak')}}</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="td_title">
                  <label>
                    <!--确认密码-->
                    <span class="label_title">{{$t('user.confirmPassword')}}</span>
                    <span class="label_quotation_marks">:</span>
                  </label>
                </td>
                <td class="td_content">
                  <el-input max-length="12" type="password" @input="user_Confirm_Password_Verify()"
                            :class="{ 'errorInput': (verifyUserInfo.passwordVerify==true&&verifyUserInfo.confirmVerify==false)}"
                            v-model="addUserInfo.confirmPassword"></el-input>
                  <span class="error" v-if="!verifyUserInfo.confirmVerify">{{verifyUserInfo.confirmVerifyTip}}</span>
                </td>
              </tr>
              <tr>
                <td class="td_title">
                  <label>
                    <span class="label_title">{{$t('user.language')}}</span>
                    <span class="label_quotation_marks">:</span>
                  </label>
                </td>
                <td class="td_content" style="width: 270px;max-width: 270px;overflow: hidden">
                  <el-select v-model="addUserInfo.userLanguage" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in languageOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane><!--账号-->
        <el-tab-pane :label="$t('common.desktop')" name="desktopSet" class="desktopSetTabPanel"><!--桌面-->
          <div class="childPanelContent">
            <table class="dialogTable">
              <tr>
                <td class="td_checked">
                  <label>
                    <!--自定义颜色-->
                    <el-checkbox v-model="addUserInfo.customColor" @change="customColorEvent">
                      {{$t('desktop.customColor')}}
                    </el-checkbox>
                  </label>
                </td>
                <td></td>
              </tr>
              <tr>
                <td class="td_title">
                  <label>
                    <!--文字颜色-->
                    <span class="label_title">{{$t('desktop.textColor')}}</span>
                    <span class="label_quotation_marks">:</span>
                  </label>
                </td>
                <td class="td_content" style="width: 270px;max-width: 270px;overflow: hidden">
                  <el-input v-model="addUserInfo.textColor" :disabled="!addUserInfo.customColor" placeholder="请选择"
                            size="mini"></el-input>
                  <el-color-picker :disabled="!addUserInfo.customColor" @change="customColorEvent"
                                   v-model="addUserInfo.textColor" class="colorSelect"></el-color-picker>
                </td>
              </tr>
              <tr>
                <td class="td_title">
                  <label>
                    <!--背景颜色-->
                    <span class="label_title">{{$t('desktop.backgroundColor')}}</span>
                    <span class="label_quotation_marks">:</span>
                  </label>
                </td>
                <td class="td_content" style="width: 270px;max-width: 270px;overflow: hidden">
                  <el-input v-model="addUserInfo.backgroundColor" :disabled="!addUserInfo.customColor" placeholder="请选择"
                            size="mini">
                  </el-input>
                  <el-color-picker :disabled="!addUserInfo.customColor" @change="customColorEvent"
                                   v-model="addUserInfo.backgroundColor" class="colorSelect"></el-color-picker>
                </td>
              </tr>
              <tr>
                <td class="td_checked">
                  <label>
                    <!--自定义墙纸-->
                    <el-checkbox v-model="addUserInfo.customWallpaper" @change="customWallpaperEvent">
                      {{$t('desktop.customWallpaper')}}
                    </el-checkbox>
                  </label>
                </td>
                <td></td>
              </tr>
              <tr>
                <td rowspan="3">
                  <div class="previewPictures">
                    <img :src="$store.state.PreviewStyle.wallpaperPath">
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <!--选择图片-->
                  <gl-button-style size="medium" :disable="!addUserInfo.customWallpaper"
                                   @click.stop="openImgSelect()">{{$t('desktop.selectImage')}}
                  </gl-button-style>
                </td>
              </tr>
              <tr>
                <td class="td_content" style="width: 270px;max-width: 270px;overflow: hidden">
                  <el-select v-model="addUserInfo.fillSelection" :disabled="!addUserInfo.customWallpaper"
                             placeholder="请选择" size="mini" @change="adaptWallpaperEvent">
                    <el-option
                      v-for="item in setDesktopInfo.backgroundImgStyleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="childPanelFooter">
        <div class="dialogFooterBorder">
          <div v-if="checkError" class="FooterLeft">
            <img src="/static/images/warning/icon_error.png" alt="">
            <span style="color: #FA4B4B;font-size: 12px">{{$t('desktop.userNameError')}}</span>
          </div>
          <div class="dialogFooterBtnGroups footer_shadow">
            <gl-button-style @click="confirmAddUserInfo()" type="blue" size="medium">{{$t('common.apply')}}
            </gl-button-style>
            <gl-button-style @click="cancelUserInfo()" size="medium">{{$t('common.no')}}</gl-button-style>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {initLanguageList} from '@api/i18n'//获取国际化的值
  let nowMenuId = '69';//当前弹框id
  import {backgroundImgStyleListData} from '@components/homes/backgroundDialog'
  import {userEdit} from '@api/user/userContact'
  import {mapState} from 'vuex'
  import {assign_compatible, deepClone} from "@common/js/publicMethod/publicMethod";
  //import Vue from "vue";
  export default {
    name: 'userSet',
    components: {},
    data: function () {
      return {
        setTabType: 'userSet',
        errorMessage: this.$t('reminder.changeFailed'),
        languageOptions: initLanguageList,
        // languageVal: localStorage.getItem("qvnas_language"),
        showWarning: false,
        showLoad: false,
        checkError: false,
        isInputEmail: false,//判断是否触发过电子邮件
        addUserInfo: {//用户信息
          wallpaperPath: '',
          backgroundColor: '',
          textColor: '',
          customColor: true,
          customWallpaper: true,
          fillSelection: 0,//	0 填充 1居中 2最合适 3拉伸 4 平铺
          addUserPasswordLevel: 0,
          userName: '',
          remark: '',
          email: '',
          password: '',
          userId: null,
          confirmPassword: '',//1 弱 2 中 3 强
          accountStatus: '',//0 正常 1 停用
          userLanguage: '',   //用户语言
        },
        verifyUserInfo: {
          userEmailVerify: true,
          userNameVerify: true,
          passwordVerify: true,
          confirmVerify: true,
          userNameVerifyTip: this.$t('reminder.personalAccount'),//请输入用户账号
          passwordVerifyTip: this.$t('reminder.passwordStrength'),//最低强度要求：最短密码长度为6
          confirmVerifyTip: this.$t('reminder.passwordDifferent'),//密码不一致,请重新输入
          userEmailVerifyTip: this.$t('reminder.legalMailbox')//请输入合法的邮箱格式
        },
        setDesktopInfo: {
          backgroundImgStyleList: backgroundImgStyleListData(this)
        },
        showConfirmTip: false,//取消 确认弹框显示判断值
      }
    },
    computed: {
      ...mapState('Dialog', {
        userSets: state => state.dialogShow.userSets_Panel
      }),
      ...mapState({
        userInfos: state => state.currentUserInfo,
        PreviewStyle: state => state.PreviewStyle
      }),
      ...mapState('desktop', {
        v_save: state => state.personalEditInitData
      })
    },
    watch: {
      "$store.state.PreviewWallpaperPath" (val) {
        this.addUserInfo.wallpaperPath = val
      },
      userSets (val) {
        if (val == false) {
          this.resetData()
        } else {
          assign_compatible()
          Object.assign(this.addUserInfo, deepClone(this.userInfos))
          this.addUserInfo.confirmPassword = this.userInfos.password
          this.$store.commit('desktop/saveUserSetInfo', deepClone(this.addUserInfo))
        }
      }
    },
    created () {
    },
    methods: {
      customColorEvent (value) {//自定义颜色
        // if (!value) {
        //   this.addUserInfo.textColor = this.userInfos.textColor
        //   this.addUserInfo.backgroundColor = this.userInfos.backgroundColor
        // }
        this.$store.commit('up_user_infos', JSON.parse(JSON.stringify(this.addUserInfo)))
      },
      customWallpaperEvent (value) {//自定义墙纸
        // if (!value) {
        //   this.addUserInfo.wallpaperPath = deepClone(this.userInfos.wallpaperPath)
        //   this.addUserInfo.fillSelection = this.userInfos.fillSelection
        // }
        this.$store.commit('up_user_infos', JSON.parse(JSON.stringify(this.addUserInfo)))
      },
      adaptWallpaperEvent (val) {
        this.$store.commit('up_Preview_FillSelection', this.addUserInfo.fillSelection)
      },
      resetData () {//初始数据
        assign_compatible()
        Object.assign(this.$data, this.$options.data.call(this))
        this.$store.commit('RawData')
      },
      /** 1.先判断tab是否和初始的tab一至
       * @Description:
       * @author kai
       */
      //比较用户信息
      CompareUserInfo () {
        return JSON.stringify(this.v_save) === JSON.stringify(this.addUserInfo)
      },
      //比较桌面背景及信息修改状态
      CompareUserHobbies () {
        let {customColor, customWallpaper, wallpaperPath, backgroundColor} = this.addUserInfo
        return customColor == this.v_save.customColor
          && customWallpaper == this.v_save.customWallpaper
          && wallpaperPath == this.v_save.wallpaperPath
          && backgroundColor == this.v_save.backgroundColor;
      },
      //判断用户有没有修改密码和语言有就返回到登陆页面
      ifUserModifyPassOr () {
        return this.addUserInfo.userLanguage == this.v_save.userLanguage
          && this.addUserInfo.password == this.v_save.password
      },
      //验证表单
      CompareUserFrom () {
        return JSON.stringify(this.$options.data.call(this).verifyUserInfo) === JSON.stringify(this.verifyUserInfo)
      },
      //应用
      async confirmAddUserInfo () {
        if (!this.CompareUserInfo()) {//说明用户修改了信息
          if (this.CompareUserFrom()) {//表单验证通过，发起请求
            let user = deepClone(this.addUserInfo)
            this.showLoad = true
            user.customColor = user.customColor == true ? 0 : 1
            user.customWallpaper = user.customWallpaper == true ? 0 : 1
            user.delFlag = user.delFlag == true ? 1 : 0
            user.status = user.status == true ? 0 : 1
            let {data: res} = await userEdit(user)
            this.showLoad = false
            if (res.code == 200) {
              let time = null
              this.$store.commit('up_user_info', deepClone(this.addUserInfo))  //这里注意一定要拷贝数据进去不然会出现数据双向绑定
              this.$store.commit('up_user_infos', deepClone(this.addUserInfo))
              time = setTimeout(() => {
                $("." + nowMenuId).PopupWindow("close");
                clearTimeout(time)
              }, 500)
            } else if (res.code == 1009) {
              this.showWarning = true
              this.errorMessage = this.$t('reminder.userModifyError')
              return
            } else {
              this.showWarning = true
              this.errorMessage = this.$t('reminder.changeFailed')
              return
            }
            // this.$store.commit('up_user_info', deepClone(edit))
            if (!this.ifUserModifyPassOr() && res.code == 200) {//用户修改了密码或语言
              this.$i18n.locale = this.addUserInfo.userLanguage
              localStorage.setItem("qvnas_language", this.addUserInfo.userLanguage);
              this.$emit('user_RedirectLogin')//向父组件请求返回主页
            }
          } else {//验证密码
            this.user_Confirm_Password_Verify()
          }
        } else {
          $("." + nowMenuId).PopupWindow("close");
        }
      },
      //取消
      cancelUserInfo () {
        if (this.CompareUserInfo() && this.CompareUserHobbies()) {//用户没有修改信息
          $("." + nowMenuId).PopupWindow("close");
        } else {
          if (!this.CompareUserHobbies()) {
            this.setTabType = 'desktopSet'
          } else {
            this.setTabType = 'userSet'
          }
          this.showConfirmTip = true
        }
      },
      async ConfirmDialogClose () {
        $("." + nowMenuId).PopupWindow("close");
      },
      async ConfirmDialogCancel () {
        this.showConfirmTip = false
      },
      async warningDialogClose () {
        this.showWarning = false
        $("." + nowMenuId).PopupWindow("close");
      },
      warningDialogCancel () {
        this.showWarning = false
      },
      //密码编辑验证
      user_Password_edit_Verify () {
        // this.flag = 1//产生一个标志位 说明用户点击过输入框
        let sValue = this.addUserInfo.password;
        let modes = 0;
        //正则表达式验证符合要求的
        if (sValue == null) {
          this.verifyUserInfo.passwordVerify = false;
          return false;
        } else {
          if (sValue.trim().length < 6) {
            //并且提示错误提示
            this.addUserPasswordLevel = 0;
            this.verifyUserInfo.passwordVerify = false;
            this.verifyUserInfo.confirmVerify = true
            this.verifyUserInfo.passwordVerifyTip = this.$t('reminder.passwordStrength');//最低强度要求：最低密码长度为6
            return false;
          } else {
            this.verifyUserInfo.passwordVerify = true;
            return true
          }
        }
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
      user_Confirm_Password_Verify: function () {
        var sValue1 = this.addUserInfo.password;
        var sValue2 = this.addUserInfo.confirmPassword;
        if (sValue1.trim().length < 1) {//说明没有输入密码
          this.verifyUserInfo.passwordVerify = false
          this.verifyUserInfo.confirmVerify = true;
          this.verifyUserInfo.passwordVerifyTip = this.$t('reminder.pleaseEnterPassword')//请输入密码
          return false
        } else if (sValue1 != sValue2) {
          this.verifyUserInfo.passwordVerify = true;
          this.verifyUserInfo.confirmVerify = false;
          this.verifyUserInfo.confirmVerifyTip = this.$t('reminder.passwordDifferent')//密码不一致，请重新输入;
          return false
        } else {
          this.verifyUserInfo.confirmVerify = true;
          this.verifyUserInfo.passwordVerify = true;
          return true
        }
      },
      //验证邮箱
      user_email_Verify: function () {
        // this.isInputEmail = true
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (reg.test(this.addUserInfo.email) || this.addUserInfo.email == "") {
          this.verifyUserInfo.userEmailVerify = true;
          return true
        } else {
          this.verifyUserInfo.userEmailVerify = false;
          this.verifyUserInfo.userEmailVerifyTip = this.$t('reminder.legalMailbox');// '请输入合法的邮箱格式'
          return false
        }
      },
      async openImgSelect () {//打开选择文件弹框
        //打开子弹框
        //69
        //let params = {height: 545, width: 860, minWidth: 860 ,minHeight:545,title:this.$t('desktop.selectImage') };
        let params = {title: this.$t('desktop.selectImage')};
        await this.$parent.$parent.backImgSelectDialog('69', '69_child', params);
      },
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>


<style lang="less" scoped>
  @deep: ~">>>";
  .colorSelect @{deep}.el-color-picker__trigger {
    height: 30px;
    width: 30px;
    border-color: transparent;
  }

  .colorSelect @{deep}.el-color-picker__color-inner {
    background: transparent !important;
  }

  .colorSelect @{deep}.el-color-picker__icon {
    color: #cad0d4;
  }

  .colorSelect @{deep}.el-color-picker__color {
    border-color: transparent;
  }

  .colorSelect @{deep}.el-color-picker__mask {
    height: 28px;
    width: 30px;
    background-color: transparent;
  }

  .childPanelHeader {
    padding: 30px 20px;
  }

  .childPanelHeader div:nth-child(1) {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    color: #FFFFFF;
    overflow: hidden;
  }

  .childPanelHeader div:nth-child(2) {
    font-size: 14px;
    line-height: 18px;
    color: #FFFFFF;
    overflow: hidden;
    max-height: 54px;
  }

  .child {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .SetContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .userSetTab {
      flex: 1;
      flex-shrink: 1;

      .desktopSetTabPanel {
        table {
          width: auto;

          td {
            padding-left: 6px;
          }

          .previewPictures {
            height: 100px;
            width: 160px;
            line-height: 102px;

            img {
              width: auto;
              max-width: 100%;
              max-height: 100%;
              height: auto;
              vertical-align: middle;
            }
          }

          .colorSelect {
            float: right;
            margin-top: -29px;
            height: 32px;
          }

          .BackImgFileName {
            max-width: 270px;
            font-size: 12px;
            height: 26px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .childPanelHeader {
    padding: 35px 20px;
  }

  .childPanelFooter {
    height: 48px;
    padding: 0 20px;
    flex-shrink: 0;

    .dialogFooterBorder {
      height: 100%;

      .FooterLeft {
        position: absolute;
        left: 23px;
        bottom: 18px;
        display: flex;
        align-items: center;
      }

      .dialogFooterBtnGroups {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      /*.dialogFooterBtnGroups::before{*/
      /*  content: "";*/
      /*  position: absolute;*/
      /*  top: 0;*/
      /*  left: 0;*/
      /*  right: 0;*/
      /*  height: 4px;*/
      /*  background-image: url("/static/images/global/shadow_footbar.png");*/
      /*  background-repeat: repeat-x;*/
      /*  background-color: transparent;*/
      /*}*/
    }
  }

  .childPanelContent {
    flex: 1;
    height: 344px;
    box-sizing: border-box;
    padding: 0px 5px 5px 18px;

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
      height: 231px;
      width: 100%;

      .td_content {
        width: 270px;
      }

      .td_title {
        font-size: 12px;
        width: 100px;
        color: #505A64;

        span.label_quotation_marks {
          font-weight: 600;
        }
      }
    }
  }

  .error {
    font-size: 12px;
    color: #FA4B4B;
  }

  @{deep}.el-input {
    width: 270px;
  }

  @{deep}.el-select-dropdown.el-popper {
    min-width: 270px !important;
  }

  .dialogTable @{deep} .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #505A64;
    font-size: 12px;
  }

  .dialogTable @{deep} .el-checkbox {
    color: #505A64;
    font-size: 12px;
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
    border-radius: 0px;
    box-shadow: inset 0px 1px 0px rgba(80, 90, 100, 0.08);
  }

  @{deep}.el-input__inner:focus {
    border-color: #0086E5;
  }

  @{deep}.el-select.el-select--medium {
    width: 100%;
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

  .childPanelContent @{deep} .errorInput .el-input__inner {
    border-color: #FF8C8C;
    background-color: #FFF0F0;
    background-image: none;
  }
</style>
