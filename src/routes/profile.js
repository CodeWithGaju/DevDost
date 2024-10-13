const express = require("express");
const {userAuth} = require("../middleware/auth");
const {validationUpdateProfile,validatePassword} = require("../utils/validation")
const bcrypt = require("bcrypt");
const User = require("../models/user");

const profileRouter = express.Router();
// Profile access using email and password
profileRouter.get("/profile/view",userAuth, async(req,res)=>{
    try{
       const user = req.user;
       res.json({message:"User Profile Data Fetched Successfully. ",data:user})
    }catch(err){
      res.status(400).json({message:"Something went wrong "+ err});
    }
  })

// Profile update API
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
     if(!validationUpdateProfile(req)){
       throw new Error("Invalid Edit Request...!");
       return;
     }
     else{
      const loggedInuser = req.user;
      Object.keys(req.body).every((key)=> loggedInuser[key] = req.body[key]);
      await loggedInuser.save();
      res.json({message: `${loggedInuser.firstName} ${loggedInuser.lastName} your Profile Updated Successfully`, data: loggedInuser })

     }
  }catch(err){
     res.status(400).json({message:"while Updating profile get a "+err});
  }

})

profileRouter.patch("/profile/updatepassword",userAuth,async(req,res)=>{
    try{
        const user = req.user;
       if(!validatePassword(req)){
        throw new Error("Invalid Password Please Enter valid password");
        return;
       }
       else{
         const {password}  = req.body;
         const hashPassword = await bcrypt.hash(password, 10);
         //we can update password using to ways below mentioned
         //1.
          user.password = hashPassword;
          await user.save();
        //2.
        // await User.findByIdAndUpdate(user._id,{password:hashPassword});
          res.cookie("token", null,{expires: new Date(Date.now())});// after updating password clear cookies so user have to login again with new password 
         res.json({message:"Your Password has been updated Successfully"});
       }
    }catch(err){
      res.status(400).json({message:"while updating profile Password"+err});
    }
})

module.exports = {profileRouter}