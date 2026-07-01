import { ChatResponse } from './chat.model';
import { ChatPreview } from './chat.types';

export class ChatAdapter {
  static toPreview(chat: ChatResponse): ChatPreview {
    return {
      id: chat.id,
      title: chat.title || '',
      avatar: chat.avatar || '',
      isGroup: chat.isGroup,
      unreadCount: chat.unreadCount || 0,
      lastMessage: chat.lastMessage || '',
      updatedAt: chat.updatedAt || '',
      isVirtual: '',
      participantId: chat.participantId || '',
      isOnline: chat.isOnline,
      lastSeen: chat.lastSeen || null,
    };
  }
}
