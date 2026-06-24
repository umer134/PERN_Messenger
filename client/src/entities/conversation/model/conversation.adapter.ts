import { ConversationResponse } from './conversation.model';
import { ConversationPreview } from './conversation.types';

export class ConversationAdapter {
  static toPreview(conversation: ConversationResponse): ConversationPreview {
    return {
      id: conversation.id,
      title: conversation.title || '',
      avatar: conversation.avatar || '',
      isGroup: conversation.isGroup,
      unreadCount: conversation.unreadCount || 0,
      lastMessage: conversation.lastMessage || '',
      updatedAt: conversation.updatedAt || '',
      isVirtual: '',
      participantId: conversation.participantId || '',
      isOnline: conversation.isOnline,
      lastSeen: conversation.lastSeen || null,
    };
  }
}
