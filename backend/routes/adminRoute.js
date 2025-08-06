import express from 'express';
const router = express.Router();

import {  createAdmin, electionDay, addElectionDate, applyCandidate, addVotes, setWinner, getElectionDay} from "../controllers/adminControllers.js";

router.post('/createAdmin', createAdmin);

router.post('/electionDay', electionDay);

router.post('/addElectionDate', addElectionDate);
router.post('/applyCandidate', applyCandidate);
router.post('/addVotes', addVotes);
router.post('/setWinner/:id', setWinner);


router.get('/getElectionDay', getElectionDay);





export default router;

