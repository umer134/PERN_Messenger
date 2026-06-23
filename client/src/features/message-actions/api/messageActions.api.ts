import { API_ENDPOINTS } from '../../../constants/endpoints';
import { apiCLient } from '../../../shared/api/http-client';
import {
  MessageEditDto,
  MessageEditResponse,
} from '../../../entities/messages/model/message.model';

const { MESSAGES } = API_ENDPOINTS;

export class MessageActionsApi {
  static editMessage(id: string, dto: MessageEditDto) {
    return apiCLient.put<MessageEditResponse>(MESSAGES.UPDATE, dto);
  }

  static deleteMessage(id: string) {
    return apiCLient.delete(MESSAGES.DELETE(id));
  }
}
