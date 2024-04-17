<template>
  <div class="editEditorMain">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="isAdmin" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer/>
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.isAdmin ? "Admin" : "Editor" }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Username" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.name }}</div>
              <div>address: {{ scope.row.address }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.username }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit
          </el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <edit-editor-dialog :showDialog="showDialog" :userInfo="userInfo" :closeDialog="closeDialog"></edit-editor-dialog>
  </div>
</template>

<script setup lang="ts">
import {Timer} from '@element-plus/icons-vue'
import axios from "axios";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import EditEditorDialog from "@/components/ManageEditor/EditEditorDialog.vue";

let showDialog = ref(false);
let closeDialog = () => {
  showDialog.value = !showDialog.value;
  getUserList();
}
let userInfo = reactive({});

const handleEdit = (index: number, row:any) => {
  showDialog.value = true;
  Object.assign(userInfo,row);
}
const handleDelete = async (index: number, row: any) => {
  let result = await axios.post("/adminAPI/user/deleteUser", row);
  if (result.data.ok) {
    await getUserList();
    ElMessage({
      message: result.data.msg,
      type: "success",
    })
  }
}

const tableData = reactive([]);
let getUserList = async () => {
  let result = await axios.get("/adminAPI/user/getUserList");
  tableData.splice(0, tableData.length, ...result.data.data);
}
getUserList();
</script>

<style scoped lang="less">
.editorManageMain {

}
</style>
