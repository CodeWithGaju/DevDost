const express = require('express');
const connectDB = require('./config/database');
const User  = require("./models/user");
const {userAuth} = require("./middleware/auth");
const {validationSignUp} = require("./utils/validation");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

const app = express();

app.use(express.json()); // this will convert json into javascript function which is passed when http://localhost:2001/signup or other request is called
app.use(cookieParser()) // this middleware is used to read cookies which is passed by login and it helps to access the cookie inside get profile request 

app.post("/signup",async(req,res)=>{

   try{
         validationSignUp(req);
         const {firstName,lastName,emailId,password,age,gender,about,photoUrl,skills} = req.body;

         //Encrypting password using bcrypt.hash()
          const  hashPassword =await bcrypt.hash(password,10);
         //creatin new instance of the UserModel and put userObj to store data inside database 
        const user = new User({
          firstName,
          lastName,
          emailId,
          password:hashPassword,
          age,
          gender,
          about,
          photoUrl,
          skills
        }); //req.body contain all json data which is passed at http://localhost:2001/signup request time and those json data is converted as javasript object using  express.json() method
        await user.save();
        res.send("Data is Successfully stored in Database.")
   }catch(err){
     res.status(400).send("Error while saving the user. "+err)
   }

})
//login API emailId and password check
app.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId});
    if(!user){
      res.status(404).send("Invalid credentials!.")
    }
    else{
      const isValidUser = await user.isValidUser(password);
      if(!isValidUser){
        res.status(404).send("Invalid credential Try Again later..")
      }
      else{
        const token = await user.jwtToken();// jwtToken is method which is a userSchema method meand a Schema level method is used to put all the logic inside jwtToken() method which return token
        console.log(token)
        res.cookie("token", token, {expires: new Date(Date.now() + 1 * 3600000)});
        res.send("You Login Successfully to DataBase.")
      }
    }
  
})
// Profile access using email and password
app.get("/profile",userAuth, async(req,res)=>{
  try{
     const user = req.user;
     res.send(user)
  }catch(err){
    res.status(400).send("Something went wrong "+ err)
  }
})
// sendConnectionRequest api request and use uerAuth for user Authentication
app.get("/sendConnectionRequest",userAuth,(req,res)=>{
    try{
      const user = req.user;
      res.send(user.firstName+" "+user.lastName+" send the Connection Request:");
    }
    catch(err){
      res.status(400).send("Error: "+err);
    }
})
// start-> Fetching or Reading Data from Database
app.get("/feed",async(req,res)=>{

  try{ 
     const allUser = await User.find({});
     res.send(allUser);
  }catch(err){
     res.status(400).send("Something went wrong");
  }
})

app.get("/feed/user",async(req,res)=>{
  const userEmail = req.body.emailId;

try{
  const user = await User.findOne({emailId: userEmail});
  if(!user){
    res.status(401).send("Bad request User not Found!");
  }else{
  res.send(user);
}
}catch(err){
   res.status(400).send("something went wrong");
}
})
app.get("/feed/users",async(req,res)=>{
  const userEmail = req.body.emailId;

try{
  const users = await User.find({emailId: userEmail});
  if(users.length === 0){
    res.status(401).send("Bad request User not Found!");
  }else{
  res.send(users);
}
}catch(err){
   res.status(400).send("something went wrong");
}
})
app.get("/feed/userid",async(req,res)=>{
   const user_id = req.body.id;

   try{
    const user = await User.findById(user_id);
    if(!user){
      res.status(401).send("Bad Request User Not Found!");
    }
    else{
      res.send(user);
    }

   }catch(err){
     res.status(400).send("something went wrong");
   }
 
})
//End --> here
app.delete("/delete",async(req,res)=>{
  try{
    const deletedUser = await User.deleteMany({});
    res.status(200).send(deletedUser);
  }catch(err){
     res.status(400).send("something went wrong");
  }
})

app.delete("/delete/user",async(req,res)=>{
  const deleteUser = req.body.firstName;
  try{
    const deletedUser = await User.deleteOne({firstName: deleteUser});
    if(!deletedUser){
      res.status(401).send("User not Found! Please re-check the name you entered");
    }
    else{
    res.status(200).send(deletedUser);
    }
  }catch(err){
     res.status(400).send("something went wrong");
  }
})
app.delete("/delete/users",async(req,res)=>{
  const deleteUsers = req.body.firstName;

  try{
    const deletedUsers = await User.deleteMany({firstName: deleteUsers});
    if(deletedUsers.length === 0){
      res.status(401).send("User not Found! Please re-check the name you entered");
    }
    else{
    res.status(200).send(deletedUsers);
    }
  }catch(err){
     res.status(400).send("something went wrong");
  }
})
// findByIdAndUpdate() with API level Sanitization
app.patch("/update/:userId",async(req,res)=>{
  const user_id = req?.params?.userId;
  const user_Data = req.body;

  try{
    //start->Api Level Sanitization
    const ALLOWED_USERDATA = ["photoUrl","about","skills"];
    const isValidData = Object.keys(user_Data).every((k)=>ALLOWED_USERDATA.includes(k));
    if(!isValidData){
      res.status(400).send("Restricted Data! Cannot be updated.");
      return;
    }
    if(user_Data?.skills.length>10){
      res.status(400).send("You cannot store more than 10 skills");
      return;
    }
    //end-> here
    const updatedIdUser = await User.findByIdAndUpdate(user_id,user_Data,{returnDocument:"after",runValidators:true});//we use findByIdAndUpdate(user_id,user_Data)this instead of this fideByIdAndUpdate(user_id,{ $set:user_Data}) because both are same
    if(!updatedIdUser){
      res.status(401).send("User not Found! Please re-check the name you entered");
    }
    else{
    res.status(200).send(updatedIdUser);
    }
  }catch(err){
     res.status(400).send("Update Failed! Error:"+err.message);
  }
})



connectDB().then(()=>{
    console.log("Successfully Connected to Database");
    
       app.listen(2001,()=>{
         console.log("Server is Successfuly listening on port 2001")
       })
}
).catch(err=> console.log("connection failed to database"));
