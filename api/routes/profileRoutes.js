const express = require("express");
const {userAuth} = require("../middleware/auth");
const {validationUpdateProfile,validatePassword} = require("../utils/validation")
const bcrypt = require("bcrypt");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary");


const profileRouter = express.Router();
// Profile access using email and password
profileRouter.get("/view",userAuth, async(req,res)=>{
    try{
       const user = req.user;
       res.json({message:"User Profile Data Fetched Successfully. ",data:user})
    }catch(err){
      res.status(400).json({message:"Something went wrong "+ err});
    }
  })

// Profile update API
profileRouter.patch("/edit",userAuth,async(req,res)=>{
  try{
     if(!validationUpdateProfile(req)){
       throw new Error("Invalid Edit Request...!");
       return;
     }
     else{
      const loggedInuser = req.user;
      const {photoUrl,...otherData} = req.body; 
      let updatedData = otherData;
      if(photoUrl){
        //Todo:Explain this once again in ui part 
        //base64 format
        if(photoUrl.startsWith("data:image")){
           try{
             const uploadResponse = await cloudinary.uploader.upload(photoUrl);
             updatedData.photoUrl = uploadResponse.secure_url;         
           }catch(err){
            res.status(400).json({success:false,
              message: "Error uploading image.Profile update aborted."+err
            })
           }
        }
     }
      Object.keys(updatedData).every((key)=> loggedInuser[key] = req.body[key]);
      await loggedInuser.save();
      res.json({message: `${loggedInuser.firstName} ${loggedInuser.lastName} your Profile Updated Successfully`, data: loggedInuser })

    }
  }catch(err){
     res.status(400).json({message: err.message});
  }

})

profileRouter.patch("/updatepassword",userAuth,async(req,res)=>{
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