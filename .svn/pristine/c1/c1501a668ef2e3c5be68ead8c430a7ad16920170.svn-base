<template>
  <div class="legend-wrapper">
    <el-row>
      <el-col :span="8">{{$t('netWork.start')}}:{{dataList.start}}</el-col>
      <el-col :span="8">{{$t('netWork.end')}}:{{dataList.end}}</el-col>
      <el-col :span="8">
        {{$t('title.time')}}:{{tooltipParamsTime}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "ResourcesTime",
    props: {
      dataList: {}
    },
    computed: {
      tooltipParamsTime () {
        return this.dataList.tooltipParams[0] ? this.dataList.tooltipParams[0].axisValue : ''
      }
    },
    watch: {
      // dataList: {
      //   handler (val) {
      //     console.log(val.tooltipParams[0].axisValue)
      //   },
      //   deep: true
      // },

    }
  }
</script>

<style scoped lang="less">
  .legend-wrapper {
    padding: 0 76px;
    margin-bottom: 10px;
  }

  .legend-wrapper .el-row .el-col-4 {
    width: 33.3%;
  }
</style>
