import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/jwt', async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Error generating token" });
  }
});

export default router;