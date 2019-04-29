<template>
  <!-- <div> -->
  <el-dialog title="订单详情" :visible.sync="isdetail.bool" width="80%" :before-close="handleClose">
    <form id="printTest">
      <div class="mssege1">
        <p>
          订单编号:
          <span v-text="new Date().getTime() + '' +isdetail.row.orderDetailId"></span>
          订单状态:
          <span v-text="isdetail.row.orderDetailStatus"></span>
        </p>
        <p>
          收获人信息:
          <!-- <span>{{isdetail.row.user.username}}</span> -->
        </p>
        <p>
          支付方式:
          <span>{{isdetail.row.payMethod}}</span>
        </p>
        <p>
          配送方式:
          <span>{{sendWay}}</span>
        </p>
      </div>
      <div class="mssege2">
        <h4>物流详情</h4>
        <div>
          <span>{{expressWay}}</span>
        </div>
      </div>
      <div class="mssege3">
        <h4>购物清单</h4>
        <table cellspacing="0" class="table2">
          <tr>
            <td>名称</td>
            <td>价格</td>
            <td>数量</td>
            <td>小计</td>
          </tr>
          <tr v-for="(table,index) in tables" :key="index">
            <td>
              <div>
                <img :src="tables.url" alt>
                <span v-text="tables.pictureName"></span>
              </div>
            </td>
            <td>
              <span>￥</span>
              <span v-text="tables.prise"></span>
            </td>
            <td>
              <span v-text="tables.count"></span>
            </td>
            <td>
              <span>￥</span>
              <span v-text="tables.priseTotal"></span>
            </td>
          </tr>
        </table>
        <div class="messege3_1">
          <div>
            <p>
              商品总额
              <span>￥</span>
              <span v-text="priseAll"></span>
            </p>
            <p>
              优惠金额
              <span>￥</span>
              <span v-text="privilege"></span>
            </p>
            <p>
              运费
              <span>￥</span>
              <span v-text="sendMoney"></span>
            </p>
          </div>
        </div>
      </div>
    </form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="isdetail.bool = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false" v-print="'#printTest'">打印订单</el-button>
    </span>
  </el-dialog>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      // 配送方式
      sendWay: "包邮",
      // 图片名称
      pictureName: "",
      tables: [
        {
          // 图片地址
          url: "",
          // 商品价格
          prise: "",
          count: "",
          // 商品小计
          priseTotal: ""
        }
      ],

      // 总价
      priseAll: "",
      // 优惠金额
      privilege: "",
      // 运费
      sendMoney: ""
    };
  },
  props: ["isdetail"],
  methods: {
    handleClose(done) {
      done();
    }
  },
  created() {}
};
</script>

 <style>
.mssege1 {
  width: 100%;
  height: 20%;
  border: 1px solid rgb(81, 76, 76);
  border-bottom: none;
  padding: 20px;
  text-align: left;
}
.mssege1 p {
  margin-left: 100px;
  margin: 20px;
}
.mssege2 {
  width: 100%;
  height: 20%;
  border: 1px solid rgb(81, 76, 76);
  border-bottom: none;
  padding: 20px;
}
.mssege3 {
  width: 100%;
  height: 60%;
  border: 1px solid rgb(81, 76, 76);
  padding: 20px;
}
.table2 {
  width: 100%;
}
.table2 tr {
  width: 100%;
}
.table2 tr td {
  border: 1px solid rgb(81, 76, 76);
  width: 24%;
  height: 30px;
}
.messege3_1 {
  float: right;
  margin: 30px;
}
</style>
