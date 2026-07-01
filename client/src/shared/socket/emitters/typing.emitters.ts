import socket from '../socket';
import { SOCKET_EVENTS } from '../events/socket-events';

export const emitTypingStart = (chatId: string) => {
  socket.emit(SOCKET_EVENTS.TYPING_START, { chatId });
};

export const emitTypingStop = (chatId: string) => {
  socket.emit(SOCKET_EVENTS.TYPING_STOP, { chatId });
};
