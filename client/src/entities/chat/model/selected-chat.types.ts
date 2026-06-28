import { UserPreview } from '@/entities/user';
import { ChatPreview } from './chat.types';

export type DraftChat = {
  id: string;

  participant: UserPreview;

  isVirtual: true;
};

export type SelectedChat =
  | {
      type: 'chat';
      data: ChatPreview;
    }
  | {
      type: 'draft';
      draft: DraftChat;
    };
