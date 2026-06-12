import { API_ENDPOINTS } from "../../../constants/endpoints";
import { apiCLient } from "../../../shared/api/http-client";

const { MESSAGES } = API_ENDPOINTS;
export class MessageApi {

  static sendMessage (dto) {
    return apiCLient.post(
      MESSAGES.CREATE,
      dto
    )
  }
}