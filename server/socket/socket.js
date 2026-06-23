const { Server } = require('socket.io');
const socketAuth = require('../middlewares/socket-auth');
const typingEventHelper = require('./helpers/typingEventHelper');
const { onlineUsers } = require('./presence');
const { UserModel } = require('../models');

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
    const userId = socket.user.id;

    let userSockets =
      onlineUsers.get(userId);

    if (!userSockets) {

      userSockets = new Set();

      onlineUsers.set(
        userId,
        userSockets
      );

      console.log('ONLINE_USERS', onlineUsers )

      io.emit(
        "presence:online",
        {
          userId,
        }
      );
    }

    userSockets.add(socket.id);

    console.log(
      "CONNECTED USER",
      userId,
      socket.id
    );

    socket.join(`user:${userId}`);

    socket.emit(
      "presence:init",
      {
        users: [...onlineUsers.keys()]
      }
    );

    socket.on("disconnect", async () => {
      const sockets =
        onlineUsers.get(socket.user.id);

      if (!sockets) return;

      sockets.delete(socket.id);

      if (sockets.size === 0) {

        onlineUsers.delete(socket.user.id);

        const lastSeen = Date.now();

        await UserModel.update(
          {
            last_seen: new Date(lastSeen),
          },
          {
            where: {
              id: socket.user.id,
            },
          }
        );

        io.emit(
          "presence:offline",
          {
            userId: socket.user.id,
            lastSeen,
          }
        );
      }
    });

    socket.on("chat:join", chatId => {
      console.log("JOINEDCHAT:", chatId)
      socket.join(chatId);
    });

    socket.on("message:delivered", ({ messageId, chatId }) => {
      if (!messageId || !chatId) return;
      io.to(chatId).emit("message:delivered", { messageId: messageId });
    });

    socket.on("chat:leave", chatId => {
      socket.leave(chatId);
    });

    typingEventHelper(socket, io);
    
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
