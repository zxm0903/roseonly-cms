<template>
  <div id="ordermangement">
    <el-button @click="gettui">退换货列表</el-button>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <GoodList :good="props.row.trolleys"></GoodList>

          <!-- {{props.row.trolleys[0].goods.goodsName}} -->
          <!-- {{props.row.name[1]}} -->
        </template>
      </el-table-column>

      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column label="订单编号" prop="orderDetailId"></el-table-column>
      <el-table-column label="买家" prop="user.username"></el-table-column>
      <el-table-column label="联系方式" prop="user.cellphone"></el-table-column>
      <el-table-column label="实付金额（元）" prop="orderDetailTotalPrice"></el-table-column>
      <el-table-column label="订单状态" prop="orderDetailStatus"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">查看订单</el-button>
          <el-button
            size="mini"
            v-if="scope.row.orderDetailStatus == '已支付'"
            type="danger"
            @click="consignment(scope.$index,scope.row)"
          >发货</el-button>
          <el-button
            size="mini"
            v-if="scope.row.orderDetailStatus == '换货'"
            type="danger"
            @click="huanhuo(scope.row)"
          >同意换货</el-button>
          <el-button
            size="mini"
            v-if="scope.row.orderDetailStatus == '退货'"
            type="danger"
            @click="tuihuo(scope.row)"
          >同意退货</el-button>
          <!-- <el-button size="mini" type="success">打印订单</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <orderdetail :isdetail="isdetail"/>
    <Consignment :dialog="consign"></Consignment>
  </div>
</template>
<script>
import GoodList from "@/views/order/components/GoodList";
import Consignment from "@/views/order/components/Consignment";
import orderdetail from "@/views/order/components/Orderdetail";
export default {
  name: "ordermanagement",
  components: {
    GoodList,
    Consignment,
    orderdetail
  },
  data() {
    return {
      dialog: false,
      consign: {
        bool: false,
        row: ""
      },
      isdetail: {
        bool: false,
        row: ""
      },
      tableData: [],
      search: ""
    };
  },
  methods: {
    consignment(index, row) {
      this.consign.bool = true;
      this.consign.row = row;
    },
    handleEdit(row) {
      this.isdetail.bool = true;
      this.isdetail.row = row;
    },
    gettui() {
      this.axios
        .get("/orders/returns/all/list",{
          params:{
            admin:12
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    huanhuo(row){
      this.axios.post('/orders/returns/agreement',{
        admin:1,
        orderDetailIds:row.orderDetailId,
        method:1,
        dealMethod:1
      })
      .then(res => {
        console.log(res)
      })
    },
     tuihuo(row){
      this.axios.post('/orders/returns/agreement',{
        admin:1,
        orderDetailIds:row.orderDetailId,
        method:2,
        dealMethod:1
      })
      .then(res => {
        console.log(res)
      })
    },
  },
  created() {
    let that = this;
    this.axios
      .get("/orders/all/list")
      .then(res => {
        console.log(res);
        that.tableData = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

