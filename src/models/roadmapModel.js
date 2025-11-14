import { getDB } from "../config/database.js";

export const getRoadmapCollection = () => {
  const db = getDB();
  return db.collection("roadmap");
};

export const getRoadMap = async (email) => {
  const roadmapCollection = getRoadmapCollection();
  const result=await roadmapCollection.findOne({ email });
  console.log(result)
  return result
};

export const generateRoadMap=async(data,email)=>{
    const roadmapCollection = getRoadmapCollection();
    console.log(data)
     const existingRoadmap = await roadmapCollection.findOne({ email });
     let result;
      if (existingRoadmap) {
      result=await roadmapCollection.updateOne({ email }, { $set: data });
    } else {
      result=await roadmapCollection.insertOne(data);
    }
    console.log(result);
    return result;
}
 
