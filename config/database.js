const Sequelize = require('sequelize');

const sequelize = new Sequelize('ebooklets', 'root', 'Nepal@@##980', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  logging: false
});

module.exports = sequelize;