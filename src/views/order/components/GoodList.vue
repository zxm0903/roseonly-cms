<template>
  <div id="goodlist">
    <el-table :data="listdata" style="width: 100%">
      <el-table-column >
        <template slot-scope="props">
          <img :src="props.row.url">
          <!-- {{props.row}} -->
        </template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="价格（元）" width="180"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
      <el-table-column  label="小计（元）">
          <template slot-scope="props">
          
          {{props.row.num * props.row.price}}
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



