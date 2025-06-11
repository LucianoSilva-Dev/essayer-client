import axios from 'axios';
import { API_BASE_URL } from '@/app/constants';
import { handleAxiosError } from '@/app/utils'; // Importando seu utilitário

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token JWT em todas as requisições
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  // A primeira função lida com respostas de sucesso (2xx)
  (response) => response,
  (error) => {
    handleAxiosError(error);
    return Promise.reject(error);
  }
);

export default apiClient;