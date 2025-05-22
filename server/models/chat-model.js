const { DataTypes, NOW } = require('sequelize');
const sequelize = require('../config/db');

const ChatModel = sequelize.define('chats', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    is_group: { type: DataTypes.BOOLEAN, defaultValue: false },
    group_name: {type: DataTypes.STRING(100)},
    group_avatar: {type: DataTypes.STRING(255)},
    created_at: {type: DataTypes.DATE, defaultValue: NOW}
});


module.exports = ChatModel;