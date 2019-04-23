<template>
    
    <div id="productcategories">
        <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="产品分类名称" prop="date"></el-table-column>
      
      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="success">添加产品分类</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
export default {
    name:'productcategories',
    data() {
      return {
        
        tableData: [{
          date: '分类一'
          
        }
        ],
        search: ''
      }
    },
}
</script>
