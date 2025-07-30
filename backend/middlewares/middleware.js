// import {jwt} from 'jsonwebtoken';


// exports.verifytoken = (req, res, next) => {

//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith('Bearer ')){
//         return res.status(401).json({ message: 'token not found' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {

        
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded;

//         next();

//     }
    
//     catch (error) {
//         return res.status(401).json({ message: 'Invalid or expired token' });
//     }


// }


// middleware.js
import { verifyToken } from './auth.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token); // Throws error if invalid/expired
    req.user = decoded; // Attach decoded payload (e.g., userId, email)
    next(); // Continue to controller
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}
