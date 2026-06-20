//message:new
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import socket from "../../../shared/socket/socket";

import { MessageAdapter } from "../../../entities/messages/model/message.adapter";

import { appendMessage } from "../../lib/message-cache";

import { emitDelivered } from "../../../shared/socket/emitters/message.emitters";

import { useReadMessages } from "../../../entities/messages/hooks/useReadMessages";

import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUserId } from "../../../entities/current-user/model/currentUser.selectors";

import { SOCKET_EVENTS } from "../../../shared/socket/events/socket-events";

export const useIncomingMessages = (chatId: string, isAtBottom: boolean) => {
  
  const queryClient = useQueryClient();

  const currentUserId = useAppSelector(selectCurrentUserId);

  const readMessage = useReadMessages();

  useEffect(() => {

    const handler = (rawMessage:any) => {
      const message =
        MessageAdapter.toVM(rawMessage);

      appendMessage(
        queryClient,
        chatId,
        message
      );

      if (
        message.senderId !== currentUserId &&
        isAtBottom
      ) {
        emitDelivered(
          message.id,
          chatId
        );

        readMessage.mutate(chatId);
      }
    };

    socket.on(
      SOCKET_EVENTS.MESSAGE_NEW,
      handler
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.MESSAGE_NEW,
        handler
      );
    };

  }, [
    chatId,
    isAtBottom,
    currentUserId
  ]);
};

