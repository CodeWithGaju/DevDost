const {Server} = require("socket.io");
require("dotenv").config;
let io;

const connectedUsers =  new Map();
// {userId: socketId}

const initializeSocket = (httpServer) =>{
    io = new Server(httpServer,{
        cors:{
            origin:process.env.CLIENT_URI,
            credentials: true,
        }
    })
  
    io.use((socket,next)=>{
        const userId = socket.handshake.auth.userId;
        if(!userId) return next(new Error("Invalid User ID"))

       socket.userId = userId;
       next();
    
    })

    io.on("connection",(socket)=>{
        console.log(`User Connected with Socket id:${socket.id}`);
        connectedUsers.set(socket.userId,socket.id);
        
        socket.on("disconnect",()=>{
            console.log(`User Disconnected with Socket id: ${socket.id}`)
            connectedUsers.delete(socket.userId);
        })
    })
}

const getIO = () => {
  if(!io){
    throw new Error("Socket.io not initialized!")
  }
  return io;
}

const getConnectedUsers =  ( ) => connectedUsers;

module.exports = {initializeSocket, getIO, getConnectedUsers};