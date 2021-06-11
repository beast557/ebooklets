const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {create_comment,delete_comment,show_single_comment,show_comments} = require('./../../controllers/comment')
const auth = require('../../middleware/auth') 


router.post("/:bookId",
[check('content','comment  can not be empty').isLength({min:1})
],auth,
create_comment);

router.delete("/:commentId",auth,delete_comment)

router.get("/:commentId",auth,show_single_comment)

router.get("/all/:bookId",auth,show_comments)



module.exports = router;