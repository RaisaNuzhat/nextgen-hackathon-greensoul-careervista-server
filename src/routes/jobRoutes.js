import express from "express";
import { seedJobs, getJobs, addJob, getJobById,getRecommendedJobs,getSkillGapAnalysis,getAllJobs} from "../controllers/jobController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Seed initial jobs (run once)
router.post("/seed", seedJobs);

// Get recommended jobs for a user (MUST be before /:id)
router.get('/recommended/:userId', getRecommendedJobs);

// Get skill gap analysis (MUST be before /:id)
router.get('/skill-gap/:userId/:jobId', getSkillGapAnalysis);

// Get all jobs (with optional query filters)
router.get("/", getJobs);


router.get("/all",getAllJobs)
// router.get("/all",getAllJobs)
// Add new job (from frontend)
router.post("/", addJob);

// Get job by id (MUST be last among GET routes with params)
router.get('/:id', getJobById);

export default router;