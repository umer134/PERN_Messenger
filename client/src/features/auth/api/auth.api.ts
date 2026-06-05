import { API_ENDPOINTS } from "../../../constants/endpoints";
import { apiCLient } from "../../../shared/api/http-client";
import { LoginDto } from "../model/auth.types";
import { AuthResponse } from "../model/auth.model";
import { TokenStore } from "../../../shared/lib/token-store";

const { AUTH } = API_ENDPOINTS;
export class AuthApi {

  static register(dto: FormData) {
    return apiCLient.post<AuthResponse>(
      AUTH.REGISTER,
      dto,
    );
  }

  static login(dto: LoginDto){
    return apiCLient.post<AuthResponse>(
      AUTH.LOGIN,
      dto,
    );
  }
  
  static refresh(){
    return apiCLient.get<AuthResponse>(
      AUTH.REFRESH,
    );
  }

  static logout(){
    const refreshToken = TokenStore.getRefreshToken();
    
    return apiCLient.post(
      AUTH.LOGOUT,
      { refreshToken }
    );
  }

  static activate(token: string){
    return apiCLient.get(
      `${AUTH.ACTIVATE}/${token}`
    )
  }

}