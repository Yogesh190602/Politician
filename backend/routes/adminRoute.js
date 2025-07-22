import express from 'express';
const router = express.Router();

import {createAdmin} from '../controllers/adminControllers.js';
import {login} from '../controllers/adminControllers.js';

router.post('/createAdmin', createAdmin);
router.post('/login', login);

export default router;

