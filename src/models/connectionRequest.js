const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");

const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //reference to user Collection 
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
      type: String,
      required: true,
      enum:{
        values: ["ignore","interested","accepted","rejected"],
        message: `{VALUE} is incorrect status type` 
      }
    }
});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection Request to yourself.")
        return;
    }
    next();
})

const ConnectionRequest = mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;