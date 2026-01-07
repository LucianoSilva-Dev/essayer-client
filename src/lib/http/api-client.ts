import { handleAxiosError } from '@/shared/utils';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const apiClient = setupCache(axios.create({
  baseURL: '/api',
  withCredentials: true,
}), {
  ttl: 0,
  location: 'client',
  cachePredicate: {
    statusCheck: (status) => status >= 200 && status < 300 || status === 404,
  }
});

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const refreshTokenOrWait = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      console.log('Aguardando refresh de token em andamento...');
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    await apiClient.post('/auth/refresh');
    
    // Pequeno delay para garantir que os cookies foram propagados corretamente pelo browser
    await new Promise(resolve => setTimeout(resolve, 100));
    
    processQueue(null);
  } catch (refreshError: any) {
    refreshError.isSessionExpired = true;
    processQueue(refreshError, null);
    window.dispatchEvent(new Event('auth:sessionExpired'));
    throw refreshError;
  } finally {
    isRefreshing = false;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/login')
    ) {
      originalRequest._retry = true;

      try {
        await refreshTokenOrWait();
        
        // Retenta a requisição original garantindo que não use cache antigo
        // e removendo propriedades internas que podem causar problemas
        const retryConfig = { 
          ...originalRequest,
          _retry: true,
          cache: false // Força ignorar cache do axios-cache-interceptor na retentativa
        };
        
        return apiClient(retryConfig);
      } catch (refreshError) {
        return handleAxiosError(refreshError);
      }
    }
    return handleAxiosError(error);
  }
);

export default apiClient;