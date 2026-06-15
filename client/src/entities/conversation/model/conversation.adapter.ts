import { ConversationResponse } from "./conversation.model";
import { ConversationPreview } from "./conversation.types";

export class ConversationAdapter {
  static toPreview(conversation: ConversationResponse): ConversationPreview {
    return {
      id: conversation.id,
      title: conversation.group_name || '',
      avatar: conversation.group_avatar || '',
      isGroup: conversation.is_group,
      unreadCount: 0,
      lastMessage: conversation.messages?.[conversation.messages?.length || 0],
      updatedAt: '',
      isVirtual: '',
      participantId: '',
      isOnline: undefined,
    }
  }
}