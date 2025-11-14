// import dataset from "../data/careerDataset.js";

// export const askCareerBot = (req, res) => {
//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ message: "Question is required" });
//   }

//   const q = question.toLowerCase();
//   const match = dataset.find(item =>
//     q.includes(item.q.toLowerCase().split(" ")[0])
//   );

//   const answer = match
//     ? match.a
//     : "I can help with career questions! Try asking about skills, jobs, internships, or learning paths. (This is a suggestion, not a guarantee.)";

//   res.json({
//     question,
//     answer,
//     note: "Responses are suggestions aligned with SDG 8 — not guaranteed outcomes."
//   });
// };
// import { getDB } from "../config/database.js";
// import { generateRoadMap, getRoadMap } from "../models/roadmapModel.js";

// export const getRoadmap = async (req, res) => {
//   try {
//     const email = req.params.email;
//     const roadmap = await getRoadMap(email);
//     console.log(roadmap);
//     res.send(roadmap);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Server Error", error });
//   }
// };


// controllers/careerbot.controller.js

// require('dotenv').config();

// // Helper function to query Hugging Face API
// async function queryHuggingFace(prompt) {
//   try {
//     const response = await fetch(
//       "https://router.huggingface.co/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.CAREERVISTA_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "openai/gpt-oss-120b:fastest",
//           messages: [
//             {
//               role: "system",
//               content: `You are CareerBot, an expert career advisor. Provide helpful, professional, and encouraging advice about:
// - Career paths and role recommendations
// - Skill development and learning roadmaps
// - Job search strategies and interview preparation
// - Resume and portfolio building
// - Industry trends and market insights
// - Educational paths and certifications

// Keep responses concise (2-4 paragraphs), actionable, and positive. Use bullet points for lists when appropriate.`
//             },
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//           max_tokens: 500,
//           temperature: 0.7,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("HuggingFace Response:", data?.choices[0]?.message?.content);

//     if (data.error) {
//       throw new Error(data.error);
//     }

//     return (
//       data?.choices[0]?.message?.content || 
//       "I apologize, but I couldn't generate a proper response. Could you please rephrase your question?"
//     );
//   } catch (error) {
//     console.error("HuggingFace API Error:", error);
//     throw error;
//   }
// }

// // Main controller to handle career bot questions
// export async function askQuestion(req, res) {
//   try {
//     const { question } = req.body;

//     // Validation
//     if (!question || typeof question !== 'string' || question.trim().length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Please provide a valid question"
//       });
//     }

//     // Check question length
//     if (question.length > 500) {
//       return res.status(400).json({
//         success: false,
//         error: "Question is too long. Please keep it under 500 characters."
//       });
//     }

//     console.log(`Received question: ${question}`);

//     // Get response from Hugging Face
//     const answer = await queryHuggingFace(question);

//     // Return response
//     res.status(200).json({
//       success: true,
//       answer: answer,
//       timestamp: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error("Error in askQuestion controller:", error);

//     // Handle different types of errors
//     if (error.message.includes('API key')) {
//       return res.status(401).json({
//         success: false,
//         error: "API authentication failed. Please check your credentials."
//       });
//     }

//     if (error.message.includes('rate limit')) {
//       return res.status(429).json({
//         success: false,
//         error: "Too many requests. Please try again in a few moments."
//       });
//     }

//     // Generic error response
//     res.status(500).json({
//       success: false,
//       error: "I'm having trouble processing your question right now. Please try again later.",
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// }

// // Optional: Get career suggestions
// export async function getCareerSuggestions(req, res) {
//   try {
//     const suggestions = [
//       {
//         id: 1,
//         title: "Software Developer",
//         description: "Build applications and write code",
//         skills: ["Programming", "Problem Solving", "Debugging"]
//       },
//       {
//         id: 2,
//         title: "Data Scientist",
//         description: "Analyze data and build ML models",
//         skills: ["Python", "Statistics", "Machine Learning"]
//       },
//       {
//         id: 3,
//         title: "UX/UI Designer",
//         description: "Design user interfaces and experiences",
//         skills: ["Figma", "User Research", "Prototyping"]
//       },
//       {
//         id: 4,
//         title: "DevOps Engineer",
//         description: "Manage infrastructure and deployment",
//         skills: ["Docker", "Kubernetes", "CI/CD"]
//       },
//       {
//         id: 5,
//         title: "Product Manager",
//         description: "Lead product development and strategy",
//         skills: ["Communication", "Strategy", "Analytics"]
//       }
//     ];

//     res.status(200).json({
//       success: true,
//       suggestions: suggestions
//     });
//   } catch (error) {
//     console.error("Error in getCareerSuggestions:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch career suggestions"
//     });
//   }
// }
// controllers/chatbotController.js

import dotenv from "dotenv";
dotenv.config();

// Function to call HuggingFace LLM
async function queryHuggingFace(prompt) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CAREERVISTA3_TOKEN}`,
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

  if (data.error) {
    console.error("LLM ERROR:", data.error);
    throw new Error(data.error);
  }

  return data?.choices?.[0]?.message?.content || "No response from the model.";
}

// CONTROLLER
export const askCareerBot = async (req, res) => {
  try {
    const { question } = req.body;
console.log(question)
    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    // Send question to model
    const answer = await queryHuggingFace(question);
    console.log(answer)

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get response from LLM",
      error: error.message,
    });
  }
};
