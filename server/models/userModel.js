const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const MessageModel = require('../models/messages-model');
const ChatModel = require('../models/chat-model');
const ChatMemberModel = require('../models/chatMembers-model');

const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar_url: {type: DataTypes.STRING(255)},
    online: {type: DataTypes.BOOLEAN, defaultValue: false},
    last_seen: {type: DataTypes.TIME},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
}, { tableName: "users",
    timestamps: true});


module.exports = UserModel;
