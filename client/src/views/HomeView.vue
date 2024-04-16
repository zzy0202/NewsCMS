<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="14vw">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @select="switchRouter"
          >
            <el-menu-item index="/home">
              <el-icon><house /></el-icon>
              <span>Home Page</span>
            </el-menu-item>
            <el-menu-item index="/userCenter">
              <el-icon><icon-menu /></el-icon>
              <span>User Center</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <div class="content">
            <h3>Company Manage System</h3>
            <div class="userContent">
              <span>Welcome back, {{userStore.userInfo.username}}</span>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios";
  import {
    Document,
    Menu as IconMenu,
    Location,
    House,
  } from '@element-plus/icons-vue'
  import {useRouter} from "vue-router";
  import {useUserStore} from "@/stores";

  let router = useRouter();

  let switchRouter = (value:string) =>{
    router.push({
      path:value
    })
  }

  let userStore = useUserStore();
</script>

<style scoped lang="less">
.el-aside {
  height: 100vh;
  background-color: #efefef;
  box-shadow: 5px 10px #888888 ;
  .el-col {
    height: 100%;
    max-width: 100%;
    .el-menu-item span {
      font-size: 1rem;
    }
  }
}
.el-header {
  background-color: pink;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    h3 {
      color: #efefef;

    }
  }
}
.el-main {
  background-color: white;
}
</style>
