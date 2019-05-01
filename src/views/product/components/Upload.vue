<template>
  <div id="upload">
    <el-upload
      ref="upload"
      action="http://172.16.7.81:8080/goods/picture/upload"
      list-type="picture-card"
      :on-success="imgres"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :data="imgdata"
      name="file"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传图片</el-button>
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
    imgres(response, file, fileList) {
      console.log(response);
    }
    // imgupload(a) {
    //   // let config = {
    //   //   headers: { "Content-Type": "multipart/form-data" }
    //   // };
    //   // console.log("456", a.file);
    //   // var imgFile = e.target.files[0];
    //   let formdate = new FormData();

    //   formdate.append("file", a.file);
    //   // console.log(formdate.get("file"));

    //   // formdate.append("picName", a.file.name);
    //   // formdate.append("picCode", "1");
    //   // formdate.append("picLinkUrl", "");

    //   console.log(a.file.name);

    //   this.axios
    //     .post("/goods/picture/upload", formdate)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log("1110", formdate, err);
    //     });

    // }
  }
};
</script>

