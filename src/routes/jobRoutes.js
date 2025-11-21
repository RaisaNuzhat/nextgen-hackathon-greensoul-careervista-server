import express from "express";
import { seedJobs, getJobs, addJob, getJobById,getRecommendedJobs,getSkillGapAnalysis,getAllJobs, getAdminAllJobs} from "../controllers/jobController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";
import { getAllJobsForAnalytics } from '../controllers/jobController.js';
const router = express.Router();

// Seed initial jobs 
router.post("/seed", seedJobs);
router.get('/recommended/:userId', getRecommendedJobs);
router.get('/skill-gap/:userId/:jobId', getSkillGapAnalysis);
router.get("/", getJobs);
router.get("/all",verifyToken,getAllJobs)
router.post("/addjobs", verifyToken,addJob);
router.get('/:id', getJobById);
router.get("/jobs-analytics", verifyToken, verifyAdmin, getAllJobsForAnalytics);

export default router;