require("dotenv").config()
const mongoose = require('mongoose');

const connectDB = async()=>{
   await mongoose.connect("mongodb+srv://TechLearner:"+process.env.MONGODB_AUTH+"@techlearner.idj5m.mongodb.net/DevDost");
}


module.exports = connectDB;