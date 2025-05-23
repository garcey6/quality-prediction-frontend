import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const getVariables = () => {
  return api.get('/api/variables/list')
    .then(response => response.data)
    .catch(error => {
      console.error('获取变量列表失败:', error);
      throw new Error('获取变量列表失败');
    });
};

export const selectVariables = (selectedVars, targetVar) => {
  return api.post('/api/variables/select', {
    selected_columns: selectedVars,
    target_variable: targetVar  // 修改参数名为target_variable以匹配后端
  })
  .then(response => response.data)
  .catch(error => {
    console.error('变量选择失败:', error);
    throw new Error(error.response?.data?.message || '变量选择失败');
  });
};