import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const predictPLS = (n_components) => {
  return api.post('/api/pls/predict', {
    n_components
  })
  .then(response => {
    const responseData = response?.data;
    if (!responseData || responseData.status !== 'success') {
      throw new Error(responseData?.message || '预测失败');
    }
    return responseData;
  })
  .catch(error => {
    console.error('PLS预测错误:', error);
    throw new Error(error.response?.data?.message || error.message || 'PLS预测请求失败');
  });
};