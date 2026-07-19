export type MessageAttachmentVM = {
  id: string;

  type: 'image' | 'file' | 'video' | 'audio' | 'voice';

  name: string;

  url?: string;

  previewUrl?: string;

  duration?: number;

  waveform?: number[];
};

export type MessageReplyVM = {
  id: string;

  senderId: string | null;

  senderName: string | null;

  content: string | null;

  attachments: MessageAttachmentVM[];
};

export type MessageVM = {
  id: string;

  clientId?: string;

  chatId: string;

  senderId: string | null;

  senderName: string | null;

  content: string | null;

  attachments: MessageAttachmentVM[];

  replyTo?: MessageReplyVM | null;

  sentAt: string;

  isRead: boolean;

  status: TMessageStatus;
};

export type MessageGroupVM = {
  senderId: string;
  messages: MessageVM[];
};

export type TMessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export type MessagesPage = {
  messages: MessageVM[];
  previousCursor: string | null;
};
