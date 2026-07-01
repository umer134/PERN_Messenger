import { useRef, useEffect, useState, useMemo, useCallback } from 'react';

import * as s from './message-list.css';

import { MessageVM } from '@/entities/messages/model/message.types';

import { groupMessages } from '@/entities/messages/lib/groupMessages';
import { useReadMessages } from '@/features/messages/hooks/crudHooks/useReadMessages';
import { MessageGroup } from './message-group/MessageGroup';
import { MediaItem } from '@/features/media-viewer/model/media-viewer.types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCurrentUserId } from '@/entities/current-user/model/currentUser.selectors';
import { ChevronDown } from 'lucide-react';
import { selectTargetMessageId } from '@/features/navigation/message-navigation/model/message-navigation.selectors';
import { clearScrollTarget } from '@/features/navigation/message-navigation/model/message-navigation.slice';

type Props = {
  messages: MessageVM[];
  mediaItems: MediaItem[];
  chatId: string;

  onBottomChange: (value: boolean) => void;
};

export const MessagesList = ({
  messages,
  mediaItems,
  chatId,
  onBottomChange,
}: Props) => {
  const dispatch = useAppDispatch();

  const myId = useAppSelector(selectCurrentUserId);

  const targetMessageId = useAppSelector(selectTargetMessageId);

  const readMessages = useReadMessages();

  const groups = useMemo(() => groupMessages(messages), [messages]);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

    readMessages.mutate(chatId);

    setShowScrollButton(false);
  }, [chatId, readMessages]);

  useEffect(() => {
    if (!targetMessageId) {
      return;
    }

    const element = document.getElementById(`message-${targetMessageId}`);

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    element.classList.add(s.highlightedMessage);

    setTimeout(() => {
      element.classList.remove(s.highlightedMessage);
    }, 1500);

    dispatch(clearScrollTarget());
  }, [targetMessageId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'auto',
    });
  }, [chatId]);

  useEffect(() => {
    if (!showScrollButton) {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages.length]);

  useEffect(() => {
    const container = listRef.current;

    if (!container) return;

    const handleScroll = () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      const nearBottom = distanceFromBottom < 80;

      onBottomChange(nearBottom);

      setShowScrollButton(!nearBottom);
    };

    handleScroll();

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [messages.length]);

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
