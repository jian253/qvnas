<template>
  <div class="SwitchBtn">
    <button class=" activeStyle btnActive" @click.stop="btnLeft($event)"></button>
    <button class=" activeStyle1 activeStyleToggle1"  @click.stop="btnRight($event)"></button>
  </div>
</template>

<script>
  export default {
    name: 'SwitchBtn',
    props: {},
    components: {},
    data: function () {
      return {}
    },
    computed: {},
    mounted () {
      //获取按钮，给按钮添加样式激活样式
    },
    watch: {},
    methods: {
      btnLeft(e){
        $(e.currentTarget).addClass('btnActive').removeClass('activeStyleToggle')
        $(e.currentTarget).siblings().addClass('activeStyleToggle1').removeClass('btnActive1')
        this.$emit('changes',0)
      },
      btnRight(e){
        $(e.currentTarget).siblings().addClass('activeStyleToggle').removeClass('btnActive')
        $(e.currentTarget).addClass('btnActive1').removeClass('activeStyleToggle1')
        this.$emit('changes',1)
      }
    },
    filters: {}
  }
</script>

<style scoped lang="less">
  .SwitchBtn {
    height: 28px;
    width: 76px;
    //按钮是行内元素必须先转换才能设置大小
    .activeStyle, .activeStyle1 {
      float: left;
      display: inline-block;
      height: 100%;
      outline: none;
      border: 0;
      cursor: pointer;
      /*background-color: #F4F9FE;*/
    }

    .activeStyle1 {
      width: 35px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .activeStyleToggle1 {
      border: 1px solid #ccc;
      background: url("/static/images/global/viewmode_list.png") 0 0;

    }

    .activeStyleToggle1:hover {
      background: url("/static/images/global/viewmode_list.png") 0 -28px;
    }

    .activeStyle {
      width: 36px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .activeStyleToggle {
      border: 1px solid #ccc;
      background: url("/static/images/global/viewmode_tile.png") 0 0;
    }

    .activeStyleToggle:hover {
      border: 1px solid #ccc;
      background: url("/static/images/global/viewmode_tile.png") 0 -28px;
    }
  }
  .btnActive1 {
    box-shadow: inset 0px 1px 2px #007bd3;
    background-image: linear-gradient(#1793EB, #3BA6F3);
    background: url("/static/images/global/viewmode_list.png") 0px -56px;
    background-color: #3BA6F3;
    border: 1px solid #0970CB !important;
  }

  .btnActive {
    box-shadow: inset 0px 1px 2px #007bd3;
    background-image: linear-gradient(#1793EB, #3BA6F3);
    background: url("/static/images/global/viewmode_tile.png") 0px -56px;
    background-color: #3BA6F3;
    border: 1px solid #0970CB !important;
  }
</style>
