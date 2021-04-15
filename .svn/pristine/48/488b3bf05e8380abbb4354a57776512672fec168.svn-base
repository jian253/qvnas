<template>
  <div class="childPanelContent">
    <el-table
      :data="Group"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        :label="$t('title.groupName')"
        show-overflow-tooltip>
        <template slot-scope="scope">
                <span class="text_size">
                  {{scope.row.name}}
                </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        :label="$t('title.description')"
        show-overflow-tooltip>
        <template slot-scope="scope">
                <span class="text_size">
                  {{scope.row.value}}
                </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('title.join')">
        <template slot-scope="scope">
          <input :id="`radio+${scope.row.id}userinfo`" :disabled="scope.row.disabled" :value="scope.row.id" type="radio"
                 class="radio-custom" name="radio"
                 v-model="checkedValue">
          <label :for="`radio+${scope.row.id}userinfo`" class="radio-custom-label"></label>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {assign_compatible} from "@common/js/publicMethod/publicMethod";

  export default {
    name: "userGroupinfo",
    props: {
      dialogType: {
        default: 0,
        type: Number,
        required: true,
      },
      currentEditUser: {
        default: {},
        required: true
      }
    },
    watch: {
    },
    data: function () {
      return {
        checkedValue: 0,
        saveOldGroupInfo: [],//用于保存信息 作比较的
        Group: [
          {
            id: 0,
            disabled: true,
            name: 'users',
            value: this.$t('title.generalUser')
          }, {
            id: 1,
            name: 'administrator',
            disabled: true,
            value: this.$t('title.SuperAdministrator')
          }]
      }
    },
    methods: {
      async dealAddListData () {
        this.initListData(0);
      },
      async dealEditListData () {
        await this.initListData(1);
        this.$nextTick(() => {
          let dealGroup = JSON.parse(JSON.stringify(this.Group))
          if (this.currentEditUser.delFlag == 0) {
            this.checkedValue = 0;
          } else {
            this.checkedValue = 1;
          }
          this.Group = dealGroup;
          this.saveOldGroupInfo = parseInt(this.checkedValue + "");
        });
      },
      checkEditValue () {//验证修改了值
        return this.saveOldGroupInfo == this.checkedValue;
      },
      commitValue () {//修改delFlag
        return this.checkedValue;
      },
      async initListData (optionType) {
        await assign_compatible
        Object.assign(this.$data, this.$options.data.call(this));
        this.$nextTick(() => {
          let dealGroup = JSON.parse(JSON.stringify(this.Group));
          dealGroup.forEach((item, index) => {
            //判断是否优秀改权限的能力
            if(optionType==1){//编辑
              if(this.currentEditUser.delFlag==0){//当前编辑用户是普通用户时
                item.disabled = false;
              }else{//除了root 其余都不能修改这块的权限
                this.$store.state.currentUserInfo.userName == "root" ? item.disabled = false : item.disabled = true
              }
            }else{//新增  只判断当前的用户权限
              this.$store.state.currentUserInfo.delFlag == 1 ? item.disabled = false : item.disabled = true
            }
          });
          this.Group = dealGroup;
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @deep: ~">>>";
  @{deep}.el-table th > .cell {
    font-size: 12px;
    color: #0086E5;
    font-weight: 400;
    border-right: 1px solid #EBEEF5;
    border-top: 1px solid #D7E1EB;
  }

  @{deep}.el-table--border, .el-table--group {
    border: 0;
  }

  @{deep}.el-table .cell {
    font-size: 12px;
  }

  @{deep}.el-table--border td {
    border-right: 0px;
  }
</style>
