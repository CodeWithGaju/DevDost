import { create } from "zustand";
import zukeeper from "zukeeper";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../../socket/socket.client";


export const useAuthstore = create(zukeeper(set=>({
    authUser :null,
    checkingAuth:true,
    loading: false,
    money : 0,

    logOut: async()=>{
      try{
         set({loading:true});
         const res = await axiosInstance.post("/auth/logout");
         disconnectSocket();
         if(res.status === 200) set({authUser:null})
         toast.success("Logout Successfully")
      }catch(error){
        toast.error(error?.response?.data?.message || "Something went wrong while logOut.")
      }
    },

    signIn: async(signInData)=>{
       try{
            set({loading:true})
            const res = await axiosInstance.post("/auth/login", signInData);
            set({authUser:res?.data?.user});
            initializeSocket(res?.data?.user?._id);
            toast.success("You Login SuccessFully.");         
       }catch(error){
           toast.error(error?.response?.data?.message || "Login Failed.!")
       }finally{
         set({loading:false})
       }
    },

    signup : async(signupData)=>{
        try{
         set({loading: true})
         const res = await axiosInstance.post("/auth/signup",signupData);
         set({authUser: res?.data?.user});
         initializeSocket(res?.data?.user?._id)
         toast.success("Account created successfully");
        }catch(error){
            toast.error(error.response.data.message || "Signup failed.!");
        }finally{
            set({loading:false})
        }
    },
    checkAuth : async()=>{
       try{
        const res = await axiosInstance.get("/auth/me");
        initializeSocket(res?.data?.user?._id);
        set({authUser:res?.data?.user});
       }catch(error){
        set({authUser:null})
         console.log(error)
       }finally{
        set({checkingAuth:false});
       }
      },
    
    setAuthUser: (user)=> set({authUser: user}),

})))

globalThis.store = useAuthstore;