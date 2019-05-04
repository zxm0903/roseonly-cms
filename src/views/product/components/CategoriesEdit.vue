<template>
  <el-dialog title="提示" :visible.sync="edit.isedit" width="30%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" :placeholder="edit.editdata.label"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <CateoriesSelect></CateoriesSelect>
      </el-form-item>

      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="edit.isedit = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import CateoriesSelect from "@/views/product/components/CategoriesSelect"
export default {
  data() {
    return {
      form: {
        name: ''
      }
    };
  },
  props: ["edit"],
  components:{
    CateoriesSelect
  },
  computed:{
    change() {
      return this.$store.state.selectData;
    },
  },
  methods: {
    onSubmit() {
      let that = this;
      console.log(this.change)
      this.axios
        .post("/goods/classify/edit", {
          goodsTypeId: that.edit.editdata.value,
          goodsTypeName:that.form.name,
          goodsTypeSuperior:that.change
        })
        .then(res => {
          console.log(res);
          if(res.data.code == 200){
            location.reload()
          }
        })
        .catch(err => {
          console.log("请求失败", err);
        });
        // this.edit.isedit = false;
    },
      handleClose(done) {
      done();
    }
  }
};
</script>

