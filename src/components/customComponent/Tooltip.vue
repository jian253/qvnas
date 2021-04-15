<template>
    <div class="gl_tooltip"  ref="gl_tooltip"  v-show="isShow"
         @mouseenter.stop="enterEvent">
      <slot></slot>
    </div>
</template>
<script>
  import fileMenu from "../FileModule/fileMenu";

  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }, coordinate: {}
    },
    components: {},
    data: function () {
      return {}
    },
    computed: {},
    watch: {
      isShow: function (value) {
        if (value) {
          this.$nextTick( ()=> {
            this.$refs.gl_tooltip.style.top = this.coordinate.top +10+ 'px'
            this.$refs.gl_tooltip.style.left = this.coordinate.left +10+ 'px'
            this.dealContextMenuPositionFun('gl_tooltip')
          })
        }
      }
    },
    methods: {
      enterEvent () {
        this.$emit('change')
      },
      dealContextMenuPositionFun (refName) {
        try {
          let getWidth = $(this.$refs[refName]).width() ;
          let getHeight = $(this.$refs[refName]).height();
          let getLeft = this.coordinate.event.x;
          let getTop = this.coordinate.event.y;
          // console.log(this.$refs[refName])
          if ((getWidth + getLeft) > $(window).width()) {
            getLeft = $(window).width() - getWidth;
            this.$refs.gl_tooltip.style.left = getLeft-10+'px'
            this.$refs.gl_tooltip.style.top = this.coordinate.event.y+10+'px'
          }
          if (getTop > $(window).height() - getHeight) {
            getTop = $(window).height() - getHeight;
            this.$refs.gl_tooltip.style.top = getTop-10+'px'
          }
        } catch (e) {
        }
      },
    },
    filters: {}

  }
</script>

<style scoped lang="less">
  .gl_tooltip {
    box-sizing: border-box;
    min-height: 20px;
    max-height: 300px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2020;
    color: #fff;
    padding: 3px 10px;
    max-width: 400px;
    min-width: 100px;
    font-size: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border: solid 1px;
    border-color: #fff;
    border-color: rgba(255, 255, 255, 0.75);
    background: #000;
    background: rgba(0, 0, 0, 0.75);
    /*transition: all 0.3s;*/
    div{
      width: 100%;
      overflow: hidden;//先溢出隐藏
      white-space: nowrap;//强制显示一行
      text-overflow: ellipsis //溢出用点点点
    }
  }
</style>
