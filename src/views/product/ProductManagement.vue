<template>
  <div id="productmanagement">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="录入时间" prop="groudingTime"></el-table-column>
      <el-table-column label="产品名称" prop="goodsName"></el-table-column>
      <el-table-column label="分类名称" prop="goodsType.goodsTypeName"></el-table-column>
      <el-table-column label="商品状态" prop="goodsType.goodsTypeName"></el-table-column>
      <el-table-column align="right">
        
        <template slot-scope="scope">
          <el-button size="mini" type="success"  @click="shangjia(scope.row.goodsId)">上架</el-button>
          <el-button size="mini" type="success"  @click="xiajia(scope.row.goodsId)">下架</el-button>
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
  </div>
</template>
<script>
import EditGoods from '@/views/product/components/EditGoods'
export default {
  name: "productmanagement",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "鲜花",
          address: "新品",
          goodsId:1
        }
      ],
      search: "",
      isedit:{
        bool:false,
        row:''
      }
    };
  },
  components:{
    EditGoods
  },
  methods: {
    handleEdit(row) {
      console.log(row);
      this.isedit = {
        bool:true,
        row:row
      }
    },
    handleDelete(index,row) {
      console.log(row);

      let that = this;
      this.axios
        .post("/goods/list/delete", {
          goodsIds: row.goodsId
        })
        .then(res => {
          console.log("请求成功", res);
          // that.tableData = res.data;
          // that.tableData.splice(index,1)
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    look(){
      window.open('http://www.baidu.com',"_blank")
    }
  },
  created() {
    let that = this;
    this.axios
      .get("/goods/search/all/list")
      .then(res => {
        console.log("请求成功", res);
        that.tableData = res.data.data.data;
      })
      .catch(err => {
        console.log("请求失败", err);
      });
  }
};
</script>

