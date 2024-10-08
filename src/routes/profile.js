const express = require("express");
const {userAuth} = require("../middleware/auth");

const profileRouter = express.Router();
// Profile access using email and password
profileRouter.get("/profile",userAuth, async(req,res)=>{
    try{
       const user = req.user;
       res.send(user)
    }catch(err){
      res.status(400).send("Something went wrong "+ err)
    }
  })


module.exports = {profileRouter}