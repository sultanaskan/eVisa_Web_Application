import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import visaRoutes from './routes/visaRoutes.js';


dotenv.config();
connectDB(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/visa', visaRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(process.env.PORT || 5000, () =>  
console.log('Server is running on port', process.env.PORT || 5000       )); 

