import { useTranslation } from 'react-i18next';

import * as s from './chat-items.css';
import { ChatPreview } from '@/entities/chat/model/chat.types';
import { ChatItem } from '../chat-item/ChatItem';

type Props = {
  chats: ChatPreview[];

  selectedChat: ChatPreview | null;

  onSelect: (data: ChatPreview) => void;
};

export const ChatItems = ({ chats, selectedChat, onSelect }: Props) => {
  const { t } = useTranslation('chat');

  return (
    <div className={s.root}>
      {chats.length <= 0 && <h3>{t('empty.list')}</h3>}
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          selected={selectedChat === chat}
          onClick={() => onSelect(chat)}
        />
      ))}
    </div>
  );
};
