const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/auth');
const { profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");
const { userRouter} = require("./routes/user");
const app = express();

app.use(express.json()); // this will convert json into javascript function which is passed when http://localhost:2001/signup or other request is called
app.use(cookieParser()) // this middleware is used to read cookies which is passed by login and it helps to access the cookie inside get profile request 

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB().then(()=>{
    console.log("Successfully Connected to Database");
    
       app.listen(2001,()=>{
         console.log("Server is Successfuly listening on port 2001")
       })
}
).catch(err=> console.log("connection failed to database"));
