<template></template>

<script>
export default {
  created() {
    let that =this
    var socket = new WebSocket("ws://172.16.7.76:9999");

    socket.addEventListener("open", function() {
      console.log("连接成功");
      var obj = new Object()
      obj.from = 'Admin'
      obj.content = "123"
      obj.to = "1"
      
      socket.send(JSON.stringify(obj));
      // console.log(obj);
    });

    socket.addEventListener("message", function(e) {
      console.log(e)
      let data = JSON.parse(e.data.split('\\').join(''))
      that.$notify({
        title: "系统消息",
        message:"您有新的订单待处理",
        duration: 0
      });
      // e.data.split('/').join('')
      console.log(12,data,e);
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