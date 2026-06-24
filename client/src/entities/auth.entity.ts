import { AuthResponse } from '@/features/auth/model/auth.types';

export class AuthEntity {
  private readonly _accessToken: string;
  private readonly _refreshToken?: string;
  private _me: AuthResponse['me'];

  constructor(data: AuthResponse) {
    this._accessToken = data.accessToken;
    this._refreshToken = data.refreshToken;
    this._me = data.me;
  }

  get accessToken(): string {
    return this._accessToken;
  }
  get refreshToken(): string {
    return this._refreshToken || 'undefined';
  }
  get me(): AuthResponse['me'] {
    return this._me;
  }

  toJson(): Omit<AuthResponse, 'createdAt' | 'updatedAt'> & {
    createdAt?: string;
    updatedAt?: string;
  } {
    return {
      accessToken: this._accessToken,
      refreshToken: this._refreshToken || undefined,
      me: this._me,
    };
  }

  static fromApiResponse(data: AuthResponse): AuthEntity {
    return new AuthEntity(data);
  }

  static fromApiArray(data: AuthResponse[]): AuthEntity[] {
    return data.map((item) => new AuthEntity(item));
  }
}
