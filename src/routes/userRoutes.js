
import express from "express";
import { createUser, getUsers, getUserByEmailController, updateUserData} from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user",createUser);
router.get("/users",verifyToken,verifyAdmin,getUsers);
router.get("/user/:email", verifyToken,getUserByEmailController);
// router.put("/user-update/:user?.email",verifyToken,updateUserData)
router.patch("/user-update/:email", verifyToken, updateUserData);


export default router;
