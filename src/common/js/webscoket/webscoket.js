let webscoketApi = {
  //验证
  "connect": {"msg": "connect", "version": "1", "support": ["1"]},
  "auth-login": {
    "id": "47e25ede-7f40-94c2-852a-a2c22cd12262",
    "msg": "method",
    "method": "auth.login",
    "params": ["root", "zb2017"]
  },
  "user-query": {
    "id": "7b5db6b4-fc6e-a2da-a048-52208feb2510",
    "msg": "method",
    "method": "user.query",
    "params": [[["id", "=", 1]]]
  },
  "all": {"id": "1b3027c2-d4ec-3a3b-1dec-1332896d7cc4", "name": "*", "msg": "sub"},
  "auth-generate_token": {
    "id": "266384f3-56a2-587e-d5ac-9304a1391b73",
    "msg": "method",
    "method": "auth.generate_token",
    "params": [300]
  },
  "ready": {"msg": "ready", "subs": ["1b3027c2-d4ec-3a3b-1dec-1332896d7cc4"]},
  //取值 首页
  "system-is_freenas": {"id": "a89e64e5-c36c-fa80-1ca8-1c6326fe23af", "msg": "method", "method": "system.is_freenas"},
  "system-general-config": {
    "id": "a7fbd763-f9f0-6135-e647-bc3cf7126ad2",
    "msg": "method",
    "method": "system.general.config",
    "params": []
  },
  "ipmi-is_loaded": {"id": "818f513b-deb7-5fc8-689c-d338a6bc32be", "msg": "method", "method": "ipmi.is_loaded"},
  "multipath-query": {"id": "472003ed-8682-a94f-bd22-a26295da2569", "msg": "method", "method": "multipath.query"},
  "system-advanced-config": {
    "id": "b10b76de-4da3-8930-41fb-7c992c83c886",
    "msg": "method",
    "method": "system.advanced.config"
  },
  "interface-has_pending_changes": {
    "id": "952e9759-544c-600e-dc5d-1058ff9e7b11",
    "msg": "method",
    "method": "interface.has_pending_changes"
  },
  "interface-checkin_waiting": {
    "id": "3822dd12-363c-d0a3-5b41-10de2b56f563",
    "msg": "method",
    "method": "interface.checkin_waiting"
  },
  "directoryservices-get_state": {
    "id": "b92dba8e-af47-31d0-74c5-3ddb0d1d4b17",
    "msg": "method",
    "method": "directoryservices.get_state"
  },
  "interface-query": {"id": "c4ade11d-44fd-c4be-b487-bf96ccf0a19f", "msg": "method", "method": "interface.query"},
  "update-check_available": {
    "id": "bbcdf29e-630a-fa35-3ecc-182c08b06e1f",
    "msg": "method",
    "method": "update.check_available"
  },
  //取值 报告中
  "user-has_root_password": {
    "id": "f476fe67-366f-7fb2-b724-3e2b2ec80835",
    "msg": "method",
    "method": "user.has_root_password"
  },
  "reporting-graphs": {"id": "0b6ea91d-10bb-4924-9721-93bf94060111", "msg": "method", "method": "reporting.graphs"},
  //传值是当前时间戳 间隔3600  资源监控
  "reporting-get_data-cpu": {
    "id": "4c7260f7-3994-d8e7-d81d-7330159329e5",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "cpu"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-cpu-load": {
    "id": "4e70e5ce-b375-b4b1-5387-5b1b6ea6e914",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "load"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-cputemp": {
    "id": "83c21708-90de-407b-302e-52386a366e69",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "cputemp"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-disk": {
    "id": "fd17b335-59bb-b8b7-2801-cd93640b72f9",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "disktemp", "identifier": "ada0"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-memory": {
    "id": "9aac0dd9-b9cf-9f8d-7b11-e87c7c2bd02f",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "memory"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-memory-swap": {
    "id": "f772e519-0b7c-547c-f359-5551249740fa",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "swap"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-network": {
    "id": "7113196a-dc54-524f-ceb9-1bed6433ace0",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{
      "name": "interface",
      "identifier": 'igb0'
    }], {"start": (parseInt((new Date().getTime()) / 1000) - 3600), "end": (parseInt((new Date().getTime()) / 1000))}]
  },
  "reporting-get_data-nfs": {
    "id": "93d6f72a-61c4-2309-e24e-ae36d37f3e93",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "nfsstat"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-partition": {
    "id": "4571e03b-4650-a138-e7de-ed0cdef78b07",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "df", "identifier": "/"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-system": {
    "id": "c57249b8-dec3-7541-e8e3-2ab5fa86a513",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "processes"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-target": {
    "id": "a9727f4d-f7aa-3e0a-0493-0675f6f07744",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "ctl", "identifier": "tpc"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  "reporting-get_data-zfs": {
    "id": "098887d6-fa7e-ef82-eb6c-38a85c1a5f7d",
    "msg": "method",
    "method": "reporting.get_data",
    "params": [[{"name": "arcsize"}], {
      "start": (parseInt((new Date().getTime()) / 1000) - 3600),
      "end": (parseInt((new Date().getTime()) / 1000))
    }]
  },
  // 实时
  "system-health": {"id": "96ab42b2-eb23-4d98-8d16-810c14be5b84", "name": "system.health", "msg": "sub"},
  "reporting-realtime": {"id": "e164a2cb-6d4a-aaa4-7c2c-3b8d89965eb8", "name": "reporting.realtime", "msg": "sub"},
  //长期订阅的
  "alert-list": {"id": "fc2b186b-a719-ea65-64c7-affde5900ac1", "msg": "method", "method": "alert.list", "params": []},
  "alert-list-sub": {"id": "4cd677a4-7942-66c4-b69e-d58643768e25", "name": "alert.list", "msg": "sub"},
  //消息推送 解散
  "alert-dismiss": {
    "id": "369b953a-04c3-34e8-531b-1d74a98a4f32",
    "msg": "method",
    "method": "alert.dismiss",
    "params": ["30dfb127-ee0f-4e29-aa97-8b6fe5e01f93"]
  },
  //消息推送 恢复
  "alert-restore": {
    "id": "4362a6ee-23f9-230f-9cf4-8e395c3321da",
    "msg": "method",
    "method": "alert.restore",
    "params": ["26372b7c-c412-4014-8aba-301bcaf1f052"]
  },
  //取值 进程
  "token": {"token": "00ZG0YeuLcl2AXgS9vxhEu8FH6U5eZuaRYCz9rCLCg7dm0lhGRdNg6mmiG7XmxMZ"},
  "top": 'top',
  //心跳部分
  "ping": {"msg": "ping", "id": "ff1c99f7-f2ab-4ff5-63b7-9cde44bb7660"},
  "auth-token": {
    "id": "25f150ca-ed7a-a9e2-9a81-11082c3a6fcb",
    "msg": "method",
    "method": "auth.token",
    "params": ["00ZG0YeuLcl2AXgS9vxhEu8FH6U5eZuaRYCz9rCLCg7dm0lhGRdNg6mmiG7XmxMZ"]
  },
  //用户部分 返回错误
  "user-delete": {
    "id": "9fdc4eaa-ccce-d056-7fe5-3fb41d0ac284",
    "msg": "method",
    "method": "user.delete",
    "params": [58, {"delete_group": true}]
  },
  //未挂载的磁盘获取 返回错误
  "disk-get_unused": {
    "id": "e9218a55-907f-ff01-51d7-1568d8f3028b",
    "msg": "method",
    "method": "disk.get_unused",
    "params": []
  },
  //获取所有磁盘
  "disk-query": {"id": "dcd18314-9aae-2f10-13e4-e366f2411d93", "msg": "method", "method": "disk.query", "params": []},
  "disk_One_query": {// 获取某个池盘信息
    "id": "90b15bd8-a925-d797-aa13-fb401d4ee62d",
    "msg": "method",
    "method": "disk.query",
    "params": [[["name", "=", "sdd"]]]
  },
  //返回依赖于此池的服务列表 负责告诉用户是否有相关的共享，要求确认
  "system_advanced": {
    "id": "cf75129b-3eab-d846-14d3-95ff575a2125",
    "msg": "method",
    "method": "system.advanced.config"
  },
  //返回该池的服务
  "pool_attachments": {
    "id": "a574d138-06fa-7769-70dc-d1dbb370753c",
    "msg": "method",
    "method": "pool.attachments",
    "params": [1]
  },
  //返回使用此池的正在运行的进程的列表。
  "pool_processes": {
    "id": "72fdadf1-4d6c-1f63-8ca8-f01b07fa705c",
    "msg": "method",
    "method": "pool.processes",
    "params": [1]
  },
  //删除池 //是否销毁池中的数据   是否消除池相关的数据
  "pool_export": {
    "id": "ef8a7ec5-84ea-7937-1de8-62fb49ce300b",
    "msg": "method",
    "method": "pool.export",
    "params": [1, {"destroy": true, "cascade": true, "restart_services": false}]
  },
  //获取池名称配置信息
  "systemdataset_config": {
    "id": "e5a52a8b-6ebf-8cdc-41d2-b7d06d076596",
    "msg": "method",
    "method": "systemdataset.config"
  },
  //获取存储集
  "pool-dataset_query": {
    "id": "3ba1a3e5-8492-7008-2309-8e2eb736aaa9",
    "msg": "method",
    "method": "pool.dataset.query",
    "params": []
  },
  //获取所有池
  "pool-query": {"id": "54f900fd-78ac-3d01-7ae5-485831e5b5f4", "msg": "method", "method": "pool.query", "params": []},
  //获取池对应id下面挂载的池盘
  "pool-get_disks": {
    "id": "5281cbb9-3722-04dc-cf16-808fe4876d29",
    "msg": "method",
    "method": "pool.get_disks",
    "params": [8]
  },//获取池id为8下面挂载的池盘
  //创建池
  "pool_create": {
    "id": "e873eeff-8cb9-0a56-dd5c-8436c2f6acba",
    "msg": "method",
    "method": "pool.create",
    "params": [{"name": "b", "encryption": false, "topology": {"data": [{"type": "STRIPE", "disks": ["sdb"]}]}}]
  },
  //获取网络信息
  "network-general-summary": {
    "id": "804aac71-d50a-dd9d-4b97-f54632fa52e3",
    "msg": "method",
    "method": "network.general.summary",
    "params": []
  },
  //获取nas系统信息
  "system-info": {"id": "f206b449-094a-d6dd-1a3e-1b19ec3e52ce", "msg": "method", "method": "system.info"}
};
let webscoketIndexApi = {
  //验证
  "user-query": {
    "id": "7b5db6b4-fc6e-a2da-a048-52208feb2510",
    "msg": "method",
    "method": "user.query",
    "params": [[["id", "=", 1]]]
  },
  "all": {"id": "1b3027c2-d4ec-3a3b-1dec-1332896d7cc4", "name": "*", "msg": "sub"},
  "auth-generate_token": {
    "id": "266384f3-56a2-587e-d5ac-9304a1391b73",
    "msg": "method",
    "method": "auth.generate_token",
    "params": [86400000]
  },
  "ready": {"msg": "ready", "subs": ["1b3027c2-d4ec-3a3b-1dec-1332896d7cc4"]},
  "interface-query": {"id": "cb695ba4-2487-946c-dc77-c8a01f7fbb13", "msg": "method", "method": "interface.query"},
  // 实时
  "system-health": {"id": "96ab42b2-eb23-4d98-8d16-810c14be5b84", "name": "system.health", "msg": "sub"},
  "reporting-realtime": {"id": "e164a2cb-6d4a-aaa4-7c2c-3b8d89965eb8", "name": "reporting.realtime", "msg": "sub"},
  "alert-list": {"id": "fc2b186b-a719-ea65-64c7-affde5900ac1", "msg": "method", "method": "alert.list", "params": []},
  "alert-list-sub": {"id": "4cd677a4-7942-66c4-b69e-d58643768e25", "name": "alert.list", "msg": "sub"},
};
let webSocketHeartApi = {
  //心跳部分
  "ping": {"msg": "ping", "id": "ff1c99f7-f2ab-4ff5-63b7-9cde44bb7660"},
  "auth-token": {
    "id": "25f150ca-ed7a-a9e2-9a81-11082c3a6fcb",
    "msg": "method",
    "method": "auth.token",
    "params": ["W269SDdWaOIGWLt42Wlp1LBjbhFBI9iu20WhRo8a31XOyduA07psdBdTIS3UxqhE"]
  },
}
let webSocketProcessApi = {
  //取值 进程
  "token": {"token": "W269SDdWaOIGWLt42Wlp1LBjbhFBI9iu20WhRo8a31XOyduA07psdBdTIS3UxqhE"},
  "top": 'top'
}

function getRandomArrayElements (count) {
  let arr = ['a', 'b', 'c', 'd', 'e', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return (shuffled.slice(min)).join("");
}

function getRandomId () {
  return getRandomArrayElements(8) + "-" + getRandomArrayElements(4) + "-" + getRandomArrayElements(4) + "-" + getRandomArrayElements(4) + "-" + getRandomArrayElements(12);
}


for (let key in webscoketApi) {
  if (webscoketApi[key].id != undefined) {
    webscoketApi[key].id = getRandomId();
  }
}
for (let key in webscoketIndexApi) {
  if (webscoketIndexApi[key].id != undefined) {
    webscoketIndexApi[key].id = getRandomId();
  }
}
for (let key in webSocketProcessApi) {
  if (webSocketProcessApi[key].id != undefined) {
    webSocketProcessApi[key].id = getRandomId();
  }
}

for (let key in webSocketHeartApi) {
  if (webSocketHeartApi[key].id != undefined) {
    webSocketHeartApi[key].id = getRandomId();
  }
}
export {webSocketProcessApi, webSocketHeartApi, webscoketApi, webscoketIndexApi};

//system.environment 可能是磁盘进程



