import express, { json } from 'express';
const app = express();
import { config } from 'dotenv';
import cors from 'cors';

import Admin from './routes/adminRoute.js';

config();
app.use(json());
app.use(cors());


import connectDB from './dbconnection/db.js';

connectDB();


app.use('/admin', Admin);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(("listening on port " + port)));
