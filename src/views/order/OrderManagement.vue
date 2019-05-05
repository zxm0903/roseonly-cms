<template>
  <div id="ordermangement">
    <el-button @click="getalllist">全部订单</el-button>
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
      <el-table-column label="订单操作">
        <template slot-scope="scope">
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
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">查看订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="currentChange"
        :page-size="pageSize"
        :current-page.sync="page"
        background
        layout="prev, pager, next"
        :total="pageTotal"
      ></el-pagination>
    </div>
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
      pageSize: 6,
      page: 1,
      pageTotal: "",
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
      let that = this;
      this.axios
        .get("/orders/returns/all/list", {
          params: {
            admin: 12
          }
        })
        .then(res => {
          console.log(res);
          that.tableData = res.data.data.data;
          that.pageTotal = res.data.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    huanhuo(row) {
      this.axios
        .post("/orders/returns/agreement", {
          admin: 1,
          orderDetailIds: row.orderDetailId,
          method: 1,
          dealMethod: 1
        })
        .then(res => {
          console.log(res);
           if(res.data.code == 200){
            location.reload()
          }
        });
    },
    tuihuo(row) {
      this.axios
        .post("/orders/returns/agreement", {
          admin: 1,
          orderDetailIds: row.orderDetailId,
          method: 2,
          dealMethod: 1
        })
        .then(res => {
          console.log(res);
          if(res.data.code == 200){
            location.reload()
          }
        });
    },
    currentChange(val) {
      var that = this;
      this.axios
        .get("/orders/all/list", {
          params: {
            pageNo: val,
            pageSize: that.pageSize
          }
        })
        .then(res => {
          console.log("请求成功", res);
          that.tableData = res.data.data.data;
          that.pageTotal = res.data.data.count;
        })
        .catch(error => {
          console.log("请求失败", err);
        });
    },
    getalllist() {
      let that = this;
      this.axios
        .get("/orders/all/list", {
          params: {
            pageNo: 1,
            pageSize: that.pageSize
          }
        })
        .then(res => {
          console.log(res);
          that.tableData = res.data.data.data;
          that.pageTotal = res.data.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    let that = this;
    this.axios
      .get("/orders/all/list", {
        params: {
          pageNo: 1,
          pageSize: that.pageSize
        }
      })
      .then(res => {
        console.log(res);
        that.tableData = res.data.data.data;
        that.pageTotal = res.data.data.count;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

