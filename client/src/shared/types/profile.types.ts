
export interface ProfileApiResponse {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  isActive: boolean;
}

export interface UpdateProfileDto {
  username?: string;
  avatar?: string;
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

} 

export interface ProfileStoreState {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
}