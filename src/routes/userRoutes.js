
import express from "express";
import { createOrUpdateUser, getUsers, getUserByEmailController } from "../controllers/userController.js";

const router = express.Router();

router.put("/user", createOrUpdateUser);
router.get("/users", getUsers);
router.get("/user/:email", getUserByEmailController);

export default router;
