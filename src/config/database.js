import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;

const connectDB = async () => {
  const client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  db = client.db("carrervista");
  console.log("MongoDB Connected");
};

export const getDB = () => db;

export default connectDB;
