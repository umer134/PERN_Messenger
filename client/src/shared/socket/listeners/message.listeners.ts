import socket from '../socket';
import { SOCKET_EVENTS } from '../events/socket-events';

export const subscribeMessageNew = (handler) => {
  socket.on(SOCKET_EVENTS.MESSAGE_NEW, handler);

  return () => {
    socket.off(SOCKET_EVENTS.MESSAGE_NEW, handler);
  };
};

export const subscribeMessageRead = (handler) => {
  socket.on(SOCKET_EVENTS.MESSAGE_READ, handler);

  return () => {
    socket.off(SOCKET_EVENTS.MESSAGE_READ, handler);
  };
};

export const subscribeMessageDelivered = (handler) => {
  socket.on(SOCKET_EVENTS.MESSAGE_DELIVERED, handler);

  return () => {
    socket.off(SOCKET_EVENTS.MESSAGE_DELIVERED, handler);
  };
};

export const subscribeMessageEdited = (handler) => {
  socket.on(SOCKET_EVENTS.MESSAGE_EDITED, handler);

  return () => {
    socket.off(SOCKET_EVENTS.MESSAGE_EDITED, handler);
  };
};

export const subscribeMessageDeleted = (handler) => {
  socket.on(SOCKET_EVENTS.MESSAGE_DELETED, handler);

  return () => {
    socket.off(SOCKET_EVENTS.MESSAGE_DELETED, handler);
  };
};
