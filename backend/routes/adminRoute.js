import express from 'express';
const router = express.Router();

import {  createAdmin, login, lastelectionDetails, getlastelectionDetails, nextelectionDetails, getnextelectionDetails, electionDay, getElectionDay} from "../controllers/adminControllers.js";

router.post('/createAdmin', createAdmin);
router.post('/login', login);

router.post('/lastelectionDetails', lastelectionDetails);
router.get('/getlastelectionDetails', getlastelectionDetails);

router.post('/nextelectionDetails', nextelectionDetails);
router.get('/getnextelectionDetails', getnextelectionDetails);

router.post('/electionDay', electionDay);
router.get('/getElectionDay', getElectionDay);


export default router;

