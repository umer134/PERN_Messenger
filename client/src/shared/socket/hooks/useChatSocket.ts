import { useEffect } from "react";
import socket from "../socket";
import { useSocketReconnect } from "./useSocketReconnect";

export const useChatSocket = (chatId: string) => {
  
  useSocketReconnect(chatId);
  
  useEffect(() => {
    if(!chatId) return;

    return () => {
      socket.emit(
        "chat:leave",
        chatId,
      );
    };
  }, [chatId]);
};