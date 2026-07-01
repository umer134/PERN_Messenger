const { ChatMemberModel } = require('../models');

module.exports = async function notifyChatUpdated (io, chatId) {
  const members = await ChatMemberModel.findAll({
    where: {
      chat_id: chatId,
    },
  });
  
  const userIds = [...new Set(members.map(m => m.user_id)),];

  userIds.forEach(userId => {
    io.to(`user:${userId}`).emit("chat:updated", { chatId });
  });
}