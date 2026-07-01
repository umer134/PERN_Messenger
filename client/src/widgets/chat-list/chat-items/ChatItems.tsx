import { useTranslation } from 'react-i18next';

import * as s from './chat-items.css';
import { ChatPreview } from '@/entities/chat/model/chat.types';
import { ChatItem } from '../chat-item/ChatItem';
import { Loader } from '@/shared/ui/Loader';

type Props = {
  chats: ChatPreview[];

  isLoading: boolean;

  selectedChat: ChatPreview | null;

  onSelect(data: ChatPreview): void;
};

export const ChatItems = ({
  chats,
  isLoading,
  selectedChat,
  onSelect,
}: Props) => {
  const { t } = useTranslation('chat');

  if (isLoading) {
    return <Loader />;
  }

  if (chats.length === 0) {
    return (
      <div className={s.root}>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>{t('empty.list')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={s.root}>
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          selected={selectedChat?.id === chat.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
