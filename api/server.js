const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/authRoutes');
const { profileRouter} = require("./routes/profileRoutes");
const {requestRouter} = require("./routes/requestRoutes");
const { userRouter} = require("./routes/userRoutes");
const {messageRouter} = require("./routes/messageRoutes");
const cors = require("cors");
const { createServer } = require('http');
const { initializeSocket } = require('./socket/socket.server');
const  path = require('path');
require("dotenv").config();


const app = express();
const httpServer = createServer(app);
app.use(cors({
  origin: process.env.CLIENT_URI,
  credentials:true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

__dirname = path.resolve();

initializeSocket(httpServer)

app.use(express.json({limit: '50mb'})); // this will convert json into javascript function which is passed when http://localhost:2001/signup or other request is called
app.use(cookieParser()) // this middleware is used to read cookies which is passed by login and it helps to access the cookie inside get profile request 

app.use("/api/auth",authRouter);
app.use("/api/profile",profileRouter);
app.use("/api/request",requestRouter);
app.use("/api/user",userRouter);  
app.use("/api/message",messageRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,"/client/dist")));
  console.log(__dirname);
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
  })
}

connectDB().then(()=>{
    console.log("Successfully Connected to Database");
     
       httpServer.listen(process.env.PORT,()=>{
         console.log("Server is Successfuly listening on port 2001")
       })
}
).catch(err=> console.log("connection failed to database"));
