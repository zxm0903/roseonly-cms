<template>
  <div id="addproduct">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8">
        <el-form label-position="left" :rules="rules" ref="form" :model="form" label-width="80px">
          <el-form-item label="产品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="产品详情">
            <el-input v-model="form.detail"></el-input>
          </el-form-item>

          <el-form-item label="产品分类">
            <CateoriesSelect></CateoriesSelect>
          </el-form-item>
          <el-form-item label="产品规格">
            <el-input v-model="form.specs"></el-input>
          </el-form-item>
          <el-form-item label="产品颜色">
            <el-input v-model="form.color"></el-input>
          </el-form-item>
          <el-form-item label="产品价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="产品库存">
            <el-input v-model="form.num"></el-input>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-radio-group v-model="form.resource">
              <el-radio-button label="1">上架</el-radio-button>
              <el-radio-button label="0">下架</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="16">
        <!-- <h3>添加商品图片</h3> -->
        <el-button @click="uploadimg" type="primary">
          添加商品展示图片
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <el-col
          :xs="12"
          :sm="6"
          :md="4"
          :lg="3"
          v-for="(o, index) in changecheckimgs"
          :key="o"
          :offset="index > 0 ? 0 : 0"
        >
          <!-- <el-checkbox-button class="check-btn" :label="o"> -->
          <el-card class="card-box" :body-style="{ padding: '0px' }">
            <img :src="'http://172.16.7.76:8080/' + o.adminPicFileUrl" class="image">
          </el-card>
          <!-- </el-checkbox-button> -->
        </el-col>
        <!-- <el-button @click="updetailimg" type="primary">
          添加商品详情图片
          <i class="el-icon-upload el-icon--right"></i>
        </el-button> -->
        <!-- <span>{{changecheckimgs}}{{form.adminPicIds}}</span> -->
      </el-col>
    </el-row>
    <ImageBox></ImageBox>
  </div>
</template>
<script>
import ImageBox from "@/views/product/components/ImageBox";
import CateoriesSelect from "@/views/product/components/CategoriesSelect";
// import axios from
export default {
  name: "addproduct",
  components: {
    ImageBox,
    CateoriesSelect
  },
  data() {
    return {
      form: {
        name: "",

        color: "",
        price: "",
        num: "",
        detail: "",
        specs: "",
        resource: 0
      },

      rules: {
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        // region: [
        //   { required: true, message: "请选择活动区域", trigger: "change" }
        // ],
        color: { required: true, message: "请输入产品名称", trigger: "blur" },

        price: [
          { required: true, message: "产品价格不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        num: [
          { required: true, message: "产品库存不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        resource: [
          { required: true, message: "是否上下架", trigger: "change" }
        ],
        specs: [{ required: true, message: "请填产品详情", trigger: "blur" }]
      },
      isuploads: false,
      checkimgs: []
    };
  },
  computed: {
    change() {
      return this.$store.state.selectData;
    },
    changecheckimgs() {
      return this.$store.state.checkimgs;
    },
    imagescode() {
      let long = this.$store.state.checkimgs.map((el, i) => {
        return 2;
      });

      return long.join(",");
    },
    selectData() {
      return this.$store.state.selectData;
    },
    isimg(){
      return this.$store.state.isimg
    }
  },
  methods: {
    /*
     *提交商品信息
     */
    onSubmit() {
      var that = this.form,
        imgs = this.changecheckimgs.map((el, i) => {
          return el.adminPicId;
        }),
        // code = imgs.length;
        slect = this.selectData,
        code = this.imagescode;
      console.log(that, this.$store.state.selectData);
      this.axios
        .post("/goods/storage", {
          goodsTotal: that.num,
          goodsColor: that.color,
          goodsName: that.name,
          goodsPrice: that.price,
          goodsDetail: that.detail,
          goodsSpecs: that.specs,
          goodsTypeId: slect,
          adminPicIds: imgs.join(","),
          picCodes: code,
          goodsGroundingStatus: that.resource
        })
        .then(res => {
          console.log("请求成功", res);
          console.log(that.name);
          // if (res.state == 200) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          // }
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },

    uploadimg() {
      //  console.log(this.isuploads);
      this.$store.commit('changeisimg',1)
      this.$store.commit("changeisuploads", true);
      // this.changeisuploads = true;
      // console.log(this.isuploads);
    },
    updetailimg(){
      this.$store.commit('changeisimg',2)
      this.$store.commit("changeisuploads", true);
    }
  }
};
</script>

