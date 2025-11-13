import express from "express";
import { seedJobs, getJobs, addJob, getJobById,getRecommendedJobs } from "../controllers/jobController.js";

const router = express.Router();

// Seed initial jobs (run once)
router.post("/jobs/seed", seedJobs);


// get job by id
router.get('/jobs/:id', getJobById);

// Get all jobs
router.get("/jobs", getJobs);

// Add new job (from frontend)
router.post("/jobs", addJob);

// Get recommended jobs for a specific user
router.get("/jobs/recommend/:userId", getRecommendedJobs);
export default router;