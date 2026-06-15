export type SendMessageDto = {
  chatId?: string;

  recipientId?: string;

  content?: string;

  replyToId?: string;

  files?: File[];
};