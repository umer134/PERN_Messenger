import { AuthEntity } from "../../../entities/auth.entity";
import { AuthResponse } from "./auth.model";
import { RegisterDto } from "./auth.types";

export class AuthAdapter {

  static toEntity(apiAuth: AuthResponse): AuthEntity {
    return new AuthEntity({
      accessToken: apiAuth.accessToken,
      refreshToken: apiAuth.refreshToken,
      me: apiAuth.user,
    })
  }

  static toApi(auth: AuthEntity): AuthResponse {
    return {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      user: auth.me,
    }
  }

  static AuthDtoToApi(dto: RegisterDto) {
    return {
      name: dto.username,
      email: dto.email,
      password: dto.password,
      avatar: dto.avatar, 
    }
  }
}