<template>
  <div id="productmanagement">
    <CateoriesSelect></CateoriesSelect>
    <el-button @click="shanglist">已上架</el-button>
    <el-button @click="xialist">已下架</el-button>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column label="录入时间" prop="groudingTime"></el-table-column>
      <el-table-column label="产品名称" prop="goodsName"></el-table-column>
      <el-table-column label="分类名称" prop="goodsType.goodsTypeName"></el-table-column>
      <el-table-column label="价格" prop="goodsPrice"></el-table-column>
      <el-table-column label="商品状态">
        <template slot-scope="scope">
          <span v-if="scope.row.goodsGroundingStatus == 1">已上架</span>
          <span v-if="scope.row.goodsGroundingStatus == 0">已下架</span>
        </template>
      </el-table-column>
      <el-table-column label="商品上架/下架" align="left">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.goodsGroundingStatus == 0"
            type="success"
            @click="shangjia(scope.$index,scope.row.goodsId)"
          >上架</el-button>
          <el-button
            size="mini"
            v-if="scope.row.goodsGroundingStatus == 1"
            type="danger"
            @click="xiajia(scope.$index,scope.row.goodsId)"
          >下架</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑产品</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="look(scope.row.goodsId)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditGoods :isedit="isedit"></EditGoods>
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
import EditGoods from "@/views/product/components/EditGoods";
import CateoriesSelect from "@/views/product/components/CategoriesSelect";
export default {
  name: "productmanagement",
  data() {
    return {
      pageSize: 6,
      page: 1,
      pageTotal: "",
      tableData: [],
      search: "",
      isedit: {
        bool: false,
        row: ""
      }
    };
  },
  components: {
    EditGoods,
    CateoriesSelect
  },
  methods: {
    handleEdit(row) {
      console.log(row);
      this.isedit = {
        bool: true,
        row: row
      };
    },
    handleDelete(index, row) {
      console.log(row);

      let that = this;
      this.axios
        .post("/goods/list/delete", {
          adminId: 1,
          goodsIds: row.goodsId
        })
        .then(res => {
          console.log("请求成功", res);
          // that.tableData = res.data;
          if (res.data.code == 200) {
            that.tableData.splice(index, 1);
          }
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    look(id) {
      window.open("http://172.16.7.11:8080/goodsDetail/" + id, "_blank");
    },
    shangjia(index, id) {
      let that = this;
      this.axios
        .post("/goods/grouding", {
          adminId: 1,
          goodsIds: id
        })
        .then(res => {
          console.log("请求成功", res);
          if (res.data.code == 200) {
            that.tableData[index].goodsGroundingStatus = 1;
          }
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    xiajia(index, id) {
      let that = this;
      this.axios
        .post("/goods/under", {
          adminId: 1,
          goodsIds: id
        })
        .then(res => {
          console.log("请求成功", res);
          if (res.data.code == 200) {
            that.tableData[index].goodsGroundingStatus = 0;
          }
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    currentChange(val) {
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
    },
    shanglist() {
      let that = this;
      this.axios
        .get("/goods/grouding/1/list", {
          params: {
            adminId: 1,
            pageNo: 1,
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
    },
    xialist() {
      let that = this;
      this.axios
        .get("/goods/grouding/0/list", {
          params: {
            adminId: 1,
            pageNo: 1,
            pageSize: that.pageSize
          }
        })
        .then(res => {
          console.log("请求成功", res);
          that.tableData = res.data.data.data || [];
          that.pageTotal = res.data.data.count || 0;
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    }
  },
  created() {
    let that = this;
    this.axios
      .get("/goods/search/all/list", {
        params: {
          pageNo: 1,
          pageSize: that.pageSize
        }
      })
      .then(res => {
        console.log("请求成功", res);
        that.tableData = res.data.data.data;
        that.pageTotal = res.data.data.count;
      })
      .catch(err => {
        console.log("请求失败", err);
         that.$message({
          showClose: true,
          message: '服务请求错误',
          type: 'warning'
        });
      });
  }
};
</script>

