const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const CategoryBook = sequelize.define('categories_books', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
module.exports = CategoryBook;