<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="操作时间" prop="operationTime"></el-table-column>
      <el-table-column label="操作类型" prop="operation"></el-table-column>
      <el-table-column label="操作详情描述" prop="operationDetail"></el-table-column>
      <el-table-column label="操作人" prop="admin.adminName"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
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
export default {
  data() {
    return {
      tableData: [],
      search: "",
      pageTotal: "",
      page: 1,
      pageSize: 6
    };
  },
  methods: {
    //   分页器

    currentChange(val) {
      var that = this;
      console.log("chufa", val, that.pageSize);
      this.axios
        .get("/log/list", {
          params: {
            pageNo: val,
            pageSize: that.pageSize
          }
        })
        .then(res => {
          console.log(res);
          console.log(res.data.code);
          that.tableData = res.data.data.data;
          that.pageTotal = res.data.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // watch() {
  //   currenChange();
  // },
  created() {
    var that = this;
    this.axios
      .get("/log/list", {
        params: {
          pageNo: 1,
          pageSize: that.pageSize
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data.code);
        that.tableData = res.data.data.data;
        that.pageTotal = res.data.data.count;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>