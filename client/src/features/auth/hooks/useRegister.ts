import { useMutation } from "@tanstack/react-query"
import { AuthApi } from "../api/auth.api"
import { AuthService } from "../services/auth.service"
import { AuthAdapter } from "../model/auth.adapter"
import { AuthResponse, RegisterDto } from "../model/auth.types";

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterDto>({
    mutationFn: async (dto) => {
      const adaptedDto = AuthAdapter.registerDtoToFormData(dto);
      
      console.log(
    adaptedDto instanceof FormData
  );


  for (const [k, v] of adaptedDto.entries()) {
    console.log(k, v);
  }

      const response = await AuthApi.register(adaptedDto);
      
      return AuthAdapter.toEntity(response.data);
    },

    onSuccess(response){
      AuthService.bootstrap(response);
    }
  });
}