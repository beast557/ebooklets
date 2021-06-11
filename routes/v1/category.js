
const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {create_category,show_categories,delete_categories} = require('./../../controllers/category')
const auth = require('../../middleware/auth') 


router.post("/",
[check('type','category name cant be empty').isLength({min:1})
],auth,
create_category);

router.get("/", show_categories);
router.delete("/:categoryId",auth, delete_categories);

module.exports = router;