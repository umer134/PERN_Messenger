import { UserPreview } from '@/entities/user';
import { ConversationPreview } from './conversation.types';

export type DraftConversation = {
  id: string;

  participant: UserPreview;

  isVirtual: true;
};

export type SelectedConversation =
  | {
      type: 'conversation';
      data: ConversationPreview;
    }
  | {
      type: 'draft';
      draft: DraftConversation;
    };
