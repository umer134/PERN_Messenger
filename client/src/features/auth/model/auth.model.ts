import { paths } from '@/shared/api/schema';

type AuthEndpoint = '/api/login' | '/api/registration';

export type AuthRegRequestModel =
  paths['/api/registration']['post']['requestBody']['content']['multipart/form-data'];

export type AuthLogRequestModel =
  paths['/api/login']['post']['requestBody']['content']['application/json'];

export type AuthResponse =
  paths[AuthEndpoint]['post']['responses']['200']['content']['application/json'];

export type AuthMeResponse = AuthResponse['user'];

export type RefreshResponse =
  paths['/api/refresh']['get']['responses']['200']['content']['application/json'];
