import { UserResponse } from '../../../entities/user/model/user.model';
import { User } from '../../../entities/user/model/user.types';

export class UserSearchAdapter {
  static toEntity(apiUser: UserResponse): User {
    return {
      id: apiUser.id || '',
      username: apiUser.name || '',
      avatar: apiUser.avatar || undefined,
    };
  }

  static toEntities(users: UserResponse[]): User[] {
    return users.map(this.toEntity);
  }

  static toApi(dto: User): UserResponse {
    return {
      id: dto.id,
      name: dto.username,
      avatar: dto.avatar,
    };
  }
}
