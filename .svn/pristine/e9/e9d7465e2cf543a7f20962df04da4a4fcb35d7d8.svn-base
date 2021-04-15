<template>
  <div :class="isFooterDom?'charts_container':'container'">
    <span v-if="isFooterDom" class="title"><slot name="title"></slot></span>
    <div ref="my_charts" :class="[isFooterDom?'':'charts_box1','charts_box']">

    </div>
    <div v-if="isFooterDom&&types=='network'" class="footer-box">
      <span class="up-text">
        <i class="fa fa-arrow-down" :title="$t('storage.receive')"></i>{{sendSpeeds}}
      </span>
      <span class="send-text">
        <i class="fa fa-arrow-up" :title="$t('storage.send')"></i>{{receivingSpeeds}}
      </span>
    </div>
    <div v-if="isFooterDom&&types!='network'" class="footer-box text_size text_color footer-title ">
      <span v-if="types=='zfs'">Arc</span>
      <span v-else>{{$t('storage.usageRate')}} (%)</span>
      <span>{{val}} <slot name="unit">%</slot></span>
    </div>
  </div>
</template>

<script>
  let arrays = ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
  export default {
    name: "R_echarts",
    props: {
      dataList: {
        type: Object
      },
      types: {
        type: String,
        default: 'cpu'
      },
      color: {
        type: Array,
        default: () => {
          return ['#62E7E1']
        }
      },
      isRequiredLength: {
        type: Boolean,
        default: true
      },//是否需要长度 true从最右开始滚动
      isFooterDom:{//是否需要dom
        type:Boolean,
        default: true
      },
      isEvent:{//是否需要触发事件 network外部需要发送及收到的数据
        type:Boolean,
        default: false
      },
      isYScale:{//是否需要刻度 小工具需要
        type:Boolean,
        default: false
      },
    }
    ,
    computed: {
      sendSpeeds () {
        if (this.sendSpeed * 1024 > 1000) {
          return this.sendSpeed + ' ' + 'KB/s'
        } else {
          return this.sendSpeed * 1024 + ' ' + 'bytes'
        }
      },
      receivingSpeeds () {
        if (this.receivingSpeed * 1024 > 1000) {
          return this.receivingSpeed + ' ' + 'KB/s'
        } else {
          return this.receivingSpeed * 1024 + ' ' + 'bytes'
        }
      }
    },
    data () {
      return {
        move_data: this.isRequiredLength ? arrays : [],
        times: null,
        val: 0,
        sendSpeed: 0,
        receivingSpeed: 0,
        send: this.isRequiredLength ? arrays : [],
        receiving: this.isRequiredLength ? arrays : [],
        charts: null
      }
    }
    ,
    watch: {
      dataList (val) {
        this.RefreshData()
      },
      move_data (val) {
        // console.log(val)
      }
    },
    methods: {
      //合并数据
      RefreshData () {
        //network
        if (this.dataList[this.types].series && this.types=='network') {
          let send = this.dataList[this.types].series[0].data
          let rogerThat = this.dataList[this.types].series[1].data
          this.send = this.send.concat(send)
          this.receiving = this.receiving.concat(rogerThat)
          //收到
          // console.log(send)
          // console.log(rogerThat)
        } else {
          let newArray = this.dataList[this.types].y
          this.move_data = this.move_data.concat(newArray)
        }
      },
      async initChart () {
        //刷新统计图   一进一出  首先获取接口数据 拿到数据 将数组通过定时器一个一个推进去 push 然后
        var myChart = await this.$echarts.init(this.$refs['my_charts']);
        this.charts = myChart
        this.RefreshData()
        var option = JSON.parse(JSON.stringify(this.getInitOption()));
        if (this.types == 'network') {
          option.series = [this.dealSeriresColor(this.color[0], this.send), this.dealSeriresColor(this.color[1], this.receiving)];
        } else {
          option.series = [JSON.parse(JSON.stringify(this.dealSeriresColor(this.color[0], this.move_data)))];
        }
        let flag = 0
        myChart.setOption(option);
        this.times = setInterval(() => {
          flag++
          if (this.move_data.length == 30 || this.send.length == 30) {
            //发送信息
            this.$emit('requestData', this.types)
          }
          if (this.types == 'network') {
            this.sendSpeed = flag == 7 && !this.isRequiredLength ? this.send[0] : this.send[14];//设置新的数据
            this.receivingSpeed = flag == 7 && !this.isRequiredLength ? this.receiving[0] : this.receiving[14];//设置新的数据
            this.send.shift()
            this.receiving.shift()
            if (this.isEvent){
              this.$emit('networkData',this.sendSpeed,this.receivingSpeed)
            }
          } else {
            this.val = flag == 7 && !this.isRequiredLength ? this.move_data[0] : this.move_data[14]
            this.move_data.shift();
          }
          this.refreshData(myChart)
        }, 1500);
        $(this.$refs['my_charts']).resize(()=>{
        myChart.resize()
        });
        if (this.types == 'network') {
          myChart.resize();//若有多个图表变动，可多写
        }
      },
      //刷新数据
      refreshData (myChart) {
        var option = myChart.getOption();//获取页面的option
        if (this.types == 'network') {
          option.series[0].data = this.send;//设置新的数据
          option.series[1].data = this.receiving;//设置新的数据
        } else {
          option.series[0].data = this.move_data;//设置新的数据
        }
        // console.log(option)
        myChart.setOption(option);//绑定到ECharts
      },
      dealSeriresColor (color, data = []) {
        return {
          type: 'line',
          hoverAnimation: false,
          //是否显示鼠标经过的标记
          showSymbol: false,
          itemStyle: {
            color: color,
          },
          areaStyle: {
            // 渐变色
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: color,
            },
              {
                offset: 1,
                color: color,
              },
            ]),
          },
          data: data
        };
      },
      getInitOption () {
        // 需要渲染的series数据
        return {
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            // 是否显示刻度标签 如果是true 就显示 否则反之
            containLabel: this.isYScale,
            //是否显示边框
            show: false,
            //设置边框颜色
            borderColor: '#B4BEC8',
            //设置边框线宽
            borderWidth: 0
          },
          legend: {
            show: false, //是否显示标签
          },
          // dataZoom: [{
          //   type: 'slider',
          //   show: false,
          //   realtime: true,
          //   startValue: 0,
          //   endValue: 30, // 初始显示index0-30的数据,可根据你的数据量设置
          //   filterMode: 'none',
          // },],
          animation: false,
          xAxis: {
            // type:'category',
            show: false,
            boundaryGap: false,
            data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            axisLabel: {
              show: true
            },
            axisLine: {
              //是否显示分割线
              show: true,
              //设置分割线的颜色
              lineStyle: {
                color: "#B4BEC8"
              }
            },
            axisTick: {
              show: false
            },

          },
          yAxis: [{
            type: 'value',
            // show: false,
            //是否显示刻度
            axisTick: {
              show: false
            },
            //y轴的线条颜色
            axisLine: {
              show:false,
              // lineStyle: {
              //   color: "#505A64"
              // }
            }
          },]
        };
      },
    },
    created () {
      // console.log(this.dataList)
    },
    mounted () {
      this.initChart()
    },
    beforeDestroy () {
      clearInterval(this.times)
      this.times = null
      this.$echarts.dispose(this.$refs['my_charts']);
    }
  }

</script>

<style scoped lang="less">
  .charts_container {
    width: 31%;
    height: 100%;
    position: relative;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: space-between;*/
  }
  .container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-weight: bold;
    font-size: 14px;
    height: 20px;
  }

  .charts_box {
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 0;
    right: 0;
    /*height: 100%;*/
    border: 1px solid #B4BEC8;
    border-right: 0;
    border-top:0;
  }
  .charts_box::after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    border-right: 1px solid #B4BEC8;
  }
  .charts_box1 {
    position: absolute;
    top: 0px!important;
    bottom: 0px!important;
    left: 0;
    right: 0;
    height: 100%;
    border: 1px solid #B4BEC8;
    border-top:0;
  }

  .footer-title {
    display: flex;
    justify-content: space-between;
  }

  .footer-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    line-height: 20px;
    .send-text {
      color: var(--greeds);
      font-size: var(--textSize);
      /*padding-left: 15px;*/
    }

    .up-text {
      color: var(--blues);
      font-size: var(--textSize);
    }
  }

  .fa-arrow-down {
    display: inline-block;
    width: 16px;
    height: 13px;
    vertical-align: unset;
    background: url("/static/images/global/widget_icon_up_down.png");
    background-repeat: no-repeat !important;
  }

  .fa-arrow-up {
    display: inline-block;
    width: 16px;
    height: 13px;
    vertical-align: unset;
    background: url("/static/images/global/widget_icon_up_down.png");
    background-position: 1px -16px;
    background-repeat: no-repeat !important;
  }
</style>
