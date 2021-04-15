import request from "@http/request";
const headers = {
  'Content-Type': 'application/json'
}

/**
 * @Description: 菜单相关
 * @params:
 * @author kai
 * @date 2021/1/8 11:13
 */
export async function controlPanelMenuSearch (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/menu/list/byName',
    method: 'get',
    params
  })
}

export async function getDeskTopMenuList () {
  // let params={lang:localStorage.getItem("qvnas_language")};
  return request({
    url: '/menuTree/list',
    method: 'post'
  })
}

export async function deskTopMenuMove (data) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/menuTree/sort/edit',
    method: 'put',
    data,
    headers
    // data: params,

  })
}
