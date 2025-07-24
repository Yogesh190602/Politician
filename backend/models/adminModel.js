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

})

const login = mongoose.model('Admin', adminLogin);
const LastElection = mongoose.model('Admin', adminLogin);

module.exports = { login, LastElection };
