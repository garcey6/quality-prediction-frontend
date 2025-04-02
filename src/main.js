import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Graph } from '@antv/x6'
import { VueShape } from '@antv/x6-vue-shape'

const app = createApp(App)

// 全局挂载X6
app.config.globalProperties.$graph = Graph
app.config.globalProperties.$vueShape = VueShape

app.use(router)
app.mount('#app')
