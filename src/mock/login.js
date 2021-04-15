//获取系统采集站的地址
let getSysInfo={"msg":"192.168.3.19","code":200};

//登录信息返回值
let login={
  "msg": "token",
  "code": 200,
  "data": "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijk5MThkMDg3LWEzMjYtNGQ5Mi05YmU3LThjZjU1Zjk4ZDcwMiJ9.sRzGO9SOJWHuf9k0El8cHMFFq4lZ9jqVtVgDVRUD-Ml52bhlzESXS2n5WJqcorW5Ku3AtMziq5sdxr7T0P7cxA"
};

//获取当前登录用户的信息
let getUserInfo={
  "msg": "Success",
  "code": 200,
  "data": {
    "token": "9918d087-a326-4d92-9be7-8cf55f98d702",
    "loginTime": 1618449857771,
    "expireTime": 1618451657771,
    "ipaddr": "192.168.3.82",
    "loginLocation": "内网IP",
    "browser": "Chrome 8",
    "os": "Windows 10",
    "user": {
      "userId": 2,
      "userName": "root",
      "nickName": "root",
      "userType": "00",
      "email": "1775765534@qq.com",
      "phonenumber": "",
      "sex": "0",
      "avatar": "",
      "password": "123456",
      "status": 0,
      "delFlag": 1,
      "loginIp": "192.168.3.82",
      "loginDate": "2021-04-15T01:24:18.000+0000",
      "createBy": "",
      "createTime": "2020-09-08T01:17:54.000+0000",
      "updateBy": "",
      "updateTime": "2020-09-08T01:18:00.000+0000",
      "remark": "admin",
      "userLanguage": "null",
      "id": null,
      "customColor": 0,
      "textColor": "#F7EFEF",
      "backgroundColor": "#378893",
      "customWallpaper": 0,
      "wallpaperPath": "/api/image/home/user/file/backdropImg/aa_1617691453273.png",
      "fillSelection": 0,
      "admin": false
    },
    "userRoleList": [{
      "userId": 2,
      "authorityId": 2
    },
      {
        "userId": 2,
        "authorityId": 2
      },
      {
        "userId": 2,
        "authorityId": 2
      },
      {
        "userId": 2,
        "authorityId": 2
      }],
    "authorities": null,
    "username": "root"
  }
};
export default {
  'post|/sys/info':getSysInfo,
  'post|/login': login,
  'post|/user/getUser':getUserInfo,

}
