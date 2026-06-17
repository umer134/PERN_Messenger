import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import socket from "../../../shared/socket/socket";

import { MessageAdapter } from "../../../entities/messages/model/message.adapter";
import { MessageResponse } from "../../../entities/messages/model/message.model";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUserId } from "../../../entities/current-user/model/currentUser.selectors";

export const useMessageEvents = (chatId: string) => {
  const queryClient = useQueryClient();

  const currentUserId = useAppSelector(selectCurrentUserId);

  useEffect(() => {
    const handler = (rawMessage) => {
    
      const message = MessageAdapter.toVM(rawMessage);

      queryClient.setQueryData(
        ["messages", chatId],
        (old: any) => {
          if(!old) return old;
          
          return {
            ...old, 
            messages: [
              ...old.messages,
              message,
            ],
          };
        }
      );

      if(message.senderId !== currentUserId) {
        socket.emit("message:delivered", {
          messageId: message.id,
          chatId,
        });
      }
    };

    const readHandler = ({ messageIds }) => {
      queryClient.setQueryData(
        ["messages", chatId],
        (old: any) => {

          if (!old) return old;

          const updated = {
            ...old,
            messages: old.messages.map(msg =>
              messageIds.includes(msg.id)
                ? {
                    ...msg,
                    status: "read",
                    isRead: true,
                  }
                : msg
            )
          };

          return updated;
        }
      );
    };

    const deliveredHandler = ({ messageId }) => {
      queryClient.setQueryData(
        ["messages", chatId],
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            messages: old.messages.map(msg =>
              msg.id === messageId
                ? {
                    ...msg,
                    status: "delivered"
                  }
                : msg
            )
          };
        }
      );
    };

    socket.on(
      "message:delivered",
      deliveredHandler
    );
    
    socket.on(
      "message:read",
      readHandler,
    );

    socket.on(
      "messages:new",
      handler
    );

    return () => {
      socket.off("messages:new", handler);
      socket.off("message:read", readHandler);
      socket.off("message:delivered", deliveredHandler);
    };
  }, [chatId]);

  
};