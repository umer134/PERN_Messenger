import axios from 'axios';
import { TokenStore } from '../lib/token-store';
import { API_ENDPOINTS } from '../../constants/endpoints';
import { AuthResponse } from '../../features/auth/model/auth.types';

const { AUTH } = API_ENDPOINTS;

let refreshPromise:
  Promise<AuthResponse> | null = null;

export async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise =
      (async () => {
        const refreshToken =
          TokenStore.getRefreshToken();

        if (!refreshToken) {
          throw new Error(
            'No refresh token'
          );
        }

        const { data } =
          await axios.post<AuthResponse>(
            `${AUTH.REFRESH}`,
            { refreshToken }
          );

        TokenStore.setTokens({
          accessToken:
            data.accessToken,
          refreshToken:
            data.refreshToken,
        });

        return data;
      })();

    refreshPromise.finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}