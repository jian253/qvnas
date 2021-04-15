/**
 * [过滤对象]
 * @param  obj [过滤前数据]
 * @param  arr [过滤条件，要求为数组]
 */
export function filterObj(obj, arr) {
  if (typeof (obj) !== "object" || !Array.isArray(arr)) {
    throw new Error("参数格式不正确")
  }
  const result = {}
  Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
    result[key] = obj[key]
  })
  return result
}
