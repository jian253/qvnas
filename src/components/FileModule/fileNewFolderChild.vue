<template>
  <div class="2_child child2"  v-if="show_child_Dialog">
    <!--请输入文件夹名称-->
    <div class="text" v-if="folderParams.newNameOrNewFolder=='NewName'">{{$t('reminder.newName')}}：</div><!--请输入新的名称-->
    <div class="text" v-else>{{$t('reminder.newFolder')}}：</div><!--请输入文件夹名称-->
    <el-form :model="fileInput" ref="loginForm" label-position='right'
             class="login-form" autocomplete="off" @submit.native.prevent>
      <el-form-item prop="username">
        <el-input ref="inputRef" v-model="fileInput.value" class="input-style" @input="inputChange" @keyup.enter.native="determineEvent($event)"></el-input>
      </el-form-item>
    </el-form>
    <div class="massageStyle">{{massage}}</div>
    <div class="FolderBtnBox">
      <gl-button-style size="medium" type="blue" @click="determineEvent($event)">{{$t('common.yes')}}
      </gl-button-style>
      <gl-button-style size="medium" type="white" @click="cancelEvent($event)">{{$t('common.no')}}
      </gl-button-style>
    </div>
  </div>
</template>

<script>
  import {fileUpdate} from'@api/file/fileContact'
  import {folderCreate,folderUpdate} from'@api/folder/folderContact'
  import {rightToJudge, sharedFolderInvalid, sharedParentId, sharingProhibited} from "@common/js/authority/Authority"
  import {mapState} from 'vuex'
  let _this=''
  export default {
    props:{
      folderParams:{
        type:Object
      }
    },
    components: {},
    data: function () {
      return {
        sharedFolder: [], //1  2  3 禁止 可读写 只读 this.$store.state.currentAuthorityList
        massage: '',
        nodeData: null,
        path: null,
        Request: null,
        Rename: null,//用来判断是命名操作 等于1说明是文件重命名操作
        CurrentNode: null,//当前tree选中的节点 在其目录下创建文件，也就是右击图标list当前创建
        flag:null,
        fileInput:{//文件input输入框
          value:''
        }
      }
    },
    computed: {
      ...mapState('Dialog',{
        show_child_Dialog:state=>state.childDialog.fileManage_child_Panel
      }),
      ...mapState({
        currentAuthority:state=> state.currentAuthorityList,
        sharedParentId:state=>state.AuthorityParentId
      })
    },
    watch: {
      show_child_Dialog:function (value) {
        if (value){
          this.sharedFolder=this.currentAuthority
          this.focusEvent()
        }
      }
    },
    methods: {
      //判断字符串的文件名字节长度
      getByteLength (str='') {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
          } else {
            len++;
          }
        }
        return len;
      },
      inputChange (data) {
        if (data.trim().length > 0) {
          // this.massage=''
          this.massage = ''
            $(this.$refs.inputRef.$el.children[0]).css('border','1px solid #DCDFE6')
          // this.$refs.inputRef.$refs.input.style = 'border:1px solid #DCDFE6'
        }
      },
      focusEvent (e) {
        this.$nextTick(() => {
        this.$refs.inputRef.focus()
        if (this.folderParams.newNameOrNewFolder =='NewFolder'){//新建文件夹
          this.fileInput.value=''
        }else {//重命名
          if (this.folderParams.uploadedFolder.trueFile===true){
            this.fileInput.value = this.folderParams.uploadedFolder.fileName
            this.selectText()
          }else {
            this.fileInput.value = this.folderParams.uploadedFolder.folderName
            this.$nextTick(function () {
              this.$refs.inputRef.select()
            })
          }
        }

        })
      },
      // //只读权限判断  3不允许 删除 修改 上传
      // rightToJudge (data) {
      //   let Find = ['video', 'photo', 'audio', 'other']
      //   let paths=null
      //   let path=null
      //   if (data.trueFile){
      //     paths = JSON.parse(JSON.stringify(data.path)).substr(15, 7)//截取路径 '/shared'
      //     path = JSON.parse(JSON.stringify(data.path)).substr(23, 5)//截取路径 ''
      //   }else {
      //     paths =JSON.parse(JSON.stringify(data.path)).substr(0, 7)
      //     path = JSON.parse(JSON.stringify(data.path)).substr(8, 5)
      //   }
      //   let index = Find.indexOf(path)
      //   return !(paths == '/shared' && this.sharedFolder[index] === 3);
      // },
      // //防止共享文件夹被删除  禁止在/shared新建文件夹  上传文件到共享文件目录下不需要此操作
      // sharedFolderInvalid (data) {
      //   const menuId=['752','753','754','755']
      //   return menuId.includes(data.menuId)
      //   // data.menuId
      // },
      //确定事件  //1.右击对象 //右击的路径 //是否在当前目录下创建1为是  //重新命名文件夹或文件  1为文件重命名
      async determineEvent (e) {
        if (this.fileInput.value.trim().length == 0) {
          this.massage =this.$t('reminder.nameError') /*'文件或文件夹名称不可为空'*/
          $(this.$refs.inputRef.$el.children[0]).css('border-color','red')
          return
        }
        if ( this.getByteLength(this.fileInput.value)>=40){
          this.massage = this.$t('reminder.uploadFileError')/*'文件或文件夹名称不能大于40字节'*/
          $(this.$refs.inputRef.$el.children[0]).css('border-color','red')
          return
        }
        if (rightToJudge(this.folderParams.uploadedFolder,this)==false){
          this.$EventBus.$emit('folderError',this.$t('reminder.authority'))/*没有权限新增文件夹*/
          this.cancelEvent(e)
          return
        }
        if (this.folderParams.newNameOrNewFolder =='NewName') {//重命名操作
          if (sharedFolderInvalid(this.folderParams.uploadedFolder)||sharingProhibited(this.folderParams.uploadedFolder)){
            this.$EventBus.$emit('folderError',this.$t('reminder.sharedError'))/*共享文件夹不支持修改*/
            this.closeDialog(e.target)
            return
          }
          var regExpress = /[<>:*?|;。，&=#/]/;
          if (regExpress.test(this.fileInput.value)) {
            return this.massage = `${this.$t('reminder.nameRex')}<>:*?|;。，&=#/`/*名称不允许包含右侧任意字符*/
          }
          if (this.folderParams.uploadedFolder.trueFile === false) {//重命名文件夹
            let params = {
              "folderName": this.fileInput.value,
              "memo": "",
              "menuId": this.folderParams.uploadedFolder.menuId,
              "parentId": this.folderParams.uploadedFolder.parentId,
              "path": this.$options.filters['pathSuffix'](this.folderParams.uploadedFolder.path),//局部使用过滤器
              "userId": 2,
              "type":1
            }
            let {data: res} = await folderUpdate(params)
            if (res.code != 200||res.code == 401||res.code == 500) {//重名名成功刷新当前页面
              this.$EventBus.$emit('folderError',this.$t('reminder.newNameError'))/*重命名失败*/
            }else {
              res.data.trueFile = false
              res.data.children = []
              this.$emit('RenameEvents', res.data, 1) //1文件夹
            }
            this.closeDialog(e.target)
          } else {//重命名文件
            let params = {
              "callTime": this.folderParams.uploadedFolder.callTime,
              "creationTime": this.folderParams.uploadedFolder.creationTime,
              "fileExt":this.filterSuffix(this.fileInput.value),
              "fileId": this.folderParams.uploadedFolder.fileId,
              "fileName": this.fileInput.value,
              "filePath": this.folderParams.uploadedFolder.filePath,
              "fileSize": this.folderParams.uploadedFolder.fileSize,
              "logicDir": this.folderParams.uploadedFolder.logicDir,
              "ofileName": this.folderParams.uploadedFolder.fileName,
              "updateTime": "",
              "userId": 2
            }
            let {data: res} = await fileUpdate(params)
            if (res.code === 200) {
              this.$emit('RenameEvents', params, 0)//null文件
            }
            if (res.code!=200){
              this.$EventBus.$emit('folderError',this.$t('reminder.newNameError'))/*重命名失败*/
            }
            this.closeDialog(e.target)
          }
        } else {//新建文件夹操作
          var regExpress = /[<>:*?|;。，&=#/]/;
          if (regExpress.test(this.fileInput.value)) {
            return this.massage = `${this.$t('reminder.nameRex')}<>:*?|;。，&=#/`/*名称不允许包含右侧任意字符*/
          }
          let folderId=null
          let folderPath=null
          if (this.folderParams.flag==1){//右击的是el-tree 在当前目录下创建文件夹  这里少了判断，如果没有表格没有选中root
            folderId= JSON.parse(this.folderParams.uploadedFolder.menuId)
            folderPath=this.folderParams.uploadedFolder.path
          }else {//右击的表格 当前目录创建
            if (this.folderParams.uploadedFolder.trueFile){//是文件
              folderId= JSON.parse(this.folderParams.node.menuId)
              folderPath=this.folderParams.node.path
            }else{
              folderId= JSON.parse(this.folderParams.uploadedFolder.parentId)
              folderPath=this.pathFilter(this.folderParams.uploadedFolder.path)
             // console.log(folderPath)
            }
          }
          if (folderId==0){
            this.$EventBus.$emit('folderError',this.$t('reminder.newNameErrorRex'))/*当前新建文件父文件夹id不能为0!*/
          }
          if (folderId==this.sharedParentId){
            this.$EventBus.$emit('folderError',this.$t('reminder.sharedError'))/*不支持在共享文件夹新建文件夹*/
            this.closeDialog()
            return
          }
          let {data: res} = await folderCreate({
            filePath:folderPath,
            folderName:this.fileInput.value,
            parentId:folderId,
            userId:2
          })
          // this.$http.put('/folder/create?filePath=' + folderPath + '&folderName=' + this.fileInput.value + '&parentId=' + folderId + '&userId=' + "2")
          if (res.code === 1004) {
            this.massage = res.msg
            return
          }
          if (res.code === 200) { //判断
            res.data.menuId=JSON.stringify(res.data.menuId)
            res.data.parentId=JSON.stringify(res.data.parentId)
            res.data.trueFile = false
            res.data.children = []
            res.data.fileName = res.data.folderName
            this.$EventBus.$emit('successFolder',res.data,this.folderParams.flag)
          }
          if (res.code!==200||res.code===401){
            this.$EventBus.$emit('folderError',this.$t('reminder.createFolderError'))/*新建文件夹失败*/
          }
          this.cancelEvent(e)
        }
      },
      //取消事件
      cancelEvent (e) {
        $(this.$refs.inputRef.$el.children[0]).css('border-color','#409EFF')
        this.massage = ''
        this.closeDialog(e.target)
      },
      //关闭弹框
      closeDialog () {
        const menuId = '2_child'
        $("." + menuId).PopupWindow("close");//关闭弹框
      },
      //选中inpu指定文本
      selectText () {
        let obj=this.$refs.inputRef.$el.children[0]
        // console.log(obj)
        // if (this.folderParams.uploadedFolder.trueFile==true){
          this.$nextTick(() => {
            // 必须把输入框类型转化为 text，否则无法选取。（ERROR：selectionStart/selectionEnd on input type=“number” no longer allowed in Chrome）
            const input_type = obj.type;
            obj.type = 'text';
            obj.selectionStart = 0; // 选中开始位置
            obj.selectionEnd = this.fileInput.value.lastIndexOf(".")// 选中尾位置
            obj.type = input_type;// 获得焦点后，改回number类型
          })
        // }
      },
      //过滤后缀
      filterSuffix(value){
        //console.log(value)
        let str=value.lastIndexOf(".")
        let result=value.substr(str+1)
        //console.log(result)
        return result
      },
      pathFilter(path){
        let index=path.lastIndexOf('/')
        return path.substring(0,index)
      }
    },
    filters: {
      pathSuffix(value){
        let path= value.lastIndexOf('/')//查找字符最后一个'/'index的位置
        return  value.substring(0,path)+'/'+_this.fileInput.value
      },
    },
    mounted () {
      _this=this
    },
    destroyed () {
      this.$EventBus.$off('successFolder')
    }
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @{deep} .el-input__inner {
    width: 460px;
  }

  .child2 {
    box-sizing: border-box;
    overflow: hidden;

    .text {
      font-size: 12px;
      color: #505A64;
      padding: 5px 20px;
    }

    .input-style {
      margin: 5px 40px 0 20px;
    }
    .login-form @{deep}.el-form-item{
      margin-bottom: 0;
    }
    .massageStyle {
      padding-left: 20px;
      font-size: 12px;
      color: red;
    }
    /*新建文件夹按钮样式*/
    .FolderBtnBox{
      position: absolute;
      bottom: 12px;
      right: 12px;
    }

  }

</style>
