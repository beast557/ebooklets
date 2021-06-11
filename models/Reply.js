const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const CommentReply = sequelize.define('commentReply', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type:Sequelize.STRING,
    allowNull: false
  }
});
module.exports = CommentReply;