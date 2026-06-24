import { UserResponse } from '@/entities/user/model/user.model';
import { UserPreview } from '@/entities/user/model/user.types';

export class UserSearchAdapter {
  static toEntity(apiUser: UserPreview): UserPreview {
    return {
      id: apiUser.id,
      username: apiUser.username,
      avatar: apiUser.avatar,
      lastSeen: apiUser.lastSeen,
    };
  }

  static toEntities(users: UserResponse[]): UserPreview[] {
    return users.map(this.toEntity);
  }

  static toApi(dto: UserPreview): UserResponse {
    return {
      id: dto.id,
      username: dto.username,
      avatar: dto.avatar,
    };
  }
}
