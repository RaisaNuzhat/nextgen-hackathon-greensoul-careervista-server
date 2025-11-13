import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/database.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json()); // no need for body-parser

// Connect MongoDB
await connectDB(); // top-level await

// Routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);

// app.use("/api/jobs", jobRoutes);
// app.use("/api/resources", resourceRoutes);

// Root
app.get("/", (req, res) => {
  res.send("CareerVista API is running");
});

export default app;
