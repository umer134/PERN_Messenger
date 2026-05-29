import { AuthMeResponse } from "./auth.model";

export interface LoginDto {
  email: string;
  password: string;
}
export interface RegisterDto extends LoginDto {
  username: string;
  avatar: string | null;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  me: AuthMeResponse;
}

export type AuthFormData = RegisterDto & {
  confirmPassword?: string;
  acceptTerms?: boolean;
}

