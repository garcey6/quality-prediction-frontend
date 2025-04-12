import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

/**
 * 获取变量列表
 * @returns {Promise} 包含变量数据的Promise
 */
export const getVariables = () => {
  return api.get('/api/variables')
    .then(response => {
      // 确保返回数据格式正确
      if (!Array.isArray(response.data)) {
        throw new Error('无效的变量数据格式');
      }
      return response.data.map(v => ({
        id: v.id,
        name: v.name,
        type: v.type || 'unknown', // 添加默认类型
        status: v.status || 1 // 默认启用
      }));
    })
    .catch(error => {
      console.error('获取变量列表失败:', error);
      throw error;
    });
};

/**
 * 更新选中的变量
 * @param {Array} selectedVars 选中的变量ID数组
 * @returns {Promise} 
 */
export const updateSelectedVariables = (data) => {
  return api.post('/api/variables/selected', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error('保存变量失败:', error.response?.data);
    throw error;
  });
};