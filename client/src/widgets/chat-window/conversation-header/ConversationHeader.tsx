import { User, Users } from 'lucide-react';

import { useLocalizedDateFormatter } from '@/shared/i18n/hooks/useLocalizedDateFormatter';

import * as s from './conversation-header.css';

import { Avatar } from '@/shared/ui/Avatar';
import { useAppSelector } from '@/app/hooks';
import { selectTypingUsers } from '@/features/typing';
import { TypingIndicator } from '@/shared/ui/typing-indicator';
import { selectPresence } from '@/features/presence/';

// type Props = {
//   conversation: ConversationDetails;
// };

type Conversation = {
  id: string;
  participantId: string;
  avatar: string;
  title: string;
  isGroup: boolean;
  membersCount: number;
  lastSeen: string;
};

export const ConversationHeader = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const formatDate = useLocalizedDateFormatter();

  const typingUsers = useAppSelector(selectTypingUsers(conversation.id));

  const presence = useAppSelector(selectPresence(conversation.participantId));

  return (
    <header className={s.root}>
      <div className={s.avatar}>
        {conversation.avatar ? (
          <Avatar src={conversation.avatar} />
        ) : conversation?.isGroup ? (
          <Users size={18} />
        ) : (
          <User size={18} />
        )}
      </div>

      <div className={s.info}>
        <span className={s.title}>{conversation?.title}</span>

        <span className={s.meta}>
          {typingUsers.length > 0 ? (
            <TypingIndicator size="xs" statusText={typingUsers[0].username} />
          ) : conversation?.isGroup ? (
            `${conversation?.membersCount} participants`
          ) : presence?.online ? (
            'online'
          ) : presence?.lastSeen ? (
            formatDate(presence.lastSeen, { format: 'smart' })
          ) : conversation?.lastSeen ? (
            formatDate(conversation.lastSeen!, { format: 'smart' })
          ) : (
            'offline'
          )}
        </span>
      </div>
    </header>
  );
};
