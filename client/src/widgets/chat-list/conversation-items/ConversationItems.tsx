import { useTranslation } from 'react-i18next';

import * as s from './conversation-items.css';
import { ConversationPreview } from '@/entities/conversation/model/conversation.types';
import { ConversationItem } from '../conversation-item/ConversationItem';

type Props = {
  conversations: ConversationPreview[];

  selectedConversation: ConversationPreview | null;

  onSelect: (data: ConversationPreview) => void;
};

export const ConversationItems = ({
  conversations,
  selectedConversation,
  onSelect,
}: Props) => {
  const { t } = useTranslation('chat');

  return (
    <div className={s.root}>
      {conversations.length <= 0 && <h3>{t('empty.list')}</h3>}
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          selected={selectedConversation === conversation}
          onClick={() => onSelect(conversation)}
        />
      ))}
    </div>
  );
};
