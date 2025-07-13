import {create} from 'zustand';
import {axiosInstance} from '../lib/util';
// import { signup } from '../../../Backend/src/controllers/auth.controller';

export const useAuthStore = create((set) =>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true, 
    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data}); 
        } catch (error) {
            console.log("Error in useAuthStore Store :",error.message);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (data)=>{
        try {

        } catch (error) {

        }
    } 
    
}));