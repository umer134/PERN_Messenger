import { API_ENDPOINTS } from '@/constants/endpoints';
import { apiCLient } from '@/shared/api/http-client';
import { meRequest, meResponse } from '../model/current-user.model';

const { ME } = API_ENDPOINTS;
export class currentUserApi {
  static getMe() {
    return apiCLient.get<meResponse>(ME.GET);
  }

  static updateMe(dto: { name: string | undefined; avatar: File | undefined }) {
    const formData = new FormData();

    if (dto.name) {
      formData.append('name', dto.name);
    }

    if (dto.avatar) {
      formData.append('avatar', dto.avatar);
    }

    return apiCLient.put<meResponse>(ME.UPDATE, formData);
  }
}
