<template>
  <div class="editorManageMain">
    <el-breadcrumb>
      <el-breadcrumb-item style="font-size: 18px;font-weight: bold;">Manage Editor</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :rules="rules"
      :model="form"
      label-width="auto"
      class="demo-form formContainer"
      :size="formSize"
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

      <el-form-item label="Introduction">
        <el-input v-model="form.introduction" type="textarea"/>
      </el-form-item>
    </el-form>
    <el-button @click="submit" style="margin: 0 auto" type="primary">Submit</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const formSize = ref('default')
const formRef = ref()
const form = reactive({
  username: "",
  password: "",
  isAdmin: "",
  introduction: "Say something~",
})

const rules = reactive({
  username: [
    {required: true, message: 'Please input username', trigger: 'blur'},
  ],
  password:[
    {required: true, message: 'Please input password', trigger: 'blur'},
  ],
  isAdmin:[
    {required: true, message: 'Please input password', trigger: 'change'},
  ]
})

const submit = async () => {
  let result = await axios.post("/adminAPI/user/manageEditor",form )
  if(result.data.ok) {
    ElMessage({
      message:result.data.msg,
      type:"success"
    })
  }
  else {
    ElMessage({
      message:result.data.msg,
      type:"error"
    })
  }
}
</script>

<style scoped lang="less">
.editorManageMain {
  :deep(.el-breadcrumb__item) {
    span {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .formContainer {
    margin-top: 50px;
  }
}
</style>
