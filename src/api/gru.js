import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const predictGRU = (params) => {
  return api.post('/api/gru/predict', params)
    .then(response => {
      return {
        data: response.data
      };
    })
    .catch(error => {
      console.error('GRU预测失败:', error);
      throw error;
    });
};