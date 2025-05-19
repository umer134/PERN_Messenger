const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const MessageModel = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chat_id: {type: DataTypes.INTEGER, references: {model: "chats", key: "id"}},
    sender_id: {type: DataTypes.INTEGER, references: {model: "users", key: "id"}},
    content: {type: DataTypes.STRING, allowNull: false},
    sent_at: { type: DataTypes.DATE,allowNull: false, defaultValue: DataTypes.NOW},
    is_read: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
}, {tableName: 'messages'});


module.exports = MessageModel;