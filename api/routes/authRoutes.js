const express = require("express");
const {validationSignUp} = require("../utils/validation");
const User  = require("../models/user");
const bcrypt = require('bcrypt');
const { userAuth } = require("../middleware/auth");
const authRouter = express.Router();

// const USER_SAFE_DATA = "firstName lastName age gender about photoUrl skills";
authRouter.post("/signup",async(req,res)=>{

    try{
          validationSignUp(req);
          const {firstName,lastName,emailId,password,age,gender,genderPreference,about,photoUrl,skills} = req.body;
 
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
           genderPreference,
           about,
           photoUrl,
           skills,
         }); //req.body contain all json data which is passed at http://localhost:2001/signup request time and those json data is converted as javasript object using  express.json() method
         await user.save();
         const token = await user.jwtToken();// jwtToken is method which is a userSchema method meand a Schema level method is used to put all the logic inside jwtToken() method which return token
         res.cookie("token", token, {expires: new Date(Date.now() + 1 * 3600000)});
         res.json({message:"Data is Successfully stored in Database.",user: user});
    }catch(err){
      res.status(400).json({message:"Error while saving the user"+err});
    }
 
 })

 //login API emailId and password check
authRouter.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId});
    if(!user){
      res.status(404).json({message:"Invalid credentials!."})
      return;
    }
    else{
      const isValidUser = await user.isValidUser(password);
      if(!isValidUser){
        res.status(404).json({message:"Invalid credential Try Again later.."});
        return;
      }
      else{
        const token = await user.jwtToken();// jwtToken is method which is a userSchema method meand a Schema level method is used to put all the logic inside jwtToken() method which return token
        res.cookie("token", token, {expires: new Date(Date.now() + 1 * 3600000)});
        res.json({message:"You Login Successfully to DataBase.",user:user})
      }
    }
  
})

//Logout api
 authRouter.post("/logout",(req,res)=>{
     res.cookie("token", null ,{expires: new Date(Date.now())});
     
     res.json({message:"You Logout Successfully"});
    
 })

 //for geting loginuserDetails
 authRouter.get("/me", userAuth, (req, res) => {
  const {_id,firstName,lastName,age,gender,genderPreference,about,photoUrl,skills} = req.user;
  const loggedInUser = {_id,firstName,lastName,age,gender,genderPreference,about,photoUrl,skills};
	res.send({
		success: true,
		user:loggedInUser
	});
});



 module.exports = {authRouter}