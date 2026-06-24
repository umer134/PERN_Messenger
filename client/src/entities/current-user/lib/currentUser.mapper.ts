import { CurrentUserApiResponse } from '../types/currentUser.types';

export const mapCurrentUser = (data: CurrentUserApiResponse) => ({
  id: data.id,
  username: data.name,
  email: data.email,
  avatar: data.avatar,
  role: data.role ?? null,
});
