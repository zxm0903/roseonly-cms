<template>
  <div id="productcategories">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="产品分类名称" prop="goodsTypeName"></el-table-column>
      <el-table-column label="产品父级分类名称" prop="goodsTypeSuperior">
        <!-- <template slot-scope="scope">
            <template v-for="item in tableData">
              <span v-if="scope.row.goodsTypeSuperior"></span>
            </template>
        </template> -->
      </el-table-column>

      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="success" @click="addclass">添加产品分类</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row.goodsTypeId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ProductCategoriesDetail :isdetail="isdetail"/>
    <CategoriesEdit :edit="edit"></CategoriesEdit>
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
import CategoriesEdit from "@/views/product/components/CategoriesEdit";
// 引入添加产品分类组件
import ProductCategoriesDetail from "@/views/product/components/ProductCategoriesDetail";
export default {
  name: "productCategories",
  data() {
    return {
      page: 1,
      pageSize: 6,
      total: 1,
      tableData: [],
      search: "",
      edit: {
        isedit: false,
        editdata: ""
      },
      // dialog: false,
      isdetail: {
        bool: false,
        row: ""
      }
    };
  },
  components: {
    CategoriesEdit,
    ProductCategoriesDetail
  },
  methods: {
    handleEdit(data) {
      this.edit.isedit = true;
      this.edit.editdata = data;
    },
    handleDelete(index, id) {
      let that = this;
      this.axios
        .post("/goods/classify/delete", {
          goodsTypeId: id
        })
        .then(res => {
          // that.tableData = res.data
          console.log(res);
          if (res.data.code == 200) {
            that.tableData.splice(index, 1);
          }
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    addclass() {
      this.isdetail.bool = true;
    },
    currentChange(val) {
      var that = this;
      console.log("chufa", val, that.pageSize);
      this.axios
        .get("/goods/classify/list", {
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
  created() {
    var that = this;
    this.axios
      .get("/goods/classify/list", {
        params: {
          pageNo: 1,
          pageSize: that.pageSize
        }
      })
      .then(res => {
        // that.tableData = res.data
        console.log(res);

        if (res.data.code == 200) {
          that.tableData = res.data.data.data;
          that.pageTotal = res.data.data.count;
        }
      })
      .catch(err => {
        console.log("请求失败", err);
      });
  }
};
</script>
