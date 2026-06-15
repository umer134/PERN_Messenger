import { useEffect } from "react";
import socket from "../socket";

export const useChatSocket = (chatId: string) => {
  useEffect(() => {
    if(!chatId) return;

    socket.emit(
      "chat:join",
      chatId,
    );

    return () => {
      socket.emit(
        "chat:leave",
        chatId,
      );
    };
  }, [chatId]);
};