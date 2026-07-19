export interface SendMessageDto {
  clientId: string;

  chatId?: string;

  recipientId?: string;

  content?: string;

  replyToId?: string;

  files?: File[];
}
