<!--加载动画-->
<template>   <!--使用动画必须父级是 relative 相对定位-->
  <!--加载动画-->
  <div v-show="isLoadShow==true" class="load-container">
    <div class="load-mask" :style="{'opacity':opacitys}" v-show="isShowMask==true">
    </div>
    <div class="load-box">
      <img src="/static/images/global/loadGif.gif" alt="">
      <slot>
        {{$t('title.loading')}}...
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'loadAnimation',
    props: {
      isShowMask: {
        type: Boolean,
        default: true
      },
      isLoadShow: {
        type: Boolean,
        default: true
      },
      opacitys:{
        type:Number,
        default:0.5
      }
    },
    components: {},
    data: function () {
      return {}
    },
    computed: {},
    mounted () {
    },
    watch: {},
    methods: {},
    filters: {}
  }
</script>

<style lang="less" scoped>
  /*加载动画的样式*/
  .load-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
    box-sizing: border-box;
  }

  .load-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
    background-color: #fff;
    z-index: 99;
  }

  .load-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    opacity: 1;
    width: 137px;
    height: 38px;
    line-height: 38px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);
    padding: 0;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, .1);
    background-color: #fff;
    z-index: 9999;
    font-size: 15px;
    color:#505A64;
  }

  .load-box img {
    vertical-align: middle;
    margin-left: 17px;
  }
</style>
