const express = require("express");
const {userAuth} = require("../middleware/auth");
const Message = require("../models/message");
const { getIO, getConnectedUsers } = require("../socket/socket.server");
const messageRouter = express.Router();

// sendMessage
messageRouter.post("/send",userAuth,async(req,res)=>{
     try{
        const {content,receiverId} = req.body;
        const newMessage = await Message.create({
            senderId: req.user.id,
            receiverId: receiverId,  
            content
        });
        //Send message in realtime using Socket.io
        const io = getIO();
        const connectedUsers = getConnectedUsers();
        const receiverSocketId =connectedUsers.get(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",{
                message: newMessage,
            })
        }

        res.status(200).json({success:true,message:newMessage});
         
     }catch(err){
         console.log("Error in sendMessage: "+err);
         res.status(500).json({success:false,message:"Internal Server Error!"})
     }
})

//getConversation
messageRouter.get("/conversation/:userId",userAuth,async(req,res)=>{
    const {userId} = req.params;
    try{
      const messages = await Message.find({
        $or:[
            {senderId: req.user._id, receiverId: userId},
            {senderId: userId, receiverId: req.user._id}
        ]
      }).sort("createdAt")

      res.status(200).json({success:true,
        messages
        });
    }catch(err){
        console.log("Error in getConversation routes!")
      res.status(500).json({success:false,message:"Internal Server Error!"})
    }
})

module.exports = {messageRouter};