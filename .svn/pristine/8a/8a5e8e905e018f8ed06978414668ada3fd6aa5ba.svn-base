import request from "@http/request";

/**
 * @Description: 登陆相关
 * @author root
 * @date 2021/1/8 10:21
 */
export async function Login (params) {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}

export async function userCheck (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/login/check',
    method: 'post',
    params
  })
}

export async function getUser (data) {
  // let params={lang:localStorage.getItem("qvnas_language")};
  return request({
    url: '/user/getUser',
    method: 'post',
    data
  })
}

export async function sysInfo (params) {
  return request({
    url: '/sys/info',
    method: 'post',
    params
  })
}
