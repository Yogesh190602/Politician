import { ElectionDay, LastElection, NextElection} from '../models/adminModel.js';
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function createAdmin(req, res) {
  try {
    const { EmailId, Password } = req.body;

    const existingAdmin = await User.findOne({ EmailId });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newAdmin = new User({
      EmailId,
      Password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    return res.status(200).json({ message: newAdmin });
  } catch (error) {
    console.log("Admin creation error",error);
    
    return res.status(500).json({ message: "Admin creation failed", error: error.message });
  }
}



export async function electionDay(req, res) {
    try{
        const ElectDay = new ElectionDay(req.body);
        await ElectDay.save();
        return res.status(200).json({ ElectDay });

    }

    catch(error) {
        res.status(500).json({ message: 'unable to add details' });
    }

}


export async function addElectionDate (req, res){
    const {Date} = req.body;
    try {
        const newElection = new ElectionDay({ Date, Candidates: [] });
        await newElection.save();
        return res.status(200).json({ message: "Election date added successfully", newElection });
    }   

    catch (error) {
        return res.status(500).json({ message: "Unable to add election date", error: error.message });
    }
}

export async function applyCandidate(req, res) {
    const { electionId, candidateName } = req.body;
    try {
        const election = await ElectionDay.findById(electionId);
        if (!election) {
            return res.status(404).json({ message: 'Election not found' });
        }

        const alreadyExists = election.Candidates.some(
            (c) => c.name === candidateName
        );

        if (alreadyExists) {
            return res.status(400).json({ message: 'You have already applied as a candidate' });
        }

        election.Candidates.push({name: candidateName, votes: 0});

        await election.save();
        return res.status(200).json({ message: 'Candidate applied successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Unable to apply candidate', error: error.message });
    }
}

export async function addVotes(req, res) {
    const { electionId, candidateName } = req.body;
    try {
        const election = await ElectionDay.findById(electionId);
        if (!election) {
            return res.status(404).json({ message: 'Election not found' });
        }
        const candidate = election.Candidates.find(c => c.name === candidateName);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });    

        }
        candidate.votes += 1;
        await election.save();
        return res.status(200).json({ message: 'Vote added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to add vote', error:error.message });
    }
}   

export async function setWinner(req, res) {
    try {
        const { id } = req.params;
        const { Winner } = req.body;

        const updatedElection = await ElectionDay.findByIdAndUpdate( id, { Winner }, { new: true } );

        if (!updatedElection) {
            return res.status(404).json({ message: "Election not found" });
        }

        return res.status(200).json({ message: "Winner set", election: updatedElection });
    } catch (error) {
        return res.status(500).json({ message: "Unable to set winner", error });
    }
}



export async function getElectionDay (req, res) {
    try {
        const getElecDay = await ElectionDay.find();
        return res.status(200).json({ getElecDay });
    }
    catch(error) {
        return res.status(500).json({ message: 'unable to get details' });
    }
}


