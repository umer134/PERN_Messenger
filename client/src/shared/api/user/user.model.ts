import { paths } from "../schema";

export type UsersResponse =
  paths['/api/users']['get']['responses']['200']['content']['application/json'];

export type UserResponse =
  paths['/api/users/search']['get']['responses']['200']['content']['application/json'];