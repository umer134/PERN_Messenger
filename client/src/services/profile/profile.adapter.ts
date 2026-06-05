import { ProfileEntity } from "../../entities/user/model/user.entity";
import { ProfileApiResponse, UpdateProfileDto } from "../../entities/user/types/user.types";

export class profileAdapter {

  static toEntity(apiProfile: ProfileApiResponse): ProfileEntity {
    return new ProfileEntity({
      id: apiProfile.id,
      username: apiProfile.username,
      email: apiProfile.email,
      avatar: apiProfile.avatar || null,
      createdAt: apiProfile.createdAt,
      isActive: apiProfile.isActive,
    });
  }

  static toApi(profile: ProfileEntity): ProfileApiResponse {
    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
      createdAt: profile.createdAt.toISOString(),
      isActive: profile.isActive,
    };
  }

  static updateDtoToApi(dto: UpdateProfileDto) {
    return {
      username: dto.username || '',
      avatar: dto.avatar || '',
    }
  }
}