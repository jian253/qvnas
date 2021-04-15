//工具栏列表获取
let siterRightList ={
  "msg": "Success",
  "code": 200,
  "data": [{
    "id": 1,
    "siteRightUsername": "系统状况",
    "isSelected": "1"
  },
    {
      "id": 2,
      "siteRightUsername": "存储信息",
      "isSelected": "1"
    },
    {
      "id": 3,
      "siteRightUsername": "最新日志",
      "isSelected": "1"
    },
    {
      "id": 4,
      "siteRightUsername": "资源监控",
      "isSelected": "1"
    }]
};

//获取工具栏最新日志列表  (存在分页)
let logLasterList={
  "msg": "Success",
  "code": 200,
  "data": {
    "total": 6538,
    "list": [{
      "logId": 133334,
      "logEnevt": "user.info.load",
      "logType": 2,
      "userId": 2,
      "logDate": "2021-04-15T06:22:10.000+0000",
      "requestIp": "192.168.3.82",
      "serverIp": "127.0.0.1",
      "action": 1,
      "logLevel": 1,
      "logDetails": "search.success"
    },
      {
        "logId": 133335,
        "logEnevt": "query.menu",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:22:10.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133336,
        "logEnevt": "log.list",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:22:10.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133333,
        "logEnevt": "query.file.list",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:12.000+0000",
        "requestIp": "192.168.3.180",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133332,
        "logEnevt": "folder.tree.list",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:11.000+0000",
        "requestIp": "192.168.3.180",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133329,
        "logEnevt": "user.info.load",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:06.000+0000",
        "requestIp": "192.168.3.180",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133330,
        "logEnevt": "query.menu",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:06.000+0000",
        "requestIp": "192.168.3.180",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133331,
        "logEnevt": "log.list",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:06.000+0000",
        "requestIp": "192.168.3.180",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133326,
        "logEnevt": "user.info.load",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:00.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133327,
        "logEnevt": "query.menu",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:00.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133328,
        "logEnevt": "log.list",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:21:00.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133323,
        "logEnevt": "user.login",
        "logType": 2,
        "userId": null,
        "logDate": "2021-04-15T06:20:58.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 3,
        "logDetails": "Success:root"
      },
      {
        "logId": 133324,
        "logEnevt": "user.info.load",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:20:58.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "search.success"
      },
      {
        "logId": 133325,
        "logEnevt": "user.update",
        "logType": 2,
        "userId": 2,
        "logDate": "2021-04-15T06:20:58.000+0000",
        "requestIp": "192.168.3.82",
        "serverIp": "127.0.0.1",
        "action": 1,
        "logLevel": 1,
        "logDetails": "operat.success"
      }],
    "pageNum": 1,
    "pageSize": 14,
    "size": 14,
    "startRow": 1,
    "endRow": 14,
    "pages": 467,
    "prePage": 0,
    "nextPage": 2,
    "isFirstPage": true,
    "isLastPage": false,
    "hasPreviousPage": false,
    "hasNextPage": true,
    "navigatePages": 5,
    "navigatepageNums": [1, 2, 3, 4, 5],
    "navigateFirstPage": 1,
    "navigateLastPage": 5,
    "firstPage": 1,
    "lastPage": 5
  }
};

export {siterRightList,logLasterList};

