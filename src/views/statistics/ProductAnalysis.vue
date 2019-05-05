<template>
  <div id="productAnalysis">
    <div style="height:200px">
      <div class="choose date clear">
        <div class="left">
          <span>快速查看</span>
          <input type="button" value="今日" @click="getToday">
          <input type="button" value="昨日" @click="getYearstoday">
          <input type="button" value="最近7日" @click="getSeven">
          <input type="button" value="最近30天" @click="getMonth">
        </div>
        <div class="right">
          <span style="margin-right:15px">选择日期</span>
          <!-- 测试 -->
          <!-- <span>{{value}}</span> -->
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
    </div>
    <!-- 表格 -->
    <template>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 80%"
      >
        <el-table-column label="名称" prop="goodsName"></el-table-column>
        <el-table-column label="浏览量" prop="goodsVisitiedCount"></el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @click="search"/>
          </template>
          <!-- <template slot-scope="scope">
            <el-button size="mini" class="btn" @click="look(scope.$index, scope.row)">查看</el-button>
          </template>-->
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="currentChange"
        :page-size="pageSize"
        :current-page.sync="page"
        background
        layout="prev, pager, next"
        :total="pageTotal"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// import { error } from "util";
export default {
  data() {
    return {
      val: "",
      value: "",
      payMoney: 0,
      payOrder: 0,
      payBuyer: 0,
      payGoodsCount: 0,
      pageTotal: 1,
      tableData: [],
      // 商品总数量
      totalpcsData: "",

      search: "",
      startTime:"",
      endTime:""
    };
  },
  methods: {
    change() {
      console.log('123');
      var that = this;
      var value = that.value;
      console.log(value[0]);
      //开始时间
      var startTime = new Date(value[0]).format("yyyy-MM-dd hh:mm:ss")
       console.log(startTime);
      that.startTime  =  startTime;
      // 结束时间
      var endTime =new Date(value[1]).format("yyyy-MM-dd hh:mm:ss")
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
          console.log(res);
          c;
        })
        .catch(error => {
          console.log(error);
        });
    },
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

          // 测试这里，可以的话复制给该页方法
          that.tableData = res.data.data.list;
          for (var i = 0; i < that.tableData.length; i++) {
            that.tableData[i].goodsVisitiedCount =
              res.data.data.goodsVisitiedCount;
          }

          console.log();
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

           that.tableData = res.data.data.list;
          for (var i = 0; i < that.tableData.length; i++) {
            that.tableData[i].goodsVisitiedCount =
              res.data.data.goodsVisitiedCount;
              }

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
      that.startTime =  new Date(time2).format("yyyy-MM-dd hh:mm:ss");
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
         
          this.payMoney = res.data.data.totalPrice + " 元";
          console.log(res.data.data.count);
          this.payOrder = res.data.data.count;
          this.payBuyer = res.data.data.userCount;
          this.payGoodsCount = res.data.data.goodsNumCount;

         that.tableData = res.data.data.list;
          for (var i = 0; i < that.tableData.length; i++) {
            that.tableData[i].goodsVisitiedCount =
              res.data.data.goodsVisitiedCount;
              }



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
      that.startTime =  new Date(time2).format("yyyy-MM-dd hh:mm:ss");
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

          
           that.tableData = res.data.data.list;
          for (var i = 0; i < that.tableData.length; i++) {
            that.tableData[i].goodsVisitiedCount =
              res.data.data.goodsVisitiedCount;
              }

         
        })
        .catch(error => {
          console.log(error);
        });
    },
    currentChange(val) {
      var that = this;
      this.axios
        .get("/shoppingmall/goods/statistics/selectBygoodsName", {
          params: {
            pageNo: val,
            pageSize: that.pageSize,
          
          }
        })
        .then(res => {
          console.log("请求成功", res);
          // that.tableData = res.data.data.data;
          // that.pageTotal = res.data.data.count;
        })
        .catch(error => {
          console.log("请求失败", error);
        });
    },
    search(){
      var that = this;

      that.axios.get(
       " /shoppingmall/goods/statistics/selectBygoodsName",{params:{
          goodsName:that.search
        }}
      ).then(res=>{
        console.log(res)
      })
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
.btn {
  background: rgb(170, 117, 117);
  border: none;
  padding: 10px 20px;
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