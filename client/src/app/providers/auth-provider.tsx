import React, { useEffect } from 'react';
import { AuthService } from '@/features/auth';
import { useFetchCurrentUser } from '@/features/current-user';

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const { fetchMe } = useFetchCurrentUser();

  useEffect(() => {
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
