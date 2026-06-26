import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../api/auth.api';
import { AuthService } from '../services/auth.service';
import { AuthAdapter } from '../model/auth.adapter';
import { AuthResponse, RegisterDto } from '../model/auth.types';
import { useFetchCurrentUser } from '@/features/current-user';

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterDto>({
    mutationFn: async (dto) => {
      const adaptedDto = AuthAdapter.registerDtoToFormData(dto);

      const response = await AuthApi.register(adaptedDto);

      return AuthAdapter.toEntity(response.data);
    },

    onSuccess(response) {
      const { fetchMe } = useFetchCurrentUser();
      AuthService.bootstrap(response);
      fetchMe();
    },
  });
}
