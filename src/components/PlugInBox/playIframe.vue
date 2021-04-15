<template>
  <div id="playIframe" >
     <iframe :src="param.url"  frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>
  </div>
</template>

<script>
  //import Vue from 'vue'
  export default {
    name: 'playIframe',
    props: {},

    data: function () {
      return {
        param:{}
      }
    },
    computed: {},
    watch: {},
    methods: {
    },
    mounted () {
    },
    created(){
      //如果使用query方式传入的参数使用this.$route.query 接收
      //如果使用params方式传入的参数使用this.$router.params接收
      var param = this.$route.query;
      param.url=decodeURIComponent(param.url);
      this.param=param;

    }

  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  iframe{

    width: 100%;
    height: 100%;
    position: fixed;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background:transparent;
    background: #0e0e0e;
  }
  body{
    position: relative;
  }
  body img{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
