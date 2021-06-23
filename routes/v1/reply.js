const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {create_reply,delete_reply,show_replies} = require('./../../controllers/reply')
const auth = require('../../middleware/auth') 


router.post("/:commentId",
[check('content','reply  can not be empty').isLength({min:1})
],auth,
create_reply);

router.delete("/:replyId",auth,delete_reply)

router.get("/all/:commentId",auth,show_replies)

module.exports = router;