import jwt from 'jsonwebtoken';
import { getDB } from '../config/database.js';

 const getUserCollection = () => {
  const db = getDB();
  return db.collection("users");
};
export const verifyToken = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);
  
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Access Denied" });
  }
  
  const token = req.headers.authorization.split(" ")[1];
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Access Denied" });
    }
    req.decoded = decoded;
    console.log(req.decoded);
    next();
  });
  // next();
};

// export const verifyAdmin = async (req, res, next) => {
//   try {
//     const email = req.decoded.email;
//     console.log("from verifyAdmin: ",email);
//     const db = getDB();
//     // const usersCollection = db.collection('users');
//     const userCollection = getUserCollection();
    
//     const query = { email: email };
//     const user = await userCollection.findOne(query);
//     console.log(user?.role);
    
//     if (user?.role !== "admin") {
//       return res.status(403).send({ message: "Forbidden Access" });
//     }
    
//     next();
//   } catch (error) {
//     return res.status(500).send({ message: "Internal Server Error" });
//   }
// };

export const verifyAdmin = async (req, res, next) => {
  try {
    console.log("=== VERIFY ADMIN MIDDLEWARE ===");
    
    // Check if req.decoded exists (from verifyToken)
    if (!req.decoded) {
      console.log("❌ req.decoded is undefined - verifyToken might not have run");
      return res.status(401).send({ message: "Unauthorized - Token not decoded" });
    }
    
    const email = req.decoded.email;
    console.log("Checking admin status for email:", email);
    
    if (!email) {
      console.log("❌ No email found in decoded token");
      return res.status(401).send({ message: "Unauthorized - Invalid token payload" });
    }
    
    const userCollection = getUserCollection();
    const query = { email: email };
    const user = await userCollection.findOne(query);
    
    console.log("User found:", user ? "Yes" : "No");
    console.log("User role:", user?.role);
    
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).send({ message: "User not found" });
    }
    
    if (user.role !== "admin") {
      console.log("❌ User is not an admin. Role:", user.role);
      return res.status(403).send({ message: "Forbidden Access - Admin Only" });
    }
    
    console.log("✅ Admin verified successfully");
    req.user = user; // Attach user to request for future use
    next();
  } catch (error) {
    console.error("❌ Error in verifyAdmin:", error);
    return res.status(500).send({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};