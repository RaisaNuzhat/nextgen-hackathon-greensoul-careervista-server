
import { getSkillsCollection } from "../models/skillsModel.js";

export default async function matchCareerTracks(extractedSkills) {
  // Fetch career tracks from MongoDB
  const skillsCollection = getSkillsCollection();
  const careerTracks = await skillsCollection.find().toArray(); 
  
  if (!Array.isArray(careerTracks)) {
    throw new Error("careerTracks is not an array from DB");
  }

  const matches = [];
  
  // Normalize extracted skills for comparison
  const normalizedExtractedSkills = extractedSkills.map(s =>
    s.toLowerCase().trim()
  );
  
  console.log("Normalized Extracted Skills:", normalizedExtractedSkills);

  // Loop through each career track from database
  careerTracks.forEach(track => {
    const matchedSkills = [];
    const trackSkills = track.skills || [];

    // Check each skill in the track
    trackSkills.forEach(trackSkill => {
      const normalizedTrackSkill = trackSkill.toLowerCase().trim();

      // Check if any extracted skill matches this track skill
      const isMatch = normalizedExtractedSkills.some(extractedSkill => {
        return (
          extractedSkill === normalizedTrackSkill ||
          extractedSkill.includes(normalizedTrackSkill) ||
          normalizedTrackSkill.includes(extractedSkill)
        );
      });

      if (isMatch) {
        matchedSkills.push(trackSkill); // Store original skill name
      }
    });

    // If there are matched skills, add this track to results
    if (matchedSkills.length > 0) {
      const matchPercentage = (matchedSkills.length / trackSkills.length) * 100;
      
      matches.push({
        careerTrack: track.name, // Career track name from DB
        matchedSkills, // Array of skills that matched
        matchCount: matchedSkills.length, // Number of matches
        matchPercentage: Math.round(matchPercentage), // Percentage match
        totalSkills: trackSkills.length, // Total skills in this track
        reason: `${matchedSkills.length} skill(s) match: ${matchedSkills.slice(0, 3).join(", ")}${matchedSkills.length > 3 ? "..." : ""}` // Why recommended
      });
    }
  });

  // Sort by match count (highest first)
  return matches.sort((a, b) => b.matchCount - a.matchCount);
}