import { API_ENDPOINTS } from '@/shared/api/endpoints';
import { AuthResponse } from '@/features/auth/model/auth.types';
import { refreshClient } from './refreshClient';

const { AUTH } = API_ENDPOINTS;

let refreshPromise: Promise<AuthResponse> | null = null;

export function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .get<AuthResponse>(AUTH.REFRESH)
      .then(({ data }) => data)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
