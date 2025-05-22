const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChatMemberModel = sequelize.define('chat_members', {
    chat_id: {
        type: DataTypes.INTEGER, 
        references: { model: 'chats', key: "id"}, 
        primaryKey: true 
    },
    user_id: {
        type: DataTypes.INTEGER, 
        references: { model: "users", key: "id"}, 
        primaryKey: true 
    }
}, {
    tableName: 'chat_members', // Явное указание имени таблицы
    timestamps: false
});

module.exports = ChatMemberModel;