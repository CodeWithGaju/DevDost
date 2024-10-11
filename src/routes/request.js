const express = require("express");
const {userAuth} = require("../middleware/auth");
const User = require("../models/user")
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

// sendConnectionRequest api request and use uerAuth for user Authentication
requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const status = req.params.status;
        const toUserId = req.params.userId;
        const AllowedStatus = ["ignore","interested"]
        if(!AllowedStatus.includes(status)){
          res.status(401).send("Invalid Status type: "+status);
          return;
        }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
          {fromUserId, toUserId},
          {fromUserId:toUserId,toUserId:fromUserId}
        ]
      })

      const toUser = await User.findById(toUserId);
      if(!toUser){
        res.status(401).send("User Not Found");
        return;
      } 

      if(existingConnectionRequest){
        res.status(401).send("Connection Request already exists.")
        return;
      }
         const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
         })

         const data = await connectionRequest.save();
         res.json({message: req.user.firstName + " is "+ status + " in " + toUser.firstName,
          data: data
         })
    }
    catch(err){
       res.status(400).send("Error while sending connection request: "+err);
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
           res.status(403).send("Invalid Status Type "+status);
           return;
        }
        const connectionRequest = await ConnectionRequest.findOne({
          _id: requestId,
          toUserId: loggedInUser,
          status: "interested",
        })
       if(!connectionRequest){
         res.status(402).send("Connection Request Not Found");
         return
       }
       connectionRequest.status = status;
       const data = await connectionRequest.save();
       res.json({message: `Connection Request: `+status,
        data: data
       })
      
    }catch(err){
       res.status(400).send("Error While Reviewing Request: "+err)
    }
})

module.exports = {requestRouter}