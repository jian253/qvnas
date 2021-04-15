<template>
  <div class="carouselView_box">
    <div :class="{'childPanelHeader':true,'backgroundIco':true}">
      <div>{{title.text1}}</div><!--用户账号信息-->
      <div>{{title.text}}</div><!--请填写下方字段-->
    </div>
    <div v-for="(item,index) in length" :key="index"  :style="{display:current===index?'block':'none'}"
         class="carousel_item">
        <slot name="item" :item="index">
        </slot>
    </div>
    <footer :class="[footer_shadow?'footer_box footer_shadow':'footer_box']">
      <gl-button-style size="medium" type="blue" @click="handleClick1" v-show="Previous">{{$t('common.previous')}}</gl-button-style>
      <div class="next_stop">
        <gl-button-style size="medium" type="blue" @click="handleClick($event,true)" v-show="Next" :disable="TailEnds">{{applyOrNext}}
        </gl-button-style>
        <gl-button-style size="medium"  @click="cancel($event)">{{$t('common.no')}}</gl-button-style>
      </div>
    </footer>
  </div>
</template>

<script>

  export default {
    name: "carouselView",
    props: {
      length: {
        type: Number, //长度
        default: 5
        // default: function () {
        //   return [{
        //     title: 'Step1'
        //   }, {
        //     title: 'Step2'
        //   }]
        // },
      },
      currentActive: {
        type: Number,
        default: 0
      },
      footer_shadow:{//是否需要底部影子
        type:Boolean,
        default:true
      },
      title:{
        type:Object,
        default:function () {
            return {
              text:this.$t('user.userInformation'),
              text1:this.$t('user.infoField')
            }
        }
      }
    },
    data () {
      return {
        applyOrNext:this.$t('common.next'),
        current: this.currentActive,
        Previous: false,
        Next: true,
        TailEnds: false
      }
    },
    watch: {
      current: function (value) {
        this.$emit('change',value)
        this.Previous = value !== 0;
        if (value === this.length - 1) {
          // this.TailEnds = true
          this.applyOrNext=this.$t('common.apply')
        } else {
          this.applyOrNext=this.$t('common.next')
          this.TailEnds = false
        }
      },
    },
    methods: {
      handleClick (e,flag) {
        this.$emit('Next_click', e)
      },
      currentClick:function(){
        if (this.current !== this.length - 1) {
          this.current++
        }
      },
      handleClick1 () {
        if (this.current !== 0) {
          this.current--
        }
      },
      cancel (e) {
        this.current = 0
        this.$emit('cancel',e)
      }
    }
  }
</script>

<style scoped lang="less">
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
  .carouselView_box {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .backgroundIco {
      height: 111px;
      width: 100%;
      box-sizing: border-box;
      background: url("/static/images/controlPanel/wizard_bkg_h.png") no-repeat;
      background-size: cover;
    }
    .carousel_item {
      width: 100%;
      height: 100%;
      flex: 1;
    }
    .footer_box {
      height: 58px;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
      .next_stop {
        position: absolute;
        right: 20px;
      }
    }
  }
</style>
