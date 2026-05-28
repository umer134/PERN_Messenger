const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
