import { useEffect } from "react";
import socket from "../socket";
import { SOCKET_EVENTS } from "../events/socket-events";

export const useSocketReconnect = (chatId: string) => {

  useEffect(() => {
    const handleConnect = () => {
      if(!chatId) return;

      socket.emit(SOCKET_EVENTS.CHAT_JOIN, chatId);
    };

    socket.on("connect", handleConnect);

    if(socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [chatId]);
};