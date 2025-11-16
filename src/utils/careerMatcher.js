
import { getSkillsCollection } from "../models/skillsModel.js";

export default async function matchCareerTracks(extractedSkills) {
  const skillsCollection = getSkillsCollection();
  const careerTracks = await skillsCollection.find().toArray(); 
  
  if (!Array.isArray(careerTracks)) {
    throw new Error("careerTracks is not an array from DB");
  }

  const matches = [];
  
  const normalizedExtractedSkills = extractedSkills.map(s =>
    s.toLowerCase().trim()
  );
  
  console.log("Normalized Extracted Skills:", normalizedExtractedSkills);

  careerTracks.forEach(track => {
    const matchedSkills = [];
    const trackSkills = track.skills || [];

    trackSkills.forEach(trackSkill => {
      const normalizedTrackSkill = trackSkill.toLowerCase().trim();

      const isMatch = normalizedExtractedSkills.some(extractedSkill => {
        return (
          extractedSkill === normalizedTrackSkill ||
          extractedSkill.includes(normalizedTrackSkill) ||
          normalizedTrackSkill.includes(extractedSkill)
        );
      });

      if (isMatch) {
        matchedSkills.push(trackSkill); 
      }
    });

    if (matchedSkills.length > 0) {
      const matchPercentage = (matchedSkills.length / trackSkills.length) * 100;
      
      matches.push({
        careerTrack: track.name, 
        matchedSkills,
        matchCount: matchedSkills.length, 
        matchPercentage: Math.round(matchPercentage), 
        totalSkills: trackSkills.length, 
        reason: `${matchedSkills.length} skill(s) match: ${matchedSkills.slice(0, 3).join(", ")}${matchedSkills.length > 3 ? "..." : ""}` // Why recommended
      });
    }
  });

  return matches.sort((a, b) => b.matchCount - a.matchCount);
}