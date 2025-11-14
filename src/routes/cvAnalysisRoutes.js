import express from "express";
import  upload from'../config/multerConfig.js';
import { analyzeCV, updateUserProfile } from '../controllers/cvAnalysisController.js';

const router = express.Router();
// Route to analyze uploaded CV
router.post('/cv-analyze', upload.single('cv'), analyzeCV);

// Route to update user profile with extracted data
router.patch('/update-from-cv/:email', updateUserProfile);

export default router;