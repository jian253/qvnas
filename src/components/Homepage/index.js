//桌面图标路径
export let deskTopIcon = [{
  id: "4",
  url: '/static/images/desktop/storage_manager_64.png',
  url1: '/static/images/desktop/storage_manager_32.png',
  isStyle: false
}, {
  id: "1",
  url: '/static/images/desktop/ControlPanel_64.png',
  url1: '/static/images/desktop/ControlPanel_32.png',
  isStyle: false,
  children: [{
    menuId: "102",
    url: "static/images/controlPanel/users.png"
  }, {
    menuId: "101",
    url: "static/images/controlPanel/file_services.png"
  }, {
    menuId: "104",
    url: "static/images/controlPanel/info_center.png "
  }, {
    menuId: "103",
    url: "static/images/controlPanel/network.png"
  }]
}, {
  id: "5",
  url: '/static/images/desktop/log_center_64.png',
  url1: '/static/images/desktop/log_center_32.png',
  isStyle: false
}, {
  id: "6",
  url: '/static/images/desktop/station_manager_64.png',
  url1: '/static/images/desktop/station_manager_64.png',
  isStyle: false
}
  , {
    id: "2",
    url: '/static/images/desktop/file_browser_64.png',
    url1: '/static/images/desktop/file_browser_32.png',
    isStyle: false
  }, {
    id: "3",
    url: '/static/images/desktop/resource_monitor_64.png',
    url1: '/static/images/desktop/resource_monitor_32.png',
    isStyle: false
  }]
export let mainMenuIcon = [
  {
    id: "1",
    isParent: false,
    url: '/static/images/desktop/quick_start_icon_videostation-05.png',
    text: "暴风影音",
    inputText: 'New Group',
    saveArray: []
  },
  {
    id: "2",
    url: '/static/images/desktop/quick_start_icon_synologydrive-0.png',
    text: "大大",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
  {
    id: "3",
    url: '/static/images/desktop/quick_start_icon_surveillancesta.png',
    text: "媒体查询",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
  {
    id: "4",
    url: '/static/images/desktop/quick_start_icon_mediaserver-050.png',
    text: "小小",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
  {
    id: "5",
    url: '/static/images/desktop/entry.png',
    text: "放大镜",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
  {
    id: "6",
    url: '/static/images/desktop/file_browser_72.png',
    text: "文件夹",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
  {
    id: "7",
    url: '/static/images/desktop/package_center_64.png',
    text: "商店",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
  {
    id: "8",
    url: '/static/images/desktop/ez_internet_72.png',
    text: "浏览器",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
  {
    id: "9",
    url: '/static/images/desktop/ControlPanel_64.png',
    text: "控制面板",
    inputText: 'New Group',
    isParent: false,
    saveArray: []
  },
]
//控制面板图标
export let controlPanelIcon = [
  {
    menuId: "102",
    path: '/static/images/controlPanel/users.png',
    category: 1,
    show: false
  }, {
    menuId: "104",
    path: '/static/images/controlPanel/info_center.png',
    category: 2,
    show: false
  }, {
    menuId: "103",
    path: '/static/images/controlPanel/network.png',
    category: 3,
    show: false
  }, {
    menuId: "101",
    path: '/static/images/controlPanel/file_services.png',
    category: 1,
    show: false
  }
  // , {
  //   menuId: "105",
  //   path: '/static/images/controlPanel/update_and_reset.png',
  //   category: 4,
  //   show: false
  // }
]
