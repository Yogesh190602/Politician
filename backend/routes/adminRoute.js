import express from 'express';
const router = express.Router();

import {  createAdmin, lastelectionDetails, getlastelectionDetails, nextelectionDetails, getnextelectionDetails, electionDay, getElectionDay, editElection} from "../controllers/adminControllers.js";

router.post('/createAdmin', createAdmin);

router.post('/lastelectionDetails', lastelectionDetails);
router.get('/getlastelectionDetails', getlastelectionDetails);

router.post('/nextelectionDetails', nextelectionDetails);
router.get('/getnextelectionDetails', getnextelectionDetails);

router.post('/electionDay', electionDay);
router.get('/getElectionDay', getElectionDay);
router.put('/editElection/:id', editElection);


export default router;

