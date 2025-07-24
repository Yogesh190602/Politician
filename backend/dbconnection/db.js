import {connect} from 'mongoose';

export default async function connectDB() {
    
    try{
        await connect(process.env.MONGO_URI);
    console.log("Connected to database");
    
    }
    catch(err){
        console.error("Database connection failed:", err);
        process.exit(1); 
    }
}