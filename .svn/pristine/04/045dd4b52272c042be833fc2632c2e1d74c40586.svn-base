/**
 * 递归过滤数结构并返回新结构 筛选数据
 */
import {assign_compatible} from "@common/js/publicMethod/publicMethod";
import {Percentage} from "@common/common/debounceAndThrottle";

export class poolData {
  constructor (pool, data) {
    if (!data || !pool) return
    this.StoragePool = []
    this.deepEach(data, this.StoragePool)
    this.StoragePool.forEach((item, index) => {
      pool.forEach(items => {
        if (items.name == item.name) {
          assign_compatible()
          Object.assign(item, items)
        }
      })
    })
  }

  deepEach (data = [], newArray = []) {
    if (!data.length) return []
    for (let item of data) {
      let node = {
        name: item.name,
        type: item.type,
        used: item.used.value,
        percentage: Percentage(item.used.parsed, (item.available.parsed + item.used.parsed)),
        avail: item.available.value,
        compression: item.compression.parsed,
        compressRatio: item.compressratio.parsed,
        Readonly: item.readonly.parsed
      }
      Reflect.deleteProperty(node, 'children')
      newArray.push(node)
      if (item.children) {
        node.children = []
        this.deepEach(item.children, node.children)
      }
    }
    return newArray
  }
}

/**
 * 合并池盘下面的详细信息
 */
export class mergeDelete_pool_Data {
  constructor (processes, attachments, advanced) {
    let UsingName = this.each(processes)
    this.marge = [{
      service: attachments.length&&attachments[0].attachments[0]||'',
      name: attachments.length&&attachments[0].service||[]
    }, {
      name:UsingName.length&&'isUsing'||'',
      service:UsingName.length&&UsingName.join()||'',
    }]
  }

  each (processes) {
    if (!processes.length)return[]
    let name = []
    processes.forEach(item => {
      name.push(item.name)
    })
    return name
  }
}
