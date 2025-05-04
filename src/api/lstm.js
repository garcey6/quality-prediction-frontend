import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
})

export const predictLSTM = (params) => {
  return api.post('/api/lstm/predict', params)
    .then(response => {
      if (response.data.status !== 'success') {
        throw new Error(response.data.message || '预测失败');
      }
      return response;
    })
    .catch(error => {
      console.error('LSTM预测错误:', error);
      throw new Error(error.response?.data?.message || 'LSTM预测失败');
    });
};

export const trainModel = (data) => axios.post('/train/', data);