const express = require('express');
const app = express();


const sequelize = require('./config/database');
require('dotenv').config()


const userAuth = require('./routes/v1/auth');

//middlewares
app.use(express.json({ extended: false }));
app.use('/api/v1/user', userAuth);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  
const PORT = process.env.PORT || 5000;

/*calling / including all database */
const User  = require('./models/User')
const UserRole = require('./models/User_role')
const UserProfilePic = require('./models/User_profile_pic')

User.hasOne(UserRole,{
    constraints:true,
    onDelete:'CASCADE'
  })
UserRole.belongsTo(User);

User.hasOne(UserProfilePic,{
    constraints:true,
    onDelete:'CASCADE'
  })
UserProfilePic.belongsTo(User);

sequelize
  .sync({
    force:true
  })
  .then(result => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));    
  })
  .catch(err => {
    console.log(err);
  });