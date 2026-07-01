import { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '@/shared/api/endpoints';
import { apiCLient } from '@/shared/api/http-client';
import { ChatPreview } from '../model/chat.types';

const { CHATS } = API_ENDPOINTS;

export class ChatApi {
  static leadChats(): Promise<AxiosResponse<ChatPreview[]>> {
    return apiCLient.get(CHATS.GET_ALL);
  }
}
