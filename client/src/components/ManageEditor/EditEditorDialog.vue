<template>
  <div class="dialogContainer" v-if="showDialog">
    <div class="dialogContent">
      <h2 class="title">Edit User</h2>
      <el-form
        ref="formRef"
        style="max-width: 600px"
        :rules="rules"
        :model="form"
        label-width="auto"
        class="demo-form formContainer"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password"/>
        </el-form-item>
        <el-form-item label="Role" prop="isAdmin">
          <el-select v-model="form.isAdmin" placeholder="">
            <el-option label="Admin" :value="1"/>
            <el-option label="Editor" :value="0"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Introduction" prop="introduction">
          <el-input v-model="form.introduction" type="textarea"/>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="submitInfo" plain>Submit</el-button>
        <el-button type="danger" @click="closeDialog" plain>Close</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, toRefs, ref, watch} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

let props = defineProps(["showDialog", "userInfo", "closeDialog"]);
let {showDialog, closeDialog, userInfo} = toRefs(props);
let form = reactive({
  username: "",
  password: "",
  isAdmin: "",
  introduction: "Say something~",
})

form = props.userInfo;


const rules = reactive({
  username: [
    {required: true, message: 'Please input username', trigger: 'blur'},
  ],
  password: [
    {required: true, message: 'Please input password', trigger: 'blur'},
  ],
  isAdmin: [
    {required: true, message: 'Please input password', trigger: 'change'},
  ],
  introduction: [
    {required: true, message: 'Please input activity form', trigger: 'blur'},
  ]
})


async function submitInfo() {
  let result = await axios.post("/adminAPI/user/editEditor", form)
  ElMessage({
    message: result.data.msg,
    type: result.data.ok ? "success" : "error"
  })
}

console.log(userInfo)
</script>

<style scoped lang="less">
.dialogContainer {
  width: 100vw;
  height: 100vh;
  background-color: rgba(lightslategray, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .dialogContent {
    width: 50vw;
    height: fit-content;
    background-color: white;
    border-radius: 20px;
    padding-bottom: 40px;

    .title {
      font-size: 25px;
      font-weight: bold;
      text-align: center;
      padding: 6px 0;
      border-bottom: 2px solid #efefef;
    }

    .formContainer {
      margin-top: 20px;

      .el-form-item {
        display: flex;
        justify-content: flex-start;
      }

      :deep(.el-form-item__label-wrap) {
        margin-left: 0 !important;

        label, div {
          font-weight: bold;
          margin-left: 30px;
          min-width: 120px;
          text-align: left;
          display: inline-block;
        }
      }

      .el-form-item__content {
        .el-textarea, .el-input, .el-select {
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
    }

    .button {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
  }
}
</style>
