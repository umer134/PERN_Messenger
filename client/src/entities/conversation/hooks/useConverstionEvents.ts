import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import socket from "../../../shared/socket/socket";

export const useConversationEvents = () => {
  console.log('...')
  const queryClient = useQueryClient();

  useEffect(() => {

    const handler = ({ chatId }) => {
      console.log('chat:updated', chatId);
      queryClient.invalidateQueries({
        queryKey: ['conversation', 'list'],
      });
    };

    socket.on("chat:updated", handler);

    return () => {
      socket.off("chat:updated", handler);
    };

  }, [queryClient]);
};