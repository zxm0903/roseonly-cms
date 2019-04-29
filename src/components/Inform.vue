<template></template>

<script>
export default {
  created() {
    let that =this
    var socket = new WebSocket("ws://172.16.7.71:9999");

    socket.addEventListener("open", function() {
      console.log("连接成功");
      var obj = new Object()
      obj.from = 'Admin'
      obj.content = ""
      obj.to = ""
      
      socket.send(JSON.stringify(obj));
      // console.log(obj);
    });
    // 主动给websocket发消息
    // button.addEventListener("click", function() {
    //   var val = input.value;
    //   socket.send(val);
    // });
    // 接受websoket的消息
    socket.addEventListener("message", function(e) {
      that.$notify({
        title: "系统消息",
        message: e.data,
        duration: 0
      });
      console.log(e);
    });
    socket.addEventListener("close", function() {
      console.log("连接已经断开");
    });
    socket.addEventListener("error", function() {
      console.log("连接异常");
    });
  }
};
</script>