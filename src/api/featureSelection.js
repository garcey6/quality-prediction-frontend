import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const getVariables = () => {
  return api.get('/api/feature-selection/variables')
    .then(response => {
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('获取变量数据格式不正确');
      }
      return response.data; // 直接返回数组
    })
    .catch(error => {
      console.error('获取变量失败:', error);
      throw new Error(error.response?.data?.message || '获取变量失败');
    });
};

export const selectFeatures = (threshold) => {
  return api.post('/api/feature-selection/select', {
    threshold: threshold
  })
  .then(response => response.data)
  .catch(error => {
    console.error('特征选择失败:', error);
    throw new Error(error.response?.data?.message || '特征选择失败');
  });
};

export const getHeatmap = () => {
  return api.get('/api/feature-selection/heatmap')
    .then(response => {
      if (!response.data || !response.data.image) {
        throw new Error('获取热力图数据格式不正确');
      }
      return response.data;
    })
    .catch(error => {
      console.error('获取热力图失败:', error);
      throw new Error(error.response?.data?.message || '获取热力图失败');
    });
};