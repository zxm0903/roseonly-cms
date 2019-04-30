<template>
  <div id="addproduct">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8">
        <el-form label-position="left" ref="form" :model="form" label-width="80px">
          <el-form-item label="产品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="产品详情">
            <el-input v-model="form.detail"></el-input>
          </el-form-item>

          <el-form-item label="产品分类">
            <!-- <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option label="分类一" value="shanghai"></el-option>
              <el-option label="分类二" value="beijing"></el-option>
            </el-select>-->
            <CateoriesSelect></CateoriesSelect>
          </el-form-item>

          <el-form-item label="产品颜色">
            <el-input v-model="form.color"></el-input>
          </el-form-item>
          <el-form-item label="产品价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="产品库存">
            <el-input v-model="form.num"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="onget">GET</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="16">
        <Upload></Upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Upload from "@/views/product/components/Upload"
import CateoriesSelect from "@/views/product/components/CategoriesSelect"
// import axios from 
export default {
  name: "addproduct",
  components: {
    Upload,
    CateoriesSelect
  },
  data() {
    return {
      form: {
        name: "",
        region:this.$store.state.selectData,
        color: "",
        price: "",
        num: '',
        detail:'',
        specs:'80cm'
      }
    };
  },
  methods:{
    /*
    *提交商品信息
    */
    onSubmit(){
      var that = this.form
      console.log(that,this.$store.state.selectData)
      this.axios.post('/goods/storage',{


          goodsTotal:that.num,
          goodsColor:that.color,
          goodsName:that.name,
          goodsPrice:that.price,
          goodsDetail:that.detail,
          goodsSpecs:that.specs,
          goodsTypeId:that.region

      })
      .then((res) => {
        console.log('请求成功',res)
        console.log(that.name)
      })
      .catch((err) => {
        console.log('请求失败',err,)
      })
    },
    
 
  },

};
</script>

