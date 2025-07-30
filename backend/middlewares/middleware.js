import { verifyToken } from './auth.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }  

  const token = authHeader.split(' ')[1];

  console.log("token", token);

  try {
    const decoded = verifyToken(token);
    console.log("decoded payload", decoded);
    
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}


