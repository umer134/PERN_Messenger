import { useMutation } from '@tanstack/react-query'
import { AuthApi } from '../api/auth.api'
import { AuthService } from '../services/auth.service'
import { AuthAdapter } from '../model/auth.adapter';

export function useLogin() {
  return useMutation({
    mutationFn: AuthApi.login,

    onSuccess(response) {
      AuthService.bootstrap(AuthAdapter.toEntity(response.data));
    }
  })
}