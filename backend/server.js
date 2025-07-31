import express, { json } from 'express';
const app = express();
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cookieParser());

import Admin from './routes/adminRoute.js';
import User from "./routes/userRoute.js";

config();

app.use(json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


import connectDB from './dbconnection/db.js';
connectDB();


app.use('/admin', Admin);
app.use('/user', User)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(("listening on port " + port)));
