const mongoose = require('mongoose');
const validator = require('validator');

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
      validate:(value)=>{
         if(!validator.isEmail(value)){
           throw new Error("Invalid Email Address Please Enter Valid Email Address")
         }
      }
    },
    password: {
        type: String,
        validate:(value)=>{
           if(!validator.isStrongPassword(value)){
               throw new Error("Invalid password! Please Enter Strong Password:");
           }
        }
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
       validate:(value)=>{
        if(!validator.isURL(value)){
            throw new Error("Invalid URL! Please Enter valid URL")
        }
       }
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
