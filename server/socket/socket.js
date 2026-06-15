const { Server } = require('socket.io');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", socket => {
    socket.on("chat:join", chatId => {
      socket.join(chatId);
    });

    socket.on("chat:leave", chatId => {
      socket.leave(chatId);
    });

    socket.on("disconnect", () => {
      console.log("disconnect", socket.id);
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

module.exports = { initSocket, getID }