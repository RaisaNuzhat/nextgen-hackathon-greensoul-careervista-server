// routes/userRoutes.js
import express from "express";
import { createUser, getUsers, getUserByEmailController } from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user",createUser);
router.get("/users",verifyToken,verifyAdmin,getUsers);
router.get("/user/:email", verifyToken,getUserByEmailController);

export default router;
