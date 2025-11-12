// models/userModel.js
import { getDB } from "../config/database.js";

export const getUserCollection = () => {
  const db = getDB();
  return db.collection("users");
};

// Optional: reusable CRUD functions
export const findUserByEmail = async (email) => {
  const userCollection = getUserCollection();
  return await userCollection.findOne({ email });
};

export const addOrUpdateUser = async (user) => {
  const userCollection = getUserCollection();
  const query = { email: user.email };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      ...user,
      timestamp: Date.now(),
    },
  };
  return await userCollection.updateOne(query, updateDoc, options);
};

export const getAllUsers = async () => {
  const userCollection = getUserCollection();
  return await userCollection.find().toArray();
};
