const express = require('express');
const ConnectionRequest = require("../models/connectionRequest")
const { userAuth } = require('../middleware/auth');
const { connection } = require('mongoose');

const userRouter = express.Router();

userRouter.get("/user/request/recieved",userAuth,async(req,res)=>{
   try{
       const loggedInUser = req.user;
      const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId",["firstName","lastName","age","gender","about","photoUrl","skills"]);// here as second argument you
      // pass ["firstName","lastName","age","gender","about","photoUrl","skills"] array and 
      //you can pass instead of array a string like "firstName lastName age gender about photoUrl skills" 
      res.json({message: `Data Fetched Successfully`,data:connectionRequest})
   }
   catch(err){
    res.status(400).send("Error while geting received connection request "+err)
   }
}) 

module.exports = {userRouter};