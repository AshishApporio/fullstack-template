import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { env } from '@/config/env';

const API_URL = env.NEXT_PUBLIC_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

// ─── Request Interceptor: attach access token ──────────
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { tokens } = useAuthStore.getState();
    if (tokens?.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// ─── Response Interceptor: handle 401 / token refresh ──
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Queue concurrent 401s while a refresh is already in flight
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const { tokens } = useAuthStore.getState();

    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/auth/refresh`, { refreshToken: tokens?.refreshToken })
        .then(({ data }) => {
          const newTokens = data.data as { accessToken: string; refreshToken: string };
          useAuthStore.getState().setTokens(newTokens);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }
          processQueue(null, newTokens.accessToken);
          resolve(axiosInstance(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          useAuthStore.getState().logout();
          if (typeof window !== 'undefined') window.location.href = '/login';
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }
);

// ─── HTTP helpers used by lib/api/* ───────────────────────────────────────────

export const get = <T>(url: string, params?: object) =>
  axiosInstance.get<T>(url, { params }).then((r: AxiosResponse<T>) => r.data);

export const post = <T>(url: string, data?: unknown) =>
  axiosInstance.post<T>(url, data).then((r: AxiosResponse<T>) => r.data);

export const patch = <T>(url: string, data?: unknown) =>
  axiosInstance.patch<T>(url, data).then((r: AxiosResponse<T>) => r.data);

export const put = <T>(url: string, data?: unknown) =>
  axiosInstance.put<T>(url, data).then((r: AxiosResponse<T>) => r.data);

export const del = <T>(url: string) =>
  axiosInstance.delete<T>(url).then((r: AxiosResponse<T>) => r.data);

export default axiosInstance;
