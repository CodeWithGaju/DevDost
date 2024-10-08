const express = require("express");
const {userAuth} = require("../middleware/auth");
const requestRouter = express.Router();

// sendConnectionRequest api request and use uerAuth for user Authentication
requestRouter.get("/sendConnectionRequest",userAuth,(req,res)=>{
    try{
      const user = req.user;
      res.send(user.firstName+" "+user.lastName+" send the Connection Request:");
    }
    catch(err){
      res.status(400).send("Error: "+err);
    }
})

module.exports = {requestRouter}