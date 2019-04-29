<template>
  <div id="productcategories">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="产品分类名称" prop="goodsTypeName"></el-table-column>
      <el-table-column label="产品分类名称" prop="goodsTypeName"></el-table-column>

      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="success" @click="addclass">添加产品分类</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.goodsTypeId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <CategoriesEdit :edit="edit"></CategoriesEdit>
  </div>
</template>
<script>
import CategoriesEdit from "@/views/product/components/CategoriesEdit";
export default {
  name: "productcategories",
  data() {
    return {
      tableData:[],
      search: "",
      edit: {
        isedit: false,
        editdata: ""
      }
    };
  },
  components: {
    CategoriesEdit
  },
  methods: {
    handleEdit(data) {
      this.edit.isedit = true;
      this.edit.editdata = data;
    },
    handleDelete(index,id) {
      let that = this
      this.axios
        .post("/goods/classify/delete", {
          goodsTypeId: id
        })
        .then(res => {
          // that.tableData = res.data
          console.log(res);
          if(res.data.code == 200){
             that.tableData.splice(index,1)
          }
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    addclass(){
      
    }
  },
  created() {
    var that = this;
    this.axios
      .get("/goods/classify/list", {
        admin: ""
      })
      .then(res => {
        // that.tableData = res.data
        console.log(res.data.data.data);

        if(res.data.code == 200){
          that.tableData = res.data.data.data;
        }
      })
      .catch(err => {
        console.log("请求失败", err);
      });
  }
};
</script>
