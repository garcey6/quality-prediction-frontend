import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const standardizeData = (method) => {
  return api.post('/api/data/standardize', {
    method
  })
  .then(response => response.data)
  .catch(error => {
    console.error('标准化失败:', error);
    throw new Error(error.response?.data?.message || '标准化失败');
  });
};