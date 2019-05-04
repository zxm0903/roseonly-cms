<template>
  <el-dialog title="添加商品图片" :visible="isuploads" fullscreen="false" :before-close="close">
    <span class="big-body-upload">
      <Upload></Upload>
    </span>
    <el-checkbox-group class="clearfix" v-model="checkList">
      <el-row>
        <el-col
          :xs="12"
          :sm="6"
          :md="4"
          :lg="3"
          v-for="(o, index) in imgdatas"
          :key="o"
          :offset="index > 0 ? 0 : 0"
        >
          <el-checkbox-button class="check-btn" :label="o">
            <el-card class="card-box" :body-style="{ padding: '0px' }">
              <img :src="'http://172.16.7.81:8080/' + o.adminPicFileUrl" class="image">

            </el-card>
          </el-checkbox-button>
        </el-col>
      </el-row>
    </el-checkbox-group>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="connn">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Upload from "@/views/product/components/Upload";
export default {
  data() {
    return {
      checkList: [],
      // imgdatas: []
    };
  },
  // props: ["isuploads"],
  components: {
    Upload
  },
  computed:{
  isuploads(){
    return this.$store.state.isuploads
  },
  imgdatas(){
    return this.$store.state.imgdatas
  }
  },
  methods: {
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
          done()
          this.isuploads = false
        // })
        // .catch(_ => {});
    },
    connn() {
      // this.isuploads = false
      console.log(123,this.checkList);
      this.$store.commit("changecheckimgs", this.checkList);
      // this.$store.getters.doneimages
      this.$store.commit("changeisuploads",false);
    },
    close(done){
      this.$store.commit("changeisuploads",false);
    },
  
  },
  created() {
    let that = this;
    this.axios
      .get("/goods/adminPic")
      .then(res => {
        console.log(res);
        this.$store.commit('changeimgdata',res.data.data)
        // that.imgdatas = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style>
/* .big-body-upload {
  float: left;
} */
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.check-btn {
  margin-bottom: 20px;
  margin-right: 20px;
}
.card-box {
  height: 130px;
}
.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  max-height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>


