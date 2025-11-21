import express from 'express';
import {
  getAnalyticsSummary,
  getSkillAnalytics,
  getCareerTrackAnalytics,
  getUserGrowthAnalytics,
  getJobAnalytics,
  getResourceAnalytics
} from '../controllers/analyticsController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router();

// All analytics routes require admin authentication
router.get('/summary', verifyToken, verifyAdmin, getAnalyticsSummary);
router.get('/skills', verifyToken, verifyAdmin, getSkillAnalytics);
router.get('/career-tracks', verifyToken, verifyAdmin, getCareerTrackAnalytics);
router.get('/user-growth', verifyToken, verifyAdmin, getUserGrowthAnalytics);
router.get('/jobs', verifyToken, verifyAdmin, getJobAnalytics);
router.get('/resources', verifyToken, verifyAdmin, getResourceAnalytics);

export default router;