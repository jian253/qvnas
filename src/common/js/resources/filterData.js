let timeInterval = 3600//时间传值范围 按秒计算
//处理时间戳
function deal_time_num (num, time, onlyTime) {
  var deal_num = parseInt(num);
  var date = new Date(deal_num);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  //h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second % 5 >= 3 ? second + (5 - second % 5) : second - second % 5;//筛选5秒间距差
  second = second < 10 ? ('0' + second) : second;
  return h + ':' + minute + ':' + second;
}

/**
 * 过滤的echarts数据对象
 * @param getInfo
 * @returns {{min: [], avg: [], max: [], legend: [], start: (string|string), rowData: [], timeArr: [], end: (string|string), colData: []}}
 */
export function publicDealDataFun (getInfo) {
  if (isNaN(getInfo))
  var legendArr = {
    "interrupt": "Interrupt",
    "system": "System",
    "user": "User",
    "nice": "Nice",
    "idle": "Idle",
    "df_complex-free_value": "Free",
    "df_complex-used_value": "Used",
    "both": "Both",
    "memory-buffered_value":"Buffered",
    "memory-used_value":"Used",
    "memory-cached_value":'Cached',
    "memory-wired_value": "Wired",
    "memory-inactive_value": "Inactive",
    "memory-laundry_value": "Laundry",
    "memory-active_value": "Active",
    "memory-free_value": "Free",
    "if_octets_rx": "Octets Rx",
    "if_octets_tx": "Octets Tx",
    "overlap": "Overlap",
    "disk_octets_read": "Octets Read",
    "disk_octets_write": "Octets Write",
    "cache_size-arc_value": "Arc",
    "cache_size-L2_value": "L2",
  };
  var dealMax = [];
  var dealMin = [];
  var dealAvg = [];
  try {
    var dealStartTime = getInfo.result[0].start == null || getInfo.result[0].start == undefined ? '00:00' : deal_time_num(getInfo.result[0].start * 1000);
    var dealEndTime = getInfo.result[0].end == null || getInfo.result[0].end == undefined ? '00:00' : deal_time_num(getInfo.result[0].end * 1000);

  } catch (e) {
    var dealStartTime = '00:00';
    var dealEndTime = '00:00';
  }

  try {
    var startTime = getInfo.result[0].start * 1000;
    var addTimeNum = (timeInterval / getInfo.result[0].data.length) * 1000;
    var dealLegendData = [];
    var dealRowData = [];//横着的数据组合
    var dealColData = [];//竖着数据组合
    var timeArr = [];//用来存放时间
    getInfo.result[0].legend.forEach((item) => {
      dealColData.push([]);
      dealLegendData.push({
        name: legendArr[item],
      });
    });
    getInfo.result[0].data.forEach((item, index) => {
      dealRowData.push([]);
      startTime = startTime + addTimeNum;
      timeArr.push(deal_time_num(startTime, true))
      if (item == null || (item.every(item2 => item2 == 0 || item2 == null))) {//整排数据不对
        getInfo.result[0].legend.forEach((item1, index1) => {
          //dealRowData[index].push(0);
          //dealColData[index1].push(0);
          if (index > 0) {
            dealRowData[index].push(dealRowData[index - 1][index1]);
          } else {
            dealRowData[index].push(0);
          }
          if (dealColData[index1].length > 0) {
            dealColData[index1].push(dealColData[index1][dealColData[index1].length - 1]);
          } else {
            dealColData[index1].push(0);
          }
        });

      } else {
        item.forEach((item1, index1) => {//单排个别值不正确时
          if (item1 == null || item1 == undefined) {
            if (index > 0) {
              dealRowData[index].push(dealRowData[index - 1][index1]);
            } else {
              dealRowData[index].push(0);
            }
            if (dealColData[index1].length > 0) {
              dealColData[index1].push(dealColData[index1][dealColData[index1].length - 1]);
            } else {
              dealColData[index1].push(0);
            }
          } else {
            dealRowData[index].push(parseFloat(item1));
            dealColData[index1].push(parseFloat(item1));
          }
        });
      }
    });
  } catch (e) {//处理数据异常
    var dealRowData = [];//横着的数据组合
    var dealColData = [];//竖着数据组合
    var timeArr = [];//用来存放时间
  }
  try {
    if (getInfo.result[0].aggregations != null ) {
      if (getInfo.result[0].aggregations.max != null ) {
        getInfo.result[0].aggregations.max.forEach((item, index) => {
          if (item == null) {
            dealMax.push(0);
          } else {
            dealMax.push(item);
          }
        });
      }

      if (getInfo.result[0].aggregations.min != null) {
        getInfo.result[0].aggregations.min.forEach((item, index) => {
          if (item == null) {
            dealMin.push(0);
          } else {
            dealMin.push(item);
          }
        });
      }

      if (getInfo.result[0].aggregations.mean != null) {
        getInfo.result[0].aggregations.mean.forEach((item, index) => {
          if (item == null) {
            dealAvg.push(0);
          } else {
            dealAvg.push(item);
          }
        });
      }

    }
  } catch (e) {
  }

  var obj = {//返回数据出去
    rowData: dealRowData,
    colData: dealColData,
    legend: dealLegendData,
    timeArr: timeArr,
    start: dealStartTime,
    end: dealEndTime,
    max: dealMax,
    min: dealMin,
    avg: dealAvg
  };
  return obj;
}
//过滤网络统计图数据
export function filterNetwork (_this) {
  //network
  var networkObj = publicDealDataFun(_this.getPostChartDataList["reporting-get_data-network"]);
  var receiveData = [];
  var sendData = [];
  if (networkObj.rowData.length > 0) {
    var networkY = networkObj.rowData;
    var networkX = networkObj.timeArr;
    networkY.forEach((item, index) => {
      let receive = _this.$options.filters['filterSize'](item[0], true)
      let send = _this.$options.filters['filterSize'](item[1], true)
      // console.log(receive)
      // console.log(send)
      receive = _this.$options.filters['Letter'](receive)
      send = _this.$options.filters['Letter'](send)
      receiveData.push(receive)
      sendData.push(send)
    });
  } else {
    _this.networkDataList.network.x = [];
    receiveData = [];
    sendData = [];
  }
  var networkSeriresObj = [{
    name: 'receive',
    data: receiveData
  }, {
    name: 'send',
    data: sendData
  }]
  _this.networkDataList = {
    network: {
      series: networkSeriresObj,
      y: receiveData,
      y2: sendData,
      x: networkX,
      legend: {
        data: networkObj.legend,
        show: false, //是否显示
      }
    }
  }
}
