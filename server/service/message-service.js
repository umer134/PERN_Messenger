const ApiError = require("../exceptions/api-error");
const { MessageModel, ChatModel, sequelize, MessageFilesModel } = require("../models");
const MessageDto = require('../dtos/messageDto');
const chatService = require("./chat-service");
const { Op } = require("sequelize");
const { getID } = require('../socket/socket');

class MessageService {

  async sendMessage({senderId, chatId, recipientId, content, replyToId, files}) {
    const transaction = await sequelize.transaction();

    try {
      let chat;

      if(chatId) {
        chat = await ChatModel.findByPk(chatId, {
          transaction
        });

        if(!chat) {
          throw ApiError.BadRequest("Chat not found");
        }
      }

      else {
        if(!recipientId) {
          throw ApiError.BadRequest('recipientId required');
        }

        chat = await chatService.findOrCreatePrivateChat(
          senderId, recipientId, transaction
        );
      }

      const message = await MessageModel.create({
        chat_id: chat.id,
        sender_id: senderId,
        content: content || null,
        reply_to_id: replyToId || null,
      }, { transaction });

      if (files?.length) {
        const fileRecords = files.map(file => ({
          message_id: message.id,
          file_path: `/uploads/message_files/${file.filename}`
        }));

        await MessageFilesModel.bulkCreate(fileRecords, {
          transaction
        });
      }

      await transaction.commit();

      const conversation =
        await chatService.buildConversationPreview(
          chat.id,
          senderId
        );
      
      const payload = {
        id: message.id,
        chat_id: message.chat_id,
        sender_id: message.sender_id,
        content: message.content,
        sent_at: message.sent_at,
        is_read: message.is_read,
        attachedFiles: message.attachedFiles,
      };

      const io = getID();

      io.to(chat.id).emit("messages:new", payload);

      return {
        conversation,
        message
      };
      

    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async markAsRead(chatId, userId) {
    const [updatedCount] = await MessageModel.update({ is_read: true }, {
      where: { chat_id: chatId, sender_id: {
        [Op.ne]: userId }, is_read: false
      }
    });

    return { 
      updated: updatedCount
    };
  }

  async editMessage(messageId, userId, newContent) {
    const message = await MessageModel.findByPk(messageId);

    if (!message) throw ApiError.BadRequest('Message not found');

    if (message.sender_id !== userId) {
      throw ApiError.Forbidden('No permission to edit this message');
    }

    if (message.deleted_at) {
      throw ApiError.BadRequest('Message was deleted');
    }

    const updated = await message.update({
      content: newContent,
      edited_at: new Date()
    });

    return new MessageDto(updated);
  }

  async deleteMessage(messageId, userId) {
    const message = await MessageModel.findByPk(messageId);

    if (!message) throw ApiError.BadRequest('Message not found');

    if (message.sender_id !== userId) {
      throw ApiError.Forbidden('No permission to delete this message');
    }

    await message.update({
      deleted_at: new Date(),
      content: null
    });

    return { success: true, messageId };
  }
};

module.exports = new MessageService();