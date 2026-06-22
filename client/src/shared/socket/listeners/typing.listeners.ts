import socket from "../socket";
import { SOCKET_EVENTS } from "../events/socket-events";

export const subscribeTypingStart = (handler) => {
  console.log("SUBSCRIBE_TYPING_START" )
  socket.on(SOCKET_EVENTS.TYPING_START, handler);

  return () => {
    socket.off(SOCKET_EVENTS.TYPING_START, handler);
  };

};

export const subscribeTypingStop = (handler) => {

  socket.on(SOCKET_EVENTS.TYPING_STOP, handler);

  return () => {
    socket.off(SOCKET_EVENTS.TYPING_STOP, handler);
  };
  
};