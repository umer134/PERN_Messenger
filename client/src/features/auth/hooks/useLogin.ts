import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../api/auth.api';
import { AuthService } from '../services/auth.service';
import { AuthAdapter } from '../model/auth.adapter';
import { AuthResponse, LoginDto } from '../model/auth.types';
import { useFetchCurrentUser } from '@/features/current-user/';
import { useAppDispatch } from '@/app/hooks';
import { setSession } from '../model/authSlice';

export function useLogin() {
  const dispatch = useAppDispatch();
  const { fetchMe } = useFetchCurrentUser();
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: async (dto) => {
      const response = await AuthApi.login(dto);

      return AuthAdapter.toEntity(response.data);
    },

    onSuccess(response) {
      AuthService.bootstrap(response.accessToken);
      dispatch(setSession());
      fetchMe();
    },
  });
}
