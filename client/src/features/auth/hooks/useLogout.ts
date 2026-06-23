import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../api/auth.api';
import { AuthService } from '../services/auth.service';

export function useLogout() {
  return useMutation({
    mutationFn: AuthApi.logout,

    onSuccess() {
      AuthService.logout();
    },
  });
}
