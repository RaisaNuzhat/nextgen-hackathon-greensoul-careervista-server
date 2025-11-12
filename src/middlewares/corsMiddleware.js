// middlewares/corsMiddleware.js
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://th-assignment-a87d3.web.app",
  "https://th-assignment-a87d3.firebaseapp.com",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
