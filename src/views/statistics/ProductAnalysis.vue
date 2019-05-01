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
        style="width: 100%"
      >
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="浏览量" prop="pageView"></el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" class="btn" @click="look(scope.$index, scope.row)">查看</el-button>
          </template>
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
      value: "",
      payMoney: 0,
      payOrder: 0,
      payBuyer: 0,
      payGoodsCount: 0,
      pageTotal: 1,
      tableData: [
        {
          name: "1",
          pageView: "1"
        },
        {
          name: "2",
          pageView: "2"
        },
        {
          name: "1",
          pageView: "1"
        },
        {
          name: "2",
          pageView: "2"
        }
      ],
      // 商品总数量
      totalpcsData: "",

      search: ""
    };
  },
  methods: {
    change() {
      var that = this;
      this.axios
        .get("/goods/statistics/specific", {
          params: {
            screeningStartTime: new Date()
              .toLocaleString("chanese", { hour12: false })
              .split("/")
              .join("-")
          }
        })
        .then(res => {
          console.log(res);

          // that.tableData.name = res.....
          // that.tableData.pageView = res...
        })
        .catch(error => {
          console.log(error);
        });
    },
    getToday() {
      var that = this;
      this.axios
        .get("/goods/statistics/all", {
          params: {
            screeningStartTime: new Date()
              .toLocaleString("chanese", { hour12: false })
              .split("/")
              .join("-")
          }
        })
        .then(res => {
          console.log(res);

          // that.tableData.name = res.....
          // that.tableData.pageView = res...
        })
        .catch(error => {
          console.log(error);
        });
    },
    getYearstoday() {
      var that = this;
      this.axios
        .get("/goods/statistics/all", {
          params: {
            screeningStartTime: new Date()
              .toLocaleString("chanese", { hour12: false })
              .split("/")
              .join("-")
          }
        })
        .then(res => {
          console.log(res);

          // that.tableData.name = res.....
          // that.tableData.pageView = res...
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

      var num = timetamp + oneDay;

      var time = new Date(num)
        .toLocaleString("chanese", { hour12: false })
        .split("/")
        .join("-");
      console.log(time);

      var sevenDay = 7 * 24 * 60 * 60 * 1000;
      var num2 = timetamp - sevenDay;

      var time2 = new Date(num2);

      // 赋值
      that.endTime = time2;
      console.log(time2);

      //计算开始时间
      var timeYear = new Date().getFullYear();
      var timeMonth = new Date().getMonth() + 1;
      var timeDay = new Date().getDate();
      var startTime = timeYear + "-" + timeMonth + "-" + timeDay + " 00:00:00";

      //计算结束时间
      var timeYear2 = time2.getFullYear();
      var timeMonth2 = time2.getMonth() + 1;
      var timeDay2 = time2.getDate();
      var startTime2 =
        timeYear2 + "-" + timeMonth2 + "-" + timeDay2 + " 00:00:00";
      console.log(startTime2);
      // var startTime = timeYear + "-" + timeMonth + "-" + timeDay ;
      console.log(startTime);
      var endStartTime = Number(startTime);
      console.log(endStartTime);
      console.log(timeYear, timeMonth, timeDay, startTime);

      // 给data里的开始时间赋值 在这里是筛选结束时间
      that.startTime = startTime;

      this.axios
        .get("/goods/statistics/all", {
          params: {
            screeningStartTime: that.endTime,
            screeningEndTime: that.startTime
          }
        })
        .then(res => {
          console.log(res);

          // that.tableData.name = res.....
          // that.tableData.pageView = res...
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMonth() {
      var that = this;
      this.axios
        .get("/goods/statistics/all", {
          params: {
            screeningStartTime: new Date()
              .toLocaleString("chanese", { hour12: false })
              .split("/")
              .join("-")
          }
        })
        .then(res => {
          console.log(res);

          // that.tableData.name = res.....
          // that.tableData.pageView = res...
        })
        .catch(error => {
          console.log(error);
        });
    },
    look(index, row) {
      console.log(index, row);
    },
    currentChange() {
      var that = this;
      this.axios
        .get("/goods/search/all/list", {
          params: {
            pageNo: val,
            pageSize: that.pageSize
          }
        })
        .then(res => {
          console.log("请求成功", res);
          that.tableData = res.data.data.data;
          that.pageTotal = res.data.data.count;
        })
        .catch(error => {
          console.log("请求失败", err);
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