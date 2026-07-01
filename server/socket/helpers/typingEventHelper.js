const { ChatMemberModel } = require("../../models");

module.exports = function typingEventHelper(socket, io) {
  socket.on("typing:start", async ({ chatId }) => {
    console.log("TYPING_CHATID:", chatId)
    const members = await ChatMemberModel.findAll({
      where: { chat_id: chatId },
    });

    members.forEach(member => {
      if (member.user_id === socket.user.id) return;
      io.to(`user:${member.user_id}`).emit("typing:start", {
        chatId,
        userId: socket.user.id,
        username: socket.user.name,
      });
    });
  });

  socket.on("typing:stop", async ({ chatId }) => {
    const members = await ChatMemberModel.findAll({
      where: { chat_id: chatId },
    });

    members.forEach(member => {
      if (member.user_id === socket.user.id) return;
      io.to(`user:${member.user_id}`).emit("typing:stop", {
        chatId,
        userId: socket.user.id,
      });
    });
  });
};