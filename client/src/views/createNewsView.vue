<template>
  <div class="createNewsContainer">
    <el-breadcrumb>
      <el-breadcrumb-item style="font-size: 18px;font-weight: bold;">Create News</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="formContainer" style="display: flex; flex-direction: column">
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
        size="default"
      >
        <el-form-item label="News title" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="News content">
          <wang-editor :getNewsContent="getNewsContent"></wang-editor>
        </el-form-item>
        <el-form-item label="News type">
          <el-select v-model="form.newsType" placeholder="Select news type">
            <el-option label="Latest news" :value="'Latest news'"/>
            <el-option label="Sport news" :value="'Sport news'"/>
            <el-option label="Announcement news" :value="'Announcement news'"/>
          </el-select>
        </el-form-item>
        <el-form-item label="News cover">
          <picture-uploader :getNewsCover="getNewsCover"></picture-uploader>
        </el-form-item>
      </el-form>
      <el-button @click="submitNews" style="align-self: center;margin-top: 30px;" type="primary">Submit</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import WangEditor from "@/components/CreateNews/wangEditor.vue";
import PictureUploader from "@/components/PictureUploader.vue";
import axios from "axios";
import {getTodayDates} from "@/util/tools.js"
import {ElMessage} from "element-plus";

let form = reactive({
  title: "",
  newsType: "",
  newsContent: "",
  newsCover: '',
  dates: '',
  isPublish:false,
})

let rules = reactive({
  title: [
    {required: true, message: "Please input news title", trigger: 'blur'}
  ]
})

let getNewsContent = (newsContent: string) => {
  form.newsContent = newsContent;
}

let getNewsCover = (newsCoverFile: any) => {
  console.log(newsCoverFile);
  form.newsCover = newsCoverFile.raw;
}

let submitNews = async () => {
  form.dates = getTodayDates();
  let formData = new FormData();
  for (let i in form) {
    formData.append(i, form[i]);
  }
  let result = await axios.post("/adminAPI/news/addNews", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  ElMessage({
    type: result.data.ok ? "success" : "fail",
    message: result.data.msg,
  })
}
</script>

<style scoped lang="less">
.createNewsContainer {
  :deep(.el-breadcrumb__item) {
    :deep(.el-breadcrumb__inner) {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .formContainer {
    margin: 40px auto 0;

    .el-form-item {
      :deep(.el-form-item__label-wrap label) {
        font-size: 16px;
      }
    }
  }
}
</style>
