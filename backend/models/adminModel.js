import mongoose from 'mongoose';

const adminLogin = new mongoose.Schema({
    EmailId: { type: String, required: true },
    Password: { type: String, Required: true },
});

const lastElection = new mongoose.Schema({
    Candidates: { type: String, },
    Votes: { type: Number, },
    Winner: { type: String, },
    Date: { type: Date, },

});


const nextElection = new mongoose.Schema({
    Date: { type: Date, },
    Candidates: { type: String, },
});

const electionDay = new mongoose.Schema({
    Date: { type: Date, },
    Candidates: { type: String, },
    Votes: { type: Number, },
    Winner: { type: String, },

});

export const Admin = mongoose.model('Admin', adminLogin);
export const LastElection = mongoose.model('LastElection', lastElection);
export const NextElection = mongoose.model('NextElection', nextElection);
export const ElectionDay = mongoose.model('ElectionDay', electionDay);
