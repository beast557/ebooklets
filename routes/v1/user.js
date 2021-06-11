
const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {update_profile_pic,update_username,update_password} = require('./../../controllers/user')
const auth = require('../../middleware/auth') 


router.post("/update_profile_picture",auth, update_profile_pic);
router.post("/update_username",auth, update_username);
router.post("/update_password",auth, update_password);


module.exports = router;