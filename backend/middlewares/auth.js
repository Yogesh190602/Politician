import jwt from "jsonwebtoken";

import {config} from "dotenv";
config();


const secret = process.env.SECRET_KEY

export function generateToken (user ) {
    const payload = {

        EmailId: user.EmailId, Username: user.Username, userId: user._id, role: user.role}
        return jwt.sign(payload, secret, {expiresIn: "1d"})    
       
}


export function verifyToken(req, res, next) {

      const token = req.cookies.token;

    if (!token){
        return res.status(401).json({message: "No token provided"});
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("verify token error", error.message);
        
        return res.status(403).json({message: "Invalid token"});
    }
    
}

export function isAdmin(req, res, next) {
    if (req.user.role !== "admin"){
        return res.status(400).json({message: "Access denied, admins only"})
    }
    else {
        next();
    }
}
