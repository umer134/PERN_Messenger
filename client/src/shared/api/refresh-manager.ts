import { API_ENDPOINTS } from '@/shared/api/endpoints';
import { AuthResponse } from '@/features/auth/model/auth.types';
import { refreshClient } from './refreshClient';

const { AUTH } = API_ENDPOINTS;

let refreshPromise: Promise<AuthResponse> | null = null;

export async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { data } = await refreshClient.get<AuthResponse>(AUTH.REFRESH);

      return data;
    })();

    refreshPromise.finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}
