import jwt from "jsonwebtoken";

import {config} from "dotenv";
config();


const secret = process.env.SECRET_KEY

export function generateToken (user ) {
    const payload = {


        EmailId: user.EmailId, Username: user.Username, userId: user._id}

        return jwt.sign(payload, secret, {expiresIn: "1h"}) 

        
        
}

console.log("JWT Secret:", secret);


export function verifyToken(req, res, next) {

    //   const token = req.cookies.token;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

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
