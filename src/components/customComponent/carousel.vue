<template>
  <div class="container_box">
    <div class="tools_head" @mouseover="overEvent()" @mouseout="outEvent()">
      <div class="tools_head_left">
        <i class="icon" :style="{'backgroundImage': 'url('+icon+')'}"></i>{{titleName}}
      </div>
      <div class="tools_head_right" v-show="isBottom">
        <span class="zuidahua" @click="maximizeEvent($event)"></span>
        <span class="guanbi" @click="closeCarousel"></span>
      </div>
    </div>
    <div class=" tools_content">
      <div id="classifyScroll" class="classifyScroll" :style="{height:isOpen?'168px':'84px'}">
        <div class="center_box">
        <slot> </slot>
        </div>
        <div v-if="type!=='customize'" class="rightBottom">
                    <span :class="[showTopIcon===true?'topIconDisabled topIcon':'Previous topIcon' ]"
                          @click="TopClick($event)"></span>
          <span :class="[showBottomIcon===true?'bottomIconDisabled bottomIcon':'next bottomIcon']"
                @click="BottomClick($event)"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Carousel',
    props:{
      titleName:{
        type:String,
        default:'标题'
      },
      icon:{
        type:String,
        default: ''
      },
      type:{
        type:String,
        default:'item'//自定义内容
      },
      itemLength:{
        type:Number,
        default:0
      },
      isOpen:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        flag: this.isOpen,
        isBottom: true,//显示关闭按钮
        showTopIcon: true, // 是否禁用top按钮
        showBottomIcon: false,//是否禁用bottom按钮
        maxClickNum: 0, // 最大点击次数
        lastLeft: 0, // 上次滑动距离
        clickNum: 0, // 点击次数
      }
    },
    components: {},
    computed: {},
    methods: {
      maximizeEvent (e) {
        this.flag = !this.flag
        if (this.flag) {//展开    如果滚动到最后一个元素了 且当前点击展开了margin-top值就为'-84' 否则
          $(e.currentTarget).parents('.tools_head').siblings('.tools_content').children('.classifyScroll').css('height','168px')
          if (this.showBottomIcon===true){//说明到底了按钮禁用 获取最后一个的margin-top值
            $(e.currentTarget).parents('.tools_head').siblings('.tools_content').children('.classifyScroll').children('.center_box').css({
              marginTop:'-224px'
            })
          }
        } else {
          $(e.currentTarget).parents('.tools_head').siblings('.tools_content').children('.classifyScroll').css('height','84px')
          if (this.showBottomIcon===true){//说明到底了按钮禁用
            $(e.currentTarget).parents('.tools_head').siblings('.tools_content').children('.classifyScroll').children('.center_box').css({
              marginTop:'-308px'
            })
          }
        }
      },
      closeCarousel(){
        this.$emit('closeCarousel')
      },
      overEvent () {
        this.isBottom=true
      },
      outEvent () {
        this.isBottom=false
      },
      // 点击右箭头（左侧滚动）
      BottomClick (e) {
        this.showTopIcon = false
        if (e.currentTarget.className.indexOf('bottomIconDisabled') > -1) return
        // 如果点击次数小于数组长度-1时，执行左滑动效果。
        if (this.clickNum < this.itemLength - 1) {
          // 获取当前元素高度
          let Height = $(e.currentTarget).parents('.rightBottom').siblings('.center_box').children('.center_box_item')[this.clickNum].offsetHeight
          // 获取最后一个元素距离顶侧的距离
          let lastItemOffsetTop = $(e.currentTarget).parents('.rightBottom').siblings('.center_box').children('.center_box_item')[this.itemLength - 1].offsetTop
          // 获取可视区域高度
          const lookHeight = $(e.currentTarget).parents('.classifyScroll').height()
          // 如果最后一个元素距离顶侧的距离大于可视区域的高度，表示最后一个元素没有出现，执行滚动效果
          if (lastItemOffsetTop > lookHeight) {
            // 公示：滚动距离（元素的magin-Top值） = 负的它自己的高度 + 上一次滑动的距离
            $(e.currentTarget).parents('.rightBottom').siblings('.center_box').css({
              marginTop:`${-Height + this.lastLeft}px`
            })
            this.lastLeft = -Height + this.lastLeft
            // 点击次数+1
            this.clickNum += 1
            // 记录到最后一个元素出现在可视区域时，点击次数的最大值。用于后面点击左侧箭头时判断右侧箭头的显示
            this.maxClickNum = this.clickNum
          } else {
            this.showBottomIcon = true
          }
        }
      },
      // 点击左箭头（右侧滚动）
      TopClick (e) {
        if (e.currentTarget.className.indexOf('topIconDisabled') > -1) return
        this.showBottomIcon = false
        // 当点击次数大于0时才触发，这样当点击次数clickNum等于1的到时候
        if (this.clickNum > 0) {
          let height = $(e.currentTarget).parents('.rightBottom').siblings('.center_box').children('.center_box_item')[this.clickNum-1].offsetHeight
          // 公示：滚动距离（元素的magin-top值） = 它自己的高度 + 上一次滑动的距离
          $(e.currentTarget).parents('.rightBottom').siblings('.center_box').css({
            marginTop:`${this.lastLeft + height}px`
          })
          this.lastLeft = height + this.lastLeft
          // 点击次数-1
          this.clickNum--
          // 如果点击次数小于最大点击次数，说明最后一个元素已经不在可是区域内了，显示右箭头
        } else {//禁用按钮
          this.showTopIcon = true
        }
      }
    },created () {
    },
    mounted () {
    }
  }


</script>

<style scoped lang="less">
  /*// 这里是用的scss*/
  /*    @function px($px) {
          @return $px * 2px;
      }

      body, #app {
          background-color: rgba(245, 250, 255, 0.7);
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5)
      }*/

  .container_box {
    /*margin: 0px 10px 9px 10px;*/
    width: 318px;
    /*background-color: pink;*/
    background: rgba(245, 250, 255, 0.85);
    border: 1px solid #AFB9C3;
    /*margin: auto;*/
    /*margin-top: 200px;*/
    display: flex;
    overflow: hidden;
    flex-direction: column;

    .tools_head {
      box-sizing: border-box;
      display: flex;
      padding-right: 10px;
      padding-left: 5px;
      justify-content: space-between;
      align-items: center;
      /*background-color: deepskyblue;*/
      height: 32px;
      .tools_head_right{
        .zuidahua {
          display: inline-block;
          width: 24px;
          height: 24px;
          cursor: pointer;
          background: url("/static/images/global/widget_rt_button.png") 0 -96px;
        }
        .zuidahua:hover {
          background: url("/static/images/global/widget_rt_button.png") 0 -120px;
        }
        .zuidahua:active {
          background: url("/static/images/global/widget_rt_button.png") 0 -144px;
        }
        .zuixiaohua{
          background: url("/static/images/global/widget_rt_button.png") 0 -192px;
        }
        .zuixiaohua:hover{
          background: url("/static/images/global/widget_rt_button.png")0 -162px;
        }
        .zuixiaohua:active{
          background: url("/static/images/global/widget_rt_button.png")  0 -240px;
        }
        .guanbi {
          display: inline-block;
          width: 24px;
          height: 24px;
          cursor: pointer;
          background: url("/static/images/global/widget_rt_button.png")  0 0px;
        }
        .guanbi:hover{
          background: url("/static/images/global/widget_rt_button.png")  0 -24px;
        }
        .guanbi:active{
          background: url("/static/images/global/widget_rt_button.png")  0 -48px;
        }
      }
      .tools_head_left{
        font-size: 13px;
        font-weight: bold;
        color: #505A64;
        display: flex;
        align-items: center;
        .icon{
          cursor: pointer;
          height: 29px;
          padding-left: 33px;
        }
      }
    }

    .tools_content {
      /*background-color: green;*/
      position: relative;
      width: 320px;
      /*flex: 1;*/
      /*min-height: 84px;*/
      /*max-height: 168px;*/
      overflow: hidden
    }
  }

  #classifyScroll {
    /*height: 84px;*/
    /*max-height: 168px;*/
    /*min-height: 84px;*/
    /*padding: px(18) 0 px(15);*/
    width: 100%;
    display: flex;

    overflow: hidden;
    transition: all 0.3s;

    .rightBottom {
      width: 24px;
      margin: 2px;
      height: 100%;
      /*display: flex;*/
      /*flex-direction: column;*/
      position: relative;
      /*justify-content: space-around;*/
      /*background-color: green;*/

      .Previous {
        cursor: default;
        background: url("/static/images/global/w_page.png") 0 0;
      }

      .next {
        cursor: default;
        background: url("/static/images/global/w_page.png") 0px -96px; //这里
      }

      .topIcon {
        cursor: pointer;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 0;
        /*right: 15px;*/
        /*bottom: 62px;*/
        /*transform: translate(0, 50%);*/
        z-index: 9;
      }

      .topIcon:hover {
        background: url("/static/images/global/w_page.png") 0 -24px;
      }

      .topIcon:active {
        background: url("/static/images/global/w_page.png") 0 -48px;
      }

      .topIconDisabled {
        cursor: default !important;
        background: url("/static/images/global/w_page.png") 0 -72px !important;
      }

      .bottomIcon {
        cursor: pointer;
        width: 24px;
        height: 24px;
        position: absolute;
        /*right: 15px;*/
        bottom: 10px;
        /*transform: translate(0, 50%);*/
        z-index: 9;

      }

      .bottomIcon:hover {
        background: url("/static/images/global/w_page.png") 0 -120px;

      }

      .bottomIcon:active {
        background: url("/static/images/global/w_page.png") 0 -144px;

      }

      .bottomIconDisabled {
        cursor: default !important;
        background: url("/static/images/global/w_page.png") 0px -168px !important;
      }
    }

    .center_box {
      height: 100%;
      /*position: relative;*/
      // 注意一下，这里没有用position: relative，，而图标用了position:absolute。因为这个东西是准备做组件的，我把相对定位写在父级的css标签上了。*!
      transition: all 0.3s;
      /*display: flex;*/
      flex: 1;
      width: 100%;
      align-items: center;
      flex-direction: column;
      /*overflow: hidden;*/
      .center_box_item {
        display: flex;
        align-items: center;
        font-size: 12px;
        width: 100%;
        height: 28px;
        font-weight: 400;
        color: #505A64;
        /*color: #ffffff;*/
        margin: 0;
        /* line-height: 32px; */
        /* padding-right: 104px; */

        .minIcon{
          background: url("/static/images/global/sprite-s90fad1d510.png") 0 -24px no-repeat;
          display: inline-block;
          width: 24px;
          margin: 2px 6px 2px 8px;
          height: 24px;
        }
        .content_title{
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

</style>
