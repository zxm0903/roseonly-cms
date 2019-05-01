<template>
  <el-dialog title="添加商品图片" :visible.sync="isupload" fullscreen="false" :before-close="handleClose">
    <span class="big-body-upload">
      <Upload></Upload>
    </span>
    <el-checkbox-group class="clearfix" v-model="checkList" @change="connn">
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
          <el-checkbox-button class="check-btn" :label="o.adminPicId">
            <el-card class="card-box" :body-style="{ padding: '0px' }">
              <img :src="'http://172.16.7.81:8080/' + o.adminPicFileUrl" class="image">

              <!-- <div style="padding: 8px;">
                <div class="bottom clearfix">
                  <span>好吃的汉堡</span>
                </div>
              </div>-->
            </el-card>
          </el-checkbox-button>
        </el-col>
      </el-row>
    </el-checkbox-group>

    <span slot="footer" class="dialog-footer">
      <el-button @click="isupload = false">取 消</el-button>
      <el-button type="primary" @click="isupload = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Upload from "@/views/product/components/Upload";
export default {
  data() {
    return {
      checkList: [],
      imgdatas: []
    };
  },
  props: ["isupload"],
  components: {
    Upload
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    connn() {
      console.log(this.checkList);
      this.$store.commit("changecheckimgs", this.checkList);
      this.$store.getters.doneimages
    }
  },
  created() {
    let that = this;
    this.axios
      .get("/goods/adminPic")
      .then(res => {
        console.log(res);
        that.imgdatas = res.data.data;
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


