const express = require("express");
const {validationSignUp} = require("../utils/validation");
const User  = require("../models/user");
const bcrypt = require('bcrypt');
const authRouter = express.Router();

authRouter.post("/signup",async(req,res)=>{

    try{
          validationSignUp(req);
          const {firstName,lastName,emailId,password,age,gender,about,photoUrl,skills} = req.body;
 
          //Encrypting password using bcrypt.hash()
           const  hashPassword =await bcrypt.hash(password,10);
          //creatin new instance of the UserModel and put userObj to store data inside database 
         const user = new User({
           firstName,
           lastName,
           emailId,
           password:hashPassword,
           age,
           gender,
           about,
           photoUrl,
           skills
         }); //req.body contain all json data which is passed at http://localhost:2001/signup request time and those json data is converted as javasript object using  express.json() method
         await user.save();
         res.send("Data is Successfully stored in Database.")
    }catch(err){
      res.status(400).send("Error while saving the user. "+err)
    }
 
 })

 //login API emailId and password check
authRouter.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId});
    if(!user){
      res.status(404).send("Invalid credentials!.")
    }
    else{
      const isValidUser = await user.isValidUser(password);
      if(!isValidUser){
        res.status(404).send("Invalid credential Try Again later..")
      }
      else{
        const token = await user.jwtToken();// jwtToken is method which is a userSchema method meand a Schema level method is used to put all the logic inside jwtToken() method which return token
        res.cookie("token", token, {expires: new Date(Date.now() + 1 * 3600000)});
        res.send("You Login Successfully to DataBase.")
      }
    }
  
})

//Logout api
 authRouter.post("/logout",(req,res)=>{
     res.cookie("token", null ,{expires: new Date(Date.now())});
     
     res.send("You Logout Successfully");
    
 })




 module.exports = {authRouter}