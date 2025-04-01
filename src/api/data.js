import axios from 'axios';
export const uploadData = (file) => {
  let formData = new FormData();
  formData.append('file', file);
  return axios.post('/upload/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};