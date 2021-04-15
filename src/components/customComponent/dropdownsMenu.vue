<template>
  <div class="home" v-cloak>

    <div class="menu">
      <p>下拉菜单</p>
      <div class="main" v-clickoutside="handleClose">
        <button @click.stop="show = !show">点击显示下拉菜单</button>
        <div class="dropdown" v-show = "show">
          <p>下拉框的内容,点击外面区域可以关闭</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

        show:false
      };
    },
    methods:{
      // 下拉菜单
      handleClose(){
        this.show = false;
      },
    },

    //    自定义指令clickoutside绑定了一个函数handleClose用来关闭菜单
    directives:{
      clickoutside:{
        bind:function(el,binding,vnode){
          function documentHandler(e){
            if(el.contains(e.target)){
              return false;
            }
            if(binding.expression){
              binding.value(e)
            }
          }
          el._vueClickOutside_ = documentHandler;
          document.addEventListener('click',documentHandler);
        },
        unbind:function(el,binding){
          document.removeEventListener('click',el._vueClickOutside_);
          delete el._vueClickOutside_;
        }
      }
    }

  };
</script>
<style lang="less" scoped>
  // 作用是取消数据绑定时出现的代码闪烁
  [v-cloak] {
    display: none;
  }
  table {
    border: 1px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
    // 隐藏表格中空单元格上的边框和背景：
    empty-cells: show;
  }
  th,
  td {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
  th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  .menu{
    border: 1px solid #ccc;
  }
</style>



