import axios from 'axios';

import { env } from '@/config/env.config';
import { TokenStore } from '../lib/token-store';
import { refreshSession } from './refresh-manager';

let onTokenRefreshed: ((token: string) => void) | null = null;

let onAuthFailed: (() => void) | null = null;

export function setAuthFailedHandler(handler: () => void) {
  onAuthFailed = handler;
}

export function setTokenRefreshHandler(handler: (token: string) => void) {
  onTokenRefreshed = handler;
}

export const apiCLient = axios.create({
  baseURL: env.apiUrl,

  timeout: 10000,

  withCredentials: true,
});

apiCLient.interceptors.request.use((config) => {
  const token = TokenStore.getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiCLient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('401 intercepted');

        const auth = await refreshSession();

        console.log('refresh ok');

        console.log(auth.accessToken);

        TokenStore.setAccessToken(auth.accessToken);

        onTokenRefreshed?.(auth.accessToken);

        originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`;

        console.log('retry');

        return apiCLient(originalRequest);
      } catch {
        TokenStore.clear();

        onAuthFailed?.();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
