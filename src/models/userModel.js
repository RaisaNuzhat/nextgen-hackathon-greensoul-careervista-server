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

  const newUser = {
    ...user,
    skills: [],
    job_experience:null,
    cv_url:null,
    projects:[],
    github_link:null,
    linkedin_link:null,
    portfolio_link:null,
    passing_year:null,
    role:"user",
    cocurricular_activities:[],
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

console.log(userData,email)
  const result = await userCollection.findOneAndUpdate(
    { email },
    { $set: userData },
    { returnDocument: "after" } // returns the updated document
  );
  console.log(result);

  return result;
};


