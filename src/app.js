import dotenv from "dotenv";
dotenv.config(); // ← Must be at the VERY TOP before any imports that use env variables

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
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

// Root
app.get("/", (req, res) => {
  res.send("CareerVista API is running");
});

export default app;