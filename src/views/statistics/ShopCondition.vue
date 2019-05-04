<template>
  <div id="shopCondition">
    <div class="choose date clear">
      <div class="left">
        <span>快速查看</span>
        <input type="button" value="今日" @click="getToday">
        <input type="button" value="昨日" @click="getYearstoday">
        <input type="button" value="最近7日" autofocus="ture" @click="getSeven">
        <input type="button" value="最近30天" @click="getMonth">
      </div>
      <div class="right">
        <el-date-picker
          v-model="value"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          default-value="2019-05-05"
          @change="change"
        ></el-date-picker>
      </div>
    </div>

    <div class="clear choose payCondition" style="height:120px">
      <div class="detail">
        <p>付款金额</p>
        <span v-text="payMoney"></span>
      </div>
      <div class="detail">
        <p>付款订单数</p>
        <span v-text="payOrder"></span>
      </div>
      <div class="detail">
        <p>付款买家数</p>
        <span v-text="payBuyer"></span>
      </div>
      <div class="detail">
        <p>付款商品件数</p>
        <span v-text="payGoodsCount"></span>
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
      value: "",
      payMoney: 0,
      payOrder: 0,
      payBuyer: 0,
      payGoodsCount: 0,
      xval: [],
      yval: [],
      startTime: "",
      endTime: ""
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getToday() {
      var that = this;
      // 计算时间戳
      var timetamp = new Date().getTime();

      var oneDay = 24 * 60 * 60 * 1000;

      var num = timetamp + oneDay;

      var time = new Date(num)
        .toLocaleString("chanese", { hour12: false })
        .split("/")
        .join("-");
      console.log(time);

      console.log(
        new Date()
          .toLocaleString("chanese", { hour12: false })
          .split("/")
          .join("-")
      );
      //计算开始时间
      var timeYear = new Date().getFullYear();
      var timeMonth = new Date().getMonth() + 1;
      var timeDay = new Date().getDate();
      if (timeMonth < 10) {
        timeMonth = "0" + timeMonth;
      }
      if (timeDay < 10) {
        timeDay = "0" + timeDay;
      }
      var startTime = timeYear + "-" + timeMonth + "-" + timeDay + " 00:00:00";
      console.log(timeYear, timeMonth, timeDay, startTime);

      // 给data里的开始时间赋值
      that.startTime = startTime;
      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
            screeningStartTime: that.startTime,
            screeningEndTime: new Date().format("yyyy-MM-dd hh:mm:ss")
          }
        })
        .then(res => {
          console.log(res);
          that.payMoney = res.data.data.totalPrice + " 元";
          console.log(res.data.data.count);
          that.payOrder = res.data.data.count;
          that.payBuyer = res.data.data.userCount;
          that.payGoodsCount = res.data.data.goodsNumCount;

          // 处理从数据库获取的时间及数据 并给data赋值
          that.xval = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
          that.yval = [0, 0, 0, 0, 0, 0, 300, that.payMoney - 300];
          that.drawLine();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getYearstoday() {
      var that = this;
      // 计算时间戳
      var timetamp = new Date().getTime();

      var oneDay = 24 * 60 * 60 * 1000;

      var num = timetamp;

      var time = new Date(num)
        .toLocaleString("chanese", { hour12: false })
        .split("/")
        .join("-");
      console.log(time);

      var twoDay = 24 * 60 * 60 * 1000;
      var num2 = timetamp - twoDay;

      var time2 = new Date(num2);

      console.log(time2);

      // 计算开始时间
      var timeYear2 = time2.getFullYear();
      var timeMonth2 = time2.getMonth() + 1;
      var timeDay2 = time2.getDate();
      if (timeMonth2 < 10) {
        timeMonth2 = "0" + timeMonth2;
      }
      if (timeDay2 < 10) {
        timeDay2 = "0" + timeDay2;
      }
      var startTime2 =
        timeYear2 + "-" + timeMonth2 + "-" + timeDay2 + " 00:00:00";
      console.log(startTime2);
      // 给data里的开始时间赋值 在这里是筛选开始时间
      that.startTime = startTime2;

      // 计算结束时间
      var endTime = timeYear2 + "-" + timeMonth2 + "-" + timeDay2 + " 23:59:59";
      console.log(endTime);
      that.endTime = endTime;

      console.log(that.startTime, that.endTime);

      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
            screeningStartTime: that.startTime,
            screeningEndTime: that.endTime
          }
        })
        .then(res => {
          console.log(res);

          this.payMoney = res.data.data.totalPrice + " 元";
          console.log(res.data.data.count);
          this.payOrder = res.data.data.count;
          this.payBuyer = res.data.data.userCount;
          this.payGoodsCount = res.data.data.goodsNumCount;

          // 处理从数据库获取的时间及数据 并给data赋值
          // that.xval = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,00];
          // that.yval = [2,4,6];
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSeven() {
      var that = this;
      // 计算时间戳
      var timetamp = new Date().getTime();

      var oneDay = 24 * 60 * 60 * 1000;
      // 昨天该时间的时间戳
      var num = timetamp - oneDay;

      // 7天时间的时间戳
      var sevenDay = 7 * 24 * 60 * 60 * 1000;
      var num2 = timetamp - sevenDay;

      var time2 = new Date(num2);
      // 开始时间
      console.log(time2);
      // 赋值
      that.startTime = new Date(time2).format("yyyy-MM-dd hh:mm:ss");
      console.log(that.startTime);
      // 结束时间
      that.endTime = new Date().format("yyyy-MM-dd hh:mm:ss");

      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
            screeningStartTime: that.endTime,
            screeningEndTime: that.startTime
          }
        })
        .then(res => {
          console.log(res);
          console.log(res);
          this.payMoney = res.data.data.totalPrice + " 元";
          console.log(res.data.data.count);
          this.payOrder = res.data.data.count;
          this.payBuyer = res.data.data.userCount;
          this.payGoodsCount = res.data.data.goodsNumCount;

          // 处理从数据库获取的时间及数据 并给data赋值
          // that.xval = 1;
          // that.yval = 2;
        })
        .catch(error => {
          console.log(error);
        });
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
          data: that.xval
        },
        yAxis: {
          type: "value",
          data: [200, 400, 600, 800, 1000, 1200, 1400, 1600]
        },
        series: [
          {
            name: "金额",
            type: "line",
            data: that.yval
          }
        ]
      });
    },
    getMonth() {
      var that = this;
      // 计算时间戳
      var timetamp = new Date().getTime();

      var oneDay = 24 * 60 * 60 * 1000;
      // 昨天该时间的时间戳
      var num = timetamp - oneDay;

      // 30天时间的时间戳
      var thirtyDay = 30 * 24 * 60 * 60 * 1000;
      var num2 = timetamp - thirtyDay;

      var time2 = new Date(num2);
      // 开始时间
      console.log(time2);
      // 赋值
      that.startTime = new Date(time2).format("yyyy-MM-dd hh:mm:ss");
      console.log(that.startTime);
      // 结束时间
      that.endTime = new Date().format("yyyy-MM-dd hh:mm:ss");

      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
            screeningStartTime: that.startTime,
            screeningEndTime: that.endTime
          }
        })
        .then(res => {
          console.log(res);
          console.log(res);
          this.payMoney = res.data.data.totalPrice + " 元";
          console.log(res.data.data.count);
          this.payOrder = res.data.data.count;
          this.payBuyer = res.data.data.userCount;
          this.payGoodsCount = res.data.data.goodsNumCount;

          // 处理从数据库获取的时间及数据 并给data赋值
          that.xval = 1;
          that.yval = 2;
        })
        .catch(error => {
          console.log(error);
        });
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
          data: that.xval
        },
        yAxis: {
          type: "value",
          data: [200, 400, 600, 800, 1000, 1200, 1400, 1600]
        },
        series: [
          {
            name: "金额",
            type: "line",
            data: that.yval
          }
        ]
      });
    },
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
          data: that.xval
        },
        yAxis: {
          type: "value",
          data: [200, 400, 600, 800, 1000, 1200, 1400, 1600]
        },
        series: [
          {
            name: "金额",
            type: "line",
            data: that.yval
          }
        ]
      });
    },
    change() {
      var that = this;
      var value = this.value;
      console.log(value[0]);
      //开始时间
      var startTime = new Date(value[0]).format("yyyy-MM-dd hh:mm:ss");
      console.log(startTime);
      that.startTime = startTime;
      // 结束时间
      var endTime = new Date(value[1]).format("yyyy-MM-dd hh:mm:ss");
      that.endTime = endTime;

      this.axios
        .get("/shoppingmall/survey/specific", {
          params: {
            screeningStartTime: that.startTime,
            screeningEndTime: that.endTime
          }
        })
        .then(res => {
          console.log(res);
          this.payMoney = res.data.data.totalPrice + " 元";
          console.log(res.data.data.count);
          this.payOrder = res.data.data.count;
          this.payBuyer = res.data.data.userCount;
          this.payGoodsCount = res.data.data.goodsNumCount;
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getSeven();
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
.date {
  position: relative;
  z-index: 999;
}
.left {
  float: left;
}
.right {
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
.payCondition {
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

   