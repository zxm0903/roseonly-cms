<template>
  <div class="home">
    <!-- 左侧 -->
    <el-container>
      <!-- 左边侧边栏 -->
      <el-aside width="200px">
        <h1>商城管理</h1>
        <!-- 菜单 -->
        <Meuns/>
      </el-aside>

      <!-- 右侧 -->
      <el-container>
        <!-- 右侧头部 -->
        <el-header height="80px">
          <!-- <h1 :title=""></h1> -->
        </el-header>

        <!-- 右侧内容展示 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <Inform />
  </div>
</template>

<script>
// @ is an alias to /src
import Meuns from "@/components/Meun.vue";
import Inform from "@/components/Inform.vue";


export default {
  name: "home",
  data(){
    return{
      title:''
    }
  },
  components: {
    Meuns,
    Inform
  },
  methods:{
    
  },
  created(){

  }
};
</script>

<style>
el-container {
  height: 100%;
}
.el-header {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  border-bottom: 1px solid #caced4;
  /* line-height: 60px; */
}
h1 {
  height: 80px;
  line-height: 80px;
  margin: 0;
  border-bottom: 1px solid #caced4;
}
.el-aside {
  /* background-color: #262d3a; */
  color: #9dacc2;
  text-align: center;
  margin: 0;
}
</style>
