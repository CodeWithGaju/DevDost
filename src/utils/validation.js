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

module.exports = {validationSignUp};