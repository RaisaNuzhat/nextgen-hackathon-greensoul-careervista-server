import express from "express";
import cors from "cors";

// import userRoutes from "./routes/userRoutes.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import resourceRoutes from "./routes/resourceRoutes.js";
import connectDB from "./config/database.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/resources", resourceRoutes);

// Root
app.get("/", (req, res) => {
  res.send("CareerVista API is running");
});

export default app;
