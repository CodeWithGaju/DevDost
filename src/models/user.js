const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength:16
    },
    lastName: {
        type: String,
        max: 16
    },
    emailId: {
      type: String,  
      required: true,
      unique:true,
      trim: true,
      lowercase: true,
      minLength: 8,
    },
    password: {
        type: String,
        minLength: 8,
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type: String,
        validate:(value) => {
             if(!["Male","Female","other"].includes(value)){
                throw new Error("Invalid Gender value Please verify you gender correct");
             }
        }
    },
    photoUrl:{
       type: String,
       default: "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg",
    },
    about:{
       type: String,
       default: "Tell Something about yourSelf Here..."
    },
    skills:{
        type: [String],
    }
},{timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = User;
