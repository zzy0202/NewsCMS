<template>
  <div class="userCenterContainer">
    <el-breadcrumb>
      <el-breadcrumb-item style="font-size: 18px;font-weight: bold;">User Center</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="contentUnit">
      <div class="showUserProfile">
        <el-avatar :src="avatarURL" :size="100" :icon="UserFilled"/>
        <span class="text username">{{ userInfo.username }}</span>
        <span class="text">{{ adminRole }}</span>
      </div>
      <div class="userInfoSetup">
        <h2 class="title">Personal Info</h2>
        <div class="formContainer">
          <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="Username">
              <el-input v-model="form.username"/>
            </el-form-item>
            <el-form-item label="Introduction">
              <el-input v-model="form.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="Avatar">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-change="onChangePicture"
                :auto-upload="false"
                :limit="1"
              >
                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-button @click="submitInfo" style="margin: 0 auto" type="primary">Submit</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserFilled,Plus} from '@element-plus/icons-vue'
import {useUserStore} from "@/stores";
import {computed, reactive,ref} from "vue";
import { ElMessage } from 'element-plus'
import axios from "axios";
import {searchForWorkspaceRoot} from "vite";

let {userInfo} = useUserStore();
let adminRole = computed({
  get() {
    return userInfo.isAdmin ? "Admin" : "User";
  },
  set() {

  }
})

let avatarURL = ref(`http://localhost:3000/uploads/${userInfo.avatar}`)

const form = reactive({
  username: userInfo.username,
  introduction:userInfo.introduction,
  avatar:"",
  file:{},
  _id:userInfo._id
});

let imageUrl = ref("")


const beforeAvatarUpload= (rawFile:any) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

function onChangePicture(file:any) {
  form.avatar = URL.createObjectURL(file.raw);
  form.file = file.raw;
}

async function submitInfo() {
  let params = new FormData();
  for(let i in form) {
    params.append(i,form[i]);
  }
  let result =await axios.post("/adminAPI/user/uploadInfo",params,{
    headers:{
      "Content-Type":"multipart/form-data",
    }
  })
  if(result.data.ok) {
    ElMessage({
      message:result.data.msg,
      type:'success'
    })
  }
  else {
    ElMessage({
      message:result.data.msg,
      type:'error'
    })
  }
}
</script>

<style lang="less">
.userCenterContainer {
  width: 100%;
  height: 100%;

  .contentUnit {
    width: 100%;
    height: 100%;
    display: flex;

    .showUserProfile {
      width: 27.5vw;
      height: 35%;
      background-color: white;
      margin-top: 40px;
      border-radius: 15px;
      box-shadow: 0 2px 8px lightslategray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .el-icon {
        width: 100%;
        height: 100%;

        svg {
          width: 60%;
          height: 60%;
        }
      }

      .text {
        font-weight: bold;
        font-size: 22px;
        margin-top: 10px;

        &.username {
          font-size: 20px;
        }
      }
    }

    .userInfoSetup {
      margin-top: 40px;
      margin-left: 70px;
      width: 40vw;
      min-width: 200px;
      background-color: white;
      padding: 20px 0;
      box-shadow: 0 2px 8px lightslategray;
      border-radius: 15px;
      height: 600px;

      .title {
        text-align: center;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 3px solid #efefef;
      }
      .formContainer {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        .el-form-item__label-wrap {
          margin-left: 0 !important;
          label,div {
            font-weight: bold;
            margin-left: 30px;
            min-width: 120px;
            text-align: left;
            display: inline-block;
          }
        }
        .el-form-item__content{
          .el-textarea,.el-input {
            width: 80%;
          }
          .avatar-uploader {
            width: 175px !important;
            height: 175px !important;
            .el-upload {
              width: 175px;
              height: 175px;
              img {
                width: 175px;
                height: 175px;
              }
            }
          }
        }
        .avatar-uploader .el-upload {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }

        .avatar-uploader .el-upload:hover {
          border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          text-align: center;
        }
      }
    }
  }

  .el-breadcrumb__inner {
    font-weight: bold !important;
  }
}
</style>
