import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const uploadData = (file) => {
  let formData = new FormData();
  formData.append('file', file);
  
  return api.post('/api/data/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    // 添加响应数据验证
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('无效的服务器响应');
    }
    return {
      originalData: response.data.original || null,
      workingData: response.data.processed || null
    };
  })
  .catch(error => {
    console.error('上传失败:', error.response?.data || error.message);
    throw error;
  });
};