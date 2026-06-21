import socket from "../socket";
import { SOCKET_EVENTS } from "../events/socket-events";

export const subscribeChatUpdated = (handler) => {
  socket.on(
    SOCKET_EVENTS.CHAT_UPDATED,
    handler
  );

  return () => {
    socket.off(
      SOCKET_EVENTS.CHAT_UPDATED,
      handler
    );
  };
};