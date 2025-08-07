import { Router } from "express";
const router = Router();

import { registerUser, userLogin, users, getUser, createFunds, getFunds } from "../controllers/userController.js";

import {  verifyToken } from "../middlewares/auth.js";


router.post("/createUser", registerUser);
router.post("/login", userLogin)

router.get("/allUsers", verifyToken , users);

router.get("/profile", verifyToken, getUser);

router.post("/createFunds", createFunds);
router.get("/getFunds", getFunds);

export default router