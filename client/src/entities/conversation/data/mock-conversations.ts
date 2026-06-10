import { ConversationPreview } from "../model/conversation.types";

export const mockConversations: ConversationPreview[] = [
  {
    id: "1",
    title: "Alex",
    unreadCount: 2,
    lastMessage: "Let's finish auth today",
    updatedAt: "15:42",
    isGroup: false,
  },

  {
    id: "2",
    title: "Frontend Team",
    unreadCount: 7,
    lastMessage: "Design updated",
    updatedAt: "14:20",
    isGroup: true,
  },

  {
    id: "3",
    title: "Kate",
    unreadCount: 0,
    lastMessage: "Thanks ❤️",
    updatedAt: "12:10",
    isGroup: false,
  },
];