import { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { apiCLient } from '@/shared/api/http-client';
import {
  DirectMessageSendResponse,
  MessageResponse,
} from '../model/message.model';
import { SendMessageDto } from '../model/send-message.types';

const { MESSAGES } = API_ENDPOINTS;
export class MessageApi {
  static sendMessage(
    dto: SendMessageDto,
  ): Promise<AxiosResponse<DirectMessageSendResponse>> {
    const formData = new FormData();

    if (dto.chatId) formData.append('chatId', dto.chatId);
    if (dto.recipientId) formData.append('recipientId', dto.recipientId);
    if (dto.content) formData.append('content', dto.content);
    if (dto.replyToId) formData.append('replyToId', dto.replyToId);

    dto.files?.forEach((file) => {
      formData.append('files', file);
      if (file.name.includes('voice-')) {
        formData.append('type', 'voice');
      }
    });

    return apiCLient.post(MESSAGES.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static getMessages(chatId: string): Promise<AxiosResponse<MessageResponse>> {
    return apiCLient.get(MESSAGES.GET2(chatId));
  }

  static readMessages(chatId: string) {
    return apiCLient.patch(MESSAGES.READ(chatId));
  }
}
