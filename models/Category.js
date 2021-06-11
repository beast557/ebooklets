const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type:Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Category;