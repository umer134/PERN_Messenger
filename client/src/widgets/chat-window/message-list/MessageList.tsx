import { useRef, useEffect } from 'react';

import * as s from './message-list.css';

import { MessageVM } from '../../../entities/messages/model/message.types';

import { groupMessages } from '../../../entities/messages/lib/groupMessages';
import { MessageGroup } from './message-group/MessageGroup';
import { MediaItem } from '../../../features/media-viewer/model/media-viewer.types';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUserId } from '../../../entities/current-user/model/currentUser.selectors';

type Props = {
  messages: MessageVM[];
  mediaItems: MediaItem[];
};

export const MessagesList = ({ messages, mediaItems }: Props) => {

  const myId = useAppSelector(selectCurrentUserId);

  const groups = groupMessages(messages);
  console.log('grouoMes:', groups)

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className={s.root}>
      <div className={s.content}>
        {groups.map((group) => (
          <MessageGroup
            key={group.messages[0].id}
            group={group}
            isMine={group.senderId === myId}
            mediaItems={mediaItems}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};