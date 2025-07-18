// inngest/functions/on-update-skills.js
import { inngest } from "../client.js";
import { AgentResult } from "../../models/agent.model.js";
import { analyzeSkills } from "../../utils/ai.js";

export const onAnalyzeSkills = inngest.createFunction(
  { id: "on-analyze-skills", retries: 2 },
  { event: "user/analyze.skills" },
  async ({ event, step }) => {
    const { userId, skills } = event.data;

    try {
      const learningPath = await analyzeSkills(skills);

      if (!learningPath) throw new Error("AI failed to return learning path.");

      await step.run("store-result", async () => {
         await AgentResult.findOneAndUpdate(
                { userId }, // Find by user
                 {
                   $push: { skillsAnalyzed: learningPath }, // Add one skill object
                 },
                {
                  upsert: true, // Create if doesn't exist
                  new: true,    // Return updated doc
                }
          )})

      return { success: true };
    } catch (err) {
      console.error("❌ Error in onAnalyzeSkills:", err.message);
      return { success: false, error: err.message };
    }
  }
);
