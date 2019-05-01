<template>
  <div id="upload">
    <el-upload
      ref="upload"
      action="http://172.16.7.81:8080/goods/picture/upload"

      drag
      class="upload-demo"
      show-file-list="false"
      :on-success="imgres"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :data="imgdata"
      name="file"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>

    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="abort">取消</el-button> -->
  </div>
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      imgdata: {
        picName: "abc.png",
        picCode: 1,
        goodsId: 23
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    imgres(response, file, fileList) {
      console.log(response);
    }
  }
};
</script>

