import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import socket from "../../../shared/socket/socket";

import { markMessagesDelivered } from "../../lib/message-cache";

import { SOCKET_EVENTS } from "../../../shared/socket/events/socket-events";

export const useDeliveredMessages = (chatId: string) => {

  const queryClient = useQueryClient();

  useEffect(() => {

    const handler = ({ messageId, } : { messageId: string; }) => {

      markMessagesDelivered(
        queryClient,
        chatId,
        messageId
      );
    };

    socket.on(
      SOCKET_EVENTS.MESSAGE_DELIVERED,
      handler
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.MESSAGE_DELIVERED,
        handler
      );
    };

  }, [chatId]);
};