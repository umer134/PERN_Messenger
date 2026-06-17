import { io } from 'socket.io-client';
import { env } from '../../config/env.config';

const socket = io(env.apiUrl, {
  withCredentials: true,
  reconnection: true,          
  reconnectionAttempts: 5,     
  reconnectionDelay: 1000,     
  reconnectionDelayMax: 5000,  
});

// setInterval(() => {
//   if (socket.connected) {
//     socket.emit("heartbeat");
//   }
// }, 15000); 

socket.on('connect', () => {
  console.log('⚡ Connected to socket server', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('⚠️ Disconnected from socket server', reason);
});

socket.on("reconnect", attempt => {
  console.log("RECONNECT", attempt);
});

export default socket;
