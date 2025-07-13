import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from "dotenv";
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost/5173",
    credentials:true
}));

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log("server is running on the port "+port);
    connectDB();
});