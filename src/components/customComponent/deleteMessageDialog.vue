<template>
  <div v-if="isShow==true" id="container">
    <div class="dialogMask" @click="clickMask"></div>
    <div class="container">
<!--      <div class="header">-->
<!--        <i class="iconfont icon-guanbi" @click="dialogClose"></i>-->
<!--      </div>-->
      <!--icon-->
      <div class="icon" v-cloak></div>
      <div class="content">
        <div v-if="select==1" class="check">
            <div slot="Check"></div>
        </div>
        <div v-else class="deleteMessage">
          <span class="text">{{$t('reminder.delete')}}</span>
          <div class="box">
            <gl-button-style type="red" size="medium"  @click.stop="determine">{{$t('common.yes')}}</gl-button-style>
            <gl-button-style size="medium" @click.stop="cancel">{{$t('common.no')}}</gl-button-style>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let timeout = null;
  export default {
    name: 'Dialog',
    props: {
      isShow:{
        type:Boolean,
        default:false
      },
      select:{ //1代表有复选框 0代表没有 默认没有
          type:Number,
          default: 0
      }
    },
    components: {},
    data: function () {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      determine () {
        this.$emit('determine')
      },
      cancel () {
        this.$emit('cancel')
      },
      dialogClose () {
        this.$emit('dialogClose')
      },
      clickMask () {
        clearInterval(timeout)
        $('.container').addClass('maskDialog')
        timeout = setInterval(function () {
          $('.container').removeClass('maskDialog')
        }, 200)
      }
    },
    filters: {}
  }
</script>

<style lang="less" scoped>
  #container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .dialogMask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    opacity: 0.5;
    z-index: 19;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /*transform: translate(-50%, -50%);*/
    border-radius: 5px;
    width: 350px;
    height: 125px;
    box-sizing: border-box;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);*/
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    z-index: 20;
  }

  .header {
    height: 20px;

    .iconfont {
      position: absolute;
      right: 5px;
      line-height: 20px;
      cursor: pointer;
      color: #606266;
    }
  }

  .icon {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 48px;
    height: 48px;
    background: url("/static/images/warning/icon_question.png") no-repeat;
    z-index: 30;
  }

  .content {
    height: 120px;
    /*text-align: center;*/
    /*padding-top: 50px;*/
    position: relative;
    box-sizing: border-box;
    color: #505a64;
    font-size: 12px;

    .text {
      position: absolute;
      top: 26px;
      left: 80px;
    }

    .box {
      /*width: 100%;*/
      position: absolute;
      bottom: 7px;
      right: 26px;
    }
  }
  .deleteMessage {
    height: 100%;
    background: #fff;
  }

</style>
