const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const sequelize = require('./config/database');
require('dotenv').config()

const userAuthRoute = require('./routes/v1/auth');
const categoryRoute = require('./routes/v1/category');
const userRoute = require('./routes/v1/user');
const bookRoute = require('./routes/v1/book')
const commentRoute = require('./routes/v1/comment')
const replyRoute = require('./routes/v1/reply')
const adminRoute = require('./routes/v1/admin')

//middlewares
app.use(fileUpload());

app.use(express.json({ extended: false }));

app.use('/api/v1/auth', userAuthRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/book', bookRoute);
app.use('/api/v1/comment', commentRoute);
app.use('/api/v1/reply', replyRoute);
app.use('/api/v1/admin', adminRoute);


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

const Category  = require('./models/Category')
const Book = require('./models/Book')
const CategoryBook = require('./models/Categories_Book')

const Comment = require('./models/Comment')
const Reply = require('./models/Reply')

// role
User.hasOne(UserRole,{
    constraints:true,
    onDelete:'CASCADE'
  })
UserRole.belongsTo(User);
// profile pic
User.hasOne(UserProfilePic,{
    constraints:true,
    onDelete:'CASCADE'
  })
UserProfilePic.belongsTo(User);

// category
User.hasMany(Category,{
  constraints:true,
  onDelete:'CASCADE'
})
Category.belongsTo(User);

//books
User.hasMany(Book,{
  constraints:true,
  onDelete:'CASCADE'
})
Book.belongsTo(User);

//books and categories
Book.hasMany(CategoryBook,{
  constraints:true,
  onDelete:'CASCADE'
})
CategoryBook.belongsTo(Book);

Category.hasMany(CategoryBook,{
  constraints:true,
  onDelete:'CASCADE'
})
CategoryBook.belongsTo(Category);

//comment
User.hasMany(Comment,{
  constraints:true,
  onDelete:'CASCADE'
})
Comment.belongsTo(User);
Book.hasMany(Comment,{
  constraints:true,
  onDelete:'CASCADE'
})
Comment.belongsTo(Book);

//Reply
User.hasMany(Reply,{
  constraints:true,
  onDelete:'CASCADE'
})
Reply.belongsTo(User);
Comment.hasMany(Reply,{
  constraints:true,
  onDelete:'CASCADE'
})
Reply.belongsTo(Comment);

sequelize
  .sync({
    // force:true
  })
  .then(result => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));    
  })
  .catch(err => {
    console.log(err);
  });