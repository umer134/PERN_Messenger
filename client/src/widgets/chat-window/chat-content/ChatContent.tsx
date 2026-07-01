import { ChatHeader } from '../chat-header/ChatHeader';
import { MessagesList } from '../message-list/MessageList';
import { MessageComposer } from '../message-composer/MessageComposer';
import { useMessages } from '@/features/messages/hooks/crudHooks/useMessages';
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

  const { data, isLoading, error } = useMessages(chat.id);

  const messages = data?.messages ?? [];

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

  const handleSend = async (content: string, files: File[]) => {
    await sendMessage.mutateAsync({
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
      />

      <MessageComposer
        chatId={chat.id}
        onSend={handleSend}
        onEdit={handleEdit}
      />
    </div>
  );
};
