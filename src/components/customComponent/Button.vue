<template>
<div id="container">
  <button class="recording-btn" :disabled="disabled"  @mousedown="mousedownEvent($event)" @mouseup="mouseupEvent($event)" @mouseout="mouseoutEvent($event)" @click.stop="clickevent">
    <slot></slot>
  </button>
</div>
</template>

<script>
export default {
  props:{
    disabled:{
      type:Boolean,
      default:false
    }
  },
  components: {
  },
  data :function() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    clickevent(){
      this.$emit('click')
    },
    mousedownEvent(e){
      if (this.disabled==true){
        return
      }
      e.currentTarget.style.backgroundImage='linear-gradient(#ebf0f5,#e6ebf0)'
    },
    mouseupEvent(e){
      if (this.disabled==true){
        return
      }
      e.currentTarget.style.backgroundImage='linear-gradient(#f5faff, #f0f5fa)'
    },
    mouseoutEvent(e){
      if (this.disabled==true){
        return
      }
      e.currentTarget.style.backgroundImage='linear-gradient(#f5faff, #f0f5fa)'
    }
  },
  filters: {
  },mounted () {
  }
}
</script>

<style scoped lang="less">
  .recording-btn {
    height: 28px;
    line-height: 2px;
    font-size: 12px;
    padding: 0 15px;
    background-image: linear-gradient(#f5faff, #f0f5fa);
    background-color: #F0F5FA;
    outline: none;
    border: 1px solid #C8D2DC;
    border-radius: 4px;
    cursor: pointer;
    color: #505A64;
    margin-bottom: 10px;
  }

  .receive-btn[disabled],.Send-btn[disabled], .recording-btn[disabled] {
    height: 28px;
    line-height: 2px;
    font-size: 12px;
    padding: 0 15px;
    outline: none;
    border-radius: 3px;
    cursor: default;
    color: #96A0AA !important;
  }

  .receive-btn:hover, .recording-btn:hover ,.Send-btn:hover{
    border: solid 1px #B4BEC8;
    background-image: linear-gradient(#f5faff, #ebf0f5);
    background-color: #EBF0F5;
    color: rgb(0, 74, 128);;
  }

  .receive-btn[disabled]:hover, .recording-btn[disabled]:hover ,.Send-btn[disabled]:hover{
    border: solid 1px #C8D2DC;
    background-color: #F3F8FD;
    background-image: linear-gradient(#F3F8FD, #F3F8FD);
    color: #96A0AA;
  }
</style>
