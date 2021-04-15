<template>
  <div class="login-container">
    <div class="formContainer">
      <div class="title">
        <div class="title_text" style="text-align: center">
          <h2 class="font">Qvnas</h2>
        </div>
        <el-dropdown @command="selectLanguagesFun" trigger="click" placement="bottom-start"
                     v-if="nowSelectLanguage!=''">
            <span class="el-dropdown-link">
            <i class="iconfont icon-yuyanqiehuanlanguage" style="cursor: pointer"></i>
             </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in nowSelectLanguageList" :command="item.value" :key="index"
                              :class="nowSelectLanguage==item.value?'item_color':''">{{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="login">
        <el-form :model="loginForm" ref="loginForm" label-position='right'
                 class="login-form" autocomplete="off">
          <el-form-item prop="username">
            <div class="username">
              <label>
                <span class="el-icon-user-solid"></span>
                <input type="text" name="username" class="name_input" @change="CheckUserName" @input="cancelCheck"
                       ref="input" v-model="loginForm.username">
                <span class="focus-border"></span>
              </label>


              <!--            <el-input class="LoginInputStyle" v-model="loginForm.username" prefix-icon="el-icon-user-solid" ref="input"-->
              <!--                      @input="cancelCheck"></el-input>-->

            </div>
          </el-form-item>
          <div class="loginPrompt loginCheckError" v-show="showNamePrompt">{{userNamePrompt}}</div>
          <div v-show="!showNamePrompt" class="Prompt"></div>
          <el-form-item prop="password">
            <div class="password">
              <label>
                <span class="el-icon-lock"></span>
                <input type="password" name="password" class="pass_input" @change="CheckUserPass" @input="cancelCheck"
                       @keyup.enter="validateLogin('loginForm')"
                       v-model="loginForm.password">
                <span class="focus-border"></span>
              </label>
            </div>
          </el-form-item>
          <div class="loginPrompt loginCheckError" v-show="showPassPrompt">{{userPassPrompt}}</div>
          <div v-show="!showPassPrompt" class="Prompt"></div>
          <el-form-item class="Checkbox">
            <el-checkbox v-model="checked" @change="rememberStatus">{{$t('login.rememberStatus')}}</el-checkbox>
          </el-form-item>
        </el-form>
        <span class="btn">
                  <button type="button" class="buttonStyle" v-show="loading!==true" :disabled="isDisabled"
                          @click="validateLogin('loginForm')">{{$t('login.login')}}</button>
                  <div id="loading-center-absolute" v-show="loading">
                    <div class="object" id="object_one"></div>
                    <div class="object" id="object_two"></div>
                    <div class="object" id="object_three"></div>
                  </div>
            </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {Login, getUser, sysInfo} from '@api/login/loginContact'
  import {userEdit} from '@api/user/userContact'
  import {initLanguageList} from '@api/i18n'
  import {socketAddress} from "@common/js/webscoket/socketConfig";
  //获取国际化的值
  export default {
    name: 'Login',
    data () {
      return {
        userNamePrompt: '请输入账户',
        showNamePrompt: false,
        userPassPrompt: '请输入密码',
        showPassPrompt: false,
        nowSelectLanguage: '',
        current: true,
        nowSelectLanguageList: initLanguageList,
        isDisabled: false,
        loginForm: {
          username: '',
          password: '',
          zh_CN: localStorage.getItem("qvnas_language"),
          checkList: []
        },
        // 复选框初始状态
        checked: false,
        loading: false
      }
    },
    methods: {
      selectLanguagesFun (val) {
        this.$i18n.locale = val;//配置国计划
        this.nowSelectLanguage = val
      },
      validateLogin: async function (formName) {
        if (!this.CheckUserName()) return
        if (!this.CheckUserPass()) return
        const _this = this
        this.isDisabled = true
        this.loading = true
        if (this.checked == true) {
          window.localStorage.setItem('username', this.loginForm.username)
          window.localStorage.setItem('password', this.loginForm.password)
        }
        const {data: res} = await Login({
          username: _this.loginForm.username,
          password: _this.loginForm.password,
          lang: this.loginForm.zh_CN
        })
        this.isDisabled = false
        if (res.code == 402) {
          this.loading = false
          return _this.$notify.error({
            message: this.$t('reminder.userDeactivate'),//'账户已停用!'
            title: this.$t('log.error'),
            duration: 1400,
            offset: 52
          })
        }
        if (res.code == 4001) {
          return _this.$notify.warning({
            message: this.$t('reminder.deleteFrequency'),//'超出次数'
            title: this.$t('log.caveat'),
            duration: 1400,
            offset: 52
          })
        }
        if (res.code !== 200 && res.msg !== 'token') {
          this.loading = false
          return _this.$notify.error({
            message: this.$t('reminder.accountOrError'),//'账号或密码错误，请重新输入!'
            title: this.$t('log.error'),
            duration: 1400,
            offset: 52
          })
        } else {
          sessionStorage.setItem('nasToken', res.data);
          await this.getUserInfo();
        }
      },
      async getUserInfo () {
        //获取用户信息,比较一下是否与登录后的用户信息 相匹配，如果不是的化,切换用户语言
        const {data: res} = await getUser()
        if (res.code !== 200 || res.code === 401) return
        this.$store.commit('up_user_info', res.data.user)
        if (res.data.user.userLanguage != this.nowSelectLanguage) {//当前用户和浏览器语言不匹配 的话
          await this.editUserInfo();//设置浏览器语言为当前用户语言
        } else {//直接登陆
          await this.$router.replace('/index')
        }
        localStorage.setItem("qvnas_language", this.nowSelectLanguage);
        this.loading = false
      },
      async editUserInfo () {
        let nowUserInfo = JSON.parse(JSON.stringify(this.$store.state.currentUserInfo));
        nowUserInfo.userLanguage = this.nowSelectLanguage;
        let {data: res} = await userEdit(nowUserInfo);
        if (res.code == 200) {
          this.$store.commit('up_user_info', nowUserInfo);
        }
        await this.$router.replace('/index')
      },
      // 点击记住账户密码同时把勾选状态给保存
      rememberStatus () {
        if (this.checked) {
          window.localStorage.setItem('username', this.loginForm.username)
          window.localStorage.setItem('password', this.loginForm.password)
          window.localStorage.setItem('correct', JSON.stringify(this.checked))
        } else {
          window.localStorage.removeItem('username')
          window.localStorage.removeItem('password')
          window.localStorage.removeItem('correct')
        }
      },
      cancelCheck () {
        this.checked = false
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('password')
        window.localStorage.removeItem('correct')
      },
      CheckUserName () {
        if (!this.loginForm.username || this.loginForm.username.length == 0) {
          this.userNamePrompt = this.$t('reminder.personalAccount')
          this.showNamePrompt = true
          return false
        } else {
          this.showNamePrompt = false
          return true
        }
      },
      CheckUserPass () {
        if (!this.loginForm.password || this.loginForm.password.length == 0) {
          this.userPassPrompt = this.$t('reminder.pleaseEnterPassword')
          this.showPassPrompt = true
          return false
        } else if (!this.loginForm.password || this.loginForm.password.length < 6) {
          this.userPassPrompt = this.$t('reminder.passwordStrength')
          this.showPassPrompt = true
          return false
        } else {
          this.showPassPrompt = false
          return true
        }
      },
      async getSocketAddress () {
        if (this.$store.state.socketAddress) return
        let {data: res} = await sysInfo({
          type: 2
        })
        if (res.code == 200) {
          // console.log(res.msg)
          //192.168.3.212
          this.$store.commit('webSocketAddress', socketAddress || res.msg)
          // this.$store.commit('webSocketAddress', '192.168.3.19')
          // this.$store.commit('webSocketAddress','192.168.3.79')
        } else {
          return _this.$notify.error({
            message: this.$t('reminder.socketAddress'),//'socket获取失败地址!'
            title: '错误',
            duration: 1400,
            offset: 52
          })
        }
      },
    },
    // vue实例挂载后执行
    mounted () {
      // console.log('获取焦点了')
      // $nextTick整个视图渲染完成 输入获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus();
        // this.nowSelectLanguage = localStorage.getItem("qvnas_language");
      })
      // 页面一加载渲染保存在本地存储中的账号密码
      this.loginForm.username = localStorage.getItem('username')
      this.loginForm.password = localStorage.getItem('password')
      const data = localStorage.getItem('correct')
      this.checked = JSON.parse(data)
    },
    created () {
      let chooseLanguage = null
      if (!localStorage.getItem("qvnas_language") || localStorage.getItem("qvnas_language") == null) {
        chooseLanguage = navigator.language || navigator.browserLanguage || 'zh-CN'
      } else {
        chooseLanguage = localStorage.getItem("qvnas_language")
      }
      this.selectLanguagesFun(chooseLanguage)
      this.$store.commit('setLanguage', this.nowSelectLanguage)//保存语言
      localStorage.setItem("qvnas_language", chooseLanguage);
      this.getSocketAddress()
    },
    watch: {
      loginForm (value) {
        // console.log(value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../static/commonfont/font.css";

  @deep: ~">>>";
  @{deep}.el-form-item {
    margin-bottom: 0px;
    height: 40px;
  }

  @{deep}.el-checkbox__label {
    font-size: 12px;
  }

  .login-container {
    height: 100%;
    background: url("/static/images/Login_bg/pg.jpg") no-repeat;
    background-size: cover;
  }

  .formContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .item_color {
    color: #66b1ff !important;
  }

  .login {
    box-sizing: border-box;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 236px;
    background-color: rgba(0, 0, 0, .2);
    box-shadow: 0 10px 21px rgba(0, 0, 0, 0.2);

    .loginPrompt {
      box-sizing: border-box;
      padding-left: 40px;
      font-size: var(--textSize);
      color: #f56c6c;
    }

    .Prompt {
      height: 16px;
    }

    .username, .password {
      position: relative;
      display: flex;
      height: 40px;
      width: 100%;
      box-sizing: border-box;
      border-bottom: solid 1px rgba(255, 255, 255, 0.3) !important;

      label {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;

        .name_input, .pass_input {
          height: 40px;
          font-size: 26px;
          width: 250px;
          flex: 1;
          border: 0 !important;
          border-radius: 0 !important;
          background-color: transparent !important;
          color: #fff !important;
          box-sizing: border-box;
          letter-spacing: 1px;
        }

        .name_input ~ .focus-border, .pass_input ~ .focus-border { /*~ 选则前面为LoginInputStyle后面的focus-border*/
          position: absolute;
          bottom: -1px;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #3f9fdb;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .name_input:focus ~ .focus-border, .pass_input:focus ~ .focus-border {
          width: 100%;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          left: 0;
        }
      }

      .el-icon-user-solid, .el-icon-lock {
        display: inline-block;
        width: 40px;
        height: 100%;
        font-size: 30px;
        color: #C0C4CC;
        text-align: center;
        line-height: 40px;
      }
    }
  }

  .el-dropdown-menu {
    background-color: rgba(0, 0, 0, .6) !important;
    border: 0;
    padding: 10px;
  }

  .el-dropdown-menu__item {
    color: #fff
  }

  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: unset;
  }

  .title {
    display: flex;
    align-items: center;
    /*justify-content: center;*/

    @{deep}.el-dropdown {
      color: #000;
    }

    .title_text {
      flex: 1;
    }
  }

  .font {
    height: 36px;
    line-height: 36px;
    font-family: FZCYJ, serif;
    text-align: center;
    font-size: 30px;
    color: #fff;
    letter-spacing: 2.5px;
    margin-bottom: 10px;
  }

  .el-form {
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    /*align-content: center;*/
    width: 100%;
    box-sizing: border-box;
  }

  .btn:hover {
    border-color: #0b5e9a;
    background-image: linear-gradient(to bottom, #0090f7, #1788d8);
  }

  .btn:active {
    border-color: #0b5e9a;
    background-image: linear-gradient(to bottom, #007cd5, #116fb3);
  }

  .btn {
    display: flex;
    justify-content: flex-end;
    /*padding-right: 20px;*/
    height: 40px;
    border-color: #0b6fb6;
    background-image: linear-gradient(to bottom, #0088e9, #137cc6);
    margin: 0 20px;
    background-color: #0086E5;
    cursor: pointer;
    border-radius: 3px;

    .buttonStyle {
      color: #fff;
      outline: none;
      border: 0;
      display: inline-block;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background-color: transparent;
      padding: 0 !important;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }
  }

  .btn @{deep}.el-form-item__content {
    width: 100%;
    height: 100%;
  }

  .btn @{deep}.el-button.is-round {
    border-radius: 0;
  }

  .el-checkbox {
    color: #fff !important;
  }

  .Checkbox {
    display: flex;
    justify-content: flex-start;
    padding-left: 22px;
    margin-bottom: 0;
  }

  .password {
    margin-bottom: 10px !important;
  }

  .el-button {
    box-shadow: 0 4px 5px rgba(0, 0, 0, .3);
  }

  .login /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #fff !important;
  }

  //登陆动画
  #loading-center-absolute {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .object {
    width: 15px;
    height: 15px;
    background-color: #FFF;
    float: left;
    /* margin-right: 20px;
    margin-top: 65px; */
    -moz-border-radius: 50% 50% 50% 50%;
    -webkit-border-radius: 50% 50% 50% 50%;
    border-radius: 50% 50% 50% 50%;
  }

  #object_one {
    margin-right: 10px;
    -webkit-animation: object_one 1.5s infinite;
    animation: object_one 1.5s infinite;
  }

  #object_two {
    margin-right: 10px;
    -webkit-animation: object_two 1.5s infinite;
    animation: object_two 1.5s infinite;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }

  #object_three {
    margin-right: 10px;
    -webkit-animation: object_three 1.5s infinite;
    animation: object_three 1.5s infinite;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }

  @-webkit-keyframes object_one {
    75% {
      -webkit-transform: scale(0);
    }
  }

  @keyframes object_one {
    75% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
  }

  @-webkit-keyframes object_two {
    75% {
      -webkit-transform: scale(0);
    }
  }

  @keyframes object_two {
    75% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
  }

  @-webkit-keyframes object_three {
    75% {
      -webkit-transform: scale(0);
    }
  }

  @keyframes object_three {
    75% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
  }

</style>
