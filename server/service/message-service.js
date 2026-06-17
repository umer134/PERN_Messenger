const ApiError = require("../exceptions/api-error");
const { MessageModel, ChatModel, sequelize, MessageFilesModel, UserModel } = require("../models");
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
      
      const fullMessage = await MessageModel.findByPk(
        message.id,
        {
          include: [
            {
              model: MessageFilesModel,
              as: "attachedFiles",
              attributes: ["file_path"],
            },
            {
              model: UserModel,
              as: "sender", 
              attributes: [
                "id",
                "username",
                "avatar_url",
              ],
            },
          ],
        }
      );

      const messageDto = new MessageDto(fullMessage);

      const io = getID();

      io.to(chat.id).emit("messages:new", messageDto);
      io.emit("chat:updated", { chatId: chat.id });

      return {
        conversation,
        message: messageDto,
      };
      

    } catch (e) {
        if (!transaction.finished) {
          await transaction.rollback();
        }

        throw e;
      }
  }

  async markAsRead(chatId, userId) {
    
    const unreadMessages = await MessageModel.findAll({
      attributes: ["id"],
      where: {
        chat_id: chatId,
        sender_id: {
          [Op.ne]: userId,
        },
        is_read: false,
      },
    });

    const messageIds = unreadMessages.map(message => message.id);
    if (!messageIds.length) {
      return { updated: 0 };
    }

    const [updatedCount] = await MessageModel.update(
      { is_read: true },
      {
        where: {
          id: messageIds,
        },
      }
    );

    const io = getID();

    io.to(chatId).emit("message:read", { messageIds: messageIds });
    io.emit("chat:updated", {chatId: chatId});

    return {
      updated: updatedCount,
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