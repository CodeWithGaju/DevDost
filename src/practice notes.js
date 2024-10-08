const express = require('express');

const app = express();

// app.delete("/users",(req,res)=>{
//     //database data is deleted
//     res.send("Data is Deleted from Db")
//  })
// app.post("/users",(req,res)=>{
//    //database data is updated;
//    res.send("Data is posted or updated in Db")
// })

// app.get("/users",(req,res)=>{
//     res.send({
//         name:"Gajanand",
//         lastName: "Khatriya"
//     })
// })

// app.use("/hello/2",(req,res)=>{
//     res.send("Hello Hello")
// })

// app.use("/hello",(req,res)=>{
//     res.send("Hello ")
// })

// app.use("/test",(req,res)=>{
//      res.send("You are on Test page");
// })

// app.use("/",(req,res)=>{
//     res.send("Welcome You are at Home Page");
// })
// Advanced topic in routing
//1. here if we use /abc it will work but after using ? then b become optional means it work if we write /ac
// app.get("/ab?c",(req,res)=>{
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })
//2. using + after b means you can write b as many as you can but at the start "a" will
// be there and at end "c" in between them you can write "b" as many as you can it will work
// app.get("/ab+c",(req,res)=>{
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })
//3. using * means you can write whatever you want but at start and end data will be same like "ab" at start and "cd" at end
// app.get("/ab*cd",(req,res)=>{
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })
//4. puting data inside ()? means it group the data whatever you put inside those parentheses are optional if you write it work if not then also its works
// app.get("/a(bc)?d",(req,res)=>{
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })
//5.we can use regex means inside the whole sentence or word if data is present it will work
// app.get(/a/,(req,res)=>{
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })
//5.we can use write complex regex also means inside the whole sentence or word if data is present it will work
// app.get(/.*fly$/,(req,res)=>{
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })
//6. so using req.query we can get the dynamic value which were passed in http API request like here--> http://localhost:2001/users?userid=101&password=gaju here if we pass req.query in console.log then in terminal it pass data like { userid: '101', password: 'gaju' }
// app.get("/users",(req,res)=>{
//     console.log(req.query)
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })
//7. so we can get value which passed in http  API  request like http://localhost:2001/users/201/gaju/2003 so getting the value 707 we use req.param we get values as params are { userid: '201', name: 'gaju', pass: '2003' } so there we can use ":" is help us to declare dynamic routes
// app.get("/users/:userid/:name/:pass",(req,res)=>{
//     console.log(req.params)
//     res.send({firstName: "Gajanand",lastName: "khatriya"});
// })



//===============================================================
//Multiple Route handlers
// Using next() method to 
// next function and error along with res.send()
// app.use("/route",r1,r2,r3,r4) r -> means route
//middleware

// app.use("/data",(req,res,next)=>{
//     console.log("1st call back function");
//  //    res.send("1st Response is here")
//     next();
//  },
//  (req,res,next)=>{
//      console.log("2nd call back function");
//      res.send("2nd Response is here")
//      next();
//  },(req,res,next)=>{
//      console.log("3rd call back function");
//      // res.send("3rd Response is here")
//      // next(); 
//  })

//===================================================================
//Topic: Middleware Authentication checking then proceed
// File path --> (src/middleware/auth.js) 
//start->{
// const User_auth = (req,res,next)=>{ 
//     console.log("User auth is Checked");
//   const token_key = "gaju&2001";
//   const isAuthorized = token_key === "gaju&2001";
//   if(isAuthorized){
//     next();
//    }
//   else{
//     res.status(401).send("UnAuthorized user cannot access Api Data..")
//   }
// }
// const Admin_auth = (req,res,next)=>{ 
//     console.log("Admin Auth is Checked")
//     const token_key = "Admin@1020";
//     const isAuthorized = token_key === "Admin@1020";
//     if(isAuthorized){
//         next();
//      }
//     else{
//       res.status(401).send("UnAuthorized Admin cannot access Api Data..")
//     }
//   }

// module.exports = {
//     User_auth,
//     Admin_auth,
// }
//end->}

//File path--> (src/app.js)
 //start-{
    // const express = require('express');
    // const {User_auth,Admin_auth} = require('./middleware/auth');
    
    // const app = express();
    // app.use("/users",User_auth);
    // app.use("/admin",Admin_auth)
    // app.get("/admin/appwork",(req,res)=>{
    //     res.send("You are at app.get of appwork page of admin ");
    //  })
    //  app.post("/admin/appwork",(req,res)=>{
    //     res.send("You are at app.post of appwork page of admin ")
    //  })
    // //  app.post("/admin",(req,res)=>{
    // //     res.send("You are at app.post of admin page ")
    // //  })
    // app.get("/users/getAllData",(req,res,next)=>{
    //    res.send("You are at app.get all data is checked ");
    // })
    // app.post("/users/getAllData",(req,res,next)=>{
    //     res.send("You are at app.post all data is checked ");
    //  })
    // app.get("/users/deleteuser",(req,res)=>{
    //    res.send("You are at app.get and you want deleteuser data ")
    // })
    // app.post("/users/deleteuser",(req,res)=>{
    //     res.send("You are at app.post and you want deleteuser data ")
    //  })
    // app.post("/users/adduser",(req,res)=>{
    //    res.send("You are at post.use and you added a user ")
    // })
    
    
    // app.listen(2001,()=>{
    //     console.log("Server is Successfuly listening on port 2001")
    // })
//end-}

// //app.get("/profile",userAuth, async(req,res)=>{
//     try{
//         const user = req.user();
//         res.send(user);
//       }catch(err){
//         res.status(400).send("Something went wrong "+err)
//       }
//     })
//     // start-> Fetching or Reading Data from Database
//     app.get("/feed",async(req,res)=>{
    
//       try{ 
//          const allUser = await User.find({});
//          res.send(allUser);
//       }catch(err){
//          res.status(400).send("Something went wrong");
//       }
//     })