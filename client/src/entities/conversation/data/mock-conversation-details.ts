import { ConversationDetails } from "../model/conversation-details.types";

export const mockConversationDetails: ConversationDetails[] = [
  {
    id: "1",
    title: "Alex",
    isGroup: false,
    isOnline: true,
  },

  {
    id: "2",
    title: "Frontend Team",
    isGroup: true,
    membersCount: 12,
  },

  {
    id: "3",
    title: "Kate",
    isGroup: false,
    isOnline: false
  }
]