<template>
  <div id="shopCondition">
    <div class="choose date clear">
      <div class="left">
        <span>快速查看</span>
        <input type="button" value="今日" @click="getToday">
        <input type="button" value="昨日" @click="getYearstoday">
        <input type="button" value="最近7日" @click="getSeven">
        <input type="button" value="最近30日" @click="getThirty">
      </div>
      <div class="right">
        <span style="margin-right:15px">选择日期</span>
        <el-date-picker
          v-model="value"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </div>
    </div>

    <div class="clear choose payCondition" style="height:120px">
      <div class="detail">
        <p>付款金额</p>
        <span>data</span>
      </div>
      <div class="detail">
        <p>付款订单数</p>
        <span>data</span>
      </div>
      <div class="detail">
        <p>付款买家数</p>
        <span>data</span>
      </div>
      <div class="detail">
        <p>付款商品件数</p>
        <span>data</span>
      </div>
    </div>
    <!-- 折线图 -->

    <div>
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getToday() {
      console.log("日期", this.value);
      var mydate = new Date(),
        time = mydate.getDate();
      console.log("shijian", time);
    },
    getYearstoday() {},
    getSeven() {},
    getThirty() {},
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "商城概况" },
        tooltip: {
          // trigger: "axis"
        },
        xAxis: {
          type: "category",
          // show:ture,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value",
          data: [100, 200, 300, 400, 500, 600]
        },
        series: [
          {
            name: "金额",
            type: "funnel",
            data: [500, 200, 360, 110, 110, 120]
          }
        ]
      });
    }
  }
};
</script>

<style>
/* 展示商城数据 */
.clear::before {
  content: "";
  display: table;
}
.clear::after {
  clear: both;
}
.choose {
  min-width: 1000px;
}
.date{
  position: relative;
  z-index:999;
}
.left {
  float: left;
}
.right{
  float: right;
}
.left > input {
  margin: 10px;
  background: rgb(170, 117, 117);
  border: none;
  padding: 5px;
  border-radius: 3px;
}
.left > input:hover {
  background: rgb(146, 144, 144);
  cursor: pointer;
}
.payCondition{
float: left;
}
.detail {
  width: 200px;
  height: 100px;
  background-color: azure;
  float: left;
  margin-right: 40px;
  text-align: center;
  padding: 10px;
  margin: 20px;
}
.detail > * {
  margin: 15px;
}
</style>