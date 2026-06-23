//const sequelize = require('sequelize');
const {Op} = require('sequelize');
const { sequelize, ChatModel, ChatMemberModel, UserModel, MessageModel, MessageFilesModel } = require('../models');
const ApiError = require("../exceptions/api-error");
const { getID } = require('../socket/socket');
const getPreviewText = require('../utils/getPreviewText');
const { onlineUsers } = require('../socket/presence');

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
      return {
        chat: existingChat,
        isNew: false,
      };
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

    return {
      chat: newChat,
      isNew: true
    };
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
  
    return {
      chat: newChat,
      isNew: true,
    };
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
        model: MessageModel,
        as: "replyTo",
        attributes: [
          "id",
          "content",
          "sender_id",
        ],
        include: [
          {
            model: UserModel,
            as: "sender",
            attributes: [
              "id", 
              "username",
            ]
          },
          {
            model: MessageFilesModel,
            as: "attachedFiles",
            attributes: ["file_path", "type"],
          }
        ]
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

  async buildConversationPreview(chatId, currentUserId, transaction = null) {
    const chat = await ChatModel.findByPk(chatId, {
      include: [
        {
          model: UserModel,
          as: 'members',
          attributes: [
            'id',
            'username',
            'last_seen',
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
          ],
          include: [
            {
              model: MessageFilesModel,
              as: "attachedFiles",
              attributes: ['file_path', 'type'],
            }
          ]
        }
      ],
      transaction
    });

    if (!chat) {
      throw ApiError.BadRequest("Chat not found");
    }

    const otherMember = chat.members.find(
      member => member.id !== currentUserId
    );

    const otherMemberData = otherMember?.toJSON();

    const lastMessage = chat.messages[0];

    const unreadCount = await MessageModel.count({
      where: {
        chat_id: chatId,
        sender_id: {
          [Op.ne]: currentUserId,
        },
        is_read: false,
      },
      transaction,
    });

    const isOnline = onlineUsers.has(otherMember?.id);

    return {
      id: chat.id,

      title: chat.is_group
        ? chat.group_name
        : otherMember?.username,

      avatar: chat.is_group
        ? chat.group_avatar
        : otherMemberData?.avatar,

      isGroup: chat.is_group,

      unreadCount,

      lastMessage:
        getPreviewText(lastMessage),

      updatedAt:
        lastMessage?.sent_at ??
        chat.created_at,

      participantId:
        otherMember?.id,

      isOnline,

      lastSeen: otherMemberData?.last_seen ?? null,
    };
  }

}

module.exports = new ChatService();