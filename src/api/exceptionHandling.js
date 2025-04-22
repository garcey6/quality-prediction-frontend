import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const handleException = (data, method) => {
  return api.post('/api/exception/handle', {
    data,
    method
  })
  .then(response => {
    const responseData = response?.data;
    if (!responseData || responseData.status !== 'success') {
      throw new Error(responseData?.message || '异常处理失败');
    }
    return responseData.data;
  })
  .catch(error => {
    console.error('异常处理错误:', error);
    throw new Error(error.response?.data?.message || error.message || '异常处理请求失败');
  });
};