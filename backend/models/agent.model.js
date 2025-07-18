import mongoose from "mongoose";

const agentResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillsAnalyzed: [
    {
      skill: String,
      difficulty: String,
      steps: [
        {
          step: String,
          estimatedTime: String,
          tags: [String],
          resources: [String],
          quiz: [
            {
              question: String,
              options: [String],
              answer: String,
            },
          ],
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AgentResult = mongoose.model("AgentResult", agentResultSchema);
