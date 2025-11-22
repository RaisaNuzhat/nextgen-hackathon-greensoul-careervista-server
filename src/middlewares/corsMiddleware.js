
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://hackathon-39f93.web.app"
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
