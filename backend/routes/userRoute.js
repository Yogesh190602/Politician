import { Router } from "express";
const router = Router();

import { registerUser, getDashboard, userLogin, createFunds, getFunds } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

router.post("/createUser", registerUser);
router.post("/login", userLogin)

router.get('/dashboard', authenticateToken, getDashboard);

router.post("/createFunds", createFunds);
router.get("/getFunds", getFunds);

export default router