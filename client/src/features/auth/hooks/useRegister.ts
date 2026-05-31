import { useMutation } from "@tanstack/react-query"
import { AuthApi } from "../api/auth.api"
import { AuthService } from "../services/auth.service"
import { AuthAdapter } from "../model/auth.adapter"
import { AuthResponse, RegisterDto } from "../model/auth.types";

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterDto>({
    mutationFn: async (dto) => {
      const response = await AuthApi.register(dto);
      
      return AuthAdapter.toEntity(response.data);
    },

    onSuccess(response){
      AuthService.bootstrap(response);
    }
  });
}