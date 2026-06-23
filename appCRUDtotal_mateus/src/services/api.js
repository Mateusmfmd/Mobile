import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL/BD_cafe',
});

export default api;
