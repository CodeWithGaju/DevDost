const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const validationSignUp = (req) =>{
     const {firstName,lastName,emailId,password,skills} = req?.body;
     if(!firstName || !lastName){
        throw new Error('Name is not Valid');
     }else if(!isEmail(emailId)){
        throw new Error('Please enter a valid email address')
     }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password");
     }else if(skills?.length > 10){
        throw new Error("You cannot fill skills more than 10 ");
     }
}

const validationUpdateProfile = (req) => {
   try{
   const allowedFieldsData = ["firstName","lastName","gender","age","about","photoUrl","skills"];
   const {firstName,lastName,emailId,password,skills,about,photoUrl} = req?.body;
   if(firstName?.length > 15 || lastName?.length > 15){
      throw new Error("Your FisrtName & LastName should be under 15 charcters");
   }else if(about?.length > 80){
      throw new Error("Your About must be at least under 80 charcaters.")
   }
   else if(!photoUrl === undefined){
      if(!validator.isURL(photoUrl)){
         throw new Error("Invalid photo URL! Please Enter Valid URL")
      }
   }
  
   else if(skills?.length > 10){
      throw new Error("Your cannot pass skills more than 10.")
   }

   const isEditAllowed =  Object.keys(req?.body).every((field)=> allowedFieldsData.includes(field));

   return isEditAllowed;
   
 }catch(err){
   throw new Error(err);
 }

}

const validatePassword = (req)=>{
   try{
   const password = req.body.password;
   if(!validator.isStrongPassword(password)){
      throw new Error("Please Enter strong password");
   }
   else{
      return true;
   }
}catch(err){
   throw new Error(err);
}
}

module.exports = {validationSignUp,validationUpdateProfile,validatePassword};