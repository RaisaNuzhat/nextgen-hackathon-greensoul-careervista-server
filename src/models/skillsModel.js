import { getDB } from "../config/database.js";

export const getSkillsCollection = () => {
  const db = getDB();
  return db.collection("skills");
};

export const getSkills = async (career) => {
  const skillsCollection = getSkillsCollection();
  return await skillsCollection.findOne({ name: career });
};
