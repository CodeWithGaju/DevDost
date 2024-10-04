const express = require('express');
const connectDB = require('./config/database');
const User  = require("./models/user");
const app = express();


app.use(express.json()); // this will convert json into javascript function which is passed when http://localhost:2001/signup or other request is called

app.post("/signup",async(req,res)=>{
   try{
        //creatin new instance of the UserModel and put userObj to store data inside database 
        const user = new User(req.body); //req.body contain all json data which is passed at http://localhost:2001/signup request time and those json data is converted as javasript object using  express.json() method
        await user.save();
        res.send("Data is Successfully stored in Database.")
   }catch(err){
     res.status(400).send("Error while saving the user. ", err)
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
// findByIdAndDelete()
app.patch("/update/userId",async(req,res)=>{
  const user_id = req.body._id;
  const user_Data = req.body;
  try{
    const updatedIdUser = await User.findByIdAndUpdate(user_id,user_Data,{returnDocument:"after"});//we use findByIdAndUpdate(user_id,user_Data)this instead of this fideByIdAndUpdate(user_id,{ $set:user_Data}) because both are same
    if(!updatedIdUser){
      res.status(401).send("User not Found! Please re-check the name you entered");
    }
    else{
    res.status(200).send(updatedIdUser);
    }
  }catch(err){
     res.status(400).send("something went wrong");
  }
})



connectDB().then(()=>{
    console.log("Successfully Connected to Database");
    
       app.listen(2001,()=>{
         console.log("Server is Successfuly listening on port 2001")
       })
}
).catch(err=> console.log("connection failed to database"));
