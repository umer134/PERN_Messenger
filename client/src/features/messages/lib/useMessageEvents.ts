import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import socket from "../../../shared/socket/socket";

import { MessageAdapter } from "../../../entities/messages/model/message.adapter";
import { MessageResponse } from "../../../entities/messages/model/message.model";

export const useMessageEvents = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (rawMessage: MessageResponse) => {

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
    };

    socket.on(
      "messages:new",
      handler
    );

    return () => {
      socket.off("messages:new", handler);
    };
  }, [chatId]);
};