import { useRef, useEffect, useState } from 'react';

import * as s from './message-list.css';

import { MessageVM } from '../../../entities/messages/model/message.types';

import { groupMessages } from '../../../entities/messages/lib/groupMessages';
import { useReadMessages } from '../../../entities/messages/hooks/useReadMessages';
import { MessageGroup } from './message-group/MessageGroup';
import { MediaItem } from '../../../features/media-viewer/model/media-viewer.types';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUserId } from '../../../entities/current-user/model/currentUser.selectors';

type Props = {
  messages: MessageVM[];
  mediaItems: MediaItem[];
  conversationId: string;
};

export const MessagesList = ({ messages, mediaItems, conversationId }: Props) => {

  const [showScrollButton, setShowScrollButton] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const readMessages = useReadMessages();

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleVisible = () => {
    if(timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      if(!conversationId) return;

      readMessages.mutate(conversationId);
    }, 300);
  };

  const myId = useAppSelector(selectCurrentUserId);

  const groups = groupMessages(messages);


  useEffect(() => {
    const container = listRef.current;

    if(!container) return;

    const handleScroll = () => {

      const distanceFromBottom = container.scrollHeight 
        - container.scrollTop - container.clientHeight;
    
      setShowScrollButton(
        distanceFromBottom > 150
      );

    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return (
    <div ref={listRef} className={s.root}>
      <div className={s.content}>
        {groups.map((group) => (
          <MessageGroup
            key={group.messages[0].id}
            group={group}
            isMine={group.senderId === myId}
            mediaItems={mediaItems}
            onVisible={handleVisible}
          />
        ))}
        {
          showScrollButton && (
            <button onClick={scrollToBottom}>
              ↓
            </button>
          )
        }
        <div ref={bottomRef} />
      </div>
    </div>
  );
};