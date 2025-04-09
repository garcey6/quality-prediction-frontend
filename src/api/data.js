import axios from 'axios';

// 允许的文件类型
const ALLOWED_TYPES = ['text/csv', 'application/vnd.ms-excel'];

// 创建axios实例，配置基础URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const uploadData = (file, onUploadProgress) => {
  // 校验文件类型
  if (!ALLOWED_TYPES.includes(file.type)) {
    return Promise.reject(new Error('仅支持CSV文件格式'));
  }

  let formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload/', formData, { 
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  }).then(response => {
    console.log('文件上传成功:', response.data);
    return response; // 将消息提示移到调用处处理
  }).catch(error => {
    console.error('文件上传失败:', error.message);
    throw error; // 将错误处理移到调用处
  });
};