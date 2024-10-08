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
    POST /request/send/interested/:userId
    POST /request/send/ignored/:userId
    POST /request/review/interested/:requestId
    POST /request/review/rejected/:requestId

 ## userRouter
   GET /user/connections
   GET /user/request
   GET /user/feed - Gets you the profiles of other users on platform 


 # status => ignore,interested,accepted,rejected