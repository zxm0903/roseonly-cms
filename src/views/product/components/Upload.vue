<template>
  <div id="upload">
    <el-upload
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
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
    
    name:'upload',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[
         
        ],
        imgdata:{
          s:1,
          d:1,
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
        console.log(this.fileList.length)
      },
    
    }
}
</script>

