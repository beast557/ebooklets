const UserProfilePicture = require('../models/User_profile_pic')
const User = require('../models/User');
const UserRole = require('../models/User_role');
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');
const path = require('path')
const { v4  } = require('uuid');

exports.update_profile_pic = async (req,res,next) =>{
    const {id} = req.user
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ errors: [{ msg: 'Select a photo first to upload' }] });
      }
    
    profilePicture = req.files.profilePicture;
    fileName = v4()+profilePicture.name
    uploadPath =  path.join(__dirname, '..','profile_pic',fileName );

    const fileDetails = {
        filename: fileName,
        mimetype: profilePicture.mimetype,
        size: (profilePicture.size)/1000,
        uploadPath:uploadPath
    }
    if(fileDetails.mimetype !="image/jpeg"){
        return res.status(400).json({ errors: [{ msg: 'We currently only support JPEG formate' }] });
    }
    try {
         await UserProfilePicture.update(fileDetails,{
            where: {
              userId:id
            },
          });
          await profilePicture.mv(uploadPath, function(err) {
            if (err)
              return res.status(500).send(err);
        return res.send({ msg: [{ msg: "Profile Picture updated successfully" }]});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.update_username = async (req,res,next) =>{
    let {username} = req.body;
    let {id} = req.user
    username = username.toLowerCase();
    try {
        let user = await User.findOne({
            where:{
              username:username
            }
          })
          if(user){
           return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
          }
         user = await User.update({username},{
            where: {
              id
            },
          });
          if(user){
            return res.status(200).send({ msg: [{ msg: "Successfully updated username" }] });
          }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.update_password =  async (req,res,next) =>{
    try{
        let {password,new_password} = req.body
        const {id} = req.user

        const user = await User.findOne({
            where:{
                id
            }
        })
        const comparePassword = await bcrypt.compareSync(password, user.password);
        if(comparePassword){
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(new_password, salt);
            password = hash
            await User.update({password},{
                where:{
                    id
                }
            })
            return res.status(200).send({ msg: [{ msg: "Successfully changed password" }] });
        }
        return res.status(400).json({ errors: [{ msg: 'Current password doesnt match' }] });
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
}

exports.get_profile_by_pk = async (req,res,next) =>{
try {
  const {userId} = req.params

  let user = await User.findOne({
    where:{
      id:userId
    },
    attributes:['id','username','createdAt']
  })
  let totalBookUpload = await Book.count({
    where:{
      userId
    }
  })
  let userProfilePicture = await UserProfilePicture.findOne({
    where:{
      userId
    }
  })
  let userRole = await UserRole.findOne({
    where:{
      userId
    },
    attributes:['name']
  })
  if(user){
    return res.status(200).send({
      user,
      totalBookUpload,
      userProfilePicture,
      UserRole,
      userRole
    });
  }
   return res.status(404).send({ errors: [{ msg: "No user found" }]});
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
}