import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { markMessageRead } from "../../lib/message-cache";

import { subscribeMessageRead } from "../../../shared/socket/listeners/message.listeners";

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

    return subscribeMessageRead(handler);

  }, [chatId]);
};