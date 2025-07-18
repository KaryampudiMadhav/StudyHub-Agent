import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true, 
      });
      set({ authUser: res.data.user });
    } catch (error) {
      if (error?.response?.status !== 401) {
        toast.error("Auth check failed");
        console.error("Auth check error:", error?.message || error);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data, {
        withCredentials: true,
      });
      set({ authUser: res.data.user });
      toast.success("Signup Successful");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true, 
      });
      set({ authUser: res.data.user });
      toast.success("Login Successful");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  handleLogout : async() =>{
     try {
      const res  = await axiosInstance.post("/auth/logout")
      console.log("user logged out");
      toast.success(res.data.message);
     } catch (error) {
      console.error(error);
      toast.error("Error in logout")
     }
  },
  profileUpdate : async(profilePic)=>{
    set({isUpdatingProfile  : true});

    try {
      const res = await axiosInstance.put("/auth/update-profile", profilePic);
      set({authUser : res.data})
      toast.success("Profile updated sucessfully..");
    } catch (error) {
      console.error(error);
      toast.error("Error in updating profile");
    }finally{
      set({isUpdatingProfile : false});
    }
  },
  
}));

