const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const User_role = sequelize.define('user_role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type:Sequelize.STRING,
    allowNull: false
  },
  
});
module.exports = User_role;