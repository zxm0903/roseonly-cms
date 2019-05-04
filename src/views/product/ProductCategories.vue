<template>
  <div id="productcategories">

    <!-- <el-tree :data="tableData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      row-key="value"
    >
      <el-table-column label="产品分类名称" prop="label"></el-table-column>
      <!-- <el-table-column label="产品父级分类名称" prop="value">

      </el-table-column> -->

      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="success" @click="addclass">添加产品分类</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row.value)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ProductCategoriesDetail :isdetail="isdetail"/>
    <CategoriesEdit :edit="edit"></CategoriesEdit>
    <!-- 分页器 -->
    <!-- <div class="block">
      <el-pagination
        @current-change="currentChange"
        :page-size="pageSize"
        :current-page.sync="page"
        background
        layout="prev, pager, next"
        :total="pageTotal"
      ></el-pagination>
    </div> -->
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
      },
      defaultProps: {
          children: 'children',
          label: 'label'
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
            // that.tableData.splice(index, 1);
            location.reload()
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
    // this.axios
    //   .get("/goods/classify/list", {
    //     params: {
    //       pageNo: 1,
    //       pageSize: that.pageSize
    //     }
    //   })
    //   .then(res => {
    //     // that.tableData = res.data
    //     console.log(res);

    //     if (res.data.code == 200) {
    //       that.tableData = res.data.data.data;
    //       that.pageTotal = res.data.data.count;
    //     }
    //   })
    //   .catch(err => {
    //     console.log("请求失败", err);
    //   });

    this.axios.get("/goods/storage")
      .then(res => {
        console.log("请求成功", res);
        let classlist = res.data.data;
        let list = [];
        classlist.map((e, i) => {
          console.log(e, i);
          list.push({
            value: e.goodsTypeId,
            label: e.goodsTypeName,
            parentId: e.goodsTypeSuperior
          });
        });
        // that.buildTree(list);
        list=DataToTree(list);
        console.log(list);
        that.tableData = list;
      })
      .catch(err => {
        console.log("请求失败", err);
        that.$message({
          showClose: true,
          message: '服务请求错误',
          type: 'warning'
        });
      });


    function DataToTree(data) {
      //没有父节点的数据
      let parents = data.filter(
        value => value.parentId == "-1" || value.parentId == null
      );

      //有父节点的数据
      let children = data.filter(
        value => value.parentId !== "-1" && value.parentId != null
      );

      //定义转换方法的具体实现
      let translator = (parents, children) => {
        //遍历父节点数据
        parents.forEach(parent => {
          //遍历子节点数据
          children.forEach((current, index) => {
            //此时找到父节点对应的一个子节点
            if (current.parentId === parent.value) {
              //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
              let temp = JSON.parse(JSON.stringify(children));
              //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
              temp.splice(index, 1);
              //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
              translator([current], temp);
              //把找到子节点放入父节点的children属性中
              typeof parent.children !== "undefined"
                ? parent.children.push(current)
                : (parent.children = [current]);
            }
          });
        });
      };

      //调用转换方法
      translator(parents, children);

      //返回最终的结果
      return parents;
    }
  }
};
</script>
