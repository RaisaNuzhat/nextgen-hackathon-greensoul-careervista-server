import express from "express";

import { getAllResources } from "../controllers/resourcesController.js";


const router = express.Router();
router.get("/get-all-resources",getAllResources);


export default router;