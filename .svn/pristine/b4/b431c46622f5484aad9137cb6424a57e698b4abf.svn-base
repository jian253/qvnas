<template>
  <div class="childPanelContent">
    <el-table
      ref="multipleTable"
      :data="sharedFolder"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        :label="$t('user.name')"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="text_size">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        :label="$t('file.preview')"
        show-overflow-tooltip>
        <template slot-scope="scope">
                <span class="text_size" :style="{color:filterColor(scope.row.value)}">
                  {{scope.row.value}}
                </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('title.noAccess')">
        <template slot-scope="scope">
          <input :id="`radio+${scope.row.id}folder`" type="radio" class="radio-custom" :disabled="scope.row.disabled[0]" :name="scope.row.id"
                 @change="radioChange(scope.row,$t('title.noAccess'),1)"  :checked="scope.row.checkIndex==1">
          <label :for="`radio+${scope.row.id}folder`" class="radio-custom-label"></label>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('title.readAndWrite')">
        <template slot-scope="scope">
          <input :id="`radio1+${scope.row.id}folder`" type="radio" class="radio-custom" :disabled="scope.row.disabled[1]" :name="scope.row.id"
                 @change="radioChange(scope.row,$t('title.readAndWrite'),2)"  :checked="scope.row.checkIndex==2">
          <label :for="`radio1+${scope.row.id}folder`" class="radio-custom-label"></label>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('title.readOnly')">
        <template slot-scope="scope">
          <input :id="`radio2+${scope.row.id}folder`" type="radio" class="radio-custom" :disabled="scope.row.disabled[2]" :name="scope.row.id"
                 @change="radioChange(scope.row,$t('title.readOnly'),3)"  :checked="scope.row.checkIndex==3">
          <label :for="`radio2+${scope.row.id}folder`" class="radio-custom-label"></label>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {assign_compatible} from "@common/js/publicMethod/publicMethod";

    export default {
        name: "folderSharedInfo",
        props: {
          dialogType: {
            default: 0,
            type: Number,
            required: true
          },
          currentEditUser:{
            default: {},
            required: true
          }
        },
        watch:{},
        data: function() {
            return {
              sharedFolder: [{
                id: 1,
                name: 'video',
                value: this.$t('title.noAccess'),
                checkIndex:1,
                disabled:[true,true,true],
              },
                {
                id: 2,
                name: 'photo',
                value: this.$t('title.noAccess'),
                checkIndex:1,
                disabled:[true,true,true],
              }, {
                id: 3,
                name: 'audio',
                value: this.$t('title.noAccess'),
                checkIndex:1,
                disabled:[true,true,true],
              }, {
                id: 4,
                name: 'other',
                value: this.$t('title.noAccess'),
                checkIndex:1,
                disabled:[true,true,true],
               },// {
              //   id: 4,
              //   name: 'chat',
              //   value: this.$t('title.noAccess'),
              //   checkIndex:1,
              //   disabled:true,
              // }, {
              //   id: 5,
              //   name: 'docker',
              //   value: this.$t('title.noAccess'),
              //   checkIndex:1,
              //   disabled:true,
              // },
/*, {
                id: 7,
                name: 'Tomcat',
                value: this.$t('title.noAccess'),
                checkIndex:1,
                disabled:true,
              }*/],
              saveOldSharedFolder:{},
            }
        },
        methods : {
          radioChange (row, value,checkIndex) {
            row.checkIndex=checkIndex;
            row.value = value
          },
          filterColor: function (key) {
            if (key == this.$t('title.noAccess')) {
              return 'red'
            } else if (key == this.$t('title.readAndWrite')) {
              return 'green'
            } else {
              return 'orange'
            }
          },
          async  dealAddListData (){
            await this.initListData();
            this.$nextTick(()=>{
              let dealsharedFolder=JSON.parse(JSON.stringify(this.sharedFolder));
              dealsharedFolder.forEach((item,index)=>{
                //判断是否优秀改权限的能力
                //this.$store.state.currentUserInfo.delFlag==1?item.disabled=[false,false,false]:item.disabled=[true,true,true];
                if(this.$store.state.currentUserInfo.delFlag==1){//管理员
                  dealsharedFolder[index].disabled=[false,false,false];
                  if(this.$store.state.currentUserInfo.userName != "root"){//账号不为 root
                    //根据创建账户再针对相对禁止
                    if(this.$store.state.currentAuthorityList!=null&&this.$store.state.currentAuthorityList.length!=0){
                      if(this.$store.state.currentAuthorityList[index]!=2){
                        this.$store.state.currentAuthorityList[index]==3?dealsharedFolder[index].disabled=[false,true,false]:dealsharedFolder[index].disabled=[false,true,true];
                      }else{
                        dealsharedFolder[index].disabled=[false,false,false];
                      }
                    }
                  }
                }else{//普通用户
                  dealsharedFolder[index].disabled=[true,true,true];
                }
              });
              this.sharedFolder=dealsharedFolder;
            });

          },

          async dealEditListData (){
            await this.initListData();
            this.$nextTick(()=>{
              let dealsharedFolder=JSON.parse(JSON.stringify(this.sharedFolder));
              let authorityId=this.currentEditUser.userRoleList||'1,1,1,1';
              let getAuthorityIdArr=[];
              try{
                this.currentEditUser.userRoleList.forEach((item,index)=>{
                  getAuthorityIdArr.push(item.authorityId);
                });
                authorityId=getAuthorityIdArr.join(",");
              }catch(err){}

              let wordArr=[this.$t('title.noAccess'),this.$t('title.readAndWrite'),this.$t('title.readOnly')];
              authorityId=authorityId.padEnd(7, ',1');
              let authorityIdArr=authorityId.split(',');
              dealsharedFolder.forEach((item,index)=>{
                //this.$store.state.currentUserInfo.delFlag==1?item.disabled=[false,false,false]:item.disabled=[true,true,true]
                if(this.$store.state.currentUserInfo.delFlag==1){//管理员
                  dealsharedFolder[index].disabled=[false,false,false];
                  if(this.$store.state.currentUserInfo.userName != "root"){//账号不为 root
                    //根据创建账户再针对相对禁止
                    if(this.currentEditUser.delFlag==1){//管理员不能互相修改文件权限，只能root
                      dealsharedFolder[index].disabled=[true,true,true];
                    }else{//管理员修改普通文件权限，只能降权限或平等权限
                      if(this.$store.state.currentAuthorityList!=null&&this.$store.state.currentAuthorityList.length!=0){
                        if(this.$store.state.currentAuthorityList[index]!=2){
                          this.$store.state.currentAuthorityList[index]==3?dealsharedFolder[index].disabled=[false,true,false]:dealsharedFolder[index].disabled=[false,true,true];
                        }else{
                          dealsharedFolder[index].disabled=[false,false,false];
                        }
                      }
                    }
                  }
                }else{//普通用户
                  dealsharedFolder[index].disabled=[true,true,true];
                }
                item.checkIndex=parseInt(authorityIdArr[index]);
                try{
                  item.value=wordArr[(item.checkIndex-1)];
                }catch (e) {
                  item.value=this.$t('title.noAccess');
                }
              });
              this.sharedFolder=dealsharedFolder;
              this.saveOldSharedFolder=JSON.parse(JSON.stringify(dealsharedFolder));
            });

          },
          commitValue (){
            let authorityIdArr=[];
            this.sharedFolder.forEach((item)=>{
              authorityIdArr.push(item.checkIndex);
            });
            return authorityIdArr.join(',');
          },
          checkEditValue () {//验证修改了值
            return JSON.stringify(this.sharedFolder)==JSON.stringify(this.saveOldSharedFolder);
          },
          async initListData (){
            await assign_compatible
            Object.assign(this.$data, this.$options.data.call(this));
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

