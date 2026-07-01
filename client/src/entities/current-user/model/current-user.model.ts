import { paths } from '@/shared/api/schema';

export type meResponse =
  paths['/api/me']['get']['responses']['200']['content']['application/json'];

export type meRequest =
  paths['/api/me']['put']['requestBody']['content']['multipart/form-data'];
