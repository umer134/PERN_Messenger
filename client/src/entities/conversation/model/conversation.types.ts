export type ConversationPreview = {
  id: string;

  title: string;

  avatar?: string;

  isGroup: boolean;

  unreadCount: number;

  lastMessage?: string;

  updatedAt: string;

  isVirtual?: string;

  participantId?: string;

  isOnline?: boolean;

  lastSeen: string | null;
};
