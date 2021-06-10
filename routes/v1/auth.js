
const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {login,signup,loadUser} = require('./../../controllers/auth')
const auth = require('../../middleware/auth') 


router.post("/login",
[check('username','username cant be empty').isLength({min:1}),
check('password','password cant be empty').isLength({min:1})
],
login);

router.post("/signup",[check('password', 'The password must be 5+ chars long and contain a number')
.not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
.isLength({ min: 5 })
.matches(/\d/),
check('username','Invalid username formate')
.isLength({min:6}).withMessage('username must be atleast 6 characters')
.matches(/^[a-zA-Z]+[0-9]([._-]?[a-zA-Z0-9]+)*$/,"i")

]
,signup);

router.get("/auth",auth,loadUser);

module.exports = router;