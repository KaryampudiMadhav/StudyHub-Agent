import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAgentStore = create((set, get) => ({
  // --- STATE ---
  loadingSkill: false,
  userSkills: [],
  allSkills: null, // Initialize state to null

  // --- ACTIONS ---
  setSkills: (newSkills) => set({ userSkills: newSkills }),

  addSkill: async (skill) => {
    try {
      const res = await axiosInstance.put("/auth/skill", { frontSkill: skill });
      get().setSkills(res.data.skills);
      toast.success("Skill is Added.");
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  },

  fetchSkills: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-skills");
      set({ userSkills: res.data.skills });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  },

  fetchSkillData: async (userSkill) => {
    set({ loadingSkill: true });
    try {
      const res = await axiosInstance.get(`/agent/total/${userSkill}`);
      localStorage.setItem("user-skill", JSON.stringify(res.data));
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      toast.error(error.message);
    } finally {
      set({ loadingSkill: false });
    }
  },

  // --- CORRECTED FUNCTION ---
  // This now sets the state in the store directly, instead of using localStorage.
  fetchAllSkills: async () => {
    set({ loadingSkill: true });
    try {
      const res = await axiosInstance.get("/agent/total");
      // This is the key change: update the 'allSkills' state in the store.
      set({ allSkills: res.data.skills });
      toast.success("Got All The Resources.");
    } catch (error) {
      console.log(error);
      set({ allSkills: [] }); // Set to empty array on error to prevent crashes
      toast.error("Error fetching all skills.");
    } finally {
      set({ loadingSkill: false });
    }
  },
}));
