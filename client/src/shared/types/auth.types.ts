import { ProfileApiResponse } from "./profile.types";

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  avatar: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: ProfileApiResponse;
}

export interface LoginDto {
  email: string;
  password: string;
}