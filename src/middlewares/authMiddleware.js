const { verify } = require('jsonwebtoken');
const { getDB } = require('../config/database');

const verifyToken = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);
  
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Access Denied" });
  }
  
  const token = req.headers.authorization.split(" ")[1];
  
  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Access Denied" });
    }
    req.decoded = decoded;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const db = getDB();
    const usersCollection = db.collection('users');
    
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    
    if (user?.role !== "admin") {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { verifyToken, verifyAdmin };