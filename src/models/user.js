const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

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
        uppercase: true,
        validate:(value) => {
             if(!["MALE","FEMALE","OTHER"].includes(value)){
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
       default: "Tell Something about yourSelf Here...",
       maxLength: 80
    },
    skills:{
        type: [String],
    }
},{timestamps:true})

 userSchema.methods.jwtToken = async function(){ //note: always use simple function here not a arrow back function because it works in this foramt if you use arrow function it crash the program
    const user = this;

    const token = await jwt.sign({_id: user.id}, process.env.TOKEN_AUTH, {expiresIn: "7d"} );

    return token;
 }

  userSchema.methods.isValidUser = async function(passwordInputByUser){
    const user = this;
    const hashPassword = user.password;
    const isValidUser = await bcrypt.compare(passwordInputByUser,hashPassword);//parameters order matters a lot because if you interchange the order like(hashPassword,passwordInputByUser) in this order it fails the code
    return isValidUser;
  }

const User = mongoose.model("User", userSchema);

module.exports = User;
