
<template>
  <el-dialog title="添加商品分类" :visible.sync="isdetail.bool" width="40%" :before-close="handleClose">
    <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
      <el-form-item label="分类名称">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="选择分类上级">
        <CateoriesSelect></CateoriesSelect>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import CateoriesSelect from "@/views/product/components/CategoriesSelect";
export default {
  data() {
    return {
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  props: ["isdetail"],
  components: {
    CateoriesSelect
  },
  methods: {
    onSubmit() {
      var that = this;
      this.axios
      .post('/goods/classify/add',{
          goodsTypeName:'',
          goodsTypeSuperior:2
      })
      .then(res=>{
          console.log(res);

      })
      .catch((error)=>{
          console.log(error)
      })
    },
    handleClose(done) {
      done();
    }
  }
};
</script>
