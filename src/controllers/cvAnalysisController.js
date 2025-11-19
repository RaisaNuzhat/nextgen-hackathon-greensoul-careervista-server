import { extractTextFromPDF, deleteUploadedFile } from '../utils/pdfExtractor.js';
import  extractSkillsWithLLM  from '../utils/llmservice.js';
import  matchCareerTracks  from '../utils/careerMatcher.js';
import { getDB } from "../config/database.js";

export const getUserCollection = () => {
  const db = getDB();
  return db.collection("users");
};

export async function analyzeCV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No CV file uploaded' });
    }

    const filePath = req.file.path;
    const cvUrl = `/uploads/cvs/${req.file.filename}`;

    console.log('Processing CV:', req.file.filename);

    
    let cvText;
    try {
      cvText = await extractTextFromPDF(filePath);
      console.log('Text extracted, length:', cvText.length);
    } catch (error) {
      deleteUploadedFile(filePath);
      return res.status(400).json({ 
        error: 'Could not extract text from PDF',
        message: error.message 
      });
    }

    let skills, tools,careerTrack;
    try {
      const extracted = await extractSkillsWithLLM(cvText);
      skills = extracted.skills;
      tools = extracted.tools;
      careerTrack = extracted.careerTrack;
      console.log('Skills extracted:', skills.length, 'Tools:', tools.length, careerTrack);
    } catch (error) {
      console.error('LLM extraction failed:', error);
      return res.status(500).json({
        error: 'Failed to analyze CV with AI',
        message: error.message
      });
    }

    res.json({
      success: true,
      data: {
        cvPath: cvUrl,
        extractedSkills: skills,
        extractedTools: tools,
        careerTrack:careerTrack,
        fileName: req.file.originalname
      }
    });

  } catch (error) {
    console.error('CV analysis error:', error);
    
    if (req.file) {
      deleteUploadedFile(req.file.path);
    }

    res.status(500).json({ 
      error: 'Failed to analyze CV',
      message: error.message 
    });
  }
}


export async function updateUserProfile(req, res) {
  try {
    const { email } = req.params;
    const { skills, careerTrack } = req.body;
    console.log(email,skills, careerTrack)

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const usersCollection = getUserCollection();

   
    const result = await usersCollection.updateOne(
      { email },
      {
        $set: {
          skills: skills || [],
          careerTrack: careerTrack || []
        },
      },
     
    );

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Profile updated for:", email);

    res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUser: result
    });

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      error: "Failed to update profile",
      message: error.message
    });
  }
}
