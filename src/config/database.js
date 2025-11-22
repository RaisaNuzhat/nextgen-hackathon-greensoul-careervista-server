import { MongoClient } from "mongodb";

let db;
let client;

export const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URL;
    
   
    if (!uri) {
      throw new Error(" DATABASE_URL is not defined in .env file");
    }
    
    console.log("🔄 Connecting to MongoDB...");
    client = new MongoClient(uri);
    // await client.connect();
    
    // Ping to verify connection
    // await client.db("admin").command({ ping: 1 });
    
    db = client.db("careervista");
    console.log(" MongoDB connected successfully to database: careervista");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

export { client };