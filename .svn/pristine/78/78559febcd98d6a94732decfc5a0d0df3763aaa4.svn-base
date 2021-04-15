import request from "@http/request";

const headers = {
  'Content-Type': 'application/json'
}

/**
 * @Description: 文件夹相关
 * @params:
 * @author kai
 * @date 2021/1/8 10:59
 */
export async function folderCreate (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/folder/create',
    method: 'put',
    params
  })
}

export async function folderMenu (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/folder/menu',
    method: 'get',
    params
  })
}

export async function folderRemove (params) {
  return request({
    url: '/folder/remove',
    method: 'delete',
    params
  })
}

export async function folderUpdate (data) {
  return request({
    url: '/folder/update?lang='+localStorage.getItem("qvnas_language"),
    method: 'put',
    data,
    headers
  })
}

export async function folderPath (params) {
  // params.lang=localStorage.getItem("qvnas_language")
  return request({
    url: '/path/folder',
    method: 'get',
    params
  })
}
