const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const User_profile_pic = sequelize.define('user_profile_pic', {
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
  
});
module.exports = User_profile_pic;