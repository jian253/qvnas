import request from "@http/request";

const headers = {
  'Content-Type': 'application/json'
}

/**
 * @Description: 用户相关
 * @author root
 * @date 2021/1/8 10:22
 */
export async function userDelete (data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data,
    headers
  })
}

export async function userEdit (data) {
  // if(params){
  //   $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  // }else{
  //   params={lang:localStorage.getItem("qvnas_language")};
  // }
  return request({
    url: '/user/edit',
    method: 'put',
    data,
    headers
  })
}

export async function addUser (data, params) {
  return request({
    url: '/user/insert',
    method: 'put',
    data,
    params,
    headers
  })
}

export async function getUserList (params) {
  return request({
    url: '/user/list',
    method: 'post',
    params
  })
}

/**
 * @Description: 修改权限
 * @author kai
 * @date 2021/2/22 19:15
 */
export async function modifyPermissions (params) {
  return request({
    url: '/user/role/info',
    method: 'put',
    params
  })
}


