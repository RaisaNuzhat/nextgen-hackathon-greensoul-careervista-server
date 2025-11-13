const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();

// POST /jwt - Generate JWT token
router.post('/jwt', async (req, res) => {
  try {
    const user = req.body;
    const token = sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Error generating token" });
  }
});

module.exports = router;