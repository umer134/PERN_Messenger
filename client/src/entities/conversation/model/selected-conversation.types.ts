import { User } from '@/user/model/user.types';
import { ConversationPreview } from './conversation.types';

export type DraftConversation = {
  id: string;

  participant: User;

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
