<template>
  <div id="goodlist">
    <el-table :data="good" style="width: 100%">
      <el-table-column >
        <template slot-scope="props">
          <img :src="'http://172.16.7.76:8080/'+ props.row.goods.pictures[0].picFileUrl">
          <!-- {{props.row}} -->
        </template>
      </el-table-column>
      <el-table-column prop="goods.goodsName" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="goods.goodsPrice" label="价格（元）" width="180"></el-table-column>
      <el-table-column prop="goodsNum" label="数量"></el-table-column>
      <el-table-column  label="小计（元）">
          <template slot-scope="props">
          
          {{props.row.goodsNum * props.row.goods.goodsPrice}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "goodlist",
  data() {
    return {
      listdata: [
        {
          url: "http://pic.58pic.com/58pic/15/11/51/20E58PICNs4_1024.jpg",
          name: "鲜花",
          price: 185,
          num: 4
        },
        {
          url: "http://pic.58pic.com/58pic/15/11/51/20E58PICNs4_1024.jpg",
          name: "鲜花",
          price: "185.00",
          num: '1'
        }
      ]
    };
  },
  props: ["good"]
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>



