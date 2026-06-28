import { User, Users } from 'lucide-react';

import { ChatPreview } from '@/entities/chat/model/chat.types';

import * as s from './chat-item.css';
import { useMediaViewer } from '@/features/media-viewer/lib/useMediaViewer';
import { Avatar } from '@/shared/ui/Avatar';
import { resolveMediaUrl } from '@/shared/lib/media/resolveMediaUrl';
import { useAppSelector } from '@/app/hooks';
import { selectTypingUsers } from '@/features/typing/model/typing.selectors';
import { TypingIndicator } from '@/shared/ui/typing-indicator/TypingIndicator';
import { useLocalizedDateFormatter } from '@/shared/i18n/hooks/useLocalizedDateFormatter';

type Props = {
  chat: ChatPreview;

  selected?: boolean;

  onClick?: () => void;
};

export const ChatItem = ({ chat, selected, onClick }: Props) => {
  const formatDate = useLocalizedDateFormatter();

  const typingUsers = useAppSelector(selectTypingUsers(chat.id));

  const isTyping = typingUsers.length > 0;

  const { open } = useMediaViewer();

  return (
    <div
      className={`${s.root} ${selected ? s.selected : ''}`}
      onClick={onClick}
    >
      {chat.avatar ? (
        <Avatar
          src={chat.avatar}
          alt={chat.title}
          status={chat.isOnline ? 'online' : 'offline'}
          onClick={(e) => {
            e.stopPropagation();

            if (!chat.avatar) return;

            open(
              [
                {
                  id: chat.id,
                  type: 'image',
                  url: resolveMediaUrl(chat.avatar),
                  name: chat.title,
                },
              ],
              0,
            );
          }}
        />
      ) : (
        <div className={s.avatar}>
          {chat.isGroup ? <Users size={20} /> : <User size={20} />}
        </div>
      )}

      <div className={s.content}>
        <div className={s.topRow}>
          <span className={s.title}>{chat.title}</span>

          <span className={s.time}>
            {formatDate(chat.updatedAt, {
              format: 'smart',
            })}
          </span>
        </div>

        <div className={s.bottomRow}>
          {isTyping ? (
            <TypingIndicator statusText={typingUsers[0].username} />
          ) : (
            <span className={s.message}>{chat.lastMessage}</span>
          )}

          {chat.unreadCount > 0 && (
            <span className={s.badge}>{chat.unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};
