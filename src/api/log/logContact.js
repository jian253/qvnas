import request from "@http/request";

const headers = {
  'Content-Type': 'application/json'
}

/**
 * @Description: 日志模块
 * @author root
 * @date 2021/1/8 10:30
 */
export async function logCount () {
  // let params={lang:localStorage.getItem("qvnas_language")};
  return request({
    url: '/count',
    method: 'get'
    // , params
  })
}

export async function logDelete (data, params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/delete',
    method: 'post',
    data,
    params,
    headers
  })
}

export async function logList (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/log/list',
    method: 'get',
    params
  })
}
