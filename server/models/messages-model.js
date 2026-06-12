const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const MessageModel = sequelize.define('messages', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4,},
    chat_id: {type: DataTypes.UUID, references: {model: "chats", key: "id"}},
    sender_id: {type: DataTypes.UUID, references: {model: "users", key: "id"}},
    content: {type: DataTypes.STRING, allowNull: true, defaultValue: null},
    reply_to_id: {type: DataTypes.UUID, allowNull: true, references: { model: "messages", key: "id"}},
    sent_at: { type: DataTypes.DATE,allowNull: false, defaultValue: DataTypes.NOW},
    edited_at: {type: DataTypes.DATE, allowNull: true},
    deleted_at: {type: DataTypes.DATE, allowNull: true},
    is_read: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
}, {tableName: 'messages'});


module.exports = MessageModel;