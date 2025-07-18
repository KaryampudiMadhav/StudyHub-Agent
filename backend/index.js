import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db.js';
import cors from 'cors'
import { router } from './routes/user.routes.js';
import { inngest } from "./inngest/client.js"
import {serve} from 'inngest/express'
import { onSignUp } from './inngest/functions/on-signup.js';
import cookieParser from 'cookie-parser';
import { aiRouter } from './routes/ai.routes.js';
import { onAnalyzeSkills } from './inngest/functions/on-update-skills.js';
import { onSkills } from './inngest/functions/on-skills.js';

dotenv.config()
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth",router);

app.use("/api/agent",aiRouter);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onSignUp,onAnalyzeSkills,onSkills],
  })
);


const port = process.env.PORT;

app.listen(port, () => {
  connectionDB()
  console.log("Jai Shree Ram Server is running in port  : ", port);
});