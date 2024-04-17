<template>
  <div class="pictureUploader">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-change="onChangePicture"
      :auto-upload="false"
      :limit="1"
      :on-exceed="handleExceed"
      ref="upload"
    >
      <img v-if="avatar" :src="avatar" class="avatar"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
  </div>
</template>

<script setup lang="ts">

import {Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'

let props = defineProps(['getNewsCover'])


let avatar = ref<string>("");
const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
function onChangePicture(file: any) {
  avatar.value = URL.createObjectURL(file.raw);
  props.getNewsCover(file);
}

const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

</script>

<style scoped lang="less">
.pictureUploader {
  :deep(.avatar-uploader) {
    width: 180px !important;
    height: 180px !important;

    .el-upload {
      width: 180px;
      height: 180px;
      border: 2px dashed lightsteelblue;

      img {
        width: 180px;
        height: 180px;
      }
    }
  }
}
</style>
