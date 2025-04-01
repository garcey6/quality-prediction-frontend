import { createRouter, createWebHistory } from 'vue-router';
import QualityPrediction from '../views/QualityPrediction.vue';

const routes = [
    { path: '/', component: QualityPrediction }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
