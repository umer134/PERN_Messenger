

module.exports = {
    development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.LOCALHOST,
    dialect: process.env.DIALECT
    },
    production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.LOCALHOST,
    dialect: process.env.DIALECT,
    dialectOptions: {
        ssl: {require: true, rejectUnauthorized: false}
        }
    }
};

