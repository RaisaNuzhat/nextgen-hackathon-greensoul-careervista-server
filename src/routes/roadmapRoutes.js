import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { getRoadmap,generateRoadmap } from "../controllers/roadmapController.js";


const router = express.Router();
router.get("/roadmap/:email",verifyToken,getRoadmap);
router.post("/generate-roadmap",verifyToken,generateRoadmap);


export default router;