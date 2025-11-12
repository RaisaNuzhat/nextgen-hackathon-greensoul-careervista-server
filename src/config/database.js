// config/database.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

export const connectDB = async () => {
  try {
    client = new MongoClient(process.env.DATABASE_URL); // options removed
    await client.connect();
    db = client.db("careervista");
    console.log("MongoDB Connected");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};
