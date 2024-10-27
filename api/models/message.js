const { timeStamp } = require("console");
const express  = require("express");
const mongoose = require("mongoose");
const { type } = require("os");


const messageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
      type:String,
      required:true,
    }
},{timeStamp:true});

const Message = mongoose.model("Message",messageSchema);

module.exports = Message; 