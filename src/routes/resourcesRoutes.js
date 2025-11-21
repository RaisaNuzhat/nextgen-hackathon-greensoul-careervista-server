import express from "express";
import { getAllResourcesForAnalytics } from '../controllers/resourcesController.js';
import { getAllResources } from "../controllers/resourcesController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/get-all-resources",getAllResources);
router.get("/resources-analytics", verifyToken, verifyAdmin, getAllResourcesForAnalytics);

export default router;