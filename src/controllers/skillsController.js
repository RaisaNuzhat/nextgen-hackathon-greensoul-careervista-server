import { getSkills } from "../models/skillsModel.js"


export const getRelevantSkills = async (req, res) => {
  try {
    const career = req.params.careerTrack;
    const skills = await getSkills(career);
    // console.log(skills.skills);
    res.send(skills.skills);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error });
  }
};