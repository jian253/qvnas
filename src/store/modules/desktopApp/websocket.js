import {PageInfo} from "@common/js/resources"
import {mergeDelete_pool_Data, poolData} from "@common/js/storage";
import {assign_compatible} from "@common/js/publicMethod/publicMethod";

const state = {
  "auth_login": null,//验证
  "user_query": null,
  "all": null,
  "auth_generate_token": null,
  "ready": null,
  //取值 首页
  "system_is_freenas": null,
  "system_general_config": null,
  "ipmi_is_loaded": null,
  "multipath_query": null,
  "system_advanced_config": null,
  "interface_has_pending_changes": null,
  "interface_checkin_waiting": null,
  "directoryservices_get_state": null,
  "interface_query": null,
  "update_check_available": null,
  //取值 报告中
  "user-has_root_password": null,
  "reporting_graphs": null,
  //传值是当前时间戳 间隔3600  资源监控
  "reporting_get_data_cpu": null,
  "reporting_get_data_cpu_load": null,
  "reporting_get_data_cputemp": null,
  "reporting_get_data_disk": null,
  "reporting_get_data_memory": null,
  "reporting_get_data_memory_swap": null,
  "reporting_get_data_network": null,
  "reporting_get_data_nfs": null,
  "reporting_get_data_partition": null,
  "reporting-get_data_system": null,
  "reporting_get_data_target": null,
  "reporting_get_data_zfs": null,
  // 实时
  "system_health": null,
  "reporting_realtime": null,
  //长期订阅的
  "alert_list": null,
  "alert_list_sub": null,
  //消息推送 解散
  "alert_dismiss": null,
  //消息推送 恢复
  "alert_restore": null,
  //取值 进程
  "token": null,
  "top": null,
  //心跳部分
  "ping": null,
  "auth_token": null,
  //用户部分 返回错误
  "user_delete": null,
  //未挂载的磁盘获取 返回错误
  "disk_get_unused": null,
  //获取所有磁盘
  "disk_query": null,
  "disk_One_query": null,//获取单独一个池盘
  //获取所有池
  "pool_query": null,
  "pool_processes": null,//返回使用此池的正在运行的进程的列表。
  "pool_attachments": null,//返回该池的服务
  "system_advanced": null,//返回依赖于此池的服务列表 负责告诉用户是否有相关的共享，要求确认
  "pool_export": null,//删除池
  "poolDelete_progress": 0,//删除进度
  "poolCreate_progress": 0,//创建池的进度
  "systemdataset_config": null,//获取池一些相关的配置 name
  //获取数据集
  "pool_dataset_query": null,
  //获取池对应id下面挂载的池盘
  "pool_get_disks": null,//获取池id为8下面挂载的池盘
  //获取网络信息
  "network_general_summary": null,
  "system_info": null,
  flag: '',
  // PageInfo:['Page_cpu','Page_memory','Page_network','Page_partition','Page_partition','Page_target','Page_zfs'],
  'Page_cpu': null,
  'Page_memory': null,
  'Page_network': null,
  'Page_partition': null,
  'Page_target': null,
  'Page_zfs': null,
  'tool_network': null,
  "socketSend": null//要发送的数据
};
const mutations = {
  editData (state, params) {
    if (params.value) {
      const result = PageInfo.filter((item) => item.id === params.value.id)
      if (result.length == 0) {//说明不是page统计图请求没有找到数据
        state[params.key] = params.value;
      } else {//说明是统计图单页面的数据
        state[result[0].name] = params.value
      }
    } else {
      state[params.key] = params.value;
    }
  },
  pageDataDelete (state, id) {
    const result = PageInfo.filter((item) => item.id === id)
    if (result.length > 0) {
      state[result[0].name] = null
    }
  },
  socketError (state, params) {
    state.flag = params
  },
  socketSuccess (state, params) {
    state.flag = params
  },
  socketSend (state, params) {
    //{name:'tool_network',params:[]}
    state.socketSend = params
  }
};
const getters = {
  filter_realtime_memory (state) {//处理内存统计图数据
    if (!state.reporting_realtime.fields) return
    let {virtual_memory, zfs} = state.reporting_realtime.fields
    let {total, free} = virtual_memory
    let {arc_size} = zfs
    return {
      total: total,
      free: free,
      zfs: arc_size,
      Services: total - (free + arc_size)
    }
  },
  filter_pool_query (state) {//处理池数据
    return new Promise((resolve, reject) => {
      if (!state.pool_query || !state.pool_dataset_query) return
      let pool = state.pool_query.result
      let dataset = state.pool_dataset_query.result
      if (state.pool_query.error || state.pool_dataset_query.error || !pool || !dataset) {
        reject('Error')
      } else {
        let poolName = []
        pool.forEach(item => poolName.push(item.name))
        let result = dataset.filter((key) => poolName.length && poolName.indexOf(key.id) != -1)
        let processData = new poolData(pool, result).StoragePool
        resolve({
          OverviewDropDownList: poolName,//总览池盘下拉列表
          processData//处理过的池数据
        })
      }
    })

  },
  merge_pool_deleteQuery (state) {
    return new Promise((resolve, reject) => {
      let processes = state.pool_processes
      let attachments = state.pool_attachments
      let advanced = state.system_advanced
      if (!processes || !attachments || !advanced) return
      if (advanced.error || attachments.error || processes.error) return reject('error')
      let merges = new mergeDelete_pool_Data(processes.result, attachments.result, advanced.result)
      resolve(merges.marge)
    })
  },
}
const actions = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
