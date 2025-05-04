import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json'  // 添加JSON请求头
  }
});

export const predictPLS = () => {
  return api.post('/api/pls/predict', {}, {  // 添加空对象作为请求体
    headers: {
      'Content-Type': 'application/json'  // 确保请求头设置
    }
  })
  .then(response => {
    return {
      data: response.data
    };
  })
  .catch(error => {
    console.error('PLS预测失败:', error);
    throw error;
  });
};