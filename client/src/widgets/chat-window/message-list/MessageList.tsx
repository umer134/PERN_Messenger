import { useRef, useEffect, useState } from 'react';

import * as s from './message-list.css';

import { MessageVM } from '../../../entities/messages/model/message.types';

import { groupMessages } from '../../../entities/messages/lib/groupMessages';
import { useReadMessages } from '../../../entities/messages/hooks/useReadMessages';
import { MessageGroup } from './message-group/MessageGroup';
import { MediaItem } from '../../../features/media-viewer/model/media-viewer.types';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUserId } from '../../../entities/current-user/model/currentUser.selectors';
import { ChevronDown } from 'lucide-react';

type Props = {
  messages: MessageVM[];
  mediaItems: MediaItem[];
  conversationId: string;

  onBottomChange: (value: boolean) => void;
};

export const MessagesList = ({ messages, mediaItems, conversationId, onBottomChange }: Props) => {
  const myId = useAppSelector(selectCurrentUserId);

  const readMessages = useReadMessages();

  const groups = groupMessages(messages);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
    readMessages.mutate(conversationId);

    setShowScrollButton(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "auto",
    });
  }, [conversationId]);

  useEffect(() => {
    if (!showScrollButton) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  useEffect(() => {
    const container = listRef.current;

    if(!container) return;

    const handleScroll = () => {

      console.log("scroll")

      const distanceFromBottom = 
        container.scrollHeight -
        container.scrollTop - 
        container.clientHeight;

          console.log({
    scrollHeight: container.scrollHeight,
    scrollTop: container.scrollTop,
    clientHeight: container.clientHeight,
    distanceFromBottom,
  });

      const nearBottom = distanceFromBottom < 80;

      onBottomChange(nearBottom);
    
      setShowScrollButton(!nearBottom);

    };

    handleScroll();

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };

  }, [messages]);

  return (
    <div className={s.wrapper}>
      <div ref={listRef} className={s.root}>
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
      {showScrollButton && (
        <button className={s.scrollButton} onClick={scrollToBottom}>
          <ChevronDown size={18} />
        </button>
      )}
    </div>
  );
};