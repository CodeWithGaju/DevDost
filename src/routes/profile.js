const express = require("express");
const {userAuth} = require("../middleware/auth");
const {validationUpdateProfile} = require("../utils/validation")
const profileRouter = express.Router();
// Profile access using email and password
profileRouter.get("/profile/view",userAuth, async(req,res)=>{
    try{
       const user = req.user;
       res.send(user)
    }catch(err){
      res.status(400).send("Something went wrong "+ err)
    }
  })

// Profile update API
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
     if(!validationUpdateProfile(req)){
       throw new Error("Invalid Edit Request...!");
     }
     else{
      const loggedInuser = req.user;
      Object.keys(req.body).every((key)=> loggedInuser[key] = req.body[key]);
      await loggedInuser.save();
      res.json({message: `${loggedInuser.firstName} ${loggedInuser.lastName} your Profile Updated Successfully`, data: loggedInuser })

     }
  }catch(err){
     res.status(400).send("while Updating profile get a "+err)
  }

})



module.exports = {profileRouter}