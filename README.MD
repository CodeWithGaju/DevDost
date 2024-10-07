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