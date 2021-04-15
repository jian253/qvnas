<template>
  <div id="playVideo">
    <div id="videoContainer"></div>
    <div class="addBtnGroup">


    </div>
  </div>
</template>

<script>
  let dp=null;
  let nowPlayTime=0;
  let videoLength=0;
  //import Vue from 'vue'
  import DPlayer from 'dplayer';
  export default {
    name: 'playVideo',
    props: {},

    data: function () {
      return {
        param:{}
      }
    },
    computed: {},
    watch: {},
    methods: {
      createVideo(){
        var _this=this;
        dp = new DPlayer({
          container: document.getElementById('videoContainer'),
          screenshot: true,
          video: {
            url: _this.param.url,
          }
        });
        dp.on('canplay',function(){
          _this.addBtnGround();//添加快进按钮
          videoLength=dp.video.duration;
        });
        dp.on('timeupdate',function(){
          nowPlayTime=dp.video.currentTime;
        });

      },
      addBtnGround (){
        if($(".dplayer-icon.play-el-icon.playReduce").length<1){
          var appendBtnStr=`
           <div class="dplayer-icon play-el-icon playReduce" data-balloon="快退10" data-balloon-pos="up">
            <span class="el-icon el-icon-refresh-left"></span>
            <span class="icon_num">10</span>
          </div>
          <div class="dplayer-icon play-el-icon playAdd" data-balloon="快进10" data-balloon-pos="up">
            <span class="el-icon play-el-icon el-icon-refresh-right"></span>
            <span class="icon_num">10</span>
          </div>`;
          $('.dplayer-icons.dplayer-icons-right').prepend(appendBtnStr);
        }
       $(".dplayer-icon.play-el-icon.playReduce").click(function(){
          let reduceTime=0;
          if(Math.round(nowPlayTime)-10<0){
            reduceTime=0
          }else{
            reduceTime=nowPlayTime-10;
          }
          dp.seek(reduceTime);
        });
        $(".dplayer-icon.play-el-icon.playAdd").click(function(){
          let addTime=0;
          if(Math.round(nowPlayTime)+10>Math.round(videoLength)){
            addTime=videoLength;
          }else{
            addTime=Math.round(nowPlayTime)+10;
          }
          dp.seek(addTime);
        });
      }

    },
    mounted () {
     this.createVideo();
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
  #playVideo {
    background: #000;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
  }
  #videoContainer {
    width: 100%;
    height: 100%;
  }
  @{deep}.dplayer-icon.play-el-icon {
    color: #9a9a9a;
    position: relative;
    font-size: 26px!important;
  }
  @{deep}.icon_num {
    color: #9a9a9a;
    position: absolute;
    left: 13px;
    top: 16px;
    font-size: 12px;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

</style>
