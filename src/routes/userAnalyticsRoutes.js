
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


/**
 * @route   GET /api/user-analysis/overview
 * @desc    Get overview statistics (total users, jobs, match rate, applications)
 * @access  Public
 */
router.get('/overview', getOverviewStats);

/**
 * @route   GET /api/user-analysis/job-market
 * @desc    Get job market analysis (experience levels, job types, mode distribution)
 * @access  Public
 */
router.get('/job-market', getJobMarketAnalysis);

/**
 * @route   GET /api/user-analysis/top-skills
 * @desc    Get top skills analysis (most demanded and trending skills)
 * @access  Public
 */
router.get('/top-skills', getTopSkills);

/**
 * @route   GET /api/user-analysis/career-tracks
 * @desc    Get career track distribution among users
 * @access  Public
 */
router.get('/career-tracks', getCareerTrackDistribution);

/**
 * @route   GET /api/user-analysis/skills-gap
 * @desc    Get skills gap analysis (supply vs demand)
 * @access  Public
 */
router.get('/skills-gap', getSkillsGapAnalysis);

/**
 * @route   GET /api/user-analysis/demographics
 * @desc    Get user demographics (education, experience, departments)
 * @access  Public
 */
router.get('/demographics', getUserDemographics);

/**
 * @route   GET /api/user-analysis/complete
 * @desc    Get complete analytics dashboard data (all data in one call)
 * @access  Public (Main endpoint to use in frontend)
 */
router.get('/complete', getCompleteAnalytics);


export default router;