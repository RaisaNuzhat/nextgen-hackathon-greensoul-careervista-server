import { askCareerBot } from "../controllers/careerController.js";
import express from "express";

const router = express.Router();

router.post("/ask", askCareerBot);

export default router;
// routes/careerbot.routes.js

// import { Router } from 'express';
// const router = Router();
// import { askQuestion, getCareerSuggestions } from '../controllers/careerController';

// // Rate limiting middleware (optional but recommended)
// import rateLimit from 'express-rate-limit';

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 30, // limit each IP to 30 requests per windowMs
//   message: "Too many requests from this IP, please try again later."
// });

// // POST /api/careerbot/ask - Ask a career-related question
// router.post('/ask', limiter, askQuestion);

// // GET /api/careerbot/suggestions - Get career suggestions (optional)
// router.get('/suggestions', getCareerSuggestions);

// // GET /api/careerbot/health - Health check
// router.get('/health', (req, res) => {
//   res.status(200).json({ 
//     status: 'ok', 
//     message: 'CareerBot API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// export default router;