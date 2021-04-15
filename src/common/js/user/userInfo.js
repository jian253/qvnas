/**
 * @Description: 只用户新增用户 不用于编辑用户  编辑当前用户直接调vuex对象
 * @author kai
 * @date 2021/2/4 11:50
 */
export function userObj (params){
  // console.log(params)
  return {
    "admin":true,
    "avatar":"",
    "backgroundColor":"#fff",
    "createBy":"",
    "createTime":"",
    "customColor":0,
    "customWallpaper":0,
    "delFlag":params.delFlag,
    "email":params.email,
    "fillSelection":0,
    "id":null,
    "loginDate":"",
    "loginIp":"",
    "nickName":params.userName,
    "password":params.password,
    "phonenumber":"",
    "remark":params.remark,
    "sex":"0",
    "status":params.accountStatus==true?'1':'0'||params.accountStatus,
    "textColor":"#fff",
    "updateBy":"",
    "updateTime":"",
    "userId":params.userId,
    "userLanguage":localStorage.getItem("qvnas_language"),
    "userName":params.userName,
    "userType":"00",
    "wallpaperPath":"/static/images/desktop_bg/backImg_02.jpg"
  }
}
