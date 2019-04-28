<template>
  <div id="ordermangement">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <!-- <template slot-scope="props"> -->
       <GoodList :good="tableData"></GoodList>

        <!-- {{props.row.name[0]}} -->
        <!-- {{props.row.name[1]}} -->
        <!-- </template> -->
      </el-table-column>

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="订单编号" prop="id"></el-table-column>

      <el-table-column label="买家/联系方式" prop="buy"></el-table-column>
      <el-table-column label="实付金额（元）" prop="price"></el-table-column>
      <el-table-column label="订单状态" prop="orderstate"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">查看订单</el-button>
          <el-button size="mini" v-if="scope.row.orderstate == 1" type="danger" @click="consignment">发货</el-button>
          <!-- <el-button size="mini" type="success">打印订单</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <orderdetail :isdetail="isdetail" />
    <Consignment :dialog="dialog"></Consignment>
  </div>
</template>
<script>
import GoodList from '@/views/order/components/GoodList'
import Consignment from '@/views/order/components/Consignment'
import orderdetail from '@/views/order/components/Orderdetail'
export default {
  name: "ordermanagement",
  components:{
    GoodList,
    Consignment,
    orderdetail
  },
  data() {
    return {
      dialog:false,
      isdetail:{
        bool:false,
        row:''
      },
      tableData: [
        {
          name: ["鲜花", "ghj"],
          id: "12345",
          num: "12/2",
          buy: "zxm/15882796070",
          url:'http://pic.58pic.com/58pic/15/11/51/20E58PICNs4_1024.jpg',
          price: "24",
          orderstate: 1
        },
        {
          name: ["鲜花", "ghj"],
          id: "12345",
          num: "12/2",
          buy: "zxm/15882796070",
          url:'http://pic.58pic.com/58pic/15/11/51/20E58PICNs4_1024.jpg',
          price: "24",
          orderstate: 1
        },
        {
          name: ["鲜花", "ghj"],
          id: "12345",
          num: "12/2",
          buy: "zxm/15882796070",
          url:'http://pic.58pic.com/58pic/15/11/51/20E58PICNs4_1024.jpg',
          price: "24",
          orderstate: 2
        }
      ],
      search: ""
    };
  },
  methods:{
    consignment() {
      this.dialog = true;
    },
    handleEdit(row){
      this.isdetail.bool = true
      this.isdetail.row = row
    }
  }
};
</script>

