import mongoose from "mongoose";

const userRegister = new mongoose.Schema({
    Username : {type: String, required: function() { return this.role === 'user'; }},
    EmailId : {type: String, required : true},
    Password : {type: String, required: true},
    Phone : {type: Number, required : function() { return this.role === 'user'; }},
     role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  }

    
});

const funds = new mongoose.Schema({
    Food : {type: Number},
    Coins :{ type: Number}
}) 

export const User = mongoose.model("register", userRegister);
export const Funds = mongoose.model("funds", funds);