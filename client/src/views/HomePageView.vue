<template>
  <div class="homeContent">
    <el-breadcrumb>
      <el-breadcrumb-item style="font-size: 18px;font-weight: bold;">promotion management</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="userContent">
      <div class="avatarBox">
        <el-avatar :size="100" :icon="UserFilled"/>
      </div>
      <span class="welcomeText">{{welcomeText}}</span>
    </div>
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserFilled} from '@element-plus/icons-vue'
import {useUserStore} from "@/stores";
import {computed} from "vue";

let {userInfo} = useUserStore();

let welcomeText = computed({
  get() {
    return `Welcome ${userInfo.username}! Let's get a coffee`
  },
  set() {

  }
})

</script>

<style lang="less">
.el-breadcrumb__item:deep(span) {
  span {
    font-size: 20px;
  }
}

.homeContent {
  height: 100%;
  .userContent {
    width: 90%;
    height: 30%;
    background-color: white;
    margin: 60px auto 0;
    box-shadow: 0 0 7px darkgrey;
    border-radius: 15px;
    display: flex;
    align-items: center;

    .avatarBox {
      margin-left: 30px;
      .el-icon {
        width: 100%;
        height: 100%;


        svg {
          width: 60%;
          height: 60%;
        }
      }
    }
    .welcomeText {
      margin-left: 30px;
      font-size: 30px;
      font-weight: bold;
    }
  }
  .carousel {
    width: 90%;
    margin: 100px auto 0;
    height: 300px;

    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}



</style>
