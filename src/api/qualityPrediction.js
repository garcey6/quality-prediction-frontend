import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
})

export const getPredictionVisualization = (modelType) => {
  return api.post('/api/quality/visualize', 
    { model_type: modelType },
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    }
  )
  .then(response => {
    if (!response.data || response.data.status !== 'success') {
      throw new Error(response.data?.message || '获取预测结果失败')
    }
    return response.data.data
  })
  .catch(error => {
    console.error('获取预测可视化失败:', error)
    throw new Error(error.response?.data?.message || '获取预测可视化失败')
  })
}

export const exportPrediction = (modelType, format = 'png') => {
  return api.post('/api/quality/export', { 
    model_type: modelType,
    format: format
  })
  .then(response => {
    if (!response.data || response.data.status !== 'success') {
      throw new Error(response.data?.message || '导出预测结果失败')
    }
    return response.data.data
  })
  .catch(error => {
    console.error('导出预测结果失败:', error)
    throw new Error(error.response?.data?.message || '导出预测结果失败')
  })
}