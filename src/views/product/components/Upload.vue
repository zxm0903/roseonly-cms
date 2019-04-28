<template>
  <div id="upload">
    <el-upload
      ref="upload"
      action="string"
      list-type="picture-card"
      :http-request="imgupload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="false"
      :data="imgdata"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
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
    submitUpload() {
      this.$refs.upload.submit();
      console.log(this.dialogImageUrl);
    },
    imgupload(a) {
      let config = {
        headers: {
          "Content-Type":"multipart/form-data"
        }
      };
      console.log("456", a.file);
      // var imgFile = e.target.files[0];
      var formdate = new FormData();
      console.log(formdate)
      formdate.append('file', a.file);
      formdate.append("picName", a.file.name);
      formdate.append("picCode", 1);
      formdate.append("picLinkUrl", "");
      console.log(formdate)
      this.axios
        .post("/goods/picture/upload",formdate,config)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("1110",formdate, err);
        });
    }
  }
};
</script>

