import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const getMultivariateVisualization = (data) => {
  return api.post('/api/visualization/multivariate', {
    data
  })
  .then(response => {
    // 更安全的响应数据检查
    const responseData = response?.data;
    if (!responseData || !responseData.image) {
      throw new Error(responseData?.message || '无效的可视化数据');
    }
    return responseData;
  })
  .catch(error => {
    console.error('可视化请求失败:', error);
    throw new Error(error.response?.data?.message || error.message || '可视化请求失败');
  });
};