import {create} from "zustand"
import zukeeper from "zukeeper"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthstore } from "./useAuthStore";

const useUserStore = create(zukeeper(set=>({
  updatedAuthUser: null,
  loading : false,
  
  updateProfile: async(updatedData)=>{

    try{
      set({loading:true});
     const res = await axiosInstance.patch("/profile/edit",updatedData);
     useAuthstore.getState().setAuthUser(res?.data?.data);
      toast.success("User Profile updated successfully.")
    }catch(err){
       toast.error(err?.response?.data?.message || "Something went Wrong")
    }finally{
      set({loading:false});
    }
  },
  

})));
export default useUserStore;
globalThis.store = useUserStore;
