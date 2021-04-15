import request from "@http/request";

const headers = {
  'Content-Type': 'application/json'
}

/**
 * @Description: 阵列相关
 * @params:
 * @author kai
 * @date 2021/1/8 11:17
 */
export async function addArray (data) {
  return request({
    url: '/array/add',
    method: 'put',
    data
  })
}

export async function deleteArray (data) {
  return request({
    url: '/array/del',
    method: 'put',
    data
  })
}

export async function arrayList () {
  // $.extend(params,{lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/array/list',
    method: 'get'
  })
}

export async function diskList () {
  // $.extend(params,{lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/disk/list',
    method: 'get'
  })
}
