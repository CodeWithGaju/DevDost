const express = require('express');

const app = express();

app.delete("/users",(req,res)=>{
    //database data is deleted
    res.send("Data is Deleted from Db")
 })
app.post("/users",(req,res)=>{
   //database data is updated;
   res.send("Data is posted or updated in Db")
})

app.get("/users",(req,res)=>{
    res.send({
        name:"Gajanand",
        lastName: "Khatriya"
    })
})

app.use("/hello/2",(req,res)=>{
    res.send("Hello Hello")
})

app.use("/hello",(req,res)=>{
    res.send("Hello ")
})

app.use("/test",(req,res)=>{
     res.send("You are on Test page");
})

app.use("/",(req,res)=>{
    res.send("Welcome You are at Home Page");
})
app.listen(2001,()=>{
    console.log("Server is Successfuly listening on port 2001")
})