import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const getFilteredFeatures = (target, threshold, method) => {
  return api.post('/api/feature_selection/filter', {
    target,
    threshold,
    method
  })
  .then(response => {
    const responseData = response?.data;
    if (!responseData || responseData.status !== 'success') {
      throw new Error(responseData?.message || '无效的特征选择数据');
    }
    return {
      message: responseData.message,
      status: responseData.status
    };
  })
  .catch(error => {
    console.error('特征选择请求失败:', error);
    throw new Error(error.response?.data?.message || error.message || '特征选择请求失败');
  });
};