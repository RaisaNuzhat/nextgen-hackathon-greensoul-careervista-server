import { client } from "../config/database.js";

export const jobCollection = client.db("careervista").collection("jobs");
