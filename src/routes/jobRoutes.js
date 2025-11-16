import express from "express";
import { seedJobs, getJobs, addJob, getJobById,getRecommendedJobs,getSkillGapAnalysis,getAllJobs} from "../controllers/jobController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Seed initial jobs 
router.post("/seed", seedJobs);

router.get('/recommended/:userId', getRecommendedJobs);
router.get('/skill-gap/:userId/:jobId', getSkillGapAnalysis);
router.get("/", getJobs);
router.get("/all",getAllJobs)
router.post("/", addJob);
router.get('/:id', getJobById);

export default router;