<template>
  <div id="transactionAnalysis">
    <div class="choose date clear">
      <div class="left">
        <span>快速查看</span>
        <input type="button" value="今日" @click="getToday">
        <input type="button" value="昨日" @click="getYearstoday">
        <input type="button" value="最近7日" autofocus="ture" @click="getSeven">
        <input type="button" value="最近30天" @click="getMonth">
      </div>
      <div class="right">
        <span style="margin-right:15px">选择日期</span>
        <el-date-picker
          v-model="value"
          @change="change"
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
    <!-- 倒三角图 -->

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
     
      startTime: "",
      endTime: "",
      // 访客
      visitPeople: "",
      // 下单数
      xiadanPeople: ""
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
          this.payMoney = res.data.data.totalPrice + " 元";
          console.log(res.data.data.count);
          this.payOrder = res.data.data.count;
          this.payBuyer = res.data.data.userCount;
          this.payGoodsCount = res.data.data.goodsNumCount;

          // 处理从数据库获取的时间及数据 并给data赋值
          that.pay_Money = res.data.data.totalPrice;
          that.xiadanPeople = res.data.data.userCount;
          that.visitPeople  = res.data.data.visitedCount;
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
         
           that.pay_Money = res.data.data.totalPrice;
          that.xiadanPeople = res.data.data.userCount;
          that.visitPeople  = res.data.data.visitedCount;
          that.drawLine();
          
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
           that.pay_Money = res.data.data.totalPrice;
          that.xiadanPeople = res.data.data.userCount;
          that.visitPeople  = res.data.data.visitedCount;
          that.drawLine();
        })
        .catch(error => {
          console.log(error);
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
          that.pay_Money = res.data.data.totalPrice;
          that.xiadanPeople = res.data.data.userCount;
          that.visitPeople  = res.data.data.visitedCount;
          that.drawLine();
        })
        .catch(error => {
          console.log(error);
        });
    },
    change() {
      var that = this;
      var value = that.value;
      console.log(value[0]);
      //开始时间
      var startTime = new Date(value[0]).format("yyyy-MM-dd hh:mm:ss");
      console.log(startTime);
      that.startTime = startTime;
      // 结束时间
      var endTime = new Date(value[1]).format("yyyy-MM-dd hh:mm:ss");
      that.endTime = endTime;

      this.axios
        .get("/shoppingmall/survey/seven", {
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
           that.pay_Money = res.data.data.totalPrice;
          that.xiadanPeople = res.data.data.userCount;
          that.visitPeople  = res.data.data.visitedCount;
          that.drawLine();
        })
        .catch(error => {
          console.log(error);
        });
    },
    drawLine() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "交易分析" },
        tooltip: {
          // trigger: "axis"
        },
        legend: {
          data: ["访客", "下单", "付款"]
        },
        series: [
          {
            name: "漏斗图",
            type: "funnel",
            left: "10%",
            top: 60,
            //x2: 80,
            bottom: 60,
            width: "80%",
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: that.visitPeople, name: "访客" },
              { value: that.xiadanPeople, name: "下单" },
              { value: that.pay_Money, name: "付款" }
            ]
          }
        ]
      });
    },
   
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