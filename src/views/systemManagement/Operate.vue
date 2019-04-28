<template>
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
</template>
<script>
export default {
    name:'Operate'
  
}
</script>
