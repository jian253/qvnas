<template>
  <div style="width: 100% ;height: 24px">
    <!--    {{dataLists.tooltipParams}}-->
    <el-col :span="6"><span class="SmallCircle"
                            :style="{'backgroundColor':colorLists[index]}"></span>
      {{tooltipParamsName}}:
      {{tooltipParamsValue}}
    </el-col>
    <el-col :span="6">min: {{dataLists.min[index] | CalculationVale}}</el-col>
    <el-col :span="6">mean: {{dataLists.avg[index] | CalculationVale}}</el-col>
    <el-col :span="6">max: {{dataLists.max[index] | CalculationVale}}</el-col>
  </div>
</template>

<script>
  let _this = null
  export default {
    name: "footerDataItem",
    props: {
      colorLists: {//颜色小圆圈
        type: Array
      },
      dataLists: {},//数据列表 cpu
      index: {//代表要获取数组哪个数据
      },
      filterTypes: {}
    },
    computed: {
      tooltipParamsValue () {
        const by = {'cpu': '%','memory':'GiB','network':'Mb','partition':'GiB','target':'','zfs':''}
        return this.dataLists.tooltipParams[this.index] ? this.dataLists.tooltipParams[this.index].value + by[this.filterTypes] : ''
      },
      tooltipParamsName () {
        return this.dataLists.legend.length > 0 ? this.dataLists.legend[this.index].name : ''
      }
    },
    created () {
      _this = this
    },
    watch: {
      // 'dataLists': {
      //   handler (val) {
      //     console.log(val)
      //   },
      //   deep: true
      // },
    },
    filters: {
      CalculationVale (val) {
        if (val == 0 || val == null) {
          return '0'
        }
        if (_this.filterTypes == 'cpu') {
          // console.log(val)
          //item1 / 100 * 100
          return (val / 100 * 100).toFixed(2) + '%'
        } else {
          if (isNaN(val)) {
            return '';
          }
          var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
          var exp = Math.floor(Math.log(val) / Math.log(2));
          if (exp < 1) {
            exp = 0;
          }
          var i = Math.floor(exp / 10);
          val = val / Math.pow(2, 10 * i);

          if (val.toString().length > val.toFixed(2).toString().length) {
            val = val.toFixed(2);
          }
          return val + symbols[i];
        }
      },
      CalculationMin (val) {
        // console.log(val)
        if (val == 0 || val == null) return ''
        if (_this.filterTypes == 'cpu') {
          return val + '%'
        }
        const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        // let i = Math.floor(Math.log(val)/10);
        // val*1024
        var exp = Math.floor(Math.log(val) * Math.log(2));
        if (exp < 1) {
          exp = 0;
        }
        var i = Math.floor(exp * 10);
        val = val * Math.pow(2, 10 * i);
        return val + sizes[i]
      },
    }
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.el-col-12 {
    width: 100%;
  }

  .SmallCircle {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }

  .el-col.el-col-6 {
    padding: 3px 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .el-row {
    margin-bottom: 0;
  }

  @{deep}.el-row {
    margin-bottom: 4px;
  }
</style>
