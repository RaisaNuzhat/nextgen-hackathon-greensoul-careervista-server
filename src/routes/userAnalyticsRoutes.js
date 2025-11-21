
import express from 'express';
import {
  getOverviewStats,
  getJobMarketAnalysis,
  getTopSkills,
  getCareerTrackDistribution,
  getSkillsGapAnalysis,
  getUserDemographics,
  getCompleteAnalytics
} from '../controllers/userAnalyticsController.js';

const router = express.Router();
router.get('/overview', getOverviewStats);
router.get('/job-market', getJobMarketAnalysis);
router.get('/top-skills', getTopSkills);
router.get('/career-tracks', getCareerTrackDistribution);
router.get('/skills-gap', getSkillsGapAnalysis);
router.get('/demographics', getUserDemographics);
router.get('/complete', getCompleteAnalytics);


export default router;