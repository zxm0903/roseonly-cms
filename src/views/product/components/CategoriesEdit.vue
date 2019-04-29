<template>
  <el-dialog title="提示" :visible.sync="edit.isedit" width="30%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
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
export default {
  data() {
    return {
      form: {
        name: 'sc'
      }
    };
  },
  props: ["edit"],
  methods: {
    onSubmit() {
      let that = this;
      this.axios
        .get("/goods/classify/edit", {
          goodsTypeId: that.editdata.goodsTypeId
        })
        .then(res => {
          console.log(res);
          that.edit.isedit = false;
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
      handleClose(done) {
      done();
    }
  }
};
</script>

