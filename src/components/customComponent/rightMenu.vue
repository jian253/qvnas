<template>
<div id="container" v-show="isShowMenu">
  <slot></slot>
</div>
</template>

<script>
export default {
props: ['isShowMenu'],
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
  },
  filters: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
 /* .right-menu {*/
 /*   width: 150px;*/
 /*   border: 1px solid #eee;*/
 /*   box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, .1);*/
 /*   border-radius: 1px;*/
 /*   display: block;*/
 /*   font-family: Microsoft Yahei, Avenir, Helvetica, Arial, sans-serif;*/
 /*   -webkit-font-smoothing: antialiased;*/
 /*   -moz-osx-font-smoothing: grayscale;*/
 /*   text-align: center;*/
 /*   color: #2c3e50;*/
 /*   position: fixed;*/
 /*   top: 43px;*/
 /*   left: 0;*/
 /*   padding: 0 10px;*/
 /*   background: rgba(255, 255, 255, 1);*/
 /*   border: 1px solid rgba(0, 0, 0, .2);*/
 /*   border-radius: 3px;*/
 /*   z-index: 99999;*/
 /* }*/
 /* !*.showMenu {*!*/
 /* !*  display: none;*!*/
 /* !*}*!*/
 /*.newFolder ,.Upload ,.Preview,.Rename,.delete{*/
 /*   display: inline-block;*/
 /*   height: 24px;*/
 /*   width: 24px;*/
 /*   vertical-align: bottom;*/
 /* }*/
 /* .right-menu ul li {*/
 /*   height: 23px;*/
 /*   line-height: 23px;*/
 /*   margin: 5px 5px;*/
 /*   !*padding: 7px 33px;*!*/
 /*   font-size: 14px !important;*/
 /*   text-align: left;*/
 /*   cursor: pointer;*/
 /*   white-space: nowrap;*/
 /*   overflow: hidden;*/
 /*   text-overflow: ellipsis;*/
 /* }*/
 /* .right-menu ul li:hover {*/
 /*   background-color: #0086E5;*/
 /*   color: #fff;*/
 /* }*/
 /* .right-menu ul li:nth-child(1){*/
 /*   text-align: center;*/
 /*   cursor: default;*/
 /* }*/
 /* .right-menu ul li:nth-child(1):hover{*/
 /*   background-color: #fff;*/
 /*   color: #2c3e50;*/
 /* }*/
 /* .content-delete{*/
 /*   color: #96A0AA!important;*/
 /*   cursor: default!important;*/
 /* }*/
 /* .content-delete:hover{*/
 /*   background-color: #fff!important;*/
 /* }*/

</style>
