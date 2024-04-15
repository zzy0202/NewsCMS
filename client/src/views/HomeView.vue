<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="14vw">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <el-icon><setting /></el-icon>
              <span>Home Page</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>User Center</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <el-icon><document /></el-icon>
              <span>User Management</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <span>News Management</span>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon><setting /></el-icon>
              <span>Products Management</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <div class="content">
            <h3>Company Manage System</h3>
            <div class="userContent">
              <span>Welcome back, username</span>
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
    Setting,
  } from '@element-plus/icons-vue'
  axios.get("/adminAPI/user/home").then(res=>{
    console.log(res.data);
  })

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
</script>

<style scoped lang="less">
.el-aside {
  height: 100vh;
  background-color: #efefef;
  .el-col {
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
  background-color: grey;
}
</style>
