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

export default socket;
