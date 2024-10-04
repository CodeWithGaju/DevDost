const User_auth = (req,res,next)=>{ 
    console.log("User auth is Checked");
  const token_key = "gaju&2001";
  const isAuthorized = token_key === "gaju&2001";
  if(isAuthorized){
    next();
   }
  else{
    res.status(401).send("UnAuthorized user cannot access Api Data..")
  }
}
const Admin_auth = (req,res,next)=>{ 
    console.log("Admin Auth is Checked")
    const token_key = "Admin@1020";
    const isAuthorized = token_key === "Admin@1020";
    if(isAuthorized){
        next();
     }
    else{
      res.status(401).send("UnAuthorized Admin cannot access Api Data..")
    }
  }

module.exports = {
    User_auth,
    Admin_auth,
}