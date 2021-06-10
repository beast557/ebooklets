const jwt = require("jsonwebtoken");
const path= require('path')
// const config = require("config");
// const dotenv = require("dotenv");
require('dotenv').config({ path: path.resolve(__dirname,'../config/config.env')})

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {

    await jwt.verify(token, ""+process.env.jwtSecret , (error, decoded) => {
      
      if (error) {
        return res.status(400).json({ errors: [{ msg: 'Invalid login please try again' }] });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    return res.status(400).json({ errors: [{ msg: 'An error occured' }] });
  }
};