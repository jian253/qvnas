<template>
    <el-collapse-item >
      <template slot="title"><!--可以通过插槽改变组件内容-->
        <i v-if="isShowIcon=='first'" class="storage-fold-icon storage"></i>
        <i v-if="isShowIcon=='second'" class="storage-fold-icon Storage-pool"></i>
        <i v-if="isShowIcon=='third'" class="storage-fold-icon Storage-disk"></i>
        <div class="storage-fold-content">
          <div class="fold-text-style">
            <div>{{arrayList.name}} - <span>{{arrayList.status}}</span></div>
            <div class="progress-Bar" v-if="isShow">
              <div class="Bar-style">
                <span class="Bar-text-style">2.98GB</span>/1.74TB
              </div>
            </div>
          </div>
          <div class="fold-text-style">
            <div>SHR,btrfs</div>
            <el-progress v-if="isShow" class="memory-space" :show-text="false" :percentage="percentages.percentage"
                         :color="percentages.customColor"></el-progress>
          </div>
        </div>
      </template>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    </el-collapse-item>

</template>

<script>
  export default {
    name: 'Storage_FoldMenu',
    props: ['percentages', 'isShow', 'isShowIcon','foldData','arrayList'],
    components: {},
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    mounted () {
    },
  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  /*element手风琴样式穿透*/
  @{deep} .el-collapse-item__wrap {
    background-color: #E6F5FF;
  }

  @{deep} .el-collapse-item__header {
    background-color: #E6F5FF;
    padding: 10px 0;
    border-bottom: 0;
  }

  @{deep}.el-collapse-item__wrap {
    border-bottom: 0;
  }

  /*进度条长度*/
  @{deep}.el-progress-bar {
    width: 243px;
    margin-right: 56px;
    margin-top: 4px;
  }

  @{deep}.el-progress-bar__outer {
    height: 8px;
    background-color: #ccc;
  }

  //可复用的手风琴菜单样式
  .storage-fold-icon {
    height: 32px;
    width: 36px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .storage {
    background: url("/static/images/storage/g_icon_storage.png") 0 -480px;
  }

  .Storage-pool {
    background: url("/static/images/storage/g_icon_storage.png") 0px -192px;
  }

  .Storage-disk {
    background: url("/static/images/storage/g_icon_storage.png") 0px -224px;
  }

  .storage-fold-content {
    width: 100%;

    .fold-text-style {
      line-height: 24px;
      display: flex;
      flex: 1;
      justify-content: space-between;

      .progress-Bar {
        width: 300px;

        .Bar-style {
          color: #505A64;
          font-weight: 400;

          .Bar-text-style {
            color: #00A4EF
          }
        }
      }

      .memory-space {
        display: flex;
        flex: 1;
        justify-content: flex-end;

        div {
          display: flex;
          flex: 1;
          justify-content: flex-start;
        }
      }
    }

    .fold-text-style:nth-child(1) {
      font-size: 14px;
      font-weight: bold;
      line-height: 28px;

      span {
        font-weight: 400;
        color: #1CA600;
      }
    }
  }
</style>
