import { Router } from "express";
const router = Router();

import { registerUser, userLogin, getDashboard, getUser, createFunds, getFunds } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/middleware.js"; 


router.post("/createUser", registerUser);
router.post("/login", userLogin)

router.get("/getUser", getUser);

router.get('/dashboard', authenticateToken, getDashboard);


router.post("/createFunds", createFunds);
router.get("/getFunds", getFunds);

export default router