<template>
  <div id="meuns">
    <el-menu :default-openeds="['1', '4']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>统计
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to="/">商城概况</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/TransactionAnalysis">交易分析</router-link>
          </el-menu-item>
          <!-- <el-menu-item index="1-3">
            <router-link to="/CommodityAnalysis">商品分析</router-link>
          </el-menu-item> -->
          <el-menu-item index="1-4">
            <router-link to="/ProductAnalysis">产品统计</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>产品
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="/addproduct">添加商品</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/productmanagement">管理商品</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/productcategories">商品分类</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>订单
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="/ordermanagement">管理订单</router-link></el-menu-item>
         
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>系统管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <router-link to="/Operate">操作记录</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "menus",
  data(){
    return{
      data:{
        
      }
    }
  }
};
</script>
<style>
  a{
    
    text-decoration: none;
    color: #000;
    padding:10px 30px;
  }
</style>


