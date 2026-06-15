//const sequelize = require('sequelize');
const {Op} = require('sequelize');
const { sequelize, ChatModel, ChatMemberModel, UserModel, MessageModel, MessageFilesModel } = require('../models');
const ApiError = require("../exceptions/api-error");

class ChatService {

  async findOrCreatePrivateChat(senderId, recipientId, transaction) {
    const existingChat = await ChatModel.findOne({
      subQuery: false,
      include: [{
        model: ChatMemberModel,
        as: 'chatMembers',
        attributes: [],
        where: {
          user_id: [senderId, recipientId]
        }
      }],
      group: ['chats.id'],
      having: sequelize.literal(
        `COUNT(DISTINCT "chatMembers"."user_id") = 2`
      ),
      transaction
    });

    if (existingChat) {
      return existingChat;
    }

    const newChat = await ChatModel.create({
      is_group: false
    }, { transaction });

    await ChatMemberModel.bulkCreate([
      {
        chat_id: newChat.id,
        user_id: senderId
      },
      {
        chat_id: newChat.id,
        user_id: recipientId
      }
    ], { transaction });

    return newChat;
  }  
  
  async createChat (recipientId, senderId) {
    const existingChat = await ChatModel.findOne({
      subQuery: false, // ⬅️ ключевая строка
      include: [{
        model: ChatMemberModel,
        as: 'chatMembers',
        attributes: [],
        where: {
          user_id: [senderId, recipientId]
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
      { chat_id: newChat.id, user_id: senderId },
      { chat_id: newChat.id, user_id: recipientId }
    ]);
  
    return newChat;
  }

  async getUserChats(userId) {
    const chats = await ChatModel.findAll({
      include: [
        {
          model: ChatMemberModel,
          as: 'chatMembers',
          where: { user_id: userId },
          attributes: []
        }
      ]
    });

    return Promise.all(
      chats.map(chat =>
        this.buildConversationPreview(
          chat.id,
          userId
        )
      )
    );
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

  async sendMessage (chatId, content, files, senderId, replyToId) {
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
        reply_to_id: replyToId || null,
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

  async buildConversationPreview(chatId, currentUserId, transaction = null) {
    const chat = await ChatModel.findByPk(chatId, {
      include: [
        {
          model: UserModel,
          as: 'members',
          attributes: [
            'id',
            'username',
            ['avatar_url', 'avatar']
          ]
        },
        {
          model: MessageModel,
          as: 'messages',
          separate: true,
          limit: 1,
          order: [['sent_at', 'DESC']],
          attributes: [
            'content',
            'sent_at'
          ]
        }
      ],
      transaction
    });

    console.log('CHAT MEMBERS RAW:', JSON.stringify(chat.members, null, 2));

    if (!chat) {
      throw ApiError.BadRequest("Chat not found");
    }

    const otherMember = chat.members.find(
      member => member.id !== currentUserId
    );

    const otherMemberData = otherMember?.toJSON();

    const lastMessage = chat.messages[0];

    return {
      id: chat.id,

      title: chat.is_group
        ? chat.group_name
        : otherMember?.username,

      avatar: chat.is_group
        ? chat.group_avatar
        : otherMemberData?.avatar,

      isGroup: chat.is_group,

      unreadCount: 0,

      lastMessage:
        lastMessage?.content ?? "",

      updatedAt:
        lastMessage?.sent_at ??
        chat.created_at,

      participantId:
        otherMember?.id,

      isOnline: false,
    };
  }

}

module.exports = new ChatService();