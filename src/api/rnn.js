import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const predictRNN = (params) => {
  return api.post('/api/rnn/predict', params)
    .then(response => {
      return {
        data: response.data
      };
    })
    .catch(error => {
      console.error('RNN预测失败:', error);
      throw error;
    });
};