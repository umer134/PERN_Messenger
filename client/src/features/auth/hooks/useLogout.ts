import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi } from '../api/auth.api';
import { AuthService } from '../services/auth.service';
import { useAppDispatch } from '@/app/hooks';
import { clearSession } from '../model/authSlice';

export function useLogout() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: AuthApi.logout,

    onSuccess() {
      AuthService.logout();

      dispatch(clearSession());

      queryClient.clear();
    },
  });
}
