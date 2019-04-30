<template>
  <div id="goodsform">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8">
        <el-form label-position="left" ref="form" :model="form" label-width="80px">
          <el-form-item label="产品名称">
            <el-input v-model="row.goodsName" :placeholder="row.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="产品详情">
            <el-input v-model="row.goodsDetail" :placeholder="row.goodsDetail"></el-input>
          </el-form-item>

          <el-form-item label="产品分类">
            <!-- <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option label="分类一" value="shanghai"></el-option>
              <el-option label="分类二" value="beijing"></el-option>
            </el-select>-->
            <CateoriesSelect></CateoriesSelect>
          </el-form-item>

          <el-form-item label="产品颜色">
            <el-input v-model="row.goodsColor" :placeholder="row.goodsColor"></el-input>
          </el-form-item>
          <el-form-item label="产品价格">
            <el-input v-model="row.goodsPrice" :placeholder="row.goodsPrice"></el-input>
          </el-form-item>
          <el-form-item label="产品库存">
            <el-input v-model="row.goodsTotal" :placeholder="row.goodsTotal"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(row.goodsId)">修改</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
          <!-- <el-form-item v-if="location == '/productmanagement'">
            <el-button type="primary" @click="onEdit">edit</el-button> -->
            <!-- <el-button>取消</el-button> -->
          <!-- </el-form-item> -->
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="16">
        <!-- <Upload></Upload> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import Upload from "@/views/product/components/Upload";
import CateoriesSelect from "@/views/product/components/CategoriesSelect";
// import axios from
export default {
  name: "goodsform",
  components: {
    // Upload,
    CateoriesSelect
  },
  data() {
    return {
      form: {}
    };
  },
  props:[
    'row'
  ],
  computed:{
    change:function(){
      return this.form = this.row
    }
  },
  methods: {
    /*
     *提交商品信息
     */
    onSubmit(id) {
      var that = this.row;//假的
      console.log(id,that);
      this.axios
        .post("/goods/"+ id +"/update", {
          adminId:1,
          goodsTotal: that.goodsTotal,
          goodsColor: that.goodsColor,
          goodsName: that.goodsName,
          goodsPrice: that.goodsPrice,
          goodsDetail: that.goodsDetail,
          goodsSpecs: that.goodsSpecs,
          goodsTypeId: this.$store.state.selectData,
          
        })
        .then(res => {
          console.log("请求成功", res);
          console.log(that.name);
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    onEdit(row) {
      console.log(row);
    //   let that = this;
      this.axios
        .post("/goods/list/delete", {
          goodsId: row.goodsId
        })
        .then(res => {
          console.log("请求成功", res);
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    }
  }
};
</script>

