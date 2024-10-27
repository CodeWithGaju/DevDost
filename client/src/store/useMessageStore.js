import {create} from "zustand";
import zukeeper from "zukeeper";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../../socket/socket.client";
import { useAuthstore } from "./useAuthStore";

const useMessageStore = create(zukeeper(set=>({
     messages: [],
     loading: true,
  
      sendMessage: async(receiverId,content)=>{
        try{
            //mockup a message, show it in the chat immediately
            set(state =>({
                messages: [...state.messages, {_id:Date.now(),senderId:useAuthstore.getState().authUser._id, content}]
            }))
          const res = await axiosInstance.post("/message/send",{receiverId,content})
        }catch(err){
          toast.error(err?.response?.data?.message || "Something went wrong at UseMessageStores")
        }
      },
      getMessage: async(userId)=>{
         try{
            set({loading: true});
            const res = await axiosInstance.get("/message/conversation/"+userId);
            set({messages:  res?.data?.messages});
         }catch(err){
            console.log(err);
            set({messages:[]})
         }finally{
            set({loading:false});
         }
      },

      subscribeToMessages: async() => {
        const socket = getSocket();
        socket.on("newMessage",({message})=>{
            set(state=> ({messages:[...state.messages,message]}))
        })
      },
      unsubscribeToMessages: async() => {
        const socket = getSocket();
        socket.off("newMessage");
      }

})))

export default useMessageStore;