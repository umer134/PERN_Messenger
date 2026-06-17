const { Server } = require('socket.io');

let io;

function initSocket(server) {
  const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

  io = new Server(server, {
    cors: {
      origin: clientOrigin,
      credentials: true,
    },
  });

  io.on("connection", socket => {
    socket.on("user:join", userId => {
      if (!userId) return;

      socket.join(`user:${userId}`);
    });

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
