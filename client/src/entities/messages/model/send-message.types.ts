import { MessageReplyVM } from './message.types';

export interface SendMessageDto {
  clientId: string;

  chatId?: string;

  recipientId?: string;

  content?: string;

  replyToId?: string;

  replyMessage?: MessageReplyVM;

  files?: File[];
}
