import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const getExtractedFeatures = (data) => {
  return api.post('/api/feature_extraction/extract', data)
    .then(response => {
      const responseData = response?.data;
      if (!responseData || responseData.status !== 'success') {
        throw new Error(responseData?.message || '无效的特征提取数据');
      }
      return responseData;
    })
    .catch(error => {
      console.error('特征提取请求失败:', error);
      throw new Error(error.response?.data?.message || error.message || '特征提取请求失败');
    });
};