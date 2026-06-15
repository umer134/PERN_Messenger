import axios from 'axios';

import { env } from '../../config/env';
import { TokenStore } from '../lib/token-store';
import { refreshSession }
from './refresh-manager';

export const apiCLient =
  axios.create({
    baseURL: env.BASE_URL,
    timeout: 10000,

    withCredentials: true,
  });

apiCLient.interceptors.request.use(
  config => {
    const token =
      TokenStore.getAccessToken();

    if (
      token &&
      config.headers
    ) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

apiCLient.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest =
      error.config;

    if (
      error.response?.status ===
        401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry =
        true;

      try {
        const auth =
          await refreshSession();

        originalRequest.headers.Authorization =
          `Bearer ${auth.accessToken}`;

        return apiCLient(
          originalRequest
        );
      } catch {
        TokenStore.clear();

        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(
      error
    );
  }
);