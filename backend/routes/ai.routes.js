import express from 'express'
import { getAllSkills } from '../controller/agent.controller.js'
import { protectedRoutes } from '../middleware/protectedRoute.js';

export const aiRouter = express.Router()

aiRouter.get("/total",protectedRoutes,getAllSkills)