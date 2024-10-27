const express = require("express");
const {userAuth} = require("../middleware/auth");
const User = require("../models/user")
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { getConnectedUsers, getIO } = require("../socket/socket.server");

// sendConnectionRequest api request and use uerAuth for user Authentication
requestRouter.post("/send/:status/:userId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const status = req.params.status;
        const toUserId = req.params.userId;
        const AllowedStatus = ["ignore","interested"]
        if(!AllowedStatus.includes(status)){
          res.status(401).json({message:"Invalid Status type: "+status});
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
        res.status(401).json({message:"User Not Found"});
        return;
      } 

      if(existingConnectionRequest){
        res.status(401).json({message:"Connection Request already exists."})
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
       res.status(400).json({message:"Error while sending connection request: "+err});
    }
})

//accept or reject connection request
requestRouter.post("/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
           res.status(403).json({message:"Invalid Status Type "+status});
           return;
        }
        const connectionRequest = await ConnectionRequest.findOne({
          _id: requestId,
          toUserId: loggedInUser,
          status: "interested",
        })
       if(!connectionRequest){
         res.status(402).json({message:"Connection Request Not Found"});
         return
       }
       connectionRequest.status = status;
       const data = await connectionRequest.save();

        const {fromUserId,toUserId} = data;

        const likedUserId = await User.findById(fromUserId);
       //send Notification in Real time with socket.io if Connection Request was Accepted.
       //1
       const connectedUsers = getConnectedUsers();
       const io = getIO();

       const likedUserSocketId = await connectedUsers.get(likedUserId._id.toString());
       if(likedUserSocketId){
         io.to(likedUserSocketId).emit("newMatch",{
          _id: loggedInUser._id,
          firstName: loggedInUser.firstName,
          photoUrl: loggedInUser.photoUrl,
         });

       }

       //2
       const loggedInUserSocketId = await connectedUsers.get(loggedInUser._id.toString());
       if(loggedInUserSocketId){
        io.to(loggedInUserSocketId).emit("newMatch",{
          _id: likedUserId._id.toString(),
          firstName: likedUserId.firstName,
          photoUrl: likedUserId.photoUrl,
        })
         
       }

       res.json({message: `Connection Request: `+status,
        data: data
       })
      
    }catch(err){
       res.status(400).json({message:"Error While Reviewing Request: "+err})
    }
})

module.exports = {requestRouter}