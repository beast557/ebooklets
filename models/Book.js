const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  filename: {
    type:Sequelize.STRING,
    allowNull: false
  },
  bookname: {
    type:Sequelize.STRING,
    allowNull: false
  },

  mimetype: {
    type:Sequelize.STRING,
    allowNull: false
  },
  uploadPath:{
    type:Sequelize.STRING,
    allowNull: false
  },
  size: {
    type:Sequelize.INTEGER,
    allowNull: false
  },
  
  description: {
    type:Sequelize.STRING,
    allowNull: true
  },
  author: {
    type:Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Book;