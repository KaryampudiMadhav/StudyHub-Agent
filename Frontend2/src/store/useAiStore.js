import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';
import axios from "axios";


export const useAgentStore = create((set, get) => ({
  loadingSkill : false,
  userSkills: [],
  setSkills: (newSkills) => set({ userSkills: newSkills }),
  addSkill: async (skill) => {
    try {
      const res = await axiosInstance.put("/auth/skill", { frontSkill: skill });
      get().setSkills(res.data.skills);
      console.log(get().userSkills);
      toast.success("Skill is Added.");
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  },
  fetchSkills: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-skills"); // Assuming this endpoint returns user data
      set({ userSkills: res.data.skills });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  },
  fetchSkillData : async(userSkill) =>{
      set({loadingSkill : true})
      try {
        const res = await axiosInstance.get(`/agent/total/${userSkill}`);
         localStorage.setItem("user-skill",JSON.stringify(res.data));
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        toast.error(error.message)
      }finally{
        set({loadingSkill : false})
      }
  },
}));
