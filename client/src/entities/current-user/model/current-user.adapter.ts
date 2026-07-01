import { UpdateProfileDto } from '../types/currentUser.types';

export class CurrentUserAdapter {
  static toApi(dto: UpdateProfileDto) {
    return {
      name: dto.username,
      avatar: dto.avatar,
    };
  }
}
