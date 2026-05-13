import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const apiClient = setupCache(axios.create({
  baseURL: 'http://localhost:3002', // em produção será /api
  withCredentials: true,
}), {
  ttl: 0,
  location: 'client',
  cachePredicate: {
    statusCheck: (status) => status >= 200 && status < 300 || status === 404,
  }
});

export default apiClient;