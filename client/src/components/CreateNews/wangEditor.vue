<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      style="height: 300px; overflow-y: hidden; max-width: 500px"
      @onCreated="handleCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
let props = defineProps(['getNewsContent'])
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
  }, 1500)
})

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: { /* 菜单配置，下文解释 */ }
}

const handleCreated = (editor:object) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const onChange = (editor:any) =>{
  props.getNewsContent(editor.getHtml());
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})



</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>

</style>
