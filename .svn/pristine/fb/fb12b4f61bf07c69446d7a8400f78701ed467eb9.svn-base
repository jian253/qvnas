<template>
  <div class="poolContainer">
    <div class="FormDom">
      <el-form :model="pooLForm" ref="ruleForm" :rules="rules" class="demo-ruleForm" label-position="left">
        <el-form-item :label="$t('user.name')" class="form-item" prop="poolName">
          <el-input v-model="pooLForm.poolName" size="small" autocomplete="off"></el-input>
          <!--          <el-checkbox v-model="pooLForm.encryption">-->
          <!--            <span>加密-->
          <!--              <img src="/static/images/global/icon_information_mini.png" alt="" class="encryptionTitleImg">-->
          <!--            </span>-->
          <!--          </el-checkbox>-->
        </el-form-item>
      </el-form>
    </div>
    <el-transfer v-model="valueList" :data="diskList "></el-transfer>
    <div class="newPoolFooter">
      <div class="footer_shadow footer_box">
        <div class="prompt_box" v-show="showPrompt">
          <img src="/static/images/warning/icon_error.png" alt="" class="promptImg">
          <span class="text_size poolSuggest">{{$t('reminder.strongError')}}</span>
        </div>
        <div class="newBtn">
          <gl-button-style type="blue" size="medium" @click="submitForm" :disable="isDisabled">
            {{$t('common.yes')}}
          </gl-button-style>
          <gl-button-style size="medium" @click="closeDialog">{{$t('common.no')}}</gl-button-style>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {assign_compatible} from "@common/js/publicMethod/publicMethod";
  import {mapState} from "vuex"

  export default {
    name: "newPool",
    props: {},
    data () {
      let validateName = (rule, value, callback) => {
        if (!value) return callback(new Error(this.$t('reminder.notNull')))
        // value=JSON.stringify(value)
        // const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        // const regs= /^[0-9]*$/g;
        // if (regs.test(value.charAt(1))||reg.test(value.charAt(1))) {//首字母为汉字或者数组
        //   return callback(new Error(this.$t('reminder.firstLetter')))
        // }
        // if (reg.test(value))return callback(new Error(this.$t('reminder.userNameRex')))
        if (this.checkPoolName() == true) return callback(new Error(this.$t('reminder.nicknameExist')))
        callback()
      };
      return {
        pooLForm: {
          poolName: '',
          encryption: false
        },
        valueList: [],
        isDisabled: true,//按钮是否禁用
        diskList: [],
        rules: {
          poolName: [{
            validator: validateName, required: true, trigger: 'blur'
          }]
        },
        showPrompt: false
      }
    },
    components: {},
    computed: {
      ...mapState('v_scoket', {
        disk_unused: state => state.disk_get_unused,
        pool_query: state => state.pool_query,
        poolCreate_progress: state => state.poolCreate_progress
      })
    },
    watch: {
      disk_unused (val) {
        if (!val || !val.result) return console.log('获取未使用的磁盘失败')
        val.result.forEach((item, index) => {
          this.diskList.push({
            key: index,
            label: item.name,
            type: item.type
          })
        })
        this.$emit('loading', false)
      },
      poolCreate_progress(val){//创建池 监听进度
        if (!val) return
        if (val.fields.state === "FAILED") {//创建池失败!
          this.$emit('showLoad',false)
          return this.$emit('error', val.fields.error)
        }
        this.$emit('schedule',val.fields.progress)
      },
      pooLForm: {
        handler (val) { //名称重复  没有输入名称  穿梭框没有值
          if (this.checkPoolName() == false && val.poolName.length > 0 && this.valueList.length > 0) {
            this.isDisabled = false
          } else if (this.checkPoolName() == true || !val.poolName.length > 0 || !this.valueList.length > 0) {
            this.isDisabled = true
          }
        },
        deep: true
      },
      valueList (val) {//名称重复   穿梭框没有值   没有输入名称
        if (this.checkPoolName() == false && val.length > 0 && this.pooLForm.poolName.length > 0) {
          this.isDisabled = false
        } else if (this.checkPoolName() == true || !val.length > 0 || !this.pooLForm.poolName.length > 0) {
          this.isDisabled = true
        }
        this.showPrompt = val.length == 1
      }
    },
    methods: {
      //创建池
      submitForm () {
        this.$refs['ruleForm'].validate((valid) => {
          if (!valid) return
          this.$emit('showLoad',true)
          let newArr = []
          this.valueList.forEach(item => {
            newArr.push(this.diskList[item].label)
          })
          const type = this.valueList.length > 1 ? 'MIRROR' : "STRIPE"
          this.$store.commit('v_scoket/socketSend', [{
            name:'pool_create',
            params:[{
              "name": this.pooLForm.poolName,
              "encryption": false,
              "topology": {"data": [{"type": type, "disks": newArr}]}
            }]
          }])
        })
      },
      //是否已经创建了该池
      checkPoolName (name) {
        if (!this.pool_query.result) return false
        return this.pool_query.result.some(item => item.name == this.pooLForm.poolName)
      },
      closeDialog () {//关闭弹框
        this.$emit('closeDialog')
      }
    },
    beforeDestroy () {
      assign_compatible()
      Object.assign(this.$data, this.$options.data.call(this))
    }
  }
</script>

<style lang="less" scoped>
  @deep: ~">>>";
  @{deep}.el-form-item {
    margin: 0;
  }

  .poolContainer {
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 50px;

    .FormDom {
      width: 300px;
      margin-bottom: 20px;

      .form-item {
        display: flex;
      }

      .encryptionTitleImg {
        display: inline-block;
        width: 18px;
        height: 18px;
      }
    }

    .newPoolFooter {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;

      .prompt_box {
        position: absolute;
        left: 10px;
        line-height: 20px;
        height: 21px;

        .promptImg {
          vertical-align: bottom;
        }

        .poolSuggest {
          color: #e25555;
        }
      }
    }
  }
</style>
