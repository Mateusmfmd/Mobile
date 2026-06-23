import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL/gato-cafe/backend',
});

export default api;
