
/**
 * 查找路径在对象中的对象
 * @param data （递归对象）
 * @param filePath (递归路径)
 * @param obj(传递一个空对象，用于递归返回)
 * @returns {boolean|*}
 */
export function findFolderPath (data, filePath, obj) {
  for (let i = 0, len = data.length; i < len; i++) {
    if (data[i].path == filePath) {
      obj = data[i]
      return obj
    }
    let children = data[i].children
    if (children && children.length) {
      let result = findFolderPath(children, filePath, obj)
      if (result) return result
    }
  }
  return false
}

/**
 * 深拷贝         JSON.params(JSON.stringify())这种简单粗暴的方法有其局限性，当值为undefined、function、symbol 会在转换过程中被忽略
 * @param data(深拷贝对象)
 * @returns {*|{}}
 */
export function deepClone (data) {
  const type = judgeType(data);
  let obj = null;
  if (type == 'array') {
    obj = [];
    for (let i = 0; i < data.length; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type == 'object') {
    obj = {}
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        obj[key] = deepClone(data[key]);
      }
    }
  } else {
    return data;
  }
  return obj;
}

function judgeType (obj) {
  // tostring会返回对应不同的标签的构造函数
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}
export function assign_compatible(){
  if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
}
