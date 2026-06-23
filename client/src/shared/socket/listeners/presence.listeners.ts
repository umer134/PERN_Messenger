import socket from '../socket';
import { SOCKET_EVENTS } from '../events/socket-events';

export const subscribePresenceOnline = (handler) => {
  socket.on(SOCKET_EVENTS.PRESENCE_ONLINE, handler);

  return () => {
    socket.off(SOCKET_EVENTS.PRESENCE_ONLINE, handler);
  };
};

export const subscribePresenceOffline = (handler) => {
  socket.on(SOCKET_EVENTS.PRESENCE_OFFLINE, handler);

  return () => {
    socket.off(SOCKET_EVENTS.PRESENCE_OFFLINE, handler);
  };
};

export const subscribePresenceInit = (handler) => {
  socket.on(SOCKET_EVENTS.PRESENCE_INIT, handler);

  return () => {
    socket.off(SOCKET_EVENTS.PRESENCE_INIT, handler);
  };
};
