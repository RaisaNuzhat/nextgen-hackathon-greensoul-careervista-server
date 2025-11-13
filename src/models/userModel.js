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
    skill: [],
    job_experience:null,
    cv_url:null,
    projects:[],
    timestamp: Date.now(),
  };
  console.log("from userModel: ",newUser);
  
  return await userCollection.insertOne(newUser);
};

export const getAllUsers = async () => {
  const userCollection = getUserCollection();
  return await userCollection.find().toArray();
};

export const updateUser = async (email, userData) => {
  const userCollection = getUserCollection();

  // // clean up undefined fields if any
  // Object.keys(userData).forEach(
  //   (key) => userData[key] === undefined && delete userData[key]
  // );
console.log(userData,email)
  const result = await userCollection.findOneAndUpdate(
    { email },
    { $set: userData },
    { returnDocument: "after" } // returns the updated document
  );
  console.log(result);

  return result;
};
