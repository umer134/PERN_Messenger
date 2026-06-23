import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../api/auth.api';
import { AuthService } from '../services/auth.service';
import { AuthAdapter } from '../model/auth.adapter';
import { AuthResponse, LoginDto } from '../model/auth.types';
import { CurrentUserService } from '../../../entities/current-user/service/current-user.service';

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: async (dto) => {
      const response = await AuthApi.login(dto);

      return AuthAdapter.toEntity(response.data);
    },

    onSuccess(response) {
      AuthService.bootstrap(response);
      CurrentUserService.fetchMe();
    },
  });
}
