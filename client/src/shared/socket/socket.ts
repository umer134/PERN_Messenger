import { io } from 'socket.io-client';
import { env } from '@/config/env.config';

const socket = io(env.apiUrl, {
  withCredentials: true,

  autoConnect: false,

  reconnection: true,

  reconnectionAttempts: 5,

  reconnectionDelay: 1000,

  reconnectionDelayMax: 5000,
});

socket.on('connect', () => {
  console.log('SOCKET CONNECTED', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('SOCKET DISCONNECTED', reason);
});

socket.on('connect_error', (error) => {
  console.log('SOCKET ERROR', error.message);
});

export default socket;
