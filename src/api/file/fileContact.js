import request from "@http/request";

// const headers = {
//   'Content-Type': 'application/json'
// }

/**
 * @Description: 文件相关
 * @author root
 * @date 2021/1/8 10:35
 */
export async function fileCheck (params) {
  // let params={lang:localStorage.getItem("qvnas_language")};
  return request({
    url: '/file/check',
    method: 'get',
    params
  })
}

export async function fileDelete (params) {
  return request({
    url: '/file/delete',
    method: 'delete',
    params
  })
}

export async function fileDownload (params) {
  //'http://192.168.3.131:9001/image/home/user/file/root/test003/0000000@2020050722574110_1610113020199.mp4'
  return request({
    url: '/image/home/user/file/root/test003/0000000@2020050722574110_1610113020199.mp4',
    method: 'get',
    headers: {
      'Content-Type': 'application/force-download',
      "Content-disposition": 'attachment;fileName=0000000@2020050722574110_1610113020199.mp4'
    }
  })
}

export async function fileFind (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/file/find',
    method: 'get',
    params
  })
}

export async function fileList (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/file/list',
    method: 'get',
    params
  })
}

export async function fileUpdate (data) {
  // let params={lang:localStorage.getItem("qvnas_language")};
  return request({
    url: '/file/update',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 文件上传
 * @param params 上传对象
 * @param _this
 * @param Context 是否点击右击树和按钮上传
 * @returns {Promise<void>}
 */
export async function updateFile (params, _this, Context, source) {
  // debugger
  let nowIndex = new Date().getTime();
  if (_this.fileSize < 1) {
    _this.saveUploadFileList.push({
      index: nowIndex,
      file: params.file,
      status: 0,
      persent: 0
    });
  }
  let getNowObj = null
  // return
  let node = _this.$refs.treeRef.getCurrentNode()
  let path
  if (Context) {//按钮又右击树的上传路径
    path = _this.rightClickPath(node.menuId)
    _this.uploadedFolder = node
  } else {//表格上传的路径
    if (_this.uploadedFolder.trueFile) {
      path = _this.rightClickPath(node.menuId)
      _this.uploadedFolder = node
    } else {
      path = _this.rightClickPath(_this.uploadedFolder.menuId)
    }
  }
  let fd = new FormData();
  fd.append('file', params.file);//传文件
  fd.append('filePath', path);//传projectI
  fd.append('parentId', _this.uploadedFolder.parentId);//传projectI
  request({
    url: '/upload/file',
    method: 'post',
    data: fd,
    timeout: 1000000, // 请求超时时长
    onUploadProgress: function (progressEvent) {
      for (let i = 0; i < _this.saveUploadFileList.length; i++) {
        if (_this.saveUploadFileList[i].index == nowIndex) {
          getNowObj = _this.saveUploadFileList[i];
          break;
        }
      }
      getNowObj.source = source
      getNowObj.status = 1;
      getNowObj.persent = (progressEvent.loaded / progressEvent.total * 100 | 0) - 1		//上传进度百分比
      //上传进度百分比
      _this.$EventBus.$emit('fileListChange', _this.saveUploadFileList)
    },
    cancelToken: source.token
  }).then(res => {
    if (res.data.code != 200 || res.status && res.status == 400) {
      _this.isLoad = false
      _this.isShowFolderLoad = false
      _this.errorMessage = '文件上传失败!'
      _this.showWarning = true
      getNowObj.status = 2;
    } else if (res.data.code == 200) {
      getNowObj.persent = 100
      getNowObj.status = 3;
      _this.$EventBus.$emit('fileListChange', _this.saveUploadFileList);
      if (node.path == path) {
        _this.partialRefresh()
      }
    }
    _this.$emit('NewUploadDialog', 0)
  }).catch(error => {
    console.log('取消上传了')
  })

}

// headers{
//   'Content-Type': 'multipart/form-data'
// }
