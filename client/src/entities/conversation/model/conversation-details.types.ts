export type ConversationDetails = {
  id: string;

  participantId: string;

  title: string;

  avatar?: string;

  isGroup: boolean;

  membersCount?: number;

  isOnline?: boolean;

  lastSeen?: number
};