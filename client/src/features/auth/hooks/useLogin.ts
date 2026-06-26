import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../api/auth.api';
import { AuthService } from '../services/auth.service';
import { AuthAdapter } from '../model/auth.adapter';
import { AuthResponse, LoginDto } from '../model/auth.types';
import { useFetchCurrentUser } from '@/features/current-user/';

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: async (dto) => {
      const response = await AuthApi.login(dto);

      return AuthAdapter.toEntity(response.data);
    },

    onSuccess(response) {
      const { fetchMe } = useFetchCurrentUser();
      AuthService.bootstrap(response);
      fetchMe();
    },
  });
}
