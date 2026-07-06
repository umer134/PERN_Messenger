const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./dbConfigs")[env];

const params = {
  DBOptions: {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false,
  },
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { ...params.DBOptions },
);

module.exports = sequelize;
