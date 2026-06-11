import { useState } from "react";
import { ConversationHeader } from "../conversation-header/ConversationHeader";
import { MessagesList } from "../message-list/MessageList";
import { MessageComposer } from "../message-composer/MessageComposer";
import { mockConversationDetails } from "../../../entities/conversation/data/mock-conversation-details";
import { mockMessages } from "../../../entities/messages/data/mock-messages";
import { MessageAttachmentVM, MessageVM } from "../../../entities/messages/model/message.types";
import { selectCurrentUserId } from "../../../entities/current-user/model/currentUser.selectors";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveMessage, selectMessageAction } from "../../../features/message-actions/model/message-actions.selectors";

type Props = {
  conversationId: string;
};

export const ConversationContent = ({conversationId,}: Props) => {
  const [messages, setMessages] = useState(mockMessages);

  const mediaItems =
    messages.flatMap(message =>
      message.attachments
        .filter(
          attachment =>
            attachment.type === "image" ||
            attachment.type === "video" || 
            attachment.type === "audio"
        )
        .map(attachment => ({
          id: attachment.id,

          type: attachment.type as "image" | "video" | "audio",

          url: attachment.url ?? "",

          name: attachment.name,
        }))
  );

  const conversation = mockConversationDetails[conversationId];

  const currentUserId = useAppSelector(selectCurrentUserId);

  const actionType = useAppSelector(selectMessageAction);
  const activeMessage = useAppSelector(selectActiveMessage);

  const handleSend = (content: string, files: File[]) => {
    
  const attachments: MessageAttachmentVM[] =
    files.map(file => {
      let type: MessageAttachmentVM["type"];

      if (
        file.type.startsWith("image/")
      ) {
        type = "image";
      }
      else if (
        file.type.startsWith("audio/")
      ) {
        if (
          file.name.endsWith(".webm")
        ) {
          type = "voice";
        } else {
          type = "audio";
        }
      }
      else if (
        file.type.startsWith("video/")
      ) {
        type = "video";
      }
      else {
        type = "file";
      }

      return {
        id: crypto.randomUUID(),

        type,

        name: file.name,

        url:
          URL.createObjectURL(file),
      };
    });

    const newMessage: MessageVM = {
      id: crypto.randomUUID(),

      chatId: conversationId,

      senderId: 'me',

      content,

      attachments: attachments || [],

      replyTo: 
        actionType === "reply" && activeMessage ?
        { id: activeMessage.id, 
          senderId: activeMessage.senderId, 
          content: activeMessage.content
        } : null,
      
      sentAt: new Date().toISOString(),

      isRead: false,

      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? {
                ...msg,
                status: "sent",
              }
            : msg
        )
      );
    }, 1000);
  }

  return (
    <>
      <ConversationHeader
        conversation={conversation}
      />

      <MessagesList
        messages={messages}
        mediaItems={mediaItems}
      />

      <MessageComposer
        onSend={handleSend}
      />
    </>
  );
};