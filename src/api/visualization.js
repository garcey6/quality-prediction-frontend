import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const getVisualization = () => {
  return api.get('/api/visualization/generate')
    .then(response => response.data)
    .catch(error => {
      console.error('获取可视化失败:', error);
      throw new Error(error.response?.data?.message || '获取可视化失败');
    });
};