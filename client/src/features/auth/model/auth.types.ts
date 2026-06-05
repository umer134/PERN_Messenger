import { AuthMeResponse } from "./auth.model";

export interface LoginDto {
  email: string;
  password: string;
}
export interface RegisterDto extends LoginDto {
  username: string;
  avatar?: File;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  me: AuthMeResponse;
}
export interface RegisterApiDto extends Omit<RegisterDto, 'username'> {
  name: string;
}
