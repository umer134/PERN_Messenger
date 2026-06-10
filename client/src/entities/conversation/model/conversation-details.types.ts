export type ConversationDetails = {
  id: string;

  title: string;

  avatar?: string;

  isGroup: boolean;

  membersCount?: number;

  isOnline?: boolean;
};