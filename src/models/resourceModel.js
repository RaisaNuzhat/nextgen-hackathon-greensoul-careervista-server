import { getDB } from "../config/database.js";

export const getResourcesCollection = () => {
  const db = getDB();
  return db.collection("resources");
};

export const getResources = async () => {
  const resourcesCollection = getResourcesCollection();
  const result=await resourcesCollection.find().toArray();
  console.log(result)
  return result
};
