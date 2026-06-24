import { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { apiCLient } from '@/shared/api/http-client';
import { ConversationPreview } from '../model/conversation.types';

const { CHATS } = API_ENDPOINTS;

export class ConversationApi {
  static leadChats(): Promise<AxiosResponse<ConversationPreview[]>> {
    return apiCLient.get(CHATS.GET_ALL);
  }
}
