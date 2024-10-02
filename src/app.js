const express = require('express');

const app = express();

app.use("/home",(req,res)=>{
    res.send("Welcome You are at Home Page");
})
app.use("/hello",(req,res)=>{
    res.send("Hello Hello")
})
app.use("/test",(req,res)=>{
     res.send("You are on Test page");
})

app.listen(2001,()=>{
    console.log("Server is Successfuly listening on port 2001")
})