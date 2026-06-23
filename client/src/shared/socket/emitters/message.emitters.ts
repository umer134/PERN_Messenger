import socket from '../socket';
import { SOCKET_EVENTS } from '../events/socket-events';

export const emitDelivered = (messageId: string, chatId: string) => {
  socket.emit(SOCKET_EVENTS.MESSAGE_DELIVERED, { messageId, chatId });
};
