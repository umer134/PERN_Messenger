import { ArrowLeft, User, Users } from 'lucide-react';

import { useLocalizedDateFormatter } from '@/shared/i18n/hooks/useLocalizedDateFormatter';

import * as s from './chat-header.css';

import { Avatar } from '@/shared/ui/Avatar';
import { useAppSelector } from '@/app/hooks';
import { selectTypingUsers } from '@/features/typing';
import { TypingIndicator } from '@/shared/ui/typing-indicator';
import { selectPresence } from '@/features/presence/';

type chat = {
  id: string;
  participantId?: string;
  avatar?: string;
  title: string;
  isGroup: boolean;
  membersCount?: number;
  lastSeen?: string | null;
};

interface Props {
  chat: chat;
  onBack?: () => void;
}

export const ChatHeader = ({ chat, onBack }: Props) => {
  const formatDate = useLocalizedDateFormatter();

  const typingUsers = useAppSelector(selectTypingUsers(chat.id));

  const presence = useAppSelector(selectPresence(chat.participantId!));

  return (
    <header className={s.root}>
      {onBack && (
        <button className={s.backButton} onClick={onBack}>
          <ArrowLeft color="#fff" size={20} />
        </button>
      )}
      <div className={s.avatar}>
        {chat.avatar ? (
          <Avatar src={chat.avatar} />
        ) : chat?.isGroup ? (
          <Users size={18} />
        ) : (
          <User size={18} />
        )}
      </div>

      <div className={s.info}>
        <span className={s.title}>{chat?.title}</span>

        <span className={s.meta}>
          {typingUsers.length > 0 ? (
            <TypingIndicator size="xs" statusText={typingUsers[0].username} />
          ) : chat?.isGroup ? (
            `${chat?.membersCount} participants`
          ) : presence?.online ? (
            'online'
          ) : presence?.lastSeen ? (
            formatDate(presence.lastSeen, { format: 'smart' })
          ) : chat?.lastSeen ? (
            formatDate(chat.lastSeen!, { format: 'smart' })
          ) : (
            'offline'
          )}
        </span>
      </div>
    </header>
  );
};
