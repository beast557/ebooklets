const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {upload_book,delete_book,show_book_by_pk,search_books} = require('./../../controllers/book')
const auth = require('../../middleware/auth') 


router.post("/",auth,upload_book);

router.get("/:bookId",show_book_by_pk);


router.get("/search/:search_word",search_books);

router.delete("/:bookId",auth,delete_book);

module.exports = router;