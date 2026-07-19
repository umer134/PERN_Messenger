const messageService = require("../service/message-service");

const ApiError = require("../exceptions/api-error");

class MessageController {
  async sendMessage(req, res, next) {
    try {
      const senderId = req.user.id;

      const { clientId, chatId, recipientId, content, replyToId, type } =
        req.body;

      const files = req.files;

      if (!content && !files) {
        throw ApiError.BadRequest("Empty message");
      }

      const result = await messageService.sendMessage({
        clientId,
        senderId,
        chatId,
        recipientId,
        content,
        replyToId,
        files,
        type,
      });

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async markAsRead(req, res, next) {
    try {
      const chatId = req.params.chatId;
      const userId = req.user.id;

      const result = await messageService.markAsRead(chatId, userId);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async editMessage(req, res, next) {
    try {
      const senderId = req.user.id;
      const { messageId, newContent } = req.body;

      const result = await messageService.editMessage(
        messageId,
        senderId,
        newContent,
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteMessage(req, res, next) {
    try {
      const senderId = req.user.id;
      const { messageId } = req.params;

      const result = await messageService.deleteMessage(messageId, senderId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MessageController();
