import { ConversationHeader } from "../conversation-header/ConversationHeader";
import { MessagesList } from "../message-list/MessageList";
import { MessageComposer } from "../message-composer/MessageComposer";
import { useMessages } from "../../../entities/messages/hooks/useMessages";
import { useSendMessage } from "../../../entities/messages/hooks/useSendMessage";
import { ConversationPreview } from "../../../entities/conversation/model/conversation.types";
import { useChatSocket } from "../../../shared/socket/hooks/useChatSocket";
import { useMessageEvents } from "../../../features/messages/lib/useMessageEvents";

import * as s from '../conversation-view.css';

type Props = {
  conversation: ConversationPreview;
};

export const ConversationContent = ({conversation,}: Props) => {

  useChatSocket(conversation.id);
  useMessageEvents(conversation.id);

  const sendMessage = useSendMessage(conversation.id);

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
      files
    });
  };

  return (
    <div className={s.conversationContent}>
      <ConversationHeader
        conversation={conversation}
      />

      <MessagesList
        messages={messages}
        mediaItems={mediaItems}
        conversationId={conversation.id}
      />

      <MessageComposer
        onSend={handleSend}
      />
    </div>
  );
};