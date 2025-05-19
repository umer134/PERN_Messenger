const { Sequelize } = require('sequelize');
const config = require('./dbConfigs')['development'];

const params = {
    DBOptions: {
    host: config.host,
    dialect: config.dialect,
    port: config.port
    }
};

const sequelize = new Sequelize(config.database, config.username, config.password, {...params.DBOptions});

module.exports = sequelize;