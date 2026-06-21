import { ConversationHeader } from "../conversation-header/ConversationHeader";
import { MessagesList } from "../message-list/MessageList";
import { MessageComposer } from "../message-composer/MessageComposer";
import { useMessages } from "../../../entities/messages/hooks/useMessages";
import { useSendMessage } from "../../../entities/messages/hooks/useSendMessage";
import { ConversationPreview } from "../../../entities/conversation/model/conversation.types";
import { useChatSocket } from "../../../shared/socket/hooks/useChatSocket";
import { useMessageEvents } from "../../../features/messages/lib/useMessageEvents";

import * as s from '../conversation-view.css';
import { useEffect, useState } from "react";
import { useReadMessages } from "../../../entities/messages/hooks/useReadMessages";
import { useEditMessage } from "../../../features/message-actions/hooks/useMessageActions";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveMessage } from "../../../features/message-actions/model/message-actions.selectors";
import { useTypingEvents } from "../../../features/typing/hooks/useTypingEvents";

type Props = {
  conversation: ConversationPreview;
};

export const ConversationContent = ({conversation,}: Props) => {

  const [isAtBottom, setIsAtBottom] = useState(true);

  useChatSocket(conversation.id);
  useMessageEvents(conversation.id, isAtBottom);
  useTypingEvents(conversation.id);

  const activeMessage = useAppSelector(selectActiveMessage);

  const readMessage = useReadMessages();
  const sendMessage = useSendMessage(conversation.id);
  const editMessage = useEditMessage(conversation.id);

  const { data, isLoading, error } = useMessages(conversation.id);

  const messages = data?.messages ?? [];

  const mediaItems = messages?.flatMap(message =>
    message.attachments?.filter(
      attachment =>
        attachment.type === "image" ||
        attachment.type === "video" || 
        attachment.type === "audio"
    ).map(attachment => ({
      id: attachment.id,
      type: attachment.type as "image" | "video" | "audio",
      url: attachment.url ?? "",
      name: attachment.name,
    }))
  ).filter(Boolean);

  const handleSend = async (content: string, files: File[]) => {
    await sendMessage.mutateAsync({
      recipientId: conversation.participantId,
      content,
      files,
      replyToId: activeMessage?.id || undefined,
    });
  };

  const handleEdit = async (messageId: string, content: string) => {
    await editMessage.mutateAsync({
      id: messageId,
      dto: {messageId, newContent: content},
    });
  };

  useEffect(() => {
    if(!isAtBottom) return;

    readMessage.mutate(conversation.id);
  }, [isAtBottom]);

  return (
    <div className={s.conversationContent}>
      <ConversationHeader
        conversation={conversation}
      />

      <MessagesList
        messages={messages}
        mediaItems={mediaItems}
        conversationId={conversation.id}
        onBottomChange={setIsAtBottom}
      />

      <MessageComposer
        conversationId={conversation.id}
        onSend={handleSend}
        onEdit={handleEdit}
      />
    </div>
  );
};