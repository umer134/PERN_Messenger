const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// Импорт моделей
const ChatModel = require('./chat-model');
const ChatMemberModel = require('./chatMembers-model');
const MessageModel = require('./messages-model');
const UserModel = require('./userModel');

// Ассоциации

// Chat - ChatMember
ChatModel.hasMany(ChatMemberModel, { foreignKey: 'chat_id', onDelete: 'CASCADE', as: 'chatMembers' });
ChatMemberModel.belongsTo(ChatModel, { foreignKey: 'chat_id', as: 'chat' });

// User - ChatMember
UserModel.hasMany(ChatMemberModel, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'userMembers' });
ChatMemberModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

// Chat - Message
ChatModel.hasMany(MessageModel, { foreignKey: 'chat_id', onDelete: 'CASCADE', as: 'messages' });
MessageModel.belongsTo(ChatModel, { foreignKey: 'chat_id', as: 'chat' });

// User - Message (sender)
UserModel.hasMany(MessageModel, { foreignKey: 'sender_id', onDelete: 'CASCADE', as: 'sentMessages' });
MessageModel.belongsTo(UserModel, { foreignKey: 'sender_id', as: 'sender' });

// Chat - User через ChatMember
ChatModel.belongsToMany(UserModel, {
    through: ChatMemberModel,
    foreignKey: 'chat_id',
    otherKey: 'user_id',
    as: 'members'
});

UserModel.belongsToMany(ChatModel, {
    through: ChatMemberModel,
    foreignKey: 'user_id',
    otherKey: 'chat_id',
    as: 'chats'
});

// Экспортируем всё
module.exports = {
    sequelize,
    ChatModel,
    ChatMemberModel,
    MessageModel,
    UserModel
};