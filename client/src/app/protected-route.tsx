import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './hooks';

export default function ProtectedRoute() {
  const { isAuth, isInitialized } = useAppSelector((state) => state.auth);

  if(!isInitialized) {
    return null;
  }

  return isAuth ? <Outlet /> : (
    <Navigate to="/login" replace />
  )
}