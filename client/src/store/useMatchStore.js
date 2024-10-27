import {create} from "zustand";
import zukeeper from "zukeeper";
import { set } from "mongoose";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../../socket/socket.client";

const useMatchStore = create(zukeeper(set=>({
    matches: null,
    ConnectionRequestData: null,
    feedUsers: null,
    isloadingMyConnections : false,
    isloadingFeedUsers : false,
    isConnectionRequestLoading: false,
    swipeFeedBack: null,

    checkConnections: async()=>{
        try{
            set({isloadingMyConnections:true});
            const res = await axiosInstance.get("/user/connections");
            set({matches:res?.data?.data});
        }catch(e){
            set({matches:[]});
            toast.error(e?.response?.data?.message || "Something went Wrong!")
        }finally{
            set({isloadingMyConnections:false});
        }
    },
    checkRequestConnection: async()=>{
        try{
            set({isConnectionRequestLoading:true});
            const res = await axiosInstance.get("/user/request/recieved");
            set({ConnectionRequestData:res.data.data});
        }catch(e){
            toast.error(e?.response?.data?.message || "Something went Wrong!")
        }finally{
            set({isConnectionRequestLoading:false});
        }
    },
    getFeedUsers: async()=>{
        try{
            set({isloadingFeedUsers:true});
            const res = await axiosInstance.get("/user/feed");
            set({feedUsers:res.data.feedUsers});
        }catch(e){
            toast.error(e?.response?.data?.message || "Something went Wrong!")
        }finally{
            set({isloadingFeedUsers:false});
        }
    },
    swipeRight: async(user)=>{
        try{
            const res = await axiosInstance.post("/request/send/interested/"+user._id);
            set({swipeFeedBack: res?.data?.data?.status});
        }catch(e){
           toast.error(e?.response?.data?.message || "Something went Wrong at swipeRight");
           set({swipeFeedBack: "failed to swipe right!"})
        }finally{
            setTimeout(()=> set({swipeFeedBack: null}),1500);
        }
       
      },

      swipeLeft: async(user)=>{
        try{
            const res = await axiosInstance.post("/request/send/ignore/"+user._id);
            set({swipeFeedBack: res?.data?.data?.status});
        }catch(e){
           toast.error(e?.response?.data?.message || "Something went Wrong at swipeLeft");
           set({swipeFeedBack: "failed to swipe left!"})
        }finally{
            setTimeout(()=> set({swipeFeedBack: null}),1500);
        }
       
      },

      acceptRequest: async(requestId)=>{
        try{
            const res = await axiosInstance.post("/request/review/accepted/"+requestId);
            // toast.success(res.data?.data?.status);
        }catch(e){
            console.log(e)
        }
      },

      ignoreRequest: async(requestId)=>{
        try{
            const res = await axiosInstance.post("/request/review/accepted/"+requestId);
            toast.success(res.data?.data?.status);
        }catch(e){
            toast.error(e?.response?.data?.message || "Something went Wrong at Ignore request");
        }
    },
    
    subscibeToNewMatches: async() => {
        try{ 
           const socket = getSocket();

           socket.on("newMatch",(newMatch)=>{
             set(state=>({
                matches: [...state.matches,newMatch]
             }));
             toast.success("You got a new Connection!")
           });
        }catch(e){
            console.log(error);
            toast.error(e)
        }
    },

    unsubscribeFromNewMatches: async() => {
        try{
            const socket = getSocket();
            socket.on("newMatch");
        }catch(e){
          console.log(e);
        }
    }
})))
export default useMatchStore;