import axios from 'axios';
import { API_BASE_URL } from '@/app/constants';
import { handleAxiosError } from '@/app/utils';
import { setupCache } from 'axios-cache-interceptor';

const apiClient = setupCache(axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
}), {
  ttl: 0,
  location: 'client'
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
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    await apiClient.post('/auth/refresh');
    processQueue(null);
  } catch (refreshError) {
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
      !originalRequest.url.includes('/auth/')
    ) {
      originalRequest._retry = true;

      try {
        await refreshTokenOrWait();
        return apiClient(originalRequest);
      } catch (refreshError) {
        return handleAxiosError(refreshError);
      }
    }
    return handleAxiosError(error);
  }
);

export default apiClient;