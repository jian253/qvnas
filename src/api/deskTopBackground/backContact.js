import request from "@http/request";
const headers={
  'Content-Type': 'application/json'
}
/**
 * @Description: 背景图片管理
 * @params:
 * @author kai
 * @date 2021/1/8 11:03
 */

//图片上传
export async function updateFileFun (params, _this) {
  let fd = new FormData();
  fd.append('file', params.file);//传文件
  return request({
    url: '/upload/fileImg',
    method:'post' ,
    data: fd,
    onUploadProgress: function (progressEvent) {
      //(progressEvent.loaded / progressEvent.total * 100 | 0) - 1		//上传进度百分比
    }
  })
}

//图片列表查询
//data json 字符串   params 通常get 请求 加载连接地址后面
export async function historyImgListFun (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/userbackdropimg/list',
    method: 'GET',
    params,
    headers
  })
}


//图片删除(单个)
export async function historyImgDeleteFun (params) {
  return request({
    url: '/userbackdropimg/del',
    method: 'DELETE',
    params,
    headers
  })
}


//背景图片设置
export async function UpdateBackImgFun (data) {
  return request({
    url: '/userbackdropimg/user/setUp',
    method: 'PUT',
    data,
    headers
  })
}
