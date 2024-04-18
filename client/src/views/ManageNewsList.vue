<template>
  <div class="manageNewsListMain">
    <el-breadcrumb>
      <el-breadcrumb-item class="breadCrumb">Manage News</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table class="tableContainer" :data="tableData" style="width: 100%">
      <el-table-column label="Date" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer/>
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.dates }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Title" width="350">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Publish" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-switch v-model="scope.row.isPublish" @click="publishNews(scope.$index,scope.row)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="default" type="primary" circle :icon="Edit" @click="handleEdit(scope.$index, scope.row)"/>
          <el-button size="default" type="danger"   :icon="Delete" circle/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {Timer, Edit, Delete} from '@element-plus/icons-vue'
import axios from "axios";
import {reactive} from "vue";
import {ElMessage} from "element-plus";

const handleEdit = (index: number, row) => {
  console.log(index, row)

}
const handleDelete = (index: number, row) => {
  console.log(index, row)
}

const tableData = reactive([]);

const getNewsList =async () =>{
  let result =await axios.get("/adminAPI/news/getNewsList");
  tableData.splice(0,tableData.length,...result.data.data);
}

const publishNews =async (index:number,news:any) =>{
  let result =await axios.post("/adminAPI/news/modifyNews",news);
  ElMessage({
    message:result.data.msg,
    type:result.data.ok?"success":"error",
  })
}
getNewsList();
</script>

<style scoped lang="less">
.manageNewsListMain {
  width: 100%;
  height: 100%;

  .breadCrumb {
    font-size: 18px;
  }

  .tableContainer {
    margin-top: 30px;
  }
}

</style>
