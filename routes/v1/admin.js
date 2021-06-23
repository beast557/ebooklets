const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {changeRole} = require('./../../controllers/admin')
const auth = require('../../middleware/auth') 


router.get("/:userId/:role",auth,changeRole);

module.exports = router;