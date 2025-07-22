import express, { json } from 'express';
const app = express();
import { config } from 'dotenv';
import adminRoute from './routes/adminRoute.js';
import login from './routes/adminRoute.js';



config();
app.use(json());


import connectDB from './dbconnection/db.js';
connectDB();


app.use('/admin', adminRoute);
app.use('/login', login);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(("listening on port " + port)));
