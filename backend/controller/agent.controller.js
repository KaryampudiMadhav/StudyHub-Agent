import { AgentResult } from "./../models/agent.model.js";

export const getLatestSkillResult = async (req, res) => {
  const userId = req.user._id;
  const {userSkill} = req.params;
  try {
    const data = await AgentResult.findOne({ userId })
     
    if (!data) {
      return res.status(404).json({ error: "No agent results found." });
    }

    const skillResult = data.skillsAnalyzed.find(s => s.skill === userSkill);

    return res.status(200).json(skillResult);
  } catch (err) {
    console.error("❌ Error fetching agent result:", err.message);
    return res.status(500).json({ error: "Failed to fetch results." });
  }
};


export const getSteps = async(req,res) =>{
  
  const userId = req.user._id;
  try {
    const { userSkill } = req.params;

    const result = await AgentResult.findOne({ userId });
    const skill = result.skillsAnalyzed.find((s) => s.skill === userSkill);

    res.status(200).json(skill?.steps || []);

  } catch (error) {
       console.error("Error fetching quiz:", err.message);
       return res.status(500).json({ error: "Internal server error" });
    }
}

