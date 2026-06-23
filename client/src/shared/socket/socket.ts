import { io } from 'socket.io-client';
import { env } from '../../config/env.config';
import { TokenStore } from '../lib/token-store';

const socket = io(env.apiUrl, {
  withCredentials: true,

  auth: { token: TokenStore.getAccessToken() },

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
  console.log('CONNECT ERROR', error);
});

export default socket;
