<template>    
  <div class="shellSocket"></div>
</template>
<script>
  import {webSocketProcessApi} from '@/common/js/webscoket/webscoket'
  let connectTimer=null;
  // 给服务器发送一个字符串:
  export default {
    watch:{
    },
    data: function () {
      return {
        sessionVal:null,
        headerConfig:null,//配置headers信息
        userName:'',//用户名
        passWord:'',//密码
        //processWebSocketUrl:'ws://192.168.3.204:5000/websocket/shell',//进程webscoket地址
        //webSocketUrl:'ws://192.168.3.204:5000/websocket',//webscoket地址
        webSocketUrl:'ws://192.168.3.204:5000/websocket/shell',//webscoket地址
        socket: null,//用于获取数据的webscoket
        lockReconnect: false,
        heartCheck:null,
        saveWebsocketData:{},//保存的webscoket数据
      };
    },
    methods: {
      //获取用户信息
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
         // console.log("连接关闭");
        };
        // 通信发生错误时触发
        sockets.onerror = () => {
          // 重新创建长连接
          this.reconnect();
        };
        // 连接建立时触发
        sockets.onopen = () => {
          this.createHeartCheck();
          //发送连接信息
          let sendData=JSON.stringify(webSocketProcessApi["token"]);
          sockets.send(sendData);
          let sendData1=webSocketProcessApi["top"];
          sockets.send(sendData1);
        };
        // 客户端接收服务端数据时触发
        sockets.onmessage = msg => {
          //this.heartCheck.reset().start();
          let getMsg=msg.data;
          //console.log("进程拿到的数据");
         // console.log(getMsg);
        };
      },
      reconnect () {
        if (this.lockReconnect) {
          return;
        }
        this.lockReconnect = true;
        // 没连接上会一直重连，设置延迟避免请求过多
        clearTimeout(connectTimer);
        connectTimer=setTimeout(() => {
          this.lockReconnect = false;
          this.createWebSocket();
          clearTimeout(connectTimer);
        }, 2000);
      },
      createHeartCheck () {//创建心跳检测
        var _this=this;
        _this.heartCheck = {
          timeout: 5000,//毫秒
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
          },
          start: function(){
            var self = this;
            this.timeoutObj = setTimeout(function(){
              //这里发送一个心跳，后端收到后，返回一个心跳消息，
              var sendData1=JSON.stringify({"msg":"ping","id":"ff1c99f7-f2ab-4ff5-63b7-9cde44bb7660"});
              _this.socket.send(sendData1);
              self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                _this.socket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
              }, self.timeout);
            }, this.timeout)
          }
        }
      },
      postSendData(name){
        var sendData=JSON.stringify(webSocketProcessApi[name]);
        this.socket.send(sendData);
      }
    },
    mounted () {
     // this.createWebSocket();
    },
    beforeDestroy() {
      //拿数据的的webscoket
      clearTimeout(connectTimer);
      if(this.heartCheck!=null){
        clearTimeout(this.heartCheck.serverTimeoutObj);
        clearTimeout(this.heartCheck.timeoutObj);
      }
      if(this.socket!=null){ this.socket.close(); }
    }
  };
</script>
