<template>
  <div class="66" style="height: 100%;position: relative;" v-if="$store.state['Dialog'].dialogShow.music_Panel">
    <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
    <!--v-if="Sign==true"-->

    <aplayer class="music" v-if="Sign==true" :music="audioList[index]" :list="audioList" :show-lrc="false"
             ref="musicPlayer" @error="handleErrorEvent"
    ></aplayer>
    <gl-warning-dialog :is-show="isShow" @warningDialogClose="warningDialogClose"><!--无法播放--> {{$t('reminder.playError')+title}}</gl-warning-dialog>
    <!-- <video controls="" autoplay="" name="media"><source :src="dealUrl" type="video/mp4"></video>-->
    <!--    <gl-load-animation :isLoadShow="isShow"></gl-load-animation>-->
  </div>
</template>

<script>
  import aplayer from "vue-aplayer";
  let timer=null;
  export default {
    props: {},
    components: {aplayer},
    data () {
      return {
        dealUrl: 'image/home/user/file/root/2_1604051736069.mp3',
        // 音频列表
        audioList: [],
        Sign: false,
        isShow: false,
        Index: 0,
        // autoplay: true,
        audioDom: null,
        title: ''
      }
    },
    computed: {},
    mounted () {
      this.$EventBus.$on('musicParams', (item) => {
        this.listDeduplication(item)
        /*if(!this.listDeduplication(item)){//列表去重
          this.Sign = true;
          this.audioList.push(item);
          this.index=(this.audioList.length-1);
          this.$nextTick(() => {
            try { this.$refs.musicPlayer.play(); } catch (e) {}
            try { this.$refs.musicPlayer.switch(this.index); } catch (e) {}
          });
        }*/
      })
    },
    created () {

    },
    watch: {
      audio: function (value) {
       // console.log(value)
      }
    },
    methods: {
      handleErrorEvent (error) {
        let url = this.spliceString(error.target.currentSrc)
        this.title = url
        this.isShow = true
      },
      spliceString (url) {
        let s = url.lastIndexOf("/")
        return url.slice(s + 1, url.length)
      },
      warningDialogClose () {
        this.isShow = false
      },
      listDeduplication(item){//给列表去重
        clearTimeout(timer);
        let getIndex=-1;
        for(let i=0;i<this.audioList.length;i++){
          if(item.fileId==this.audioList[i].fileId){
            getIndex=i;
            break;
          }
        }
       if(getIndex==-1){
         this.Sign = true;
         this.audioList.push(item);
         this.index=(this.audioList.length-1);
         this.$nextTick(() => {
           try { this.$refs.musicPlayer.play(); } catch (e) {}
           try { this.$refs.musicPlayer.switch(this.index); } catch (e) {}
         });
       }else{//去重切换不播放所以只能重新创建
         let _this=this;
         this.Sign = false;
         this.$set(this.audioList, getIndex,item); //$set 可以触发更新视图
         timer=setTimeout(function(){
           _this.Sign = true;
           _this.index=getIndex;
           _this.$nextTick(() => {
             console.log(_this.$refs.musicPlayer)
             try { _this.$refs.musicPlayer.play(); } catch (e) {}
             try { _this.$refs.musicPlayer.switch(_this.index); } catch (e) {}
           });
           clearTimeout(timer);
         },50);
       }
      }
    },
    filters: {},
    beforeDestroy() {
      this.Sign=false;
      this.$EventBus.$off('musicParams');
    }
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.aplayer {
    margin: 0 !important;
    box-shadow: unset!important;
  }
</style>
