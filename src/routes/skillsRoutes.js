import express from "express";
import { getRelevantSkills } from "../controllers/skillsController.js";


const router = express.Router();
router.get("/get-relevant-skills/:careerTrack",getRelevantSkills);


export default router;