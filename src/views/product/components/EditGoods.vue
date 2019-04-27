<template>
  <div id="editgoods">
    <el-dialog title="提示" :visible.sync="isedit.bool" width="30%" :before-close="handleClose">
      <GoodsForm></GoodsForm>
    </el-dialog>
  </div>
</template>
<script>
import GoodsForm from "@/views/product/components/GoodsForm";
export default {
  name: "editgoods",
  props: ["isedit"],
  components: {
    GoodsForm
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
