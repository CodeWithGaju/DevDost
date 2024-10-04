const mongoose = require('mongoose');

const connectDB = async()=>{
   await mongoose.connect("mongodb+srv://TechLearner:devdost2024@techlearner.idj5m.mongodb.net/DevDost");
}


module.exports = connectDB;