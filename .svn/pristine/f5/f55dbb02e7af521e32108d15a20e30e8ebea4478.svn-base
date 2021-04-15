import request from "@http/request";
/**
 * @Description: 小工具接口
 * @params:
 * @author kai
 * @date 2021/1/8 13:48
 */
export async function editToolsList (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/siteright/exit',
    method: 'put',
    params
  })
}
export async function toolsList (params) {
  // $.extend(params, {lang:localStorage.getItem("qvnas_language")});
  return request({
    url: '/siteright/list',
    method: 'get',
    params
  })
}
export async function getCurrentToolsList () {
  // let params={lang:localStorage.getItem("qvnas_language")};
  return request({
    url: '/siteright/user/list',
    method: 'get'
  })
}
