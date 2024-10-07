const jwt = require('jsonwebtoken');
const User = require("../models/user");
const dotenv = require("dotenv");
const userAuth = async(req,res,next)=>{ 
 try{
    const {token} = req.cookies;
    if(!token){
      throw new Error("Invalid token");
      return;
     }
    const isValidUser = await jwt.verify(token, process.env.TOKEN_AUTH );
    const {_id} = isValidUser;
    const user = await User.findById(_id); 
     if(!user){
      throw new Error("User does not Exist...!Please login again");
     }
     else{
       req.user = user;
       next();
     }
   }catch(err){
     res.status(400).send("Error: "+err);
  }
}

module.exports = {
    userAuth,
}