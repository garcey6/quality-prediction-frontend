import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

export const getExtractedFeatures = (params) => {
  return api.post('/api/feature_extraction/extract', {
    method: params.method,
    variance_threshold: params.variance_threshold
  })
  .catch(error => {
    if (error.response) {
      // Server responded with non-2xx status
      throw new Error(error.response.data.message || 
                     `Server error: ${error.response.status}`);
    } else if (error.request) {
      // No response received
      throw new Error('No response from server');
    } else {
      // Other errors
      throw new Error('Request failed: ' + error.message);
    }
  });
};