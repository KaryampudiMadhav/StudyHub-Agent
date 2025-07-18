
import {AgentResult} from "../models/agent.model.js";

export const getAllSkills = async (req, res) => {
  const user = req.user;

  try {
    const userSkills = await AgentResult.findOne({ userId: user._id });

    if (
      !userSkills ||
      !userSkills.skillsAnalyzed ||
      userSkills.skillsAnalyzed.length === 0
    ) {
      return res.status(404).json({ error: "No Skills Found" });
    }

    res.status(200).json({ skills: userSkills.skillsAnalyzed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
