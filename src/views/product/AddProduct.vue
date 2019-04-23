<template>
  <div id="addproduct">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8">
        <el-form label-position="left" ref="form" :model="form" label-width="80px">
          <el-form-item label="产品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="产品分类">
            <!-- <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option label="分类一" value="shanghai"></el-option>
              <el-option label="分类二" value="beijing"></el-option>
            </el-select> -->
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
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="16">
        <Upload></Upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Upload from "@/views/product/components/Upload";
import CateoriesSelect from "@/views/product/components/CategoriesSelect"
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
        region: "",
        color:'红色',
        price:'',
        num:''
      }
    };
  }
};
</script>

