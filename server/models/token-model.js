const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const TokenModel = sequelize.define('tokens', {
    user: {type: DataTypes.INTEGER},
    //accessToken: {type: DataTypes.STRING(1000), allowNull: false},
    refreshToken: {type: DataTypes.STRING(1000), allowNull: false},
}, {timestamps: false});

module.exports = TokenModel;