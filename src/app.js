import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import careerRoutes from "./routes/careerRoutes.js"
import roadmapRoutes from "./routes/roadmapRoutes.js";
import resourcesRoutes from "./routes/resourcesRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import { connectDB } from "./config/database.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import  cvAnalysisRoutes from './routes/cvAnalysisRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import userAnalyticsRoutes from './routes/userAnalyticsRoutes.js'
const app = express();


app.use(corsMiddleware);
app.use(express.json()); 


await connectDB(); 


app.use("/api", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", authRoutes);
app.use("/api", skillsRoutes);
app.use("/api", resourcesRoutes);
app.use("/api/careerbot", careerRoutes);

app.use("/api", roadmapRoutes);
app.use('/api', cvAnalysisRoutes);

// for uploading cv
app.use('/uploads', express.static('uploads'));
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user-analysis', userAnalyticsRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/resources", resourceRoutes);

app.get("/", (req, res) => {
  res.send("CareerVista API is running");
});

export default app;