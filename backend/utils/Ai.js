import { createAgent, gemini } from "@inngest/agent-kit";

export const analyzeSkills = async (skills) => {
  const learningAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name : "Learning Path Assistant",
    system : `You are an expert AI learning assistant.

Your task is to:
1. Analyze a list of technical skills (e.g., "React", "Machine Learning").
2. For each skill, return:
   - difficulty: "beginner", "intermediate", or "advanced"
   - steps: A list of learning modules with:
     - step: A description of what the learner should do
     - resources: 3–5 helpful URLs (YouTube videos, articles, official docs, courses)
     - estimatedTime: Estimated time to complete the step (e.g., "2 hours", "1 week")
     - tags: Array of tags like ["project-based", "video", "course", "documentation"]
     - quiz: A short quiz (4–5 questions) for that module step. Each question must include:
        - question: The question text
        - options: Multiple choice options (array of 4 strings)
        - answer: Correct answer from options

🚨 IMPORTANT:
- Return ONLY raw JSON with the structure shown below
- DO NOT wrap output in markdown or code blocks
- Make sure JSON is parsable
- Each skill should have at least 5 modules (steps)

[
  {
    "skill": "Skill name",
    "difficulty": "beginner",
    "steps": [
      {
        "step": "Learn basic syntax",
        "estimatedTime": "2 hours",
        "tags": ["video", "documentation"],
        "resources": [
          "https://example.com/resource1",
          "https://example.com/resource2"
        ],
        "quiz": [
          {
            "question": "What is the correct way to declare a variable in JavaScript?",
            "options": ["var myVar = 5;", "int myVar = 5;", "let myVar = five;", "variable myVar = 5;"],
            "answer": "var myVar = 5;"
          }
        ]
      }
    ]
  }
],`,
  });

  try {
    const response = await learningAgent.run(
      `Based on the following skill(s), generate a personalized learning plan with quiz modules per step.

Skills: ${skills}

Return ONLY valid raw JSON as described above.`
    );

    console.log("🔍 Gemini Agent Response:", response);

    const raw = response.output?.[0]?.content;

    if (!raw) {
      console.error("❌ Gemini response missing content");
      return null;
    }

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
    
      const match = raw.match(/```json([\s\S]*?)```/i);
      const jsonString = match ? match[1].trim() : raw.trim();
      parsed = JSON.parse(jsonString);
    }

    return parsed;
  } catch (error) {
    console.error("❌ Error in analyzeSkills:", error.message);
    return null;
  }
};
