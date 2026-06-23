import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';

import { Login, Register } from '../../features/auth/ui';

import { AuthLayout } from '../../shared/ui/auth-layout/AuthLayout';
import { AuthCard } from '../../shared/ui/auth-card/AuthCard';

type Mode = 'login' | 'register';

export const SignPage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const [mode, setMode] = useState<Mode>('login');

  if (isAuth) return <Navigate to="/main" replace />;

  return (
    <AuthLayout>
      <AuthCard>
        {mode === 'login' ? (
          <Login onSwitch={() => setMode('register')} />
        ) : (
          <Register onSwitch={() => setMode('login')} />
        )}
      </AuthCard>
    </AuthLayout>
  );
};
