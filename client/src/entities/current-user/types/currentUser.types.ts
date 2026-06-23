export interface ProfileApiResponse {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  isActive: boolean;
}
export interface CurrentUserApiResponse {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin' | 'moderator' | null;
  avatar?: string | null | undefined;
  createdAt?: string;
  isActive?: boolean;
}

export interface UpdateProfileDto {
  username?: string;
  avatar?: File;
}

export interface ProfileUiState {
  isSelected: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  expandedSections: string[];
}

export type ProfileFormData = UpdateProfileDto & {
  password?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
};

export interface ProfileStoreState {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
}
export interface currentUserSliceState {
  id: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
}
