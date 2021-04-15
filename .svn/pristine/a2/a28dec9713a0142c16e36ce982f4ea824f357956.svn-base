<template>
  <article><!--内容-->
    <div class="memory_box">
      <div id="memory" :class="size=='big'?'memoryBig':'memoryMini'" ref="memoryCharts">
      </div>
      <div class="memory_title">
        <div class="memory_total_box">
          <div class="total">{{memoryData.total |filterStorage}}</div>
          <div class="title">{{$t('systemInfo.totalMemory')}}</div><!--已安装的总内存-->
        </div>
        <div><i class="circle" style="background-color: #D0840A "></i> <span
          class="title">Free: {{memoryData.free |filterStorage}}</span></div>
        <div><i class="circle" style="background-color: #4FADFD"></i> <span
          class="title">ZFS Cache: {{memoryData.zfs |filterStorage}}</span></div>
        <div><i class="circle" style="background-color:#A972B6"></i> <span
          class="title">Services: {{memoryData.Services |filterStorage}}</span></div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: "memory",
    props:{
      memoryData:{
        type:Object,
        request:true
      },
      size:{
        type:String,
        default:'Big'
      }
    },
    methods:{
      //获取存储echarts
      getMemoryChart () {
        let my_charts = this.$echarts.init(this.$refs['memoryCharts'])
        let option = {
          tooltip: {
            formatter: function (params) {
              return params.name + '：' + params.percent + ' %'
            },
            confine: true//显示在内显示
          },
          legend: {
            show: false,
            itemGap: 12,
            data: ['Services', 'ZFS', 'Free'],
            bottom: 0
          },

          series: [{
            name: 'circle',
            type: 'pie',
            clockWise: true,
            radius: ['40%', '80%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [{
              value: this.memoryData.zfs,
              name: 'ZFS',
              itemStyle: {
                normal: {
                  color: '#4FADFD',
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            }, {
              name: 'Free',
              value: this.memoryData.free,
              itemStyle: {
                normal: {
                  color: '#D0840A'
                }
              }
            }, {
              name: 'Services',
              value: this.memoryData.Services,
              itemStyle: {
                normal: {
                  color: '#A972B6'
                }
              }
            }]
          }]
        }
        my_charts.clear()
        my_charts.setOption(option)
      },
    },
    mounted () {
      this.getMemoryChart()
    }
  }
</script>

<style scoped lang="less">
  article {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .memory_box {
      height: 100%;
      display: flex;
      width: 100%;

      .memoryBig {
        height: 200px;
        width: 240px;
      }
      .memoryMini{
        height: 150px;
        width: 170px;
      }
      .memory_title {
        width: 240px;
        height: 200px;
        /*padding-top: 6px;*/
        box-sizing: border-box;
        /*padding-left: 21px;*/

        .memory_total_box {
          .total {
            font-size: 30px;
            color: #505A64;
          }

          .title {
            font-size: 14px;
            color: #505A64;
          }
        }

        div {
          font-size: 14px;
          color: #505A64;
          margin-bottom: 5px;

          .circle {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
