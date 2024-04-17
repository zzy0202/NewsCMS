<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="19vw">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @select="switchRouter"
          >
            <el-menu-item index="/home">
              <el-icon>
                <house/>
              </el-icon>
              <span>Home Page</span>
            </el-menu-item>
            <el-menu-item index="/userCenter">
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>User Center</span>
            </el-menu-item>
            <el-menu-item index="/manageEditor" v-admin>
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>Manage Editor</span>
            </el-menu-item>
            <el-menu-item index="/modifyEditor" v-admin>
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>Modify Editor</span>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>Manage News</span>
              </template>
              <el-menu-item index="/createNews">Create News</el-menu-item>
              <el-menu-item index="1/newsList">News List</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <div class="content">
            <h3>Company Manage System</h3>
            <div class="userContent">
              <span>Welcome back, {{ userStore.userInfo.username }}</span>
              <button style="margin-left: 10px;" @click="logout">Logout</button>
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

let userStore = useUserStore();

const vAdmin = {
  mounted(el: object) {
    if (!userStore.userInfo.isAdmin) {
      el.parentNode.removeChild(el);
    }
  }
}

let router = useRouter();

let switchRouter = (value: string) => {
  router.push({
    path: value
  })
}

function logout() {
  router.push({
    path: '/login',
  })
  localStorage.removeItem("token")
  localStorage.removeItem("userInfo");
}

</script>

<style scoped lang="less">
.el-aside {
  height: 100vh;
  background-color: #efefef;
  box-shadow: 5px 10px #888888;

  .el-col {
    height: 100%;
    max-width: 100%;

    .el-menu-item span {
      font-size: 1rem;
    }
    .el-sub-menu span {
      font-size: 1rem;
      .el-menu-item li {
        font-size: 0.9rem;
      }
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
