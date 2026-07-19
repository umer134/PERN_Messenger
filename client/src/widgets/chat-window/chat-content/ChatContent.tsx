import { ChatHeader } from '../chat-header/ChatHeader';
import { MessagesList } from '../message-list/MessageList';
import { MessageComposer } from '../message-composer/MessageComposer';
import { useInfiniteMessages } from '@/features/messages/hooks/crudHooks/useInfiniteMessages';
import { useSendMessage } from '@/features/messages/hooks/crudHooks/useSendMessage';
import { ChatPreview } from '@/entities/chat/model/chat.types';
import { useChatSocket } from '@/shared/socket/hooks/useChatSocket';
import { useMessageEvents } from '@/features/messages/lib/useMessageEvents';

import * as s from '../chat-view.css';
import { useEffect, useMemo, useState } from 'react';
import { useReadMessages } from '@/features/messages/hooks/crudHooks/useReadMessages';
import { useEditMessage } from '@/features/message-actions/hooks/useMessageActions';
import { useAppSelector } from '@/app/hooks';
import { selectActiveMessage } from '@/features/message-actions/model/message-actions.selectors';

type Props = {
  chat: ChatPreview;
  onBack?: () => void;
};

export const ChatContent = ({ chat, onBack }: Props) => {
  const [isAtBottom, setIsAtBottom] = useState(true);

  useChatSocket(chat.id);
  useMessageEvents(chat.id, isAtBottom);

  const activeMessage = useAppSelector(selectActiveMessage);

  const { mutate: readMessages } = useReadMessages();
  const sendMessage = useSendMessage(chat.id);
  const editMessage = useEditMessage(chat.id);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMessages(chat.id);

  const messages = useMemo(() => {
    // pages[0] is the newest page; when fetching older pages they are appended.
    // Reverse pages so oldest pages come first, producing a global chronological
    // order (oldest -> newest) for rendering.
    return (
      data?.pages
        .slice()
        .reverse()
        .flatMap((page) => page.messages) ?? []
    );
  }, [data]);

  const mediaItems = useMemo(() => {
    return messages.flatMap(
      (message) =>
        message.attachments
          ?.filter(
            (attachment) =>
              attachment.type === 'image' ||
              attachment.type === 'video' ||
              attachment.type === 'audio',
          )
          .map((attachment) => ({
            id: attachment.id,
            type: attachment.type as 'image' | 'video' | 'audio',
            url: attachment.url ?? '',
            name: attachment.name,
          })) ?? [],
    );
  }, [messages]);

  const handleSend = async (
    clientId: string,
    content: string,
    files: File[],
  ) => {
    await sendMessage.mutateAsync({
      clientId,
      recipientId: chat.participantId,
      content,
      files,
      replyToId: activeMessage?.id || undefined,
    });
  };

  const handleEdit = async (messageId: string, content: string) => {
    await editMessage.mutateAsync({
      id: messageId,
      dto: { messageId, newContent: content },
    });
  };

  useEffect(() => {
    if (!isAtBottom) return;

    readMessages(chat.id);
  }, [isAtBottom, chat.id, readMessages]);

  return (
    <div className={s.chatContent}>
      <ChatHeader chat={chat} onBack={onBack} />

      <MessagesList
        messages={messages}
        mediaItems={mediaItems}
        chatId={chat.id}
        onBottomChange={setIsAtBottom}
        fetchPreviousPage={fetchNextPage}
        hasPreviousPage={hasNextPage}
        isFetchingPreviousPage={isFetchingNextPage}
      />

      <MessageComposer
        chatId={chat.id}
        onSend={handleSend}
        onEdit={handleEdit}
      />
    </div>
  );
};
