export type ChatDetails = {
  id: string;

  title: string;

  avatar: string | null;

  isGroup: boolean;

  unreadCount: number;

  membersCount?: number;

  lastMessage: string | null;

  updatedAt: string;

  participantId: string;

  isOnline: boolean;

  lastSeen: string | null;
};
