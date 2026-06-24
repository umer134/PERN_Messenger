import { API_ENDPOINTS } from '@/constants/endpoints';
import { apiCLient } from '@/shared/api/http-client';
import { AuthLogRequestModel, AuthResponse } from '../model/auth.model';

const { AUTH } = API_ENDPOINTS;
export class AuthApi {
  static register(dto: FormData) {
    return apiCLient.post<AuthResponse>(AUTH.REGISTER, dto);
  }

  static login(dto: AuthLogRequestModel) {
    return apiCLient.post<AuthResponse>(AUTH.LOGIN, dto);
  }

  static refresh() {
    return apiCLient.get<AuthResponse>(AUTH.REFRESH);
  }

  static logout() {
    return apiCLient.post(AUTH.LOGOUT);
  }

  static activate(token: string) {
    return apiCLient.get(`${AUTH.ACTIVATE}/${token}`);
  }
}
