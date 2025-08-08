import mongoose from "mongoose";

const lastElection = new mongoose.Schema({
  Candidates: { type: String },
  Votes: { type: Number },
  Winner: { type: String },
  Date: { type: Date },
});

const nextElection = new mongoose.Schema({
  Date: { type: Date },
  Candidates: { type: String },
});

const electionDay = new mongoose.Schema({
  Date: { type: Date },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  Candidates: [{
      name: { type: String, required: true },
      votes: { type: Number, default: 0 }
    }],
  Winner: { type: String },
  CreatedAt: { type: Date, default: Date.now }
});


export const LastElection = mongoose.model("LastElection", lastElection);
export const NextElection = mongoose.model("NextElection", nextElection);
export const ElectionDay = mongoose.model("ElectionDay", electionDay);
