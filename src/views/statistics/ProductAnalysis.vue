<template>
  <div id="productAnalysis">
    <div style="height:200px">
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
      <!-- 分页器
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="totalpcsData"></el-pagination>
      </div>-->
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
    change(){
     
       var that = this;
      this.axios
        .get(" /goods/statistics/specific", {
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
    getMonth() {
       var that = this;
      this.axios.get("/goods/statistics/all", {
        params: {
          screeningStartTime: new Date()
            .toLocaleString("chanese", { hour12: false })
            .split("/")
            .join("-")
        }
      }).then(res=>{
        console.log(res)

        // that.tableData.name = res.....
        // that.tableData.pageView = res...
      }).catch(error=>{
        console.log(error)
      })
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