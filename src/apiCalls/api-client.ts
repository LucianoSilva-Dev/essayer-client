import axios from 'axios';
import { API_BASE_URL } from '@/app/constants';
import { handleAxiosError } from '@/app/utils';
import { setupCache } from 'axios-cache-interceptor'

const apiClient = setupCache(axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
}), {
  ttl: 0,
  location: 'client'
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url &&
      !originalRequest.url.includes('/auth/')
    ) {
      originalRequest._retry = true; // Marca esta requisição para não tentar novamente

      try {
        await apiClient.post('/auth/refresh'); // Assumindo que este é seu endpoint
        return apiClient(originalRequest);
      } catch (refreshError) {
        window.dispatchEvent(new Event('auth:sessionExpired'));
        return handleAxiosError(refreshError);
      }
    }
    return handleAxiosError(error);
  }
);

export default apiClient;