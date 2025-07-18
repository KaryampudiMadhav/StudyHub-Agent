import express from 'express'
import { getLatestSkillResult,getSteps } from '../controller/agent.controller.js'
import { protectedRoutes } from '../middleware/protectedRoute.js';

export const aiRouter = express.Router()

aiRouter.get("/total/:userSkill",protectedRoutes,getLatestSkillResult);
aiRouter.get("/steps/:userSkill",protectedRoutes,getSteps)