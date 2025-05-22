//const sequelize = require('sequelize');
const {Op} = require('sequelize');
const { sequelize, ChatModel, ChatMemberModel, UserModel, MessageModel, MessageFilesModel } = require('../models');
const ApiError = require("../exceptions/api-error");

class ChatService {
  
  async createChat (userId, currentUser) {
    const existingChat = await ChatModel.findOne({
      subQuery: false, // ⬅️ ключевая строка
      include: [{
        model: ChatMemberModel,
        as: 'chatMembers',
        attributes: [],
        where: {
          user_id: [currentUser, userId]
        }
      }],
      group: ['chats.id'],
      having: sequelize.literal(`COUNT(DISTINCT "chatMembers"."user_id") = 2`)
    });
  
    if(existingChat) {
      return existingChat;
    }
  
    const newChat = await ChatModel.create({ is_group: false });

    await ChatMemberModel.bulkCreate([
      { chat_id: newChat.id, user_id: currentUser },
      { chat_id: newChat.id, user_id: userId }
    ]);
  
    return newChat;
  }

  async getUserChats(userId) {
    return ChatModel.findAll({
      include: [
        {
          model: ChatMemberModel,
          as: 'chatMembers',
          where: { user_id: userId },
          attributes: [] // мы не достаём info из связующей таблицы
        },
        {
          model: MessageModel,
          as: 'messages',
          separate: true, // грузим отдельно, чтобы limit работал
          order: [['sent_at', 'DESC']],
          limit: 1,
          attributes: ['sender_id','content', 'sent_at', 'is_read']
        },
        {
          model: UserModel,
          as: 'members',
          attributes: ['id', 'username', ['avatar_url', 'avatar']] // если надо показать других участников
        }
      ]
    });
  }

  async findUserChat(fromUserId, toUserId) {
    const chats = await ChatModel.findAll({
      include: [
        {
          model: ChatMemberModel,
          as: 'chatMembers',
          where: {
            user_id: [fromUserId, toUserId]
          },
          attributes: ['user_id']
        }
      ],
      where: {
        is_group: false
      }
    });
  
    // фильтруем на стороне JS, чтобы убедиться, что только 2 участника
    const privateChat = chats.find(chat => {
      const members = chat.chatMembers.map(m => m.user_id);
      return members.includes(fromUserId) && members.includes(toUserId) && members.length === 2;
    });
  
    return privateChat || null;
  }

  async sendMessage (chatId, content, files, senderId) {
    const transaction = await sequelize.transaction();
    
    const chatExists = await ChatModel.findByPk(chatId, { transaction });
    if (!chatExists) {
        throw ApiError.BadRequest("Chat not found");
    }

    // Проверка участия в чате
    const isMember = await ChatMemberModel.findOne({
        where: { chat_id: chatId, user_id: senderId },
        transaction
    });
    if (!isMember) {
        throw ApiError.Forbidden();
    }

    // Создание сообщения
    const message = await MessageModel.create({
        chat_id: chatId,
        sender_id: senderId,
        content: content || null,
    }, { transaction });

    if(files && files.length > 0) {
      const fileRecords = files.map((file) => ({
        message_id: message.id,
        file_path: `/uploads/message_files/${file.filename}`,
      }));

      await MessageFilesModel.bulkCreate(fileRecords, {transaction});
      
    }

    await transaction.commit(); // Фиксация транзакции
    return message;
  }
  
  async getMessages (chatId, userId, cursor, limit) {

    const transaction = await sequelize.transaction();
    const isMember = await ChatMemberModel.findOne({
      where: { chat_id: chatId, user_id: userId },
      transaction
    });

    if (!isMember) {
      await transaction.rollback();
      //throw ApiError.Forbidden();
    }

    // Условия для курсорной пагинации
    const where = { chat_id: chatId };
    if (cursor) {
      where.sent_at = { [Op.lt]: new Date(cursor) };
    }

    // Запрос сообщений
    const messages = await MessageModel.findAll({
      where,
      include: [{
        model: UserModel,
        as: 'sender',
        attributes: ['id', 'username', 'avatar_url']
      },
      {
        model: MessageFilesModel,
        as: 'attachedFiles',
        attributes: ['file_path']
      }
      ],
      order: [['sent_at', 'DESC']],
      limit,
      transaction
    });

    await transaction.commit();

    // Формирование курсора для следующей страницы
    const nextCursor = messages.length > 0
    ? messages[messages.length - 1].get('sent_at') // Используем getter
    : null;
    
    return { 
      messages: messages.reverse(), // ASC порядок
      nextCursor 
    };
  }
  async readMessage (chatId, senderId) {
    const [updatedCount] = await MessageModel.update(
      {is_read: true},
      {
        where: {
        chat_id: chatId,
          sender_id: { [Op.ne]: senderId },
          is_read: false
        }
      }
    );

    return {updated: updatedCount}
  }

}

module.exports = new ChatService();