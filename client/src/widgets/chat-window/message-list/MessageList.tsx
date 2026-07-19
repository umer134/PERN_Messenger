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
import { Loader } from '@/shared/ui/Loader';

type Props = {
  messages: MessageVM[];
  mediaItems: MediaItem[];
  chatId: string;

  onBottomChange: (value: boolean) => void;

  fetchPreviousPage?: () => Promise<unknown>;
  hasPreviousPage?: boolean;
  isFetchingPreviousPage?: boolean;
};

export const MessagesList = ({
  messages,
  mediaItems,
  chatId,
  onBottomChange,
  fetchPreviousPage,
  hasPreviousPage,
  isFetchingPreviousPage,
}: Props) => {
  const dispatch = useAppDispatch();

  const myId = useAppSelector(selectCurrentUserId);

  const targetMessageId = useAppSelector(selectTargetMessageId);

  const readMessages = useReadMessages();

  const groups = useMemo(() => groupMessages(messages), [messages]);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fetchingRef = useRef(false);
  const initialLoadRef = useRef(true);
  const previousScrollHeightRef = useRef(0);

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
    if (!initialLoadRef.current) return;

    // messages prop length indicates when data arrived; scroll once.
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' });
      initialLoadRef.current = false;
      readMessages.mutate(chatId);
    }
  }, [messages.length, chatId, readMessages]);

  useEffect(() => {
    const container = listRef.current;

    if (!container) return;

    const handleScroll = async () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      onBottomChange(distanceFromBottom < 80);

      setShowScrollButton(distanceFromBottom >= 80);

      if (container.scrollTop < 50 && hasPreviousPage && !fetchingRef.current) {
        fetchingRef.current = true;

        previousScrollHeightRef.current = container.scrollHeight;

        try {
          fetchPreviousPage && (await fetchPreviousPage());

          requestAnimationFrame(() => {
            const newScrollHeight = container.scrollHeight;

            const heightDiff =
              newScrollHeight - previousScrollHeightRef.current;

            container.scrollTop += heightDiff;

            fetchingRef.current = false;
          });
        } catch (e) {
          fetchingRef.current = false;
          throw e;
        }
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [hasPreviousPage, fetchPreviousPage]);

  return (
    <div className={s.wrapper}>
      <div ref={listRef} className={s.root}>
        <div className={s.content}>
          {isFetchingPreviousPage && <Loader />}
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
