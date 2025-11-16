import { askCareerBot } from "../controllers/careerController.js";
import express from "express";

const router = express.Router();

router.post("/ask", askCareerBot);

export default router;
