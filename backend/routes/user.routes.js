import express from 'express'
import { Logout,Login, SignUp, updateProfile, getuser,postSkill,getSkills} from './../controller/user.controller.js';
import { protectedRoutes } from '../middleware/protectedRoute.js';

export const router = express.Router();

router.put("/update-profile",protectedRoutes,updateProfile);
router.post("/login",Login);
router.post("/logout",Logout);
router.post("/signup",SignUp);
router.get("/check",protectedRoutes,getuser);
router.put("/skill",protectedRoutes,postSkill);
router.get("/get-skills",protectedRoutes,getSkills);
//http://localhost:8288/apps