import { Router } from "express";
const router = Router();

import { registerUser, userLogin, users, createFunds, getFunds } from "../controllers/userController.js";

import { verifyToken } from "../middlewares/auth.js";


router.post("/createUser", registerUser);
router.post("/login", userLogin)

router.get("/getUser", users);

router.get("/profile", verifyToken, );
    
    
//     async (req, res) => {
//     console.log(req.user);
//     return res.status(200).json({ message: `hello ${req.user.Username}` });
// });


router.post("/createFunds", createFunds);
router.get("/getFunds", getFunds);

export default router