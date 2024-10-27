const express = require('express');
const ConnectionRequest = require("../models/connectionRequest")
const { userAuth } = require('../middleware/auth');
const { connection, set } = require('mongoose');
const User = require("../models/user");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName age gender about photoUrl skills";

//request Recieved Api
userRouter.get("/request/recieved",userAuth,async(req,res)=>{
   try{
       const loggedInUser = req.user;
      const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", USER_SAFE_DATA);// here as second argument you
      // pass  String and "firstName lastName age gender about photoUrl skills" 
      //you can pass instead of String a array like ["firstName","lastName","age","gender","about","photoUrl","skills"] 
       if(connectionRequest.length === 0){
         res.json({message: "No Request found"});
         return;
       }
      res.json({message: "Recieved Request Data fetched Successfully ",data:connectionRequest})
   }
   catch(err){
    res.status(400).json({message:"Error while geting received connection request "+err});
   }
}) 
//Connections Api
userRouter.get("/connections",userAuth,async(req,res)=>{
     try{
           const loggedInUser = req.user;
           const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id},
                {fromUserId: loggedInUser._id}
            ],
            status: "accepted",
           }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
           
           const data = connectionRequest.map((row)=>{
             if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
             }
             return row.fromUserId;
           })
           if(data.length === 0){
             res.json({message: "No Connections Available yet!",data:[]});
             return;
           }
           res.json({message:"Connections Data Fetched Successfully",
            data:data
        });

        }catch(err){
        res.status(400).json({message:"Error While Fetching Connection Request "+err});
     }
})
//feed Api
userRouter.get("/feed",userAuth,async(req,res)=>{
   
    try{
        const page = parseInt(req.query.page); // 1
        let limit = parseInt(req.query.limit); // 10
        limit = limit > 50 ? 50 :limit;
        const skip = (page - 1)*limit;
        const loggedInUser = req.user;
        const connectionRequest  = await ConnectionRequest.find({
         $or:[
            {toUserId:loggedInUser._id},
            {fromUserId:loggedInUser._id},
         ],

        }).select("fromUserId , toUserId , status");
     
        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req)=>{
          hideUserFromFeed.add(req.fromUserId.toString());
          hideUserFromFeed.add(req.toUserId.toString());
        })
        
        const feedUsers = await User.find({
          $and:[
                {_id: {  $nin:Array.from(hideUserFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
               ],        
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        if(feedUsers.length === 0 ){
          res.json({message:"Feed is empty"}); 
          return;
        }
         res.json({message:"Feed Data fetched Successfully",feedUsers:feedUsers}); 

    }catch(err){
       res.status(400).json({message:"Error While Fetching users Feed Data "+err})
    }
})

module.exports = {userRouter};