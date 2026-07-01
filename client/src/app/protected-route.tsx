import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './hooks';
import { Loader } from '@/shared/ui/Loader/Loader';

export default function ProtectedRoute() {
  const { isAuth, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return <Loader />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
