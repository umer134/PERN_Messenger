import { paths } from '@/shared/api/schema';

export type MessageResponse =
  paths['/api/chats/{chatId}/messages']['get']['responses']['200']['content']['application/json'];

export type MessageResponseModel = MessageResponse['messages'][number] & {
  clientId: string;
};

export type MessageEditDto =
  paths['/api/messages']['put']['requestBody']['content']['application/json'];

export type MessageEditResponse =
  paths['/api/messages']['put']['responses']['200']['content']['application/json'];

export type DirectMessageSendDto =
  paths['/api/messages']['post']['requestBody']['content']['multipart/form-data'];

export type DirectMessageSendResponse =
  paths['/api/messages']['post']['responses']['200']['content']['application/json'] & {
    clientId: string;
  };
