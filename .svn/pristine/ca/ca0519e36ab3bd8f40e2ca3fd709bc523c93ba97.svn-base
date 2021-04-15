<template>
  <div>
    <button id="reduce" ref="reduce" class="next-btn iconfont icon-houtui" @click.stop="reduce_click"></button>
    <button id="add" ref="add" class="next-btn iconfont icon-qianjin" @click.stop="add_click"></button>
  </div>
</template>

<script>
  import Button from "@components/customComponent/Button";
  import {debounce} from "@common/common/debounceAndThrottle";

  export default {
    name: "nextPreData",
    components: {Button},
    props: {
      Types: {
        type: String
      }
    },
    data () {
      return {
        currentStartTime: 0,
        currentEndTime: 1
        // currentStartTime: 1,
        // currentEndTime: 2
      }
    },
    methods: {
      add () {
        this.currentStartTime--
        this.currentEndTime--
        this.num()
      },
      add_click: debounce('add', 1000, true),
      reduce () {
        this.currentStartTime++
        this.currentEndTime++
        this.num()
      },
      reduce_click: debounce('reduce', 1000, true),
      num () {
        let prev = this.frontOneHour(new Date(new Date().getTime() - this.currentStartTime * 60 * 60 * 1000), 'yyyy/MM/dd,hh:mm') //上一个时间 头
        let current = this.frontOneHour(new Date(new Date().getTime() - this.currentEndTime * 60 * 60 * 1000), 'yyyy/MM/dd,hh:mm') //当前时间 尾
        let st = current  //结束时间
        let start = new Date(st).getTime() / 1000; // 将结束时间 转换成时间戳
        let ed = prev //开始时间
        let end = new Date(ed).getTime() / 1000;// 将开始时间 转换成时间戳
        // console.log(frontOneHour(new Date(new Date().getTime()), 'yyyy,MM,dd,hh:mm'));
        // console.log(current);
        this.$emit('getTimestamp', start, end)
        // console.log(start + '     ' + current + '开始时间');
        // console.log(end + '     ' + prev + '结束时间');
        this.$refs['add'].disabled = prev >= this.frontOneHour(new Date(new Date().getTime()), 'yyyy/MM/dd,hh:mm');
      },
      //格式化时间
      frontOneHour (time, fmt) {
        var o = {
          'M+': time.getMonth() + 1, // 月份
          'd+': time.getDate(), // 日
          'h+': time.getHours(), // 小时
          'm+': time.getMinutes(), // 分
          's+': time.getSeconds(), // 秒
          'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
          'S': time.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
      }
    }
  }
</script>

<style scoped>
  .next-btn {
    font-size: 16px;
    color: #3C3C3C;
    cursor: pointer;
  }

  button {
    border: 0;
    outline: none;
    background-color: #fff !important;
  }

  button[disabled] {
    cursor: default;
    color: #96A0AA !important;
  }
</style>
