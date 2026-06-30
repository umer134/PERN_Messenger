import React, { useEffect } from 'react';
import { AuthService } from '@/features/auth';
import { useFetchCurrentUser } from '@/features/current-user';

import {
  setAuthFailedHandler,
  setTokenRefreshHandler,
} from '@/shared/api/http-client';
import { SocketService } from '@/shared/socket';
import { useAppDispatch } from '../hooks';
import { setInitialized, setSession } from '@/features/auth/model/authSlice';

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const dispatch = useAppDispatch();
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
        const success = await AuthService.init();

        if (success) {
          await fetchMe();
          dispatch(setSession());
        }
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(setInitialized());
      }
    };

    init();
  }, []);

  return children;
}
