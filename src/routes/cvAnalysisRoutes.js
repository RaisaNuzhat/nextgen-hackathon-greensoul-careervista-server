import express from "express";
import  upload from'../config/multerConfig.js';
import { analyzeCV, updateUserProfile } from '../controllers/cvAnalysisController.js';

const router = express.Router();

router.post('/cv-analyze', upload.single('cv'), analyzeCV);
router.patch('/update-from-cv/:email', updateUserProfile);

export default router;