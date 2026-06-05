import { API_ENDPOINTS } from "../../../constants/endpoints"
import { apiCLient } from "../../../shared/api/http-client";
import { meRequest, meResponse } from "../model/current-user.model";

const { ME } = API_ENDPOINTS;
export class currentUserApi {

  static getMe() {
    return apiCLient.get<meResponse>(
      ME.GET
    );
  }

  static updateMe(dto: meRequest) {
    return apiCLient.put<meResponse>(
      ME.UPDATE,
      dto
    );
  }
  
}