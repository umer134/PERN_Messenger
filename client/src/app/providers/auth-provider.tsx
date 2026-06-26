import React, { useEffect } from 'react';
import { AuthService } from '@/features/auth';
import { useFetchCurrentUser } from '@/features/current-user';

import {
  setAuthFailedHandler,
  setTokenRefreshHandler,
} from '@/shared/api/http-client';
import { SocketService } from '@/shared/socket';

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const { fetchMe } = useFetchCurrentUser();

  useEffect(() => {
    setTokenRefreshHandler((token) => {
      SocketService.updateToken(token);
    });

    setAuthFailedHandler(() => {
      AuthService.logout();
    });

    const init = async () => {
      try {
        await AuthService.init();

        await fetchMe();
      } catch (e) {
        console.error(e);
      }
    };

    init();
  }, []);

  return children;
}
