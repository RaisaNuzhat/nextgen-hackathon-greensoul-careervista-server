// models/userModel.js
import { getDB } from "../config/database.js";

export const getUserCollection = () => {
  const db = getDB();
  return db.collection("users");
};


export const findUserByEmail = async (email) => {
  const userCollection = getUserCollection();
  return await userCollection.findOne({ email });
};

export const addUser = async (user) => {
  const userCollection = getUserCollection();
  const query = { email: user.email };
  // Insert new user
  const newUser = {
    ...user,
    timestamp: Date.now(),
  };
  console.log("from userModel: ",newUser);
  
  return await userCollection.insertOne(newUser);
};

export const getAllUsers = async () => {
  const userCollection = getUserCollection();
  return await userCollection.find().toArray();
};
