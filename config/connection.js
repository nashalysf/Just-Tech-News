//import sequelize contructor from lib
const Sequelize = require('sequelize');

require('dotenv').config();

//create connection to db, pass MYSQL info for user and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;