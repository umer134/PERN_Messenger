import { paths } from '@/shared/api/schema';

export type UserResponse =
  paths['/api/users/search']['get']['responses']['200']['content']['application/json'][number];
