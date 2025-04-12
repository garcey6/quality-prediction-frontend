import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Graph } from '@antv/x6'
import { VueShape } from '@antv/x6-vue-shape'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'  // 新增store导入

const app = createApp(App)

// 全局挂载X6
app.config.globalProperties.$graph = Graph
app.config.globalProperties.$vueShape = VueShape

app.use(router)
app.use(ElementPlus)
app.use(store)  // 使用store
app.mount('#app')
