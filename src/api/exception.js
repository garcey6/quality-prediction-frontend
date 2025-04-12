import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const applyExceptionHandling = (algorithm) => {
  return api.post('/api/exception/process', {
    algorithm: algorithm
  })
  .then(response => response.data)
  .catch(error => {
    console.error('异常处理失败:', error);
    throw error;
  });
};