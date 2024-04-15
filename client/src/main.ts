import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import "@/util/axios.config.js";

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus);
app.use(router)

app.mount('#app')
