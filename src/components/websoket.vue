<template>    
  <div class="webscoket"></div>
</template>
<script>
  import {
    webscoketApi,
    webscoketIndexApi,
    webSocketHeartApi,
    webSocketProcessApi
  } from '@/common/js/webscoket/webscoket'
  import {sysInfo} from "@api/login/loginContact";
  // import ElementUI from "element-ui";
  import {Conversion} from "@common/js/filter/filters";
  import {deepClone} from "@common/js/publicMethod/publicMethod";
  import {getTimePeriod, PageId, PageInfo} from "@common/js/resources";
  import {monitor, socketAddress, socketUser, v_monitor} from "@common/js/webscoket/socketConfig";
  import {mapState} from 'vuex'

  let connectTimer = null;
  // 给服务器发送一个字符串:
  export default {
    name: 'websoket',
    watch: {
      sendCommand (val) {
        if (!val.length) return
        val.forEach(item => {
          if (Object.prototype.toString.call(item) === '[object Object]') {
            this.postSendData(item.name, item.params)
          } else {
            this.postSendData(item)
          }
        })
      }
    },
    computed: {
      ...mapState('v_scoket', {
        sendCommand: state => state.socketSend
      })
    },
    data: function () {
      return {
        sessionVal: null,
        headerConfig: null,//配置headers信息
        userName: socketUser.username,//用户名
        passWord: socketUser.password,//密码
        //processWebSocketUrl:'ws://192.168.3.204:5000/websocket/shell',//进程webscoket地址
        webSocketUrl: null,//webscoket地址
        //webSocketUrl:'ws://192.168.3.212/websocket',//webscoket地址
        socket: null,//用于获取数据的webscoket
        lockReconnect: false,
        heartCheck: null,
        saveWebsocketData: {},//保存的webscoket数据
      };
    },
    methods: {
      async socketInfo () {
        webscoketApi["auth-login"].params = [this.userName, this.passWord];
        await this.createWebSocket();
        //this.createHeartCheck();
      },
      dealSocketId () {
        webscoketApi["auth-login"].id = this.sessionVal;
        sessionStorage.setItem("socketToken", this.sessionVal);
        //发送身份验证
        let sendData = JSON.stringify(webscoketApi["auth-login"]);
        this.socket.send(sendData);
      },
      createWebSocket () {//创建webscoket
        try {
          // 创建Web Socket 连接item.id
          this.socket = new WebSocket(this.webSocketUrl);
          this.initEventHandle(this.socket);// 初始化事件
        } catch (e) {
          // 出错时重新连接
          this.reconnect(this.webSocketUrl);
        }
      },
      initEventHandle (sockets) {
        // 连接关闭时触发
        sockets.onclose = () => {
          /*scoketEventBus.$off('saveWebsocketData')
           scoketEventBus.$off('saveRealtimeWebsocketData')*/
          console.log("连接关闭");
        };
        // 通信发生错误时触发
        sockets.onerror = () => {
          this.$store.commit('v_scoket/socketError', false)
          // 重新创建长连接
          this.reconnect();
          this.$notify.closeAll()
          // this.Notification.closeAll()
          return this.$notify.error({
            message: this.$t('reminder.socketError'),//'socket错误!'
            title: this.$t('log.error'),
            duration: 10000,
            offset: 52
          })
        };
        // 连接建立时触发
        sockets.onopen = () => {
          this.$store.commit('v_scoket/socketSuccess', true)
          this.createHeartCheck();
          //发送连接信息
          let sendData = JSON.stringify(webscoketApi["connect"]);
          sockets.send(sendData);
        };
        // 客户端接收服务端数据时触发
        sockets.onmessage = msg => {
          this.heartCheck.reset().start();
          let getMsg = JSON.parse(msg.data);
          //将认证传值存储起来
          if (getMsg.session) {//第一次send 的返回值
            //赋值id 进行认证
            this.sessionVal = getMsg.session;
            this.dealSocketId();
          } else {
            if (typeof getMsg.result == "boolean" && getMsg.msg == "result" && getMsg.id == this.sessionVal) {//认证返回
              if (getMsg.result == true) {//认证成功
                for (let key in webscoketIndexApi) {
                  let sendData = JSON.stringify(webscoketIndexApi[key]);
                  this.socket.send(sendData);
                }
                this.$emit('webSoketSuccess')
              } else {
                this.$notify.error({
                  message: this.$t('reminder.socketCertification'),//'websocket认证失败!'
                  title: this.$t('log.error'),
                  duration: 1400,
                  offset: 56
                });
              }
            } else { //其他接收的数据
              if ((getMsg.id == webscoketIndexApi["auth-generate_token"].id) && getMsg.msg == "result") {//储存token时
                webSocketHeartApi["auth-token"].params = [getMsg.result];
                webSocketProcessApi["token"].token = [getMsg.result];
              } else {
                this.saveGetMsg(getMsg);//保存数据
              }
            }
          }
        };
      },
      sendToolsNetwork () {//认证成功发送小工具信息
        let time = getTimePeriod()
        time.id = PageId[6]
        this.$parent.$parent.refreshWebsocketData("reporting-get_data-network", time);
      },
      saveGetMsg (getMsg) {
        // console.log(getMsg)
        if (getMsg.msg == "pong" || getMsg.msg == "ready") {//心跳的返回值 ping   添加认证时效返回值 ready
        } else if (getMsg.msg == "changed" || getMsg.collection != undefined) {//实时推送的信息
          const index = monitor.indexOf(getMsg.fields &&getMsg.fields.method)
          if (index != -1) {//监听删除进度 pool.create 导出进度
            this.$store.commit('v_scoket/editData', {
              key: v_monitor[index],
              value: getMsg
            });
          } else {
            if (getMsg.id != undefined) {//根据id找到对应的name
              if (this.returnDealErrorId(getMsg.id)) {//需要返回错误
                if (this.returnName(getMsg.id) != null) {
                  this.$store.commit('v_scoket/editData', {
                    key: this.returnName(getMsg.id).replace(/-/g, "_"),
                    value: getMsg
                  });
                }
              } else {
                if (getMsg.error == undefined) {
                  if (this.returnName(getMsg.id) != null) {
                    this.$store.commit('v_scoket/editData', {
                      key: this.returnName(getMsg.id).replace(/-/g, "_"),//因为vuex不识别- 所以转换成_
                      value: getMsg
                    });
                  }
                }
              }
              //特殊情况 放弃 "alert-dismiss"，"alert-restore"
            } else {
              if (getMsg.collection != undefined) {//可以解析name的信息 根据collection找到name
                let getName = getMsg.collection;
                let dealName = getName.split(".").join("-");
                if (getMsg.error == undefined) {
                  this.$store.commit('v_scoket/editData', {
                    key: dealName.replace(/-/g, "_"),
                    value: getMsg
                  });
                }
              }
            }
          }

        } else {
          if (getMsg.id != undefined) {//根据id找到对应的name
            if (this.returnDealErrorId(getMsg.id) || PageId.includes(getMsg.id)) {//需要返回错误
              this.$store.commit('v_scoket/editData', {
                key: this.returnName(getMsg.id).replace(/-/g, "_"),
                value: getMsg
              });
            } else {
              // console.log(getMsg)
              if (this.returnName(getMsg.id) != null) {
                this.$store.commit('v_scoket/editData', {
                  key: this.returnName(getMsg.id).replace(/-/g, "_"),
                  value: getMsg
                });
                if (this.returnName(getMsg.id) == "interface-query") {//判断网络状态切换成有数据的服务器
                  this.dealIgbObj(getMsg)
                }
              }
            }
          }
        }
      },
      dealIgbObj (getMsg) {//比较两个网络数据判断哪一个有值
        let networkValueName = 'igb0'
        let igbName = []
        getMsg.result.forEach((item) => {
          if (item.state["link_state"] == "LINK_STATE_UP") {
            igbName.push(item.name)
          }
        })
        networkValueName = igbName[0]
        if (igbName.length > 1) {//说明两个都在线 比较值，取最大的
          let interfacesInfo = this.$store.state.v_scoket["reporting_realtime"].fields.interfaces
          let igb0Sum = 0;
          let igb1Sum = 0
          if (!interfacesInfo.igb0 && !interfacesInfo.igb1) return
          Object.values(interfacesInfo.igb0).forEach((item, index) => {
            igb0Sum += item;
          });
          Object.values(interfacesInfo.igb1).forEach((item, index) => {
            igb1Sum += item
          });
          igb1Sum > igb0Sum ? networkValueName = 'igb1' : networkValueName = 'igb0'
        }
        webscoketApi['reporting-get_data-network'].params[0][0].identifier = networkValueName
        let time = getTimePeriod()
        time.id = PageId[6]
        this.postSendData("reporting-get_data-network", time);
      },

      deleteSaveInfo (dealName, id = null) {//删除bao'cun
        if (id == null) {
          this.$store.commit('v_scoket/editData', {
            key: dealName.replace(/-/g, "_"),
            value: null
          });
        } else {//删除page页的数据
          this.$store.commit('v_scoket/pageDataDelete', id);
        }

      },
      reconnect () {
        if (this.lockReconnect) {
          return;
        }
        this.lockReconnect = true;
        // 没连接上会一直重连，设置延迟避免请求过多
        clearTimeout(connectTimer);
        connectTimer = setTimeout(() => {
          this.lockReconnect = false;
          this.createWebSocket();
          clearTimeout(connectTimer);
        }, 2000);
      },
      createHeartCheck () {//创建心跳检测
        let _this = this;
        _this.heartCheck = {
          timeout: 3000,//毫秒
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function () {
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
          },
          start: function () {
            let self = this;
            this.timeoutObj = setTimeout(function () {
              //这里发送一个心跳，后端收到后，返回一个心跳消息，
              webSocketHeartApi["auth-token"].params = _this.sessionVal;
              webSocketProcessApi["token"].token = _this.sessionVal;
              let sendData1 = JSON.stringify(webSocketHeartApi["ping"]);
              let sendData2 = JSON.stringify(webSocketHeartApi["auth-token"]);
              _this.socket.send(sendData1);
              _this.socket.send(sendData2);
              self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
                _this.socket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
              }, self.timeout);
            }, this.timeout)
          }
        }
      },
      async postSendData (name, params) {//发送webscoket相关数据处理
        let sendName = deepClone(webscoketApi[name])
        if (params != 'del_websoket_data') {
          if (!params || !params.id) {//说明是page个页 因为page的name和主页统计图发送的名字一样，如果要在发送前清除数据，将id传送过去删除数据
            await this.deleteSaveInfo(name); //注意: 发送之前先清除一边vuex中的数据 这样做监听vuex的变化时要加一程判断，判断值是否为空
          }
          //资源管理面板刷新数据请求
          if (this.trueResourcesMenu(name)) {//统计图当前时间段修改
            //webscoketApi[name].params[1].start=getTime-3600;
            if (params && params.id) {//有传参数说明是page页面发请求
              await this.deleteSaveInfo(name, params.id);
              sendName.params[1].start = params.start;
              sendName.params[1].end = params.end;
              sendName.id = params.id //赋值固定id
            } else {//没有传参，默认获取一个小时的统计图数据
              /*
               * new Date(new Date().getTime() - 1 * 60 * 60 * 1000获取上一个时间(中国标准时间)
               * new Date(new Date().getTime())获取当前时间 (中国标准时间)
               * */
              const pre = new Date(new Date().getTime() - 60 * 60 * 1000)//上一个时间
              const cur = new Date(new Date().getTime())//当前
              let Previous = Conversion(pre, 'yyyy/MM/dd,hh:mm')
              let current = Conversion(cur, 'yyyy/MM/dd,hh:mm')
              sendName.params[1].start = new Date(Previous).getTime() / 1000
              sendName.params[1].end = new Date(current).getTime() / 1000
            }
          }
          //用户删除删除数据请求
          if (name == "user-delete") {
            sendName.params = [params, {"delete_group": true}];
          }
          //获取池对应id下面挂载的池盘, dimiss 通知消息,restore 通知消息
          const orderName = ["pool-get_disks", "alert-dismiss", "alert-restore", "disk_One_query", "pool_export", "pool_attachments", "pool_processes", "pool_export", 'pool_create']
          /*(name == "pool-get_disks" || name == "alert-dismiss" || name == "alert-restore"||name=='disk_One_query')*/
          if (orderName.includes(name)) {
            sendName.params = params;
          }
          if (!sendName) return console.log('发送数据时错误,值为空')
          let sendData = JSON.stringify(sendName);
          // console.log(sendData)
          this.socket.send(sendData);
        } else {
          this.deleteSaveInfo(name);
        }
      },
      trueResourcesMenu (name) {//资源管理 相关接口判断
        return name == "reporting-get_data-cpu" ||
          name == "reporting-get_data-disk" ||
          name == "reporting-get_data-memory" ||
          name == "reporting-get_data-network" ||
          name == "reporting-get_data-nfs" ||
          name == "reporting-get_data-partition" ||
          name == "reporting-get_data-system" ||
          name == "reporting-get_data-target" ||
          name == "reporting-get_data-zfs" ||
          name == "reporting-get_data-cpu-load" ||
          name == "reporting-get_data-cputemp" ||
          name == "reporting-get_data-memory-swap";
      },
      returnDealErrorId (getId) {
        let hasReturnError = false;
        let haveErrorArr = ["user-delete", "disk-get_unused"];//需要返回错误的集合
        for (let key in webscoketApi) {
          if (webscoketApi[key].id != undefined) {
            if (getId == webscoketApi[key].id) {
              for (let i = 0; i < haveErrorArr.length; i++) {
                if (key == haveErrorArr[i]) {
                  hasReturnError = true;
                }
                break;
              }
            }
          }
        }
        return hasReturnError;
      },
      returnName (getId) {
        let getName = null;
        for (let key in webscoketApi) {
          if (webscoketApi[key].id != undefined) {
            if (getId == webscoketApi[key].id) {
              getName = key;
              break;
            }
          }

        }
        //验证部分
        for (let key1 in webscoketIndexApi) {
          if (webscoketIndexApi[key1].id != undefined) {
            if (getId == webscoketIndexApi[key1].id) {
              getName = key1;
              break;
            }
          }
        }
        if (!PageId.includes(getId)) return getName
        for (let key in PageInfo) {
          if (PageInfo[key].id === getId) {
            getName = PageInfo[key].name;
            break
          }
        }
        if (!getName) return getName
        return getName;
      },
      async getSocketAddress () {
        let {data: res} = await sysInfo({
          type: 2
        })
        if (res.code == 200) {
          this.webSocketUrl = `ws://${socketAddress || res.msg}/websocket`
          await this.socketInfo()
          this.$store.commit('webSocketAddress', socketAddress || res.msg)
        } else {
          this.Notification.closeAll()
          return this.$notify.error({
            message: this.$t('reminder.socketError'),//'地址获取失败!'
            title: this.$t('log.error'),
            duration: 10000,
            offset: 52
          })
        }
      },
    },
    mounted () {
    },
    created () {
      //创建
      // console.log('创建socket')
      if (this.$store.state.socketAddress) {
        this.webSocketUrl = `ws://${socketAddress || this.$store.state.socketAddress}/websocket`
        // this.webSocketUrl = `ws://192.168.3.19/websocket`
        // this.webSocketUrl= `ws://192.168.3.79/websocket`
        this.socketInfo()
      } else {
        this.getSocketAddress()
      }
    },
    beforeDestroy () {
      // console.log('销毁socket')
      /*scoketEventBus.$off('saveWebsocketData')
       scoketEventBus.$off('saveRealtimeWebsocketData')*/
      //拿数据的的webscoket
      clearTimeout(connectTimer);
      if (this.heartCheck != null) {
        clearTimeout(this.heartCheck.serverTimeoutObj);
        clearTimeout(this.heartCheck.timeoutObj);
      }
      if (this.socket != null) {
        this.socket.close();
      }
    }
  };


</script>
