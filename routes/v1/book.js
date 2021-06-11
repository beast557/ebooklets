const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {upload_book,delete_book} = require('./../../controllers/book')
const auth = require('../../middleware/auth') 


router.post("/",auth,upload_book);

router.delete("/:bookId",auth,delete_book);

module.exports = router;