- DevDost is a web application where Developers connect & intract to each other
   - npm init command is run and package.json file created
   - Installing Express js into our project
   - node-module is created with 
   - created a src folder
       - created a middleware and config folder to store specific files
   - git init command run
   - npm i mongoose command run and install mongoose into project to connect with database 
   - creating a database file in which importing a mongoose module and creating a
        variable name connectDb and assign mongoose.connect(<-here the database auth request api or query->)  and exported to app.js file from where they executed and connection being made to databas collection.
   - user.js file is created to create 
      - import mongoose module 
          -  userSchema variable is declared and assigning new instance to it mongoose
            Schema  and its is used to structure the document data in collection of databse DevDost means which data is being stored its type and validate according to your requirements
          - User variable is declared and assinging an mongoose.model("user",userSchema) it take to arguments first is <Collection Name> and this name will be assign to that collection with +s means if pass collection name User it will be assign as users means in lowercase with append "s" and second argument is (Schema) UserSchema which you  above created.
        - And then User (model)  is exported and imported by app.js

   - app.js file created and import const express = require('express');
     const connectDB = require('./config/database');
     const User  = require("./models/user");
     files data and created different

   - Validator is installed through its command -> npm i validator
      - by using it we can do some much validation at schema level and API level also 
   - created a utils folder to store program helper funtion file
     - created validation folder to store validationSignUp function which check all the  
       data which we pass in post API http req.body
     - install bcrypt using command => npm i bcrypt for encrypting the user password 
     - creating new post api for login and here we check email id is valid if it is then we check 
       password which user send through request.body with password in validEmail Data if it and then
       we use bcrypt.compare(<req.body.password>, <hashPassword which is in Database>)
    - Cookie parser is installed using command => npm i cookie-parser and then importing
      its module in app.js file and app.use(cookieParser()) function run because// this middleware is used to read cookies which is passed by login and it helps to access the cookie inside get profile request 

    - jwt.io means jsonwebtoken is installed using command ==> npm i jsonwebtoken
      forgenerating web token which passed as a cookie to request for further authentication 
        -  const token = await jwt.sign({_id: user._id},"DevDost2024"); is used to generate a new token which is passed into req.cookie() as a parameter

    - we can expire our cookies and tokens if we want to according to our requirements 
      - In cookie we can initialize as parameter in =>> res.cookie("token", token,
        {expires: new Date(Date.now() + 1 * 3600000)});
      - In Token we can do ==> const token = await jwt.sign({_id: user._id},"DevDost2024",{expiresIn: '7d'});
    - Writing Schema level helper method to  offload the things like jwt.sign() method to 
      generate token and brcypt.compare() function to compare the password given by user and hashpassword of database.
    - Making and dividing api calls or request under its particular routes like all the authentication api's request under its specific routes for that using express.Router() 

- express.Router() is use for Routing and maintaining our api's according to its specific 
  routes like  
   ## authRouter
    POST /signup
    POST /login
    POST /logout
  and all are mention in apiList.md

- validate /profile/edit using validationUpdateProfile(req) function for checking all
  fields before updating it. 
- created a update password api in routes folder profile.js file so user can updated his profile  

- created a file connectionRequest.js in models folder
 # Schema creation
  - created a variable name connectionRequestSchema and assigned a mongoose.schema({there
    is structure of data }) what fields you want store and its types
  - .pre() ---> connectionRequestSchema.pre() function is used here to check that user
     cannot send request to itself   
 # Model creation
  - then created a variable name connectionRequest and assigned mongoose.model("name 
    of model",<Schema variable which in our case is connectionRequestSchema>)
 # Exported the variables
  - using module.exports = connnectionRequest --variable name which is model 
  
- created a /request/send/:status/:userId api for sending request to another user
  request route which already created by us in routes folder is used here 
  - here we created s status dynamic using params with validations like you can pass 
   ["interested","ignored] other than you can not pass if you pass it
    throw error Invalid Status type
  - and also pass userId dynamic using params means we can access it later using 
    req.params
- created a /request/review/:status/:requestId api for reviewing request means a 
  user can accepted and rejected if he wanted to and its also with validation means
  you can only pass status as ["accepted","rejected"] other than this it throw error
  invalid status type

- created  a file user.js in routes folder for /user/request/recieved so user can see 
  how many connection request they received from other users
  - using "ref" field  in connectionRequest file in connectionRequestSchema for 
    referncing User Collection (Model) so we can use populate function to get details  what we want from using fromUserId field 
  - created a /user/connection api to get logged in user connections whom they connected
    to and 
  - created a /user/feed api so a user can see all the users card whom they can send 
    connection request (interested,ignore) and only all those user who are not send connection request to loggedIn User and also those whom logged user not send connection request  are shown and all connections,request send or received are not
    shown in feed api data and while creating this api used a mongoDb $or:,$and:,%nin:,$ne: operators

  # pagination logic 
   - /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
   - /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
   - /feed?page=1&limit=10 => 21-30 => .skip(20) & .limit(10)
   - /feed?page=1&limit=10 => 31-40 => .skip(30) & .limit(10)  

 # formula
   skip = (page - 1)*limit;

   - /feed?page=1&limit=10 => 1-10 => .skip(skip) & .limit(10);