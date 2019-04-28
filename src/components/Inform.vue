<template>
  
</template>

<script>
export default {

  created() {
    var  socket = new WebSocket("ws://172.16.7.71:9999");

    socket.addEventListener("open", function() {
      console.log("连接成功")
    });
    // 主动给websocket发消息
    // button.addEventListener("click", function() {
    //   var val = input.value;
    //   socket.send(val);
    // });
    // 接受websoket的消息
    socket.addEventListener("message", function(e) {
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0
      });
      console.log(e.data)
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