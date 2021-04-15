/**
 * 过滤字节大小
 * @param value
 * @param type 是否要转换统一的格式
 * @returns {string}
 */
export function filterSize (value, type = false) {
  if (value == 0) {
    return '0'
  }
  if (isNaN(value)) {
    return '';
  }
  var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var exp = Math.floor(Math.log(value) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }
  var i = Math.floor(exp / 10);
  value = value / Math.pow(2, 10 * i);

  if (value.toString().length > value.toFixed(2).toString().length) {
    value = value.toFixed(2);
  }
  if (type) {
    if (i == 2 || i == 0) {
      value = (value / 1024).toFixed(2)// 内存 gb
    }
  }
  return value + symbols[i];
}

//保留一位小数点
export function filterStorage (value) {
  if (!value)return
  if (value == 0) return "0 B"
  var k = 1024;
  var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let i = Math.floor(Math.log(value) / Math.log(k));
  let size = JSON.parse((value / Math.pow(k, i).toPrecision(3)).toFixed(1))
  return size + sizes[i]
}

/**
 * 过滤字符串中的字母
 * @param str
 * @returns {*}
 * @constructor
 */
export function Letter (str) {
  let result;
  const reg = /[a-zA-Z]+/;  //[a-zA-Z]表示匹配字母，g表示全局匹配
  while (result = str.match(reg)) { //判断str.match(reg)是否没有字母了
    str = str.replace(result[0], ''); //替换掉字母  result[0] 是 str.match(reg)匹配到的字母
  }
  return str;
}

/**
 * 过滤时间
 * @param val
 * @param params
 * @returns {string}
 */
export function filterDate (val, params) {
  // dateFormat 1>时间 2>处理的格式
  function dateFormat (date, format) {
    if (typeof date === "string") {
      var mts = date.match(/(\/Date\((\d+)\)\/)/);
      if (mts && mts.length >= 3) {
        date = parseInt(mts[2]);
      }
    }
    date = new Date(date);
    if (!date || date.toUTCString() == "Invalid Date") {
      return "";
    }
    var map = {
      "M": date.getMonth() + 1,
      //月份
      "d": date.getDate(),
      // 日
      "h": date.getHours(),
      // 小时
      "m": date.getMinutes(),
      // 分
      "s": date.getSeconds(),
      // 秒
      "q": Math.floor((date.getMonth() + 3) / 3),
      // 季度
      "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
      var v = map[t];
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v;
          v = v.substr(v.length - 2);
        }
        return v;
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
    });
    return format;
  }

  return dateFormat(val, params);
}

/**
 * 转换时间
 * new Date(new Date().getTime() - 1 * 60 * 60 * 1000)获取上一个时间(中国标准时间)
 * new Date(new Date().getTime())获取当前时间 (中国标准时间)
 * @param fmt 时间格式 'yyyy,MM,dd,hh:mm'
 * @param time  时间参数    传参格式 Sat Mar 06 2021 09:08:12 GMT+0800 (中国标准时间)
 * @returns {*}
 * @constructor
 */
export function Conversion (time, fmt) {
  var o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    'S': time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

export function Minute (time) {
  if (!time)return
  if (typeof time !== 'string') {
    time = JSON.stringify(time)
  }
  //split将字符串分割成数组 以说明为分割
  // slice(开始位置，结束位置)提取字符串
  let str = time.split('.')
  if (!str.length) return console.log('字符串')
  let times = new Date();
   //获取当前小时数(0-23)
   //获取当前分钟数(0-59)
  let m=times.getMinutes()<10?'0'+times.getMinutes():times.getMinutes()
  return str[0] + " as of " + times.getHours() + ':' +m
}

