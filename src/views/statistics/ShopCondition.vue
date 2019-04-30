<template>
  <div id="shopCondition">
    <div class="choose date clear">
      <div class="left">
        <span>快速查看</span>
        <input type="button" value="今日" @click="getToday">
        <input type="button" value="昨日" @click="getYearstoday">
        <input type="button" value="最近7日" @click="getSeven">
        <input type="button" value="本月" @click="getMonth">
      </div>
      <div class="right">
        <span style="margin-right:15px">选择日期</span>
        <span>{{value}}</span>
        <el-date-picker
          v-model="value"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          default-value="2010-10-01"
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
      yval: []
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getToday() {
      console.log(
        new Date()
          .toLocaleString("chanese", { hour12: false })
          .split("/")
          .join("-")
      );

      var that = this;

      this.axios
        .get("/shoppingmall/survey/specific", {
          params: {
            screeningStartTime: new Date()
              .toLocaleString("chanese", { hour12: false })
              .split("/")
              .join("-")
          }
        })
        .then(res => {
          console.log(res);

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
          data: [100, 200, 300, 400, 500, 600]
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
    getYearstoday() {
      var that = this;

      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
           screeningStartTime: new Date().toLocaleString('chanese',{hour12:false}).split('/').join('-')
          }
        })
        .then(res => {
          console.log(res);

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
          data: [200,400,600,800,1000,1200,1400,1600]
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
    getSeven() {
      var that = this;

      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
           screeningStartTime: new Date().toLocaleString('chanese',{hour12:false}).split('/').join('-')
          }
        })
        .then(res => {
          console.log(res);

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
          data: [200,400,600,800,1000,1200,1400,1600]
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

      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
            screeningStartTime: new Date()
              .toLocaleString("chanese", { hour12: false })
              .split("/")
              .join("-")
          }
        })
        .then(res => {
          console.log(res);

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
      var that = this;

      this.axios
        .get("/shoppingmall/survey/senven", {
          params: {
            screeningStartTime: new Date()
              .toLocaleString("chanese", { hour12: false })
              .split("/")
              .join("-")
          }
        })
        .then(res => {
          console.log(res);

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
    change() {
      var that = this;
      var value = this.value;
      that.value = value
        .toLocaleString("chanese", { hour12: false })
        .split("/")
        .join("-");
      console.log(val);
      thia.axios
        .get("/shoppingmall/survey/specific", {
          params: {
            screeningStartTime: that.value
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {}
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

   