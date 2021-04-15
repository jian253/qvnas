<template>
  <div class="playVideoContainer" v-show="videourl!='clear'&&videourl!=''">
    <div id="playVideo" >
      <div id="videoContainer" ></div>
      <div class="addBtnGroup">
      </div>
    </div>
  </div>
</template>

<script>
  let dp=null;
  let nowPlayTime=0;
  let videoLength=0;
  //视频
  import DPlayer from 'dplayer';
  export default {
    name: 'playVideo',
    //父组件通过props属性传递进来的数据
    props: {
      videourl: {
        type: String,
        default: () => {
          return ''
        }
      }
    },
    data: function () {
      return {
        param:{},
        videoType:'auto'
      }
    },
    computed: {},
    watch: {
      videourl(val){
        this.$nextTick(()=>{
          try{dp.destroy();}catch (e) {}
          dp=null;
          nowPlayTime=0;
          videoLength=0;
          if(val!="clear"){
            this.createVideo();
          }else{
          }
        });
      },
      truePlayVideo(val){
      }
    },
    methods: {
      createVideo(){
        let _this=this;
        let dealIPStr=_this.videourl;
        let getVideoAddressArr=_this.videourl.split('?');
        let getVideoAddressArr1=getVideoAddressArr[0].split('.');
        let fileTxt=getVideoAddressArr1[getVideoAddressArr1.length-1];
        fileTxt=fileTxt.trim().toLowerCase();
        let videoPlayerObj={
          url: dealIPStr,
          type: 'auto',
        };
        if(fileTxt=="flv"){
          this.videoType="flv";
          videoPlayerObj.type= "flv";
        }else if(fileTxt=="m3u8"){
          videoPlayerObj.type= "hls";
          videoPlayerObj.live= true;
        }
        //console.log(videoPlayerObj);
        dp = new DPlayer({
          container: document.getElementById('videoContainer'),
          screenshot: true,
          video: videoPlayerObj
        });
        dp.on('canplay',function(){
          _this.addBtnGround();//添加快进按钮
          try{
            videoLength=dp.video.duration;
          }catch(err){}
        });
        dp.on('timeupdate',function(){
          try {
            nowPlayTime = dp.video.currentTime;
          }catch (e) {}
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
    },
    created(){
    },
    beforeDestroy() {
      //把视频销毁掉
      //清除视频对象
    }

  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  #playVideo[data-v-1a1925b8] {
    background: #000;
    /*width: 100%;*/
    /*height: 100%;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    max-width: 700px;
    max-height: 468px;
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
  .playVideoContainer {
    width: 100%;
    height: 100%;
    div#playVideo {
      width: 100%;
      height: 100%;
    }
  }

</style>
