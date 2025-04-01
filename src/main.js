import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 确保此路径正确

const app = createApp(App);
app.use(router);
app.mount('#app');
