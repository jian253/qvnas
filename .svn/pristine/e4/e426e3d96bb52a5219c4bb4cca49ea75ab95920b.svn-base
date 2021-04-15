import {Conversion} from "@common/js/filter/filters";
//固定id 资源管理主要用于区分主页面的统计图和page页面的统计图和小工具id 最后一个id是小工具的id
export const PageId = ['a65c8ed9-237f-d1a2-44ed-646857f2eacd', '73cefdd2-7963-4411-cc29-7c75032bf14d', 'e1fc3b5f-351e-9d17-d829-64124b333629', '6151065c-b178-db1c-b2ad-f27c2b636fa1', '97727574-7bcd-7421-f5ea-e65a160de544', 'b6c287ae-f2d2-b72e-e40f-5504f92717db','dd496740-19e0-a8bb-f7a2-ecb2f7e950ff']
export const initInfoArr = ["reporting-get_data-cpu", "reporting-get_data-memory", "reporting-get_data-network",
  "reporting-get_data-partition", "reporting-get_data-target", "reporting-get_data-zfs"
]
export const PageInfo = [
  {
    name: 'Page_cpu',
    id: 'a65c8ed9-237f-d1a2-44ed-646857f2eacd'
  }, {
    name: 'Page_memory',
    id: '73cefdd2-7963-4411-cc29-7c75032bf14d'
  }, {
    name: 'Page_network',
    id: 'e1fc3b5f-351e-9d17-d829-64124b333629'
  }, {
    name: 'Page_partition',
    id: '6151065c-b178-db1c-b2ad-f27c2b636fa1'
  }, {
    name: 'Page_target',
    id: '97727574-7bcd-7421-f5ea-e65a160de544'
  }, {
    name: 'Page_zfs',
    id: 'b6c287ae-f2d2-b72e-e40f-5504f92717db'
  },{
    name:'tool_network',
    id: 'dd496740-19e0-a8bb-f7a2-ecb2f7e950ff'
  }]

/**
 * 获取上一个时间及当前时间断
 * @returns {{current: *, Previous: *}} 返回时间戳
 */
export function getTimePeriod () {
  const pre = new Date(new Date().getTime() - 60 * 60 * 1000)//上一个时间
  const cur = new Date(new Date().getTime())//当前
  let Previous = Conversion(pre, 'yyyy/MM/dd,hh:mm')
  let current = Conversion(cur, 'yyyy/MM/dd,hh:mm')
  let start = new Date(Previous).getTime() / 1000
  let end = new Date(current).getTime() / 1000
  return {
    start:start,
    end:end
  }
}
