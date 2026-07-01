const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MessageFilesModel = sequelize.define('message-files', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4,},
    message_id: {type: DataTypes.UUID, allowNull: false, references: {model: 'messages', key: 'id'}, onDelete: 'CASCADE'},
    file_path: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("image", "video", "audio", "voice", "file"), allowNull: false, defaultValue: "file"}
}, {
tableName: 'message_files',
  timestamps: false
});

module.exports = MessageFilesModel;