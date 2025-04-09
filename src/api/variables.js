import axios from 'axios';

// 创建axios实例
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
      return response.data;
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
export const updateSelectedVariables = (selectedVars) => {
  return api.post('/api/variables/selected', {
    selected: selectedVars
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('更新选中变量失败:', error);
    throw error;
  });
};