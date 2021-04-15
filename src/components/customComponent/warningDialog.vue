<template>
  <div id="container" v-if="isShow" v-cloak>
    <div class="dialogMask" @click.stop="clickMask"></div>
    <div :class="[customizeSize?'customizeSize':'defaultSize','container']">
      <div class="centers">
        <div :class="[icon=='caveat'?'caveat':'prompt','icon']" v-cloak></div>
        <div class="content">
          <slot>1232</slot>
        </div>
      </div>
      <div class="btnClass">
        <gl-button-style :type="correctBtn" @click.stop="handleClick" size="medium">{{$t('common.yes')}}
        </gl-button-style>
        <gl-button-style v-if="cancelBtn" @click.stop="cancelEvent" size="medium">{{$t('common.no')}}</gl-button-style>
      </div>
    </div>
  </div>
</template>

<script>
  let timeout = null;
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      icon: { //控制用来显示警告框 还是提示的框 prompt
        type: String,
        default: 'caveat'
      },
      cancelBtn: {//是否显示取消按钮
        type: Boolean,
        default: false
      },
      correctBtn: {//确定按钮的颜色  white blue red
        type: String,
        default: 'red',
      },
      customizeSize:{//自定义大小窗口
        type: Boolean,
        default: false
      }
    },
    components: {},
    data: function () {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      handleClick () {
        this.$emit('warningDialogClose')
      },
      cancelEvent () {
        this.$emit('warningDialogCancel')
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

<style scoped lang="less">
  #container,.dialogMask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .dialogMask {
    background-color: #fff;
    opacity: 0.5;
    z-index: 19;
  }
  .customizeSize{
    width: 500px;
    height: 400px;
  }
  .defaultSize{
    min-width: 350px;
    max-width: 500px;
    min-height: 125px;
    max-height: 300px;
  }
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*transform: translate(-50%, -50%);*/
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);*/
    /*box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);*/
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
    /*border:1px solid rgba(0, 0, 0, 0.1);*/
    background-color: #fff;
    z-index: 20;
    overflow: hidden;
    .centers{
      display: flex;
      flex: 1;
      margin: 0 15px;
      align-items: center;
      .icon {
        width: 48px;
        height: 48px;
      }
      .content {
        width: 100%;
        height: 100%;
        flex: 1;
        padding: 15px;
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
        color: #505a64;
        font-size: 12px;

        word-wrap:break-word;
        word-break:break-all;
        /*margin: 0 15px;*/
        /*max-width: 200px;*/
      }
    }
    .btnClass {
      padding-right: 15px;
      height: 40px;
      /*position: absolute;*/
      /*bottom: 0;*/
      /*left: 0;*/
      display: flex;
      /* justify-items: flex-start; */
      justify-content: flex-end;
    }
  }

  .caveat {
    background: url("/static/images/warning/icon_error_big_red-0536052020122.png") no-repeat;
  }

  .prompt {
    background: url("/static/images/warning/icon_question.png") no-repeat;
  }

  .guanbi {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }


</style>
