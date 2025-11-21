
import express from "express";
import { createUser, getUsers, getUserByEmailController, updateUserData, checkAdmin} from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";
import { getAllUsersForAnalytics } from '../controllers/userController.js';





const router = express.Router();

router.post("/user",createUser);
router.get("/users/admin/:email",verifyToken,checkAdmin);
router.get("/users",verifyToken,verifyAdmin,getUsers);
router.get("/user/:email", verifyToken,getUserByEmailController);
// router.put("/user-update/:user?.email",verifyToken,updateUserData)
router.patch("/user-update/:email", verifyToken, updateUserData);
router.get("/users-analytics", verifyToken, verifyAdmin, getAllUsersForAnalytics);

export default router;
