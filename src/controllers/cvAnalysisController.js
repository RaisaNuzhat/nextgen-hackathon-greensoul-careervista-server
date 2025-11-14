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

    // Step 1: Extract text from PDF
    let cvText;
    try {
      cvText = await extractTextFromPDF(filePath);
      console.log('Text extracted, length:', cvText.length);
    } catch (error) {
      // Clean up file on extraction error
      deleteUploadedFile(filePath);
      return res.status(400).json({ 
        error: 'Could not extract text from PDF',
        message: error.message 
      });
    }

    // Step 2: Extract skills using LLM
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

    // Step 3: Combine skills and tools for matching
    // const allSkills = [...new Set([...skills, ...tools])];

    // // Step 4: Match to career tracks
    // const careerMatches = matchCareerTracks(allSkills);
    // console.log('Career matches found:', careerMatches.length);

    // // Step 5: Get top 3 career recommendations
    // const recommendedTracks = careerMatches.slice(0, 3).map(m => m.careerTrack);

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
    
    // Clean up uploaded file on error
    if (req.file) {
      deleteUploadedFile(req.file.path);
    }

    res.status(500).json({ 
      error: 'Failed to analyze CV',
      message: error.message 
    });
  }
}

// export  async function updateUserProfile(req, res) {
//   try {
//     const { email } = req.params;
//     const { skills, tools, careerTrack } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: 'Email is required' });
//     }


//     // Update user in database
//     const result = await getUserCollection.findOneAndUpdate(
//       { email },
//       {
//         $set: {
//           skills: JSON.stringify(skills),
//           tools: JSON.stringify(tools),
//           careerTrack:careerTrack
          
//         //   cvPath,
//         //   careerTrack: careerTrack || null,
//         //   cvAnalyzedAt: new Date(),
//         //   updatedAt: new Date()
//         },
//       },
//       { returnDocument: "after" }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     console.log('Profile updated for:', email);

//     res.json({ 
//       success: true, 
//       message: 'Profile updated successfully',
//       skillsCount: allSkills.length
//     });

//   } catch (error) {
//     console.error('Profile update error:', error);
//     res.status(500).json({ 
//       error: 'Failed to update profile',
//       message: error.message 
//     });
//   }
// }

// export default {
//   analyzeCV,
//   updateUserProfile
// };

export async function updateUserProfile(req, res) {
  try {
    const { email } = req.params;
    const { skills, tools, careerTrack } = req.body;
    console.log(email,skills, tools, careerTrack)

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const usersCollection = getUserCollection();

    // Update user in database
    const result = await usersCollection.updateOne(
      { email },
      {
        $set: {
          skills: skills || [],
          tools: tools || [],
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
