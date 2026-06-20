const { Server } = require('socket.io');
const socketAuth = require('../middlewares/socket-auth');

let io;

function initSocket(server) {
  const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

  io = new Server(server, {
    cors: {
      origin: clientOrigin,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", socket => {

    socket.join(`user:${socket.user.id}`);

    socket.on("chat:join", chatId => {
      socket.join(chatId);
    });

    socket.on("message:delivered", ({ messageId, chatId }) => {
      if (!messageId || !chatId) return;

      io.to(chatId).emit("message:delivered", { messageId: messageId });
    });

    socket.on("chat:leave", chatId => {
      socket.leave(chatId);
    });
  });

  return io;
}

function getID() {
  if(!io) {
    throw new Error("Socket not initialized");
  }

  return io;
}

module.exports = { initSocket, getID };
