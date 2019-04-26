<template>
  <div id="productAnalysis">
    <div style="height:200px">
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
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[4]"
          :page-size="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpcsData"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
// import { error } from "util";
export default {
  data() {
    return {
      value: "",
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
  created() {
    this.axios
      // .get("", {
      //   totalpcsData:totalpcsData,
      //   tableData:tableData

      // })
      // .then(res => {
      //   console.log(res.data);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
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
    look(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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