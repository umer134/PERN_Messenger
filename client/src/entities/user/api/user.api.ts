import { apiCLient } from '@/shared/api/http-client';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { UserResponse } from '../model/user.model';

const { USERS } = API_ENDPOINTS;

export class UserApi {
  static getUser(query: string) {
    return apiCLient.get<UserResponse>(USERS.GET_BY_USERNAME(query));
  }

  static searchUsers(query: string) {
    return apiCLient.get(USERS.GET_BY_USERNAME(query));
  }
}
