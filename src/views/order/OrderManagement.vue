<template>
  <div id="ordermangement">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <!-- <template slot-scope="props"> -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="address" label></el-table-column>
          <el-table-column prop="name" label="产品名称" width="180"></el-table-column>
          <el-table-column prop="name" label="价格" width="180"></el-table-column>
          <el-table-column prop="address" label="数量"></el-table-column>
          <el-table-column prop="address" label="小计"></el-table-column>
        </el-table>

        <!-- {{props.row.name[0]}} -->
        <!-- {{props.row.name[1]}} -->
        <!-- </template> -->
      </el-table-column>

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="订单编号" prop="id"></el-table-column>

      <el-table-column label="买家/联系方式" prop="buy"></el-table-column>
      <el-table-column label="实付金额" prop="price"></el-table-column>
      <el-table-column label="订单状态" prop="orderstate"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看订单</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">发货</el-button>
          <el-button size="mini" type="success">打印订单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ordermanagement",
  data() {
    return {
      tableData: [
        {
          name: ["鲜花", "ghj"],
          id: "12345",
          num: "12/2",
          buy: "zxm/15882796070",
          price: "24",
          orderstate: 1
        }
      ],
      search: ""
    };
  }
};
</script>

