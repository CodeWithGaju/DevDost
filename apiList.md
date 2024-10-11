# API's
 
 ## authRouter
    POST /signup
    POST /login
    POST /logout

 ## profileRouter
    GET /profile/view
    PATCH /profile/edit
    PATCH /profile/forgetpassword

 ## ConnectionRequestRouter
   # SEND REQUEST
    POST /request/send/:interested/:userId 
    
    above post request has dynamic parameters like if we pass [interested,ignore] and then
    userId of the user whom you want to send the request  
   
   # REVIEW
    POST /request/review/:status/:requestId


 ## userRouter
   GET /user/connections
   GET /user/request
   GET /user/feed - Gets you the profiles of other users on platform 


 # status => ignore,interested,accepted,rejected