import { io } from 'socket.io-client';

const socket = io( 'http://localhost:5002', {
  withCredentials: true,
  reconnection: true,          
  reconnectionAttempts: 5,     
  reconnectionDelay: 1000,     
  reconnectionDelayMax: 5000,  
});

setInterval(() => {
  if (socket.connected) {
    socket.emit("heartbeat");
  }
}, 15000); 
socket.on('connect', () => {
  console.log('⚡ Connected to socket server');
});

socket.on('disconnect', () => {
  console.log('⚠️ Disconnected from socket server');
});

export default socket;
