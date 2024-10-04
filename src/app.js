const express = require('express');
const connectDB = require('./config/database');
const User  = require("./models/user");
const app = express();

app.post("/signup",async(req,res)=>{
    const userObj = {
        firstName: "Ankit",
        lastName: "Engla",
        emailId: "ankit@gmail.com",
        password: "Ankit#2003",
        age: 22,
        gender: "Male",
    }
   try{
        //creatin new instance of the UserModel and put userObj to store data inside database 
        const user = new User(userObj);
        await user.save();
        res.send("Data is Successfully stored in Database.")
   }catch(err){
     res.status(400).send("Error while saving the user. ", err)
   }

})

connectDB().then(()=>{
    console.log("Successfully Connected to Database");
    
       app.listen(2001,()=>{
         console.log("Server is Successfuly listening on port 2001")
       })
}
).catch(err=> console.log("connection failed to database"));
