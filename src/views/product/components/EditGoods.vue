<template>
  <!-- <div id="editgoods"> -->
  <el-dialog title="编辑" :visible.sync="iseditgoods" width="80%" :before-close="handleClose">
    <GoodsForm :row="isedit.row"></GoodsForm>
  </el-dialog>
  <!-- </div> -->
</template>
<script>
import GoodsForm from "@/views/product/components/GoodsForm";
export default {
  // data(){
  //   return {
  //     show:true
  //   }
  // },
  // name: "editgoods",
  props: ["isedit"],
  components: {
    GoodsForm
  },
  computed:{
    iseditgoods(){
      return this.$store.state.iseditgoods
    }
  },
  methods: {
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
          done();
        // })
        // .catch(_ => {});
    }
  }
};
</script>
