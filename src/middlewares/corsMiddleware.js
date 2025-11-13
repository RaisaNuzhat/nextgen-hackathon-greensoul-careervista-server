// middlewares/corsMiddleware.js
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
