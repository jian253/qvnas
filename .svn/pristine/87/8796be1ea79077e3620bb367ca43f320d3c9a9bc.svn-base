<template>
  <div class="legend-footer">
    <el-row>
      <el-col :span="12">
        <el-row>
            <footer-data-item v-for="(item,index) in dataList.legend" :dataLists="dataList" :index="index" :colorLists="colorList" :key="index" :filterTypes="filterType"></footer-data-item>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import footerDataItem from "@components/ResourcesPanel/ResourcesFooterData/footerDataItem";
  export default {
    name: "footerContainer",
    data(){
      return {
      }
    },
    props: {
      colorList: {
        type: Array
      },
      dataList: {},
      filterType:{}
    },
    components:{
      footerDataItem
    },
    watch:{
    }
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep}.el-col-12 {
    width: 100%;
  }
  .el-row {
    margin-bottom: 0;
  }
  .legend-footer {
    padding-left: 30px;
  }
  .legend-footer .el-row {
    margin-bottom: 0;
  }

</style>
