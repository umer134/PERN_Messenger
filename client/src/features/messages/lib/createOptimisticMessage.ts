import {
  MessageReplyVM,
  MessageVM,
  SendMessageDto,
} from '@/entities/messages/model';
import { resolveAttachmentTypeFromFile } from '@/entities/messages/lib';

export const createOptimisticMessage = (
  dto: SendMessageDto,
  chatId: string,
  senderId: string,
  senderName: string,
  replyMessage?: MessageReplyVM | null,
): MessageVM => ({
  id: dto.clientId,
  clientId: dto.clientId,
  chatId,
  senderId,
  senderName,

  content: dto.content ?? null,

  attachments:
    dto.files?.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: resolveAttachmentTypeFromFile(file),
    })) ?? [],

  replyTo: replyMessage
    ? {
        id: replyMessage.id,
        senderId: replyMessage.senderId,
        senderName: replyMessage.senderName,
        content: replyMessage.content,
        attachments: replyMessage.attachments,
      }
    : null,

  sentAt: new Date().toISOString(),

  isRead: false,

  status: 'sending',
});
