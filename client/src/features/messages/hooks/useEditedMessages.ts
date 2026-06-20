import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import socket from "../../../shared/socket/socket";

import { MessageAdapter } from "../../../entities/messages/model/message.adapter";

import { updateMessage } from "../../lib/message-cache";

import { SOCKET_EVENTS } from "../../../shared/socket/events/socket-events";

export const useEditedMessages = (chatId: string) => {

  const queryClient = useQueryClient();

  useEffect(() => {

    const handler = (rawMessage: any) => {

      const message = MessageAdapter.toVM(rawMessage);

      updateMessage(
        queryClient,
        chatId,
        message
      );
    };

    socket.on(
      SOCKET_EVENTS.MESSAGE_EDITED,
      handler
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.MESSAGE_EDITED,
        handler
      );
    };

  }, [chatId]);
};