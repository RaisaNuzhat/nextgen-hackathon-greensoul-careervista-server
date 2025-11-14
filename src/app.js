import dotenv from "dotenv";
dotenv.config(); // ← Must be at the VERY TOP before any imports that use env variables

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import resourcesRoutes from "./routes/resourcesRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import { connectDB } from "./config/database.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";

const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json()); 

// Connect MongoDB
await connectDB(); 

// Routes
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
app.use("/api", authRoutes);
app.use("/api", skillsRoutes);
app.use("/api", resourcesRoutes);
app.use("/api", roadmapRoutes);

// app.use("/api/jobs", jobRoutes);
// app.use("/api/resources", resourceRoutes);

// Root
app.get("/", (req, res) => {
  res.send("CareerVista API is running");
});

export default app;