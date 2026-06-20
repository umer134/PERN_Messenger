import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import socket from "../../../shared/socket/socket";

import { removeMessage } from "../../lib/message-cache";

import { SOCKET_EVENTS } from "../../../shared/socket/events/socket-events";

export const useDeletedMessages = (chatId: string) => {

  const queryClient = useQueryClient();

  useEffect(() => {

    const handler = ({ messageId,}: { messageId: string;}) => {

      removeMessage(
        queryClient,
        chatId,
        messageId
      );
    };

    socket.on(
      SOCKET_EVENTS.MESSAGE_DELETED,
      handler
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.MESSAGE_DELETED,
        handler
      );
    };

  }, [chatId]);
};