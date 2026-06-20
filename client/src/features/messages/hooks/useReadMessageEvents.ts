import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import socket from "../../../shared/socket/socket";

import { markMessageRead } from "../../lib/message-cache";

import { SOCKET_EVENTS } from "../../../shared/socket/events/socket-events";

export const useReadMessagesEvents = (chatId: string) => {

  const queryClient = useQueryClient();

  useEffect(() => {

    const handler = ({messageIds,} : { messageIds: string[];}) => {
      markMessageRead(
        queryClient,
        chatId,
        messageIds
      );
    };

    socket.on(
      SOCKET_EVENTS.MESSAGE_READ,
      handler
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.MESSAGE_READ,
        handler
      );
    };

  }, [chatId]);
};