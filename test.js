import { getDB } from "../config/database.js";
import { generateRoadMap, getRoadMap } from "../models/roadmapModel.js";

export const getRoadmap = async (req, res) => {
  try {
    const email = req.params.email;
    const roadmap = await getRoadMap(email);
    console.log(roadmap);
    res.send(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

async function queryHuggingFace(prompt) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: Bearer ${process.env.CAREERVISTA_TOKEN},
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:fastest",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );
  const data = await response.json();
  console.log(data?.choices[0]?.message?.content);
  if (data.error) throw new Error(data.error);
  return (
    data?.choices[0]?.message?.content || "No response received from model."
  );
}
export const generateRoadmap = async (req, res) => {
  try {
    const {
      email,
      currentSkills,
      targetRole,
      timeframe,
      learningHoursPerWeek,
    } = req.body;

    if (
      !email ||
      !currentSkills ||
      !targetRole ||
      !timeframe ||
      !learningHoursPerWeek
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = `You are a career guidance expert. Create a detailed, personalized learning roadmap for someone who wants to become a ${targetRole}.

Current Information:
- Current Skills: ${currentSkills.join(", ")}
- Target Role: ${targetRole}
- Learning Timeframe: ${timeframe} months
- Weekly Learning Time: ${learningHoursPerWeek} hours

Please generate a structured roadmap with the following:

1. Divide the learning journey into ${Math.ceil(
      timeframe / 2
    )} phases (each phase should be roughly ${Math.floor(
      timeframe / Math.ceil(timeframe / 2)
    )} months)

2. For each phase, provide:
   - A clear phase title
   - Duration (e.g., "Month 1-2")
   - 5-8 specific topics/technologies to learn
   - 2-3 hands-on project ideas to build
   - A brief description of the phase's focus

3. Provide a recommendation for when the learner should start applying for jobs/internships

IMPORTANT: Return your response ONLY as valid JSON in this exact format (no markdown, no code blocks, just pure JSON):

{
  "phases": [
    {
      "title": "Phase title here",
      "duration": "Month X-Y",
      "topics": ["topic1", "topic2", "topic3", ...],
      "projects": ["project1", "project2", ...],
      "description": "Brief description"
    }
  ],
  "jobApplicationTimeline": "When to start applying for jobs"
}`;

    // Querying AI
    console.log("Querying AI for roadmap generation...");
    const aiResponse = await queryHuggingFace(prompt);

    // Parse AI response
    let parsedRoadmap;
    try {
      // Remove markdown code blocks if present
      let cleanResponse = aiResponse.trim();
      if (cleanResponse.startsWith("json")) {
        cleanResponse = cleanResponse
          .replace(/json\n?/g, "")
          .replace(/\n?/g, "");
      } else if (cleanResponse.startsWith("")) {
        cleanResponse = cleanResponse.replace(/```\n?/g, "");
      }

      parsedRoadmap = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw AI response:", aiResponse);

      // Fallback: Create a basic roadmap structure
      parsedRoadmap = {
        phases: [
          {
            title: "Foundation Phase",
            duration: Month 1-${Math.ceil(timeframe / 3)},
            topics:
              currentSkills.length > 0
                ? [
                    Build on: ${currentSkills.join(", ")},
                    "Core fundamentals",
                    "Industry best practices",
                  ]
                : ["Core fundamentals", "Basic concepts", "Industry standards"],
            projects: ["Build a portfolio website", "Create a simple project"],
            description: "Focus on building strong fundamentals",
          },
        ],
        jobApplicationTimeline: `Start applying after ${Math.ceil(
          timeframe * 0.7
        )} months when you have completed 3-4 projects`,
      };
    }

    const roadmapData = {
      email,
      targetRole,
      currentSkills,
      timeframe: parseInt(timeframe),
      learningHoursPerWeek: parseInt(learningHoursPerWeek),
      phases: parsedRoadmap.phases || [],
      jobApplicationTimeline:
        parsedRoadmap.jobApplicationTimeline ||
        Start applying after ${Math.ceil(timeframe * 0.75)} months,
      createdAt: new Date(),
    };
    const result = await generateRoadMap(roadmapData, email);
    if (result) res.status(200).json(roadmapData);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    res.status(500).json({
      error: "Failed to generate roadmap",
      details: error.message,
    });
  }
};