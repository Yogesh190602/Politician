import mongoose from "mongoose";

const userRegister = new mongoose.Schema({
    Username : {type: String, requires: true},
    EmailId : {type: String, required : true},
    Password : {type: String, required: true},
    Phone : {type: Number, required : true},
});

const funds = new mongoose.Schema({
    Food : {type: Number},
    Coins :{ type: Number}
}) 

export const User = mongoose.model("register", userRegister);
export const Funds = mongoose.model("funds", funds);