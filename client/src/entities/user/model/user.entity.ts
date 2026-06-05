import { ProfileApiResponse } from "../types/user.types";

export class ProfileEntity {
  private readonly _id: string;
  private _username: string;
  private _email: string;
  private _avatar: string | null;
  private _createdAt: Date;
  private _isActive: boolean;

  constructor (data: ProfileApiResponse) {
    this._id = data.id;
    this._username = data.username;
    this._email = data.email;
    this._avatar = data.avatar;
    this._createdAt = new Date(data.createdAt);
    this._isActive = data.isActive;
  }

  // Getters
  get id(): string { return this._id; }
  get username(): string { return this._username; }
  get email(): string { return this._email; }
  get avatar(): string | null { return this._avatar; }
  get createdAt(): Date { return this._createdAt; }
  get isActive(): boolean { return this._isActive; }

  //setState methods
  updateProfile(data: Partial<Pick<ProfileEntity, 'username' | 'email' | 'avatar'>>): void {
    if (data.username) this._username = data.username;
    if (data.email) this._email = data.email;
    if (data.avatar) this._avatar = data.avatar;
  }

  activate(): void {
    this._isActive = true;
  }

  deactivate(): void {
    this._isActive = false;
  }

  ban(): void {
    this._isActive = false;
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this._email);
  }

  formatDateForDisplay(): string {
    return this._createdAt.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  //serialization and deliverance to server
  toJson(): Omit<ProfileApiResponse, 'createdAt' | 'updatedAt'> & {
    createdAt: Date;
    updatedAt?: string;
  } {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      avatar: this._avatar,
      createdAt: this._createdAt,
      isActive: this._isActive,
    }
  }

  static fromApiResponse(data: ProfileApiResponse): ProfileEntity {
    return new ProfileEntity(data);
  }

  static fromApiArray(data: ProfileApiResponse[]): ProfileEntity[] {
    return data.map(item => new ProfileEntity(item));
  }

}